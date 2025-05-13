import { HStack, Text, VStack } from '@chakra-ui/react';
import type { IStats } from './viewDetails';

interface IStatsProps {
  stats: IStats;
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
          <Text fontSize={12} textTransform="uppercase" color="blackAlpha.700">
            {data.stat.name}
          </Text>
        </VStack>
      ))}
    </HStack>
  );
};

export default PokemonStats;
