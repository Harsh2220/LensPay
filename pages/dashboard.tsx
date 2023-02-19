import {
    Button,
  ChakraBaseProvider,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'

function dashboard() {
    const [update, setupdate] = useState("")
    const [modify, setmodify] = useState("")

    useEffect(() => {
       console.log("Ye kya he");
    }, [update,modify])
    
  return (
    <ChakraBaseProvider>
      <Container
        backgroundColor={"whitesmoke"}
        h={"sm"}
        maxW={"lg"}
        margin={"auto"}
        borderRadius={"3xl"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Heading fontSize={"3xl"} fontWeight={"bold"} fontFamily={"mono"} color={"purple.500"} >Transfer</Heading>
        <VStack w={"full"} px={4}>
          <FormControl bgColor={"purple.700"} my={2} w={"full"} fontSize={"2xl"} borderRadius={"xl"}>
            <FormLabel mx={4}>Amount transfer from</FormLabel>
            <NumberInput>
              <NumberInputField
                value={update}
                onChange={(e)=>{
                    console.log("Hiiiii");
                    setupdate(e.target.value);
                    console.log(e.target.value);
                }}
                color={"black"}
                py={2}
                px={4}
              />
            </NumberInput>
          </FormControl>
          <FormControl bgColor={"purple.700"} my={2} w={"full"} fontSize={"2xl"} borderRadius={"xl"}>
            <FormLabel mx={4}>Amount transfer to</FormLabel>
            <NumberInput borderRadius={"3xl"}>
              <NumberInputField
              value={modify}
                onChange={(e)=>{
                    setmodify(e.target.value)
                    console.log(e.target.value);
                }}
                color={"black"}
                py={2}
                px={4}
                // borderBottomRadius={"3xl"}
              />
            </NumberInput>
          </FormControl>
        </VStack>
        <Button w={"max-content"} h={12} borderRadius={"md"} px={8} my={8} bgColor={"purple.500"} >Make Payment</Button>
      </Container>
    </ChakraBaseProvider>
  );
}

export default dashboard;
