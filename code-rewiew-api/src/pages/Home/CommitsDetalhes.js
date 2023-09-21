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
import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react";
import { hideLoading, showLoading } from "../../Componentes/loading";
import { Divider } from '@chakra-ui/react'
import { LinkIcon } from "@chakra-ui/icons";
import Grid from "../../Componentes/grid";
import { Column } from "primereact/column";


function CommitsDetalhes({isOpen, onClose, commitCode, repositorio}) {

  const [commit, setCommit] = useState([]);
  const [urlAvatar, setUrlAvatar] = useState('')
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [linAdicionadas, setLinAdicionadas] = useState('')
  const [linRemovidas, setLinRemovidas] = useState('')
  const [url, setUrl] = useState('')
  const [arquivos, setArquivos] = useState([])

  const abrirURL = () => {window.open(url, "_blank")}

  useEffect(() => {
    const fetchCommitInfo = async () => {
      showLoading("commits");

      switch(repositorio)
      {
        case "Gespam": repositorio = "GespamWeb"; break;
        case "API Relatórios": repositorio = "relatorios-gespam"; break;
        case "Transparência": repositorio = "Portal_Transparencia"; break;
        default: return;
      }

      try {
        const response = await axios.get(
          `https://api.github.com/repos/Abase-Sistemas/${repositorio}/commits/${commitCode}`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            },
          }
        );

        if (response.status === 200) {
          const commitInfo = response.data;
          console.log("Informações do Commit:", commitInfo);
          setUrlAvatar(commitInfo.author.avatar_url)
          setNome(commitInfo.author.login)
          setLinAdicionadas(commitInfo.stats.additions)
          setLinRemovidas(commitInfo.stats.deletions)
          setMensagem(commitInfo.commit.message)
          setUrl(commitInfo.html_url)
          setCommit(commitInfo);
        } else {
          console.error("Erro ao buscar informações do commit:", response.status);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do commit:", error.message);
      }

      hideLoading("commits");
    };

    fetchCommitInfo();
  }, [commitCode, repositorio]); 


  return (
    <Modal isOpen={true} onClose={onClose} size={'4xl'} className="modal">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Detalhes do Commit</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs size='md' variant='enclosed' isFitted >
            <TabList mb='1em'>
              <Tab>Detalhes Gerais</Tab>
              <Tab>Arquivos</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <div className="cabecalho">
                  <div className="foto">
                    <Avatar size='xl' src={urlAvatar} />
                  </div>
                  <div className="nome">
                    <Text fontSize='1xl' style={{marginBottom: '5%'}}><b>Nome: </b>{nome}</Text>
                    <Text fontSize='1xl' style={{marginBottom: '12%'}}><b>Descrição: </b>{mensagem}</Text>
                  </div>
                </div>
                <Divider />
                <div className="linhas">
                  <Text fontSize='1xl' style={{marginBottom: '5%'}}><b>Linhas Adicionadas: </b><b style={{color: 'green'}}>{linAdicionadas}</b></Text>
                  <Text fontSize='1xl' style={{marginBottom: '2%'}}><b>Linhas Removidas: </b><b style={{color: 'red'}}>{linRemovidas}</b></Text>
                </div>
              </TabPanel>
              <TabPanel>
                <Grid id="grid-arquivos" value={arquivos}>
                  <Column className='coluna' field="arquivo" header="Arquivo" sortable style={{ width: '100%' }} ></Column>
                </Grid> 
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter className="rodape">
        <Button colorScheme='purple' leftIcon={<LinkIcon/>} onClick={abrirURL}>Abrir no GitHub</Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CommitsDetalhes;
