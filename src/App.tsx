import { ChakraProvider, Container } from '@chakra-ui/react';

const App = () => {
  return (
    <ChakraProvider>
      <Container maxW="8xl">Hello</Container>
    </ChakraProvider>
  );
};

export default App;
