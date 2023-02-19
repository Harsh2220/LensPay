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
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'
import { client } from "@/apollo/client";
import fetchEthAddressByHandle from "@/apollo/queries/fetchEthAddressByHandle";

function dashboard() {
    const [update, setupdate] = useState("");
    const [modify, setmodify] = useState("");

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
            <FormLabel mx={4}>Lens handle</FormLabel>
            <Input value={update}
                onChange={(e)=>{
                    setupdate(e.target.value);
                    console.log(e.target.value);
                }}
                color={"black"}
                onBlur={
                  async ()=>{
                   try {
                    const data = await client.query({
                      query: fetchEthAddressByHandle,
                      variables: {
                        handle: update,
                      }
                    });
                    if (data?.data?.profiles?.items.length == 0){
                      toast('Enter a valid lens handle', { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'top-center' })
                    }
                    console.log(data);
                   } catch (error) {
                    console.log(error);
                    toast('Enter a valid lens handle', { hideProgressBar: true, autoClose: 2000, type: 'error' ,position:'top-center' })
                   }
                  }
                }
                py={2}
                px={4}
                w={'100%'}>
            </Input>
          </FormControl>
          <FormControl bgColor={"purple.700"} my={2} w={"full"} fontSize={"2xl"} borderRadius={"xl"}>
            <FormLabel mx={4}>Amount</FormLabel>
            <Input value={modify}
                onChange={(e)=>{
                    setmodify(e.target.value);
                    console.log(e.target.value);
                }}
                
                color={"black"}

                py={2}
                px={4}
                w={'100%'}>
            </Input>
          </FormControl>
        </VStack>
        <Button w={"max-content"} h={12} borderRadius={"md"} px={8} my={8} bgColor={"purple.500"} >Make Payment</Button>
      </Container>
    </ChakraBaseProvider>
  );
}

export default dashboard;
