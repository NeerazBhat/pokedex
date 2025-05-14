import { HStack, Text, VStack } from '@chakra-ui/react';
import type { IPokemonStats } from './typeViewDetail';

interface IStatsProps {
  stats: IPokemonStats;
}

const PokemonStats = ({ stats }: IStatsProps) => {
  return (
    <HStack gap={2} mt={5}>
      {stats.map((data) => (
        <VStack
          key={data.stat.name}
          bgColor="white"
          p={3}
          borderRadius={6}
          minW="70px"
        >
          <Text fontSize={20} fontWeight={600}>
            {data.base_stat}
          </Text>
          <Text
            fontSize={10}
            fontWeight={600}
            textTransform="uppercase"
            color="blackAlpha.600"
          >
            {data.stat.name.split('-').join(' ')}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default PokemonStats;
