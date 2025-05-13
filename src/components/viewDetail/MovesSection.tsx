import {
  AbsoluteCenter,
  Box,
  Divider,
  Heading,
  HStack,
  Tag,
} from '@chakra-ui/react';
import type { IPokemonMoves } from './typeViewDetail';
import { pokemonMovesColor } from '../../data/pokemonMovesColor';

interface IMovesProps {
  moves: IPokemonMoves;
}

const getMoveColor = () => {
  const randomNum = Math.floor(Math.random() * 10);
  console.log(randomNum);
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
      <Heading as="h4" fontSize={24} mb={5}>
        Move
      </Heading>
      <HStack flexWrap="wrap">
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
