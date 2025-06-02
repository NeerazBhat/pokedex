import { Box, Button, Heading, HStack, Select, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchFilters } from '../../services/home';
import type { ISearchFilters } from '../../types/searchFilters';
import { type IFilterState } from '../../global-state/reducers/advancedFilterReducer';
import {
  applyFilter,
  clearFilter,
  type filterActions,
} from '../../global-state/actions/advancedFilterActions';
import { useForm, useWatch } from 'react-hook-form';
import { useEffect } from 'react';

interface IAdvancedSearch {
  filterState: IFilterState;
  dispatch: React.Dispatch<filterActions>;
}

const AdvancedSearch = ({
  filterState,
  dispatch,
}:
IAdvancedSearch) => {
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: filterState,
  });

  const { data: searchFilters } = useQuery<ISearchFilters>({
    queryKey: ['filter'],
    queryFn: fetchSearchFilters,
    staleTime: 100000,
  });

  const watched = useWatch({ control });
  const isFilterApplied =
    watched.types?.length || watched.habitats?.length || watched.classification;

  const onSubmit = (data: IFilterState) => {
    dispatch(applyFilter(data));
  };

  useEffect(() => {
    reset(filterState);
  }, [reset, filterState]);

  return (
    <Box>
      <Heading fontSize={20} fontWeight={600} mb={4}>
        Advanced Search
      </Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Select placeholder="Select Types" {...register('types')}>
          {searchFilters?.types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </Select>

        <Select placeholder="Select Habitats" {...register('habitats')}>
          {searchFilters?.habitats.map((habitat) => (
            <option key={habitat} value={habitat}>
              {habitat}
            </option>
          ))}
        </Select>

        <Select
          placeholder="Select Classifications"
          {...register('classification')}
        >
          {searchFilters?.classifications.map((classification) => (
            <option key={classification} value={classification}>
              {classification}
            </option>
          ))}
        </Select>

        <HStack>
          <Button
            colorScheme="yellow"
            color="purple.600"
            minW="auto"
            disabled={!isFilterApplied}
            type="submit"
          >
            Apply Filters
          </Button>
          <Button
            colorScheme="gray"
            bgColor="gray.200"
            minW="auto"
            onClick={() => dispatch(clearFilter())}
            disabled={!isFilterApplied}
          >
            Clear
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default AdvancedSearch;
