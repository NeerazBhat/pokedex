import { Button, HStack, Select } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchFilters } from '../../services/home';
import type { ISearchFilters } from '../../types/searchFilters';
import { useReducer } from 'react';
import {
  advancedFilterReducer,
  INITIAL_STATE,
} from '../global-state/reducers/advancedFilterReducer';
import {
  addClassificationFilter,
  addHabitatFilter,
  addTypeFilter,
  applyFilter,
  clearFilter,
} from '../global-state/actions/advancedFilterActions';

const AdvancedSearch = () => {
  const [filterState, dispatch] = useReducer(
    advancedFilterReducer,
    INITIAL_STATE
  );

  const { data: searchFilters } = useQuery<ISearchFilters>({
    queryKey: ['filter'],
    queryFn: fetchSearchFilters,
    staleTime: 100000,
  });

  console.log(filterState);

  return (
    <HStack gap={4}>
      <Select
        placeholder="Select Types"
        onChange={(e) => dispatch(addTypeFilter(e.target.value))}
      >
        {searchFilters?.types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Select Habitats"
        onChange={(e) => dispatch(addHabitatFilter(e.target.value))}
      >
        {searchFilters?.habitats.map((habitat) => (
          <option key={habitat} value={habitat}>
            {habitat}
          </option>
        ))}
      </Select>

      <Select
        placeholder="Select Classifications"
        onChange={(e) => dispatch(addClassificationFilter(e.target.value))}
      >
        {searchFilters?.classifications.map((classification) => (
          <option key={classification} value={classification}>
            {classification}
          </option>
        ))}
      </Select>

      <Button
        colorScheme="blue"
        minW="auto"
        onClick={() => dispatch(applyFilter())}
      >
        Apply Filters
      </Button>
      <Button
        colorScheme="red"
        bgColor="red.600"
        minW="auto"
        onClick={() => dispatch(clearFilter())}
      >
        Clear
      </Button>
    </HStack>
  );
};

export default AdvancedSearch;
