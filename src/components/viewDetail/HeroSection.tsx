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
  useTheme,
} from '@chakra-ui/react';
import type { PokemonType } from '../../data/pokemonTypeColor';
import bgTypeColor from '../../data/pokemonTypeColor';
import type { IPokemon } from '../_home/pokemonCard/PokemonCard';
import { ArrowRightIcon } from '@chakra-ui/icons';
import PokemonStats from './PokemonStats';
import type { IPokemonTypes } from './typeViewDetail';
import { transparentize } from '@chakra-ui/theme-tools';

interface IPokemonType {
  type: { name: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBackgroundColor = (pokemonType: IPokemonTypes, theme: any) => {
  const baseColor = bgTypeColor[pokemonType[0].type.name as PokemonType];
  return transparentize(baseColor, 0.5)(theme);
};

const HeroSection = ({ pokemon }: IPokemon) => {
  const theme = useTheme();
  return (
    <Box as="main" bg={getBackgroundColor(pokemon.types, theme)}>
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
              {pokemon.types.map((data: IPokemonType) => (
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
            <List spacing={1} mt={5}>
              <ListItem>
                <ListIcon as={ArrowRightIcon} color="green.500" />
                ID: {pokemon.id}
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Height: {pokemon.height} ft.
              </ListItem>
              <ListItem>
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Weight: {pokemon.weight} lbs
              </ListItem>
              <ListItem textTransform="capitalize">
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Abilities:{' '}
                {pokemon.abilities?.map((data) => data.ability.name).join(', ')}
              </ListItem>
            </List>
            <PokemonStats stats={pokemon.stats} />
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
