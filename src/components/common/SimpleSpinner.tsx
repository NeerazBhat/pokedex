import { Spinner } from "@chakra-ui/react";

const SimpleSpinner = () => {
  return (
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="purple.600"
      size="xl"
    />
  );
};

export default SimpleSpinner;
