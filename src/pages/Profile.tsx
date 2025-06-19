import { useAuth0 } from '@auth0/auth0-react';
import { Container, Image, Text } from '@chakra-ui/react';

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Container maxW="8xl" mt={6}>
      <Image src={user?.picture} alt="profile" />
      <Text>{user?.nickname}</Text>
    </Container>
  );
};

export default Profile;
