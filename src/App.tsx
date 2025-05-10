import { ChakraProvider } from '@chakra-ui/react';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import RootLayout from './components/common/RootLayout';
import ViewDetail from './pages/ViewDetail';

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path=":name" element={<ViewDetail />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
