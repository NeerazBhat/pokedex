import {
  Badge,
  Box,
  Button,
  Container,
  HStack,
  Image,
  List,
  ListIcon,
  ListItem,
  SimpleGrid,
  Text,
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
import { useQuery } from '@tanstack/react-query';
import { fetchIsFavStatus } from '../../services/home';
import { BiSolidHeartCircle } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import { useFavMutations } from '../../hooks/useFavMutations';

interface IHeroSectionProps {
  pokemon: IPokemonDetail;
  species: ISpeciesDetail;
}
interface IPokemonType {
  type: { name: string };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBackgroundColor = (pokemonType: IPokemonTypes, theme: any) => {
  const baseColor = bgTypeColor[pokemonType[0].type.name as PokemonType];
  return transparentize(baseColor, 0.35)(theme);
};

const HeroSection = ({ pokemon, species }: IHeroSectionProps) => {
  const [favStatus, setFavStatus] = useState<boolean | null>(null);

  const theme = useTheme();

  const { data: isFav } = useQuery({
    queryKey: ['isFav', pokemon.id],
    queryFn: () => fetchIsFavStatus(pokemon.id),
  });

  const { addToFav, removeFromFav } = useFavMutations({
    pokemonName: pokemon.name,
    pokemonID: pokemon.id,
    setFavStatus,
  });

  useEffect(() => {
    if (isFav) {
      setFavStatus(isFav.isFavorited);
    }
  }, [isFav]);

  const { id, name } = pokemon;

  const handleAddFav = () => {
    const newData = { id, name, addedBy: 'Niraj Bhat' };
    addToFav(newData);
  };

  return (
    <Box
      as="section"
      bg={getBackgroundColor(pokemon.types, theme)}
      minH="400px"
      py={10}
    >
      <Container maxW="7xl">
        <SimpleGrid
          columns={2}
          spacing={10}
          alignItems="center"
          position="relative"
        >
          <Box>
            {favStatus && (
              <Box color="red.600" position="absolute" right={4} fontSize={164}>
                <BiSolidHeartCircle />
              </Box>
            )}
            <Text
              as="h2"
              fontSize="5rem"
              fontWeight={700}
              textTransform="capitalize"
            >
              {pokemon.name}
            </Text>
            <HStack gap={3}>
              {pokemon.types.map((data: IPokemonType) => (
                <Badge
                  key={data.type.name}
                  textTransform="uppercase"
                  bg={bgTypeColor[data.type.name as PokemonType]}
                  color="white"
                  borderRadius={16}
                  p="0.25rem 0.75rem"
                >
                  {data.type.name}
                </Badge>
              ))}
            </HStack>
            <List spacing={1} mt={5} fontWeight={500}>
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
            <Box mt={6}>
              {favStatus ? (
                <Button
                  colorScheme="red"
                  onClick={() => removeFromFav(pokemon.id)}
                >
                  Remove From Favourite
                </Button>
              ) : (
                <Button colorScheme="green" onClick={handleAddFav}>
                  Add To Favourite
                </Button>
              )}
            </Box>
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
