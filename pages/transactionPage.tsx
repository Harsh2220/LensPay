import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Stack,
  Center,
  Box,
  Text,
  Code,
  useToast,
  Flex,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { NetworkType, useTransactionStore } from "../store/store";
import { CopyIcon } from "@chakra-ui/icons";
import TransactionForm from "@/components/TransactionForm";
import Dashboard from "@/components/Dashboard";
import Preview from "@/components/Preview";

export default function Transaction({ network }: { network: NetworkType }) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    networkMetadata,
    currentScreen,
    resetTransaction,
    handleNetworkType,
    networkType,
  } = useTransactionStore();

  useEffect(() => {
    handleNetworkType(network);
  }, []);

  return (
    <>
      <Flex direction="column" gap={"4"}>
        <Box>
          <Center>
            <Text
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight={"400"}
              color="#F2FFEA"
              mb="2"
            >
              {`Sample receiver public address`}
            </Text>
          </Center>
          <Center>
            <Code
              fontSize={{ base: "md", md: "lg", lg: "xl" }}
              fontWeight={"400"}
              maxW={{ base: "80%", lg: "100%" }}
              colorScheme="green"
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(networkMetadata.sampleAddress);
                toast({
                  title: `Copied to clipboard`,
                  status: "success",
                  isClosable: true,
                  position: "top-right",
                });
              }}
            >
              {networkMetadata.sampleAddress} <CopyIcon />
            </Code>
          </Center>
        </Box>
        <Center>
          <Box>
            <Button variant={"primarybtn"} onClick={onOpen}>
              {`Let's transfer your first ${networkType}! 🪙`}
            </Button>
          </Box>
        </Center>
      </Flex>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          resetTransaction();
          onClose();
        }}
        isCentered
      >
        <ModalOverlay backdropBlur={"2xl"} />
        <ModalContent
          p={0}
          w="fit-content"
          m={0}
          position={["fixed", "unset"]}
          bottom="0px"
          borderRadius={"2xl"}
        >
          <ModalBody p={0} borderWidth="1px" borderRadius="2xl">
            <Stack
              w={["100vw", "375px"]}
              h={"640px"}
              bg={["#1A1A1A", "#0C0C0C"]}
              borderRadius={"2xl"}
            >
              {currentScreen == 0 ? (
                <Dashboard onClose={onClose} />
              ) : currentScreen == 1 ? (
                <TransactionForm />
              ) : (
                <Preview />
              )}
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
