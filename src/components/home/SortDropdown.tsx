import { FormControl, Select } from '@chakra-ui/react';

export enum SortOptions {
  ASC = 'ASC',
  DSC = 'DSC',
}

interface ISortDropdownProps {
  setSortOrder: React.Dispatch<React.SetStateAction<SortOptions | null>>;
}

const SortDropdown = ({ setSortOrder }: ISortDropdownProps) => {
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortOptions);
  };

  return (
    <FormControl w="200px">
      <Select onChange={handleSort} placeholder="Sort By" fontWeight={600}>
        <option value="ASC">Name A - Z</option>
        <option value="DSC">Name Z - A</option>
      </Select>
    </FormControl>
  );
};

export default SortDropdown;
