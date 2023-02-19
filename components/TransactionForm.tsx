import { client } from "@/apollo/client";
import fetchEthAddressByHandle from "@/apollo/queries/fetchEthAddressByHandle";
import {
  Box,
  HStack,
  Stack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Flex,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useTransactionStore } from "../store/store";

export default function TransactionForm() {
  const {
    handleScreen,
    handleUserAddress,
    handleAmount,
    userAddress,
    amount,
    balance,
    networkType,
    networkMetadata,
  } = useTransactionStore();

  const [validateAddress, setValidateAddress] = useState<boolean>(false);
  const [validateAmount, setValidateAmount] = useState<boolean>(false);

  const gasFee = (amount * 0.009) / 100;
  const totalAmount = amount + gasFee;

  const validateWalletAddress = () => {
    // Do nothing if there's no public key.
    if (userAddress.length === 0) {
      return;
    }

    let regexp = new RegExp(networkMetadata.regex);
    console.log(networkMetadata.regex);
    console.log(regexp);

    if (regexp.test(userAddress) === true) {
      setValidateAddress(true);
      console.log("kjnfs");
    } else {
      setValidateAddress(false);
      console.log("here");
    }
  };

  const validateEnteredAmount = () => {
    if (amount <= balance && amount > 0) {
      setValidateAmount(true);
    } else {
      setValidateAmount(false);
    }
  };
  const toast = useToast();

  // useEffect(() => {
  //   validateWalletAddress();
  // }, [userAddress]);

  // useEffect(() => {
  //   validateEnteredAmount();
  // }, [amount]);

  return (
    <>
      <HStack
        w="full"
        px={6}
        pb={6}
        pt={14}
        alignItems="center"
        borderBottom={"1px"}
        borderColor="gray.800"
      >
        <Box mr={2} cursor="pointer" onClick={() => handleScreen(0)}>
          <MdKeyboardBackspace fontSize={"24px"} />
        </Box>
        <HStack alignItems={"center"}>
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            Send {networkType}
          </Text>
        </HStack>
      </HStack>
      <Stack py={6} px={7}>
        <FormControl>
          <Box>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              Recipient lens handle
            </FormLabel>
            <Input
              type="text"
              mt={4}
              value={userAddress}
              onChange={(e) => {
                handleUserAddress(e.target.value);
              }}
              onBlur={
                async ()=>{
                 try {
                  const data = await client.query({
                    query: fetchEthAddressByHandle,
                    variables: {
                      handle: userAddress,
                    }
                  });
                  if (data?.data?.profiles?.items.length == 0){
                    toast({
                      title: `Enter a valid lens handle`,
                      status: "error",
                      isClosable: true,
                      position: "top",
                    });
                  }
                  console.log(data);
                 } catch (error) {
                  console.log(error);
                  toast({
                    title: `Enter a valid lens handle`,
                    status: "error",
                    isClosable: true,
                    position: "top",
                  });
                 }
                }
              }
            />
          </Box>
          <Box mt={6}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              Enter Amount
            </FormLabel>
            <Flex
              alignItems={"center"}
              border="1px"
              borderColor={"gray.800"}
              rounded={"lg"}
              p={1}
            >
              <Input
                type="number"
                min={0}
                max={20}
                border={0}
                outline="none"
                focusBorderColor={"#0C0C0C"}
                value={amount}
                onChange={(e) => {
                  handleAmount(parseFloat(e.target.value));
                }}
              />
              <HStack alignItems={"center"} mr={4}>
                <Text>SOL</Text>
                <Button
                  size="xs"
                  onClick={() =>
                    handleAmount(balance - (balance * 0.009) / 100)
                  }
                >
                  Max
                </Button>
              </HStack>
            </Flex>
          </Box>
          {/* <Text
            fontWeight={"medium"}
            color="gray.600"
            fontFamily={"Poppins"}
            mt={4}
          >
            ~$232.90
          </Text> */}

        
        </FormControl>
      </Stack>
      <Stack px={4} pb={14} h="full" justifyContent="flex-end">
        <Button
          w="full"
          py={4}
          bg="#97FCE9"
          color="black"
          _hover={{ bg: "#97FCE9" }}
          disabled={
            validateAddress === false ||
            validateAmount === false ||
            totalAmount > balance
          }
          onClick={() => {
            handleScreen(2);
          }}
        >
          Preview
        </Button>
      </Stack>
    </>
  );
}
