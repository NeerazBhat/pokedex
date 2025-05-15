import { Image, VStack } from '@chakra-ui/react';
import { Link } from 'react-router';
import { PAGE_URLS } from '../../lib/routes';

const Header = () => {
  return (
    <VStack as="nav" py="1.5rem">
      <Link to={PAGE_URLS.HOME}>
        <Image src="/assets/logo.png" alt="logo" height={65} />
      </Link>
    </VStack>
  );
};

export default Header;
