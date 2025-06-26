import { useAuth0 } from '@auth0/auth0-react';
import {
  Box,
  Button,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router';
import { PAGE_URLS } from '../../lib/routes';

const SignInSignOut = () => {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  return isAuthenticated ? (
    <Popover>
      <PopoverTrigger>
        <Box display="flex" gap={2} alignItems="center" cursor="pointer">
          <Image src={user?.picture} alt="profile" height="40px" />{' '}
          <Text fontWeight={600}>{user?.name}</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent width={200}>
        <PopoverBody display="flex" flexDir="column" gap={2}>
          <Link to={PAGE_URLS.PROFILE}>
            <Text fontWeight={600}>Profile</Text>
          </Link>
          <Button colorScheme="red" onClick={() => logout()}>
            Sign Out
          </Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  ) : (
    <Button colorScheme="green" onClick={() => loginWithRedirect()}>
      Sign In
    </Button>
  );
};

export default SignInSignOut;
