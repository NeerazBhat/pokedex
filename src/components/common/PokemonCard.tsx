import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
  useTheme,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import type { IPokemonDetail } from '../../types/pokemon';
import { fetchIsFavStatus, fetchPokemonDetail } from '../../services/home';
import type { IFavPokemonData, IFavStatus } from '../../types/favourites';
import { useFavMutations } from '../../hooks/useFavMutations';
import bgTypeColor, { type PokemonType } from '../../data/pokemonTypeColor';
import { getBackgroundColor } from '../viewDetail/HeroSection';

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

  const queryClient = useQueryClient();

  const theme = useTheme();

  const { isLoading: loadingPokemon, data: pokemon } = useQuery<IPokemonDetail>(
    {
      queryKey: ['pokemon', pokemonName],
      queryFn: () => fetchPokemonDetail(pokemonName),
      staleTime: 30000,
      initialData,
    }
  );
  const { isLoading: loadingIsFav, data: isFav } = useQuery<IFavStatus>({
    queryKey: ['isFav', pokemonID],
    queryFn: () => fetchIsFavStatus(pokemonID),
  });

  const { addToFav, removeFromFav } = useFavMutations({
    pokemonName,
    pokemonID,
    setFavStatus,
  });

  useEffect(() => {
    if (isFav) {
      setFavStatus(isFav.isFavorited);
    }
  }, [isFav]);

  if (loadingIsFav || loadingPokemon || !pokemon) {
    return <Skeleton height="229px" />;
  }

  const { name, sprites, types, id } = pokemon;

  const handleFavourties = () => {
    const newData = { id, name, addedBy: 'Niraj Bhat' };
    if (favStatus) {
      removeFromFav(id);
      queryClient.setQueryData<IFavPokemonData[]>(
        ['favPokemons'],
        (oldData) => oldData?.filter((p) => p.id !== pokemonID) ?? []
      );
    } else {
      addToFav(newData);
    }
  };

  return (
    <Box
      position="relative"
      transition="all 0.25s ease-in-out"
      _hover={{ transform: 'scale(1.025)', bg: 'blackAlpha.300' }}
      rounded={6}
    >
      <Button
        position="absolute"
        top={2}
        right={2}
        zIndex={1}
        p={0}
        rounded={30}
        onClick={handleFavourties}
        color={favStatus ? 'red.500' : 'blackAlpha.900'}
        bg={favStatus ? 'red.200' : 'white'}
        _hover={{ bg: 'red.100' }}
        fontSize={18}
        minWidth={30}
        height={30}
        transition="all 0.25s ease"
      >
        {favStatus ? <BiSolidHeart /> : <BiHeart />}
      </Button>
      <Link to={`/${name}`}>
        <VStack
          textAlign="center"
          bg={getBackgroundColor(pokemon.types, theme)}
          py={4}
          width={maxW}
          rounded={6}
        >
          <Image
            src={sprites.other['official-artwork'].front_default}
            alt={name}
            height="125px"
          />
          <Text
            as="p"
            fontSize="1.25rem"
            fontWeight={700}
            textTransform="capitalize"
          >
            {name}
          </Text>
          <HStack gap={2} justifyContent="center">
            {types.map((data) => (
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
        </VStack>
      </Link>
    </Box>
  );
};

export default PokemonCard;
