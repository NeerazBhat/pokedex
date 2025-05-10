import { HStack, Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <HStack height="80dvh" width="98vw" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="purple.600"
        size="xl"
      />
    </HStack>
  );
};

export default Loader;
