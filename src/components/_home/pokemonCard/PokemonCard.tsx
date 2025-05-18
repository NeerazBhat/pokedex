import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import bgTypeColor, { type PokemonType } from '../../../data/pokemonTypeColor';
import { Link } from 'react-router';
import type { IPokemonDetail } from '../../../types/pokemon';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../../../services/_home';
import SimpleSpinner from '../../common/SimpleSpinner';
import { BiHeart } from 'react-icons/bi';

interface IPokemonCardProps {
  pokemonName: string;
  initialData?: IPokemonDetail;
  maxW?: string;
}

const PokemonCard = ({ pokemonName, initialData, maxW }: IPokemonCardProps) => {
  const { isLoading, data: pokemon } = useQuery<IPokemonDetail>({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    staleTime: 30000,
    initialData,
  });

  if (isLoading || !pokemon) {
    return (
      <VStack>
        <SimpleSpinner />
      </VStack>
    );
  }

  const { name, sprites, types } = pokemon;

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
      >
        <BiHeart />
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
