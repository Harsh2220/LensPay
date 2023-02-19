import {
  Box,
  HStack,
  Stack,
  Text,
  Input,
  FormControl,
  FormLabel,
  Button,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { MdKeyboardBackspace } from "react-icons/md";
import { useTransactionStore } from "../store/store";

export default function Preview() {
  const {
    userAddress,
    handleScreen,
    handleBalance,
    handleTransaction,
    amount,
    networkMetadata,
    networkType,
    balance,
    transaction,
    handleAmount,
    handleUserAddress,
    isLoading,
    setIsLoading,
  } = useTransactionStore();

  const toast = useToast();
  const gasFee = (amount * 0.009) / 100;
  const totalAmount = amount + gasFee;

  async function stall(stallTime = 3000) {
    await new Promise((resolve) => setTimeout(resolve, stallTime));
  }

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
        <Box mr={2} cursor="pointer" onClick={() => handleScreen(1)}>
          <MdKeyboardBackspace fontSize={"24px"} />
        </Box>
        <HStack alignItems={"center"}>
          <Text fontWeight="semibold" fontFamily={"Poppins"}>
            Preview
          </Text>
        </HStack>
      </HStack>
      <Stack py={6} px={7}>
        <HStack alignItems={"center"}>
          <Avatar size={"lg"} src={networkMetadata.icon} name={networkType} />
          <Box ml={4}>
            <Text
              fontWeight={"medium"}
              fontFamily="Poppins"
              fontSize={"14px"}
              color="#B5E8CC"
            >
              Sending {networkType}
            </Text>
            <Text fontWeight={"semibold"} fontFamily="Poppins">
              {amount}
            </Text>
          </Box>
        </HStack>
        <FormControl>
          <Box mt={6}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              From
            </FormLabel>
            <Input
              type="text"
              mt={4}
              disabled
              value={networkMetadata.senderAddress}
            />
          </Box>
          <Box mt={4}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              To
            </FormLabel>
            <Input type="text" mt={4} disabled value={userAddress} />
          </Box>
          {/* <Box mt={4}>
            <FormLabel
              fontWeight={"semibold"}
              color="#B5E8CC"
              fontFamily={"Poppins"}
            >
              Gas Fee
            </FormLabel>
            <Input
              type="text"
              mt={4}
              disabled
              value={gasFee}
              isInvalid={totalAmount > balance}
            />
          </Box> */}
        </FormControl>
      </Stack>
      <Stack px={4} pb={14} h="full" justifyContent="flex-end">
        <Button
          w="full"
          py={4}
          bg="#97FCE9"
          color="black"
          _hover={{ bg: "#97FCE9" }}
          isLoading={isLoading}
          loadingText="Confirming your transaction..."
          disabled={totalAmount > balance || isLoading}
          onClick={async () => {
            setIsLoading();
            await stall(5000);
            setIsLoading();
            handleBalance(parseFloat(totalAmount.toFixed(2)), balance);
            handleTransaction(totalAmount, transaction);
            handleAmount(0);
            handleUserAddress("");
            handleScreen(0);
            toast({
              title: "Transaction successful",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
          }}
        >
          Send
        </Button>
      </Stack>
    </>
  );
}
