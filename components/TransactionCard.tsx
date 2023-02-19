import { Avatar, Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useTransactionStore } from "../store/store";

export default function TransactionCard({
  transactionAmount,
}: {
  transactionAmount: number;
}) {
  const { networkType, networkMetadata } = useTransactionStore();
  return (
    <HStack
      p={4}
      rounded="xl"
      border={"1px"}
      borderColor="#151515"
      bg="#101010"
      mb={2}
      justifyContent={"space-between"}
    >
      <HStack alignItems={"center"}>
        <Avatar src={networkMetadata.icon} name={networkType} />
        <Box>
          <Text fontWeight={"medium"} fontFamily="Poppins">
            {networkType == "SOL" ? "Solana" : null}
          </Text>
          {/* <Text color="#9999A5" fontFamily="Poppins">
            {transactionAmount.toFixed(4)} {networkType}
          </Text> */}
        </Box>
      </HStack>
      <Stack alignItems={"end"}>
        {/* <Text fontFamily="Poppins">$34.03</Text>
        <Text fontSize={"xs"} color="#70DC94" fontFamily="Poppins">
          +4.02%
        </Text> */}
        <Text color="#9999A5" fontFamily="Poppins">
          {transactionAmount.toFixed(4)} {networkType}
        </Text>
      </Stack>
    </HStack>
  );
}
