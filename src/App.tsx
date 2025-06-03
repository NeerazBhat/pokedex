import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import RootLayout from './components/common/RootLayout';
import ViewDetail from './pages/ViewDetail';
import MyFavourites from './pages/MyFavourites';
import theme from './lib/theme';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path=":name" element={<ViewDetail />} />
          <Route path="my-favourite" element={<MyFavourites />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
