import { Badge, Box, HStack, Image, Text } from '@chakra-ui/react';
import bgTypeColor, { type PokemonType } from '../../../data/pokemonTypeColor';
import type { IPokemonDetail } from '../../../pages/Home';
import { Link } from 'react-router';

interface IPokemon {
  pokemon: IPokemonDetail;
}

const PokemonCard = ({ pokemon }: IPokemon) => {
  return (
    <Link to={`/${pokemon.name}`}>
      <Box textAlign="center" bg="blackAlpha.100" p={3} rounded={4}>
        <Image
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt={pokemon.name}
        />
        <Text
          as="p"
          fontSize="1.25rem"
          fontWeight={900}
          textTransform="capitalize"
        >
          {pokemon.name}
        </Text>
        <HStack gap={3} justifyContent="center">
          {pokemon.types.map((type) => (
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
      </Box>
    </Link>
  );
};

export default PokemonCard;
