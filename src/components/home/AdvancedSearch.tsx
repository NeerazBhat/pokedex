import { Box, Button, HStack, Image, Text, VStack } from '@chakra-ui/react';
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
import type { IFilterState } from '../../global-state/reducers/advancedFilterReducer';

interface IAdvancedSearch {
  dispatch: React.Dispatch<filterActions>;
}

const AdvancedSearch = ({ dispatch }: IAdvancedSearch) => {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      types: undefined,
      habitats: undefined,
      classification: undefined,
    },
  });

  const { data: searchFilters } = useQuery<ISearchFilters>({
    queryKey: ['filter'],
    queryFn: fetchSearchFilters,
    staleTime: 100000,
  });

  const watched = useWatch({ control });
  const isFilterApplied =
    watched.types || watched.habitats || watched.classification;

  const onSubmit = (data: IFilterPayload) => {
    const newData: IFilterState = {
      types: data.types?.length
        ? data.types?.map((option) => option.value)
        : undefined,
      habitats: data.habitats?.value ? [data.habitats?.value] : undefined,
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
      types: undefined,
      habitats: undefined,
      classification: undefined,
    });
  };

  return (
    <Box p={6} bg="purple.700" rounded={8} position="relative">
      <Image
        src="/assets/pokemon.png"
        alt="pokemon"
        height="150px"
        position="absolute"
        top="-124px"
        left="20px"
      />
      <Text fontSize={20} fontWeight={600} mb={4} color="secondary">
        Advanced Search
      </Text>
      <VStack
        as="form"
        gap="1rem"
        fontWeight={600}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          '.select-dropdown': {
            width: '100%',
          },
        }}
      >
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
              value={value || null}
              onChange={(selected) => onChange(selected || undefined)}
              className="select-dropdown"
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
              className="select-dropdown"
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
              className="select-dropdown"
            />
          )}
        />

        <HStack>
          <Button
            colorScheme="yellow"
            bg="yellow.400"
            color="purple.700"
            minW="auto"
            disabled={!isFilterApplied}
            type="submit"
          >
            Apply Filters
          </Button>
          <Button
            colorScheme="gray"
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
