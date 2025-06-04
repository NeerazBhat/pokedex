import { useQueries } from '@tanstack/react-query';
import {
  AbsoluteCenter,
  Box,
  Divider,
  HStack,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import SimpleSpinner from '../common/SimpleSpinner';
import type { PokemonType } from '../../data/pokemonTypeColor';
import bgTypeColor from '../../data/pokemonTypeColor';
import type { IPokemonTypes } from './typeViewDetail';
import { fetchPokemonTypesDetail } from '../../services/viewDetails';

interface ITypeDetailSectionProps {
  pokemonTypes: IPokemonTypes;
}

const TypeDetailSection = ({ pokemonTypes }: ITypeDetailSectionProps) => {
  const pokemonTypeQueries = useQueries({
    queries: pokemonTypes.map((pokemonType: { type: { name: string } }) => ({
      queryKey: ['type', pokemonType.type.name],
      queryFn: () => fetchPokemonTypesDetail(pokemonType.type.name),
      staleTime: 30000,
    })),
  });

  const arePokemonTypeQueriesLoading = pokemonTypeQueries.some(
    (type) => type.isLoading
  );

  const arePokemonTypeQueriesError = pokemonTypeQueries.some(
    (type) => type.isError
  );

  if (arePokemonTypeQueriesLoading) {
    <HStack minH="200px" justifyContent="center">
      <SimpleSpinner />
    </HStack>;
  }

  if (arePokemonTypeQueriesError) {
    return (
      <HStack minH="200px" justifyContent="center">
        <Text textAlign="center" color="red">
          Error something went wrong
        </Text>
      </HStack>
    );
  }

  return (
    <>
      <Box position="relative" mt={20} mb={16}>
        <Divider borderColor="gray.600" />
        <AbsoluteCenter bg="white" px="4" fontSize={40} fontWeight={700}>
          Damage Relations
        </AbsoluteCenter>
      </Box>
      {pokemonTypeQueries.map((queries, idx) => {
        const pokemonTypes = queries.data;
        return (
          <TableContainer key={idx} bg="blackAlpha.200" mt={8} p={8}>
            <Text
              px={4}
              textTransform="uppercase"
              fontWeight={600}
              fontSize={24}
            >
              {pokemonTypes?.name}
            </Text>
            <Table size="sm" key={pokemonTypes?.name}>
              <Thead>
                <Tr>
                  <Th>Double Damage</Th>
                  <Th>Half Damage</Th>
                  <Th>No Damage</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>
                    From:{' '}
                    <HStack wrap="wrap" mt={2}>
                      {pokemonTypes?.damage_relations.double_damage_from.map(
                        (from) => (
                          <Tag
                            key={from.name}
                            bg={bgTypeColor[from.name as PokemonType]}
                            color="white"
                          >
                            {from.name}
                          </Tag>
                        )
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    From:{' '}
                    <HStack wrap="wrap" mt={2}>
                      {pokemonTypes?.damage_relations.half_damage_from.map(
                        (from) => (
                          <Tag
                            key={from.name}
                            bg={bgTypeColor[from.name as PokemonType]}
                            color="white"
                          >
                            {from.name}
                          </Tag>
                        )
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    From:{' '}
                    <HStack wrap="wrap" mt={2}>
                      {pokemonTypes?.damage_relations.no_damage_from.map(
                        (from) => (
                          <Tag
                            key={from.name}
                            bg={bgTypeColor[from.name as PokemonType]}
                            color="white"
                          >
                            {from.name}
                          </Tag>
                        )
                      )}
                    </HStack>
                  </Td>
                </Tr>
                <Tr>
                  <Td>
                    To:{' '}
                    <HStack wrap="wrap" mt={2}>
                      {pokemonTypes?.damage_relations.double_damage_to.map(
                        (to) => (
                          <Tag
                            key={to.name}
                            bg={bgTypeColor[to.name as PokemonType]}
                            color="white"
                          >
                            {to.name}
                          </Tag>
                        )
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    To:{' '}
                    <HStack wrap="wrap" mt={2}>
                      {pokemonTypes?.damage_relations.half_damage_to.map(
                        (to) => (
                          <Tag
                            key={to.name}
                            bg={bgTypeColor[to.name as PokemonType]}
                            color="white"
                          >
                            {to.name}to
                          </Tag>
                        )
                      )}
                    </HStack>
                  </Td>
                  <Td>
                    To:{' '}
                    <HStack wrap="wrap" mt={2}>
                      {pokemonTypes?.damage_relations.no_damage_to.map((to) => (
                        <Tag
                          key={to.name}
                          bg={bgTypeColor[to.name as PokemonType]}
                          color="white"
                        >
                          {to.name}
                        </Tag>
                      ))}
                    </HStack>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        );
      })}
    </>
  );
};

export default TypeDetailSection;
