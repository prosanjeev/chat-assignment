import { Image, Text, Badge, Stack, HStack } from "@chakra-ui/react";

const Profile = ({ authUser }) => {

  const profilePhoto = authUser?.profilePhoto
    ? authUser.profilePhoto
    : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";

  return (
    <HStack align="center">
      <Image
      w={{ md: "24", base: "16" }}
      rounded="xl"
      src={profilePhoto}
      alt={authUser?.profilePhoto ? "Profile Photo" : "No Profile Photo Available"}
    />

      <Stack ml={4} spacing={{ md: 1 }}>
        <Text fontSize="xl" fontWeight={{ md: "bold", base: "semibold" }}>
          {authUser?.fullName}
        </Text>
        <Text fontSize={{ md: "lg", base: "sm" }}>{authUser?.email}</Text>
        <Badge colorScheme="green" mt={2} variant="solid">
          Online
        </Badge>
      </Stack>
    </HStack>
  );
};

export default Profile;
