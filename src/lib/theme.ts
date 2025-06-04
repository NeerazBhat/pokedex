import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        fontFamily: 'Dosis, sans-serif',
      },
    },
  },
  colors: {
    primary: '#553C9A',
    secondary: '#ffce31',
  },
});

export default theme;
