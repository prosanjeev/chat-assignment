import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../redux/userSlice";
import { BASE_URL } from "../..";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      navigate("/");
      console.log(res);
      dispatch(setAuthUser(res.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      email: "",
      password: "",
    });
  };

  return (
    <Box w="full" maxW="md" mx="auto" mt="8" p="6" rounded="md">
      <Box
        w="full"
        p="6"
        bg="gray.50"
        rounded="lg"
        shadow="md"
        bgClip="padding-box"
        backdropFilter="blur(20px)"
        bgOpacity="10"
        border="1px"
        borderColor="gray.100"
      >
        <Heading as="h1" fontSize="3xl" fontWeight="bold" textAlign="center">
          Login
        </Heading>
        <form onSubmit={onSubmitHandler}>
          <Stack spacing="4">
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                type="email"
                placeholder="Email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                type="password"
                placeholder="Password"
              />
            </FormControl>
            <Text textAlign="center">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Text>
            <Button type="submit" colorScheme="teal" width="full">
              Login
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
