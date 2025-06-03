import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'museo-sans, sans-serif',
      },
    },
  },
  colors: {
    primary: '#553C9A',
  },
});

export default theme;
