import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { LinkIcon } from "@chakra-ui/icons";

function CommitsCodigo({isOpen, onClose, codigo}) {

  return (
    <Modal isOpen={true} onClose={onClose} size={'7xl'} className="modal">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css" rel="stylesheet"/>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-csharp.min.js"></script>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Código do Arquivo:</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        <pre><code class="language-csharp">
            {codigo}
          </code></pre>
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
