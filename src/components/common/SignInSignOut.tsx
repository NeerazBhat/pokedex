import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@chakra-ui/react';

const SignInSignOut = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  return isAuthenticated ? (
    <Button colorScheme="red" onClick={() => logout()}>
      Sign Out
    </Button>
  ) : (
    <Button onClick={() => loginWithRedirect()}>Sign In</Button>
  );
};

export default SignInSignOut;
