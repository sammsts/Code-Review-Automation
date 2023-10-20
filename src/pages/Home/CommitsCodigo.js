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
  Flex,
  Image,
} from "@chakra-ui/react";
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import redBall from "./public/red-ball.png";
import yellowBall from "./public/yellow-ball.png";
import greenBall from "./public/green-ball.png";

function highlightCode(code) {
  const lines = code.split("\n");
  return lines.map((line, index) => {
    if (line.includes("+")) {
      return (
        <span key={index} style={{ color: "green" }}>
          {line}
        </span>
      );
    } else if (line.includes("-")) {
      return (
        <span key={index} style={{ color: "red" }}>
          {line}
        </span>
      );
    } else {
      return (
        <span key={index} style={{ color: "black" }}>
          {line}
        </span>
      );
    }
  });
}

function CommitsCodigo({onClose, codigo, fileName}) {  
  const parts = fileName.split('/');
  const file = parts[parts.length - 1];
  const codeString = highlightCode(codigo).map((element) => element.props.children).join("\n");

  const syntaxHighlighterStyle = {
    background: "#333",
    color: "#fff",
    padding: "16px",
    borderRadius: "4px",
  };
  
  const customSyntaxHighlighterStyle = {
    hljs: {
      background: "#3355",
      color: "#fff",
      padding: "16px",
      overflowX: "auto",
    },
  };

  return (
    <Modal isOpen={true} onClose={onClose} size={'2xl'} className="modal">
      <ModalOverlay />
      <ModalContent style={syntaxHighlighterStyle}>
        <ModalHeader>
          <Flex align="center">
            <Image src={redBall} alt="redBall" w="15px" h="15px" ml={2} />
            <Image src={yellowBall} alt="yellowBall" w="15px" h="15px" ml={2} />
            <Image src={greenBall} alt="greenBall" w="15px" h="15px" ml={2} />
            <span style={{ marginLeft: '10px' }}>{file}:</span>
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SyntaxHighlighter language="javascript" style={customSyntaxHighlighterStyle}>
            {codeString}
          </SyntaxHighlighter>
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