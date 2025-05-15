import { FormControl, Select } from '@chakra-ui/react';

const SortDropdown = () => {
  return (
    <FormControl w="200px">
      <Select placeholder="Sort by">
        <option>Ascending</option>
        <option>Descending</option>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
