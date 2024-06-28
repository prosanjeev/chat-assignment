import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from '../..';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setUser({ ...user, profilePhoto: event.target.files[0] });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/register`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      // gender: "",
    })
  }

  return (
    <Box w="full" maxW="md" mx="auto" mt="8" p="6" rounded="lg" shadow="xl" bg="gray.50" maxH='2xl'>
      <Heading as="h1" textAlign="center" mb="6">Signup</Heading>
      <form onSubmit={onSubmitHandler}>
        <VStack spacing={4}>
          <FormControl id="fullName">
            <FormLabel>Full Name</FormLabel>
            <Input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              placeholder="Full Name"
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
            />
          </FormControl>
          <FormControl id="confirmPassword">
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              placeholder="Confirm Password"
            />
          </FormControl>
{/* 
          <FormControl mb={4}>
            <FormLabel>Select Profile Photo</FormLabel>
            <Input
              type="file"
              accept=".pdf, .jpg, .png"
              onChange={handleFileChange}
            />
          </FormControl> */}
         
          <Text textAlign="center">Already have an account? <ChakraLink as={Link} to="/login">Login</ChakraLink></Text>
          <Button type="submit" colorScheme="teal" width="full">Signup</Button>
        </VStack>
      </form>
    </Box>
  )
}

export default Signup;
