import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {

  // states
  const [show, setShow] = useState(false)  // for Hide:Show password
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const [pic, setPic] = useState()

  const handleClick = () => setShow(!show);
  const postDetails = (pics) => { };
  const submitHandler = () => { };


  return (
    <VStack spacing='5px' color='black'>  { /* vertical stack */}
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input placeholder='Your Name' onChange={(e) => setName(e.target.value)} />
      </FormControl>

      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />

          <InputRightElement width='4.5em'>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input type={show ? "text" : 'password'} placeholder='Confirm Password' onChange={(e) => setPasswordConfirmation(e.target.value)} />

          <InputRightElement width='4.5em'>
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='pic'>
        <FormLabel>Profile Picture</FormLabel>
        <input type="file" p={1.5} accept="image/*" onChange={(e) => postDetails(e.target.files[0])} />
      </FormControl>

      <Button colorScheme='teal' width="100%" style={{ marginTop: 15 }} onClick={submitHandler}>
        Sign Up
      </Button>

    </VStack>
  );
};

export default Signup