import { AbsoluteCenter, Box, Divider, HStack, Tag } from '@chakra-ui/react';
import type { IPokemonMoves } from './typeViewDetail';
import { pokemonMovesColor } from '../../data/pokemonMovesColor';

interface IMovesProps {
  moves: IPokemonMoves;
}

const getMoveColor = () => {
  const randomNum = Math.floor(Math.random() * 10);
  return pokemonMovesColor[randomNum];
};

const MovesSection = ({ moves }: IMovesProps) => {
  return (
    <Box py={8}>
      <Box position="relative" my={8}>
        <Divider borderColor="gray.600" />
        <AbsoluteCenter bg="white" px="4" fontSize={40} fontWeight={900}>
          Moves
        </AbsoluteCenter>
      </Box>
      <HStack flexWrap="wrap" justifyContent="center" mt={16}>
        {moves.map((data) => (
          <Tag key={data.move.name} bgColor={getMoveColor()}>
            {data.move.name}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
};

export default MovesSection;
