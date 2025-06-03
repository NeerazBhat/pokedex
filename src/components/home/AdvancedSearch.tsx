import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchSearchFilters } from '../../services/home';
import type { ISearchFilters } from '../../types/searchFilters';
import {
  applyFilter,
  clearFilter,
  type filterActions,
} from '../../global-state/actions/advancedFilterActions';
import { Controller, useForm, useWatch } from 'react-hook-form';
import Select from 'react-select';
import type { IFilterPayload } from '../../types/filterResults';

interface IAdvancedSearch {
  filterState: IFilterPayload;
  dispatch: React.Dispatch<filterActions>;
}

const AdvancedSearch = ({ filterState, dispatch }: IAdvancedSearch) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: filterState,
  });

  const { data: searchFilters } = useQuery<ISearchFilters>({
    queryKey: ['filter'],
    queryFn: fetchSearchFilters,
    staleTime: 100000,
  });

  const watched = useWatch({ control });
  const isFilterApplied =
    watched.types?.length || watched.habitats || watched.classification;

  const onSubmit = (data: IFilterPayload) => {
    const newData = {
      types: data.types?.length && data.types?.map((option) => option.value),
      habitats: data.habitats?.value && [data.habitats?.value],
      classification: data.classification?.value,
    };
    dispatch(applyFilter(newData));
  };

  const searchTypes = searchFilters?.types.map((type) => ({
    value: type,
    label: type,
  }));

  const searchHabitat = searchFilters?.habitats.map((habitat) => ({
    value: habitat,
    label: habitat,
  }));

  const searchClassification = searchFilters?.classifications.map((list) => ({
    value: list,
    label: list,
  }));

  const handleClear = () => {
    dispatch(clearFilter());
    reset({
      types: [],
      habitats: undefined,
      classification: undefined,
    });
  };

  return (
    <Box>
      <Heading fontSize={20} fontWeight={600} mb={4}>
        Advanced Search
      </Heading>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="types"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              isSearchable={false}
              isMulti
              isClearable
              placeholder="Select Types"
              options={searchTypes}
              value={value || []}
              onChange={(selected) => onChange(selected || [])}
            />
          )}
        />

        <Controller
          name="habitats"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              isSearchable={false}
              placeholder="Select Habitat"
              options={searchHabitat}
              value={value || null}
              onChange={(selected) => onChange(selected || undefined)}
            />
          )}
        />

        <Controller
          name="classification"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              isSearchable={false}
              placeholder="Select Classification"
              options={searchClassification}
              value={value || null}
              onChange={(selected) => onChange(selected || undefined)}
            />
          )}
        />

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
            onClick={handleClear}
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
