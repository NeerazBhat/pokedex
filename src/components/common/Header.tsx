import { Box, Button, Container, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { PAGE_URLS } from '../../lib/routes';
import { BiSolidHeart } from 'react-icons/bi';

const Header = () => {
  return (
    <Container maxW="7xl" py="0.75rem">
      <HStack as="nav" justifyContent="space-between">
        <Box width={150} />
        <Link to={PAGE_URLS.HOME}>
          <Image src="/assets/logo.png" alt="logo" height={65} />
        </Link>
        <Link to={PAGE_URLS.MY_FAVOURITE}>
          <Button color="red.600">
            <Text fontWeight={600}>My Favourites</Text>
            <BiSolidHeart />
          </Button>
        </Link>
      </HStack>
    </Container>
  );
};

export default Header;
