import {
  Badge,
  Container,
  HStack,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchPokemonDetail } from '../services/_home';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import bgTypeColor, { type PokemonType } from '../data/pokemonTypeColor';

const ViewDetail = () => {
  const { name } = useParams();

  const {
    isLoading,
    isError,
    data: pokemon,
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => {
      if (name) {
        return fetchPokemonDetail(name);
      }
    },
    staleTime: 20000,
    enabled: !!name,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  return (
    <Container maxW="7xl">
      <VStack textAlign="center" bg="blackAlpha.100" p={3} rounded={4}>
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
        <Text
          as="p"
          fontSize="5rem"
          fontWeight={900}
          textTransform="capitalize"
        >
          {pokemon.name}
        </Text>
        <HStack gap={3} justifyContent="center">
          {pokemon.types.map((type: { type: { name: string } }) => (
            <Badge
              key={type.type.name}
              textTransform="uppercase"
              bg={bgTypeColor[type.type.name as PokemonType]}
              color="white"
            >
              {type.type.name}
            </Badge>
          ))}
        </HStack>
      </VStack>
    </Container>
  );
};

export default ViewDetail;
