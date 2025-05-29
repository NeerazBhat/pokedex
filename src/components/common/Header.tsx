import { Box, Button, Container, HStack, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router';
import { PAGE_URLS } from '../../lib/routes';
import { BiSolidHeart } from 'react-icons/bi';

const Header = () => {
  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="blackAlpha.200"
    >
      <Container maxW="8xl" py="0.75rem">
        <HStack as="nav" justifyContent="space-between">
          <Box width={150} />
          <Link to={PAGE_URLS.HOME}>
            <Image src="/assets/logo.png" alt="logo" height={65} />
          </Link>
          <Link to={PAGE_URLS.MY_FAVOURITE}>
            <Button colorScheme="purple" bg="purple.700" color="yellow" gap={2}>
              <Text fontWeight={600}>My Favourites</Text>
              <BiSolidHeart />
            </Button>
          </Link>
        </HStack>
      </Container>
    </Box>
  );
};

export default Header;
