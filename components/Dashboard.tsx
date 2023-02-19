import React from "react";
import { Box, Center, HStack, Stack, Text } from "@chakra-ui/react";
import { IoCloseOutline } from "react-icons/io5";
import { HiUpload } from "react-icons/hi";
import { useTransactionStore } from "../store/store";
import TransactionCard from "./TransactionCard";

export default function Dashboard({ onClose }: { onClose: () => void }) {
  const {
    networkMetadata,
    handleScreen,
    balance,
    networkType,
    transaction,
    resetTransaction,
  } = useTransactionStore();
  return (
    <>
      <Stack
        alignItems={"center"}
        w="full"
        background={networkMetadata.bgColor}
        boxShadow="0px 4px 24px rgba(172, 234, 254, 0.4)"
        pb={5}
        borderRadius="2xl"
      >
        <HStack
          w="full"
          py={5}
          px={4}
          alignItems="center"
          justifyContent={"space-between"}
          borderBottom={"1px"}
          borderColor="#A4D067"
        >
          <HStack alignItems={"center"}>
            <Text fontWeight="semibold" fontFamily={"Poppins"} color="black">
              My Wallet
            </Text>
            <Box w={1} h={1} bg="#858585" mx={2}></Box>
            <Text fontWeight="semibold" fontFamily={"Poppins"} color="black">
              {networkMetadata.sampleAddress.slice(0, 5)}...
              {networkMetadata.sampleAddress.slice(
                networkMetadata.sampleAddress.length - 5,
                networkMetadata.sampleAddress.length
              )}
            </Text>
          </HStack>
          <Box
            cursor={"pointer"}
            onClick={() => {
              onClose();
              resetTransaction();
            }}
          >
            <IoCloseOutline fontSize={"24px"} color="black" />
          </Box>
        </HStack>
        <Stack px={[16, 20]} py={9}>
          <Stack alignItems={"center"} color="black">
            <Text fontWeight={"medium"}>BALANCE IN {networkType}</Text>
            <Text
              fontWeight={"medium"}
              mt={2}
              fontSize={"36px"}
              lineHeight={"42px"}
            >
              {balance.toFixed(2)} {networkType}
            </Text>
            {/* <Box mt={2} px={2} py={1} bg="white" rounded={"lg"}>
              ☝️
              <Text fontWeight={"medium"} color="black" as="span" ml={0.5}>
                $242.54
              </Text>
              <Text fontWeight={"medium"} color="black" as="span" ml={1}>
                (2.93%)
              </Text>
            </Box> */}
          </Stack>
        </Stack>
        <Stack
          cursor={"pointer"}
          alignItems={"center"}
          py={5}
          px={10}
          bg="gray.800"
          border={"2px"}
          borderColor="black"
          rounded={"lg"}
          onClick={() => handleScreen(1)}
        >
          <HiUpload fontSize={"24px"} />
          <Text fontWeight={"medium"} fontSize="xs" mt={2}>
            SEND
          </Text>
        </Stack>
      </Stack>
      <Text px={4} pt={6} fontWeight={"semibold"} mb={3}>
        Transactions
      </Text>
      <Box px={4} overflowY="auto">
        {transaction.length > 0 ? (
          transaction.map((item, index) => (
            <TransactionCard key={index} transactionAmount={item} />
          ))
        ) : (
          <Center h="full" p="4">
            <Text color="gray.600" fontWeight={"semibold"}>
              No transaction history
            </Text>
          </Center>
        )}
      </Box>
    </>
  );
}
