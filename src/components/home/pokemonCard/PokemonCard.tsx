import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import bgTypeColor, { type PokemonType } from '../../../data/pokemonTypeColor';
import { Link } from 'react-router';
import type { IPokemonDetail } from '../../../types/pokemon';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../../../services/home';
import SimpleSpinner from '../../common/SimpleSpinner';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useState } from 'react';
import {
  deleteFromFavouritesData,
  postToFavourtiesData,
} from '../../../services/favourites';
import type { AxiosError } from 'axios';
import type { IFavPokemonData } from '../../../types/favourites';

type MyErrorResponse = {
  error: string;
};

interface IPokemonCardProps {
  pokemonName: string;
  initialData?: IPokemonDetail;
  maxW?: string;
  isFav: boolean;
}

const PokemonCard = ({
  pokemonName,
  initialData,
  maxW,
  isFav,
}: IPokemonCardProps) => {
  const [favStatus, setFavStatus] = useState(isFav);

  const toast = useToast();

  const capitalizedName =
    pokemonName.at(0)?.toUpperCase() + pokemonName.slice(1);

  const { isLoading, data: pokemon } = useQuery<IPokemonDetail>({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    staleTime: 30000,
    initialData,
  });

  const { mutate: removeFromFav } = useMutation({
    mutationFn: (id: number) => deleteFromFavouritesData(id),
    onSuccess: () => {
      toast({
        title: 'Removed',
        description: `${capitalizedName} has been removed`,
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
    },
    onError: (error: AxiosError<MyErrorResponse>) => {
      toast({
        title: 'Error',
        description: `${error.response?.data?.error || 'Something went wrong'}`,
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    },
  });

  if (isLoading || !pokemon) {
    return (
      <VStack>
        <SimpleSpinner />
      </VStack>
    );
  }

  const { name, sprites, types, id } = pokemon;

  const handleFavourties = () => {
    const newData = { id, name, addedBy: 'Niraj Bhat' };
    if (favStatus) {
      removeFromFav(id);
    } else {
      addToFav(newData);
    }
    setFavStatus(!favStatus);
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
