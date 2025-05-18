import { Container, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { PAGE_URLS } from '../../lib/routes';
import { BiSolidHeart } from 'react-icons/bi';

const Header = () => {
  return (
    <Container maxW="7xl" py="0.75rem">
      <HStack as="nav" justifyContent="space-between">
        <Link to={PAGE_URLS.HOME}>
          <Image src="/assets/logo.png" alt="logo" height={65} />
        </Link>
        <Link to={PAGE_URLS.MY_FAVOURITE}>
          <HStack>
            <Text>My Favourites</Text>
            <BiSolidHeart color="red.600" />
          </HStack>
        </Link>
      </HStack>
    </Container>
  );
};

export default Header;
