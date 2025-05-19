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
import { postFavourtiesData } from '../../../services/favourites';
import type { AxiosError } from 'axios';

type MyErrorResponse = {
  error: string;
};

interface IPokemonCardProps {
  pokemonName: string;
  initialData?: IPokemonDetail;
  maxW?: string;
}

const PokemonCard = ({ pokemonName, initialData, maxW }: IPokemonCardProps) => {
  const [isFav, setIsFav] = useState(false);

  const toast = useToast();

  const { isLoading, data: pokemon } = useQuery<IPokemonDetail>({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    staleTime: 30000,
    initialData,
  });

  const mutation = useMutation({
    mutationFn: postFavourtiesData,
    onSuccess: (data) => {
      toast({
        title: 'Success',
        description: `${data.name.toLocaleLowerCase()} added to favourites`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: AxiosError<MyErrorResponse>) => {
      toast({
        title: 'Error',
        description: `${error.response?.data?.error || 'Something went wrong'}`,
        status: 'error',
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
    mutation.mutate(newData);
    setIsFav(!isFav);
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
        color={isFav ? 'red.500' : 'black'}
      >
        {isFav ? <BiSolidHeart /> : <BiHeart />}
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
