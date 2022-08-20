import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Show, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'

const Signup = () => {

  // states
  const [show, setShow] = useState(false)  // for Hide:Show password
  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const [pic, setPic] = useState()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const handleClick = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true)
    // check if isUndefined
    if (pics === undefined) {
      // add a toast
      toast({
        title: 'Please upload a profile picture',
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom"
      })
      return;  // do nothing if image is undefined
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {  // check if image format is image and supported
      const data = new FormData()
      data.append('file', pics)  // add file field which would have pic
      data.append('upload_preset', 'mern-chat')  // preset for cloudinary
      data.append('cloud_name', 'hashfx')  // cloudinary name
      // api call to cloudinary api
      fetch('https://api.cloudinary.com/v1_1/hashfx/image/upload', {
        method: 'post',
        body: data
      }).then(res => res.json())  // convert response into json
        .then(data => {
          setPic(data.url.toString()) // set pic to picState from above json
          console.log(data.url.toString())
          setLoading(false)
        })
        .catch((err) => {  // handle error if any
          console.log(err);
          setLoading(false)
        })
    }else{  // if format is not image
      // toast here 30:36 JWT
    }
  };
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