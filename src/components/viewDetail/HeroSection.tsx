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
import { ArrowRightIcon } from '@chakra-ui/icons';
import PokemonStats from './PokemonStats';
import type { IPokemonTypes } from './typeViewDetail';
import { transparentize } from '@chakra-ui/theme-tools';
import type { IPokemonDetail } from '../../types/pokemon';
import type { ISpeciesDetail } from '../../types/species';

interface IHeroSectionProps {
  pokemon: IPokemonDetail;
  species: ISpeciesDetail;
}
interface IPokemonType {
  type: { name: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getBackgroundColor = (pokemonType: IPokemonTypes, theme: any) => {
  const baseColor = bgTypeColor[pokemonType[0].type.name as PokemonType];
  return transparentize(baseColor, 0.5)(theme);
};

const HeroSection = ({ pokemon, species }: IHeroSectionProps) => {
  const theme = useTheme();
  return (
    <Box
      as="section"
      bg={getBackgroundColor(pokemon.types, theme)}
      minH="400px"
      py={10}
    >
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
              <ListItem textTransform="capitalize">
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Generation: {species.generation.name}
              </ListItem>
              <ListItem textTransform="capitalize">
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Hatch Counter: {species.hatch_counter}
              </ListItem>
              <ListItem textTransform="capitalize">
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Egg Groups:{' '}
                {species.egg_groups.map((group) => group.name).join(', ')}
              </ListItem>
              <ListItem textTransform="capitalize">
                <ListIcon as={ArrowRightIcon} color="green.500" />
                Growth Rate: {species.growth_rate.name}
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
