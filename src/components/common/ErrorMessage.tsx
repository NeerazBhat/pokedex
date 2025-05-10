import { HStack, Text } from '@chakra-ui/react';

interface IErrorMessage {
  message: string;
}

const ErrorMessage = ({ message }: IErrorMessage) => {
  return (
    <HStack height="80dvh" width="100vw" justifyContent="center">
      <Text color="red.500">{message}</Text>
    </HStack>
  );
};

export default ErrorMessage;
