import {
  Badge,
  Box,
  Container,
  Heading,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
} from '@chakra-ui/react';
import type { PokemonType } from '../../data/pokemonTypeColor';
import bgTypeColor from '../../data/pokemonTypeColor';
import type { IPokemon } from '../_home/pokemonCard/PokemonCard';
import { ArrowRightIcon } from '@chakra-ui/icons';
import PokemonStats from './PokemonStats';

const HeroSection = ({ pokemon }: IPokemon) => {
  return (
    <Box as="main" bg="blackAlpha.100">
      <Container maxW="7xl">
        <SimpleGrid columns={2} spacing={10} alignItems="center">
          <Box>
            <Heading
              as="h2"
              fontSize="5rem"
              fontWeight={900}
              textTransform="capitalize"
            >
              {pokemon.name}
            </Heading>
            <HStack gap={3}>
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
            <List spacing={1} mt={5}>
              <ListItem>
                <ListIcon as={ArrowRightIcon} color="green.500" />
                ID: {pokemon.id}
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Height: {pokemon.height}
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Weight: {pokemon.weight}
              </ListItem>
            </List>
            <PokemonStats stats={pokemon.stats}/>
          </Box>

          <Image
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HeroSection;
