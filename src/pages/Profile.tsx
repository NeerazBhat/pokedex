import { useAuth0 } from '@auth0/auth0-react';
import { Container, HStack, Image, Stack, Text } from '@chakra-ui/react';

const Profile = () => {
  const { user } = useAuth0();
  console.log(user);
  return (
    <Container maxW="8xl" mt={6}>
      <HStack gap={4}>
        <Image src={user?.picture} alt="profile" height={200} />
        <Stack>
          <Text fontWeight={600} fontSize={24}>
            {user?.name}
          </Text>
          <Text fontWeight={600} fontSize={18}>
            {user?.email}
          </Text>
        </Stack>
      </HStack>
    </Container>
  );
};

export default Profile;
