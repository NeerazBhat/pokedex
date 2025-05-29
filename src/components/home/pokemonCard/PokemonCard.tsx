import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import bgTypeColor, { type PokemonType } from '../../../data/pokemonTypeColor';
import { Link } from 'react-router';
import type { IPokemonDetail } from '../../../types/pokemon';
import { useQuery } from '@tanstack/react-query';
import { fetchIsFavStatus, fetchPokemonDetail } from '../../../services/home';
import { BiHeart, BiSolidHeart } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import type { IFavStatus } from '../../../types/favourites';
import { useFavMutations } from '../../../hooks/useFavMutations';

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

  // if (loadingPokemon || !pokemon) {
  //   return (
  //     <VStack>
  //       <SimpleSpinner />
  //     </VStack>
  //   );
  // }

  if (loadingIsFav || loadingPokemon || !pokemon) {
    return <Skeleton height="286px" />;
  }

  const { name, sprites, types, id } = pokemon;

  const handleFavourties = () => {
    const newData = { id, name, addedBy: 'Niraj Bhat' };
    if (favStatus) {
      removeFromFav(id);
    } else {
      addToFav(newData);
    }
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
        <Box
          textAlign="center"
          bg="blackAlpha.100"
          p={3}
          maxW={maxW}
          rounded={4}
        >
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
          <HStack gap={2} justifyContent="center">
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
