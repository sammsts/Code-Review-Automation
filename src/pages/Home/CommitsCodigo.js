import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { Code } from '@chakra-ui/react'

function CommitsCodigo({isOpen, onClose, codigo}) {

  return (
    <Modal isOpen={true} onClose={onClose} size={'2xl'} className="modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Código do Arquivo:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Code>{codigo}</Code>
        </ModalBody>
        <ModalFooter className="rodape">
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CommitsCodigo;
