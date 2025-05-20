import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import bgTypeColor, { type PokemonType } from '../../../data/pokemonTypeColor';
import { Link } from 'react-router';
import type { IPokemonDetail } from '../../../types/pokemon';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchIsFavStatus, fetchPokemonDetail } from '../../../services/home';
import SimpleSpinner from '../../common/SimpleSpinner';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import {
  deleteFromFavouritesData,
  postToFavourtiesData,
} from '../../../services/favourites';
import type { AxiosError } from 'axios';
import type { IFavPokemonData, IFavStatus } from '../../../types/favourites';

export type MyErrorResponse = {
  error: string;
};

interface IPokemonCardProps {
  pokemonName: string;
  pokemonID: number;
  initialData?: IPokemonDetail;
  maxW?: string;
}

const PokemonCard = ({
  pokemonName,
  pokemonID,
  initialData,
  maxW,
}: IPokemonCardProps) => {
  const [favStatus, setFavStatus] = useState<boolean | null>(null);
  const toast = useToast();

  const queryClient = useQueryClient();

  const capitalizedName =
    pokemonName.at(0)?.toUpperCase() + pokemonName.slice(1);

  const { isLoading: loadingIsFav, data: isFav } = useQuery<IFavStatus>({
    queryKey: ['isFav', pokemonID],
    queryFn: () => fetchIsFavStatus(pokemonID),
  });

  const { isLoading: loadingPokemon, data: pokemon } = useQuery<IPokemonDetail>(
    {
      queryKey: ['pokemon', pokemonName],
      queryFn: () => fetchPokemonDetail(pokemonName),
      staleTime: 30000,
      initialData,
    }
  );

  const { mutate: removeFromFav } = useMutation({
    mutationFn: (id: number) => deleteFromFavouritesData(id),
    onSuccess: () => {
      toast({
        title: 'Removed',
        description: `${capitalizedName} removed from favourites`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
      setFavStatus(false);
      queryClient.invalidateQueries({ queryKey: ['isFav', pokemonID] });
    },
    onError: (error: AxiosError<MyErrorResponse>) => {
      toast({
        title: 'Error',
        description: `${
          error.response?.data?.error || 'Unable to remove from favourites'
        }`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const { mutate: addToFav } = useMutation({
    mutationFn: (newData: IFavPokemonData) => postToFavourtiesData(newData),
    onSuccess: () => {
      toast({
        title: 'Added',
        description: `${capitalizedName} added to favourites`,
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
      setFavStatus(true);
      queryClient.invalidateQueries({ queryKey: ['isFav', pokemonID] });
    },
    onError: (error: AxiosError<MyErrorResponse>) => {
      toast({
        title: 'Error',
        description: `${
          error.response?.data?.error || 'Unable to add to favourites'
        }`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  useEffect(() => {
    if (isFav) {
      setFavStatus(isFav.isFavorited);
    }
  }, [isFav]);

  if (loadingPokemon || !pokemon) {
    return (
      <VStack>
        <SimpleSpinner />
      </VStack>
    );
  }

  if (loadingIsFav) {
    return <Skeleton height="286px" />;
  }

  const { name, sprites, types, id } = pokemon;

  const handleFavourties = () => {
    const newData = { id, name, addedBy: 'Niraj Bhat' };
    if (favStatus) {
      removeFromFav(id);
    } else {
      addToFav(newData);
    }
  };

  return (
    <Box
      position="relative"
      transition="all 0.25s ease-in-out"
      _hover={{ transform: 'scale(1.035)', bg: 'blackAlpha.300' }}
      rounded={4}
    >
      <Button
        position="absolute"
        right={0}
        zIndex={1}
        bg="transparent"
        _hover={{ bg: 'transparent', transform: 'scale(1.25)' }}
        onClick={handleFavourties}
        color={favStatus ? 'red.500' : 'blackAlpha.900'}
        fontSize={20}
      >
        {favStatus ? <BiSolidHeart /> : <BiHeart />}
      </Button>
      <Link to={`/${name}`}>
        <Box textAlign="center" bg="blackAlpha.100" p={3} maxW={maxW}>
          <Image
            src={sprites.other['official-artwork'].front_default}
            alt={name}
          />
          <Text
            as="p"
            fontSize="1.25rem"
            fontWeight={900}
            textTransform="capitalize"
          >
            {name}
          </Text>
          <HStack gap={3} justifyContent="center">
            {types.map((data) => (
              <Badge
                key={data.type.name}
                textTransform="uppercase"
                bg={bgTypeColor[data.type.name as PokemonType]}
                color="white"
              >
                {data.type.name}
              </Badge>
            ))}
          </HStack>
        </Box>
      </Link>
    </Box>
  );
};

export default PokemonCard;
