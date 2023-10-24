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
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Avatar } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { Text } from "@chakra-ui/react";
import { hideLoading, showLoading } from "../../Componentes/loading";
import { Divider } from '@chakra-ui/react'
import { LinkIcon } from "@chakra-ui/icons";
import Grid from "../../Componentes/grid";
import { Column } from "primereact/column";
import CommitsCodigo from "./CommitsCodigo";
import { FaCode } from 'react-icons/fa';

function CommitsDetalhes({onClose, commitCode, repositorio}) {

  const [commit, setCommit] = useState([]);
  const [urlAvatar, setUrlAvatar] = useState('')
  const [nome, setNome] = useState('')
  const [mensagem, setMensagem] = useState('')
  const [linAdicionadas, setLinAdicionadas] = useState('')
  const [linRemovidas, setLinRemovidas] = useState('')
  const [codigoArquivo, setCodigoArquivo] = useState('')
  const [url, setUrl] = useState('')
  const [arquivos, setArquivos] = useState([])
  const [id, setId] = useState(0)

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const abrirURL = () => {window.open(url, "_blank")}

  useEffect(() => {
    const fetchCommitInfo = async () => {
      showLoading("commits");

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
          let arquivosJSON = []
          const commitInfo = response.data;
          setUrlAvatar(commitInfo.author.avatar_url)
          setNome(commitInfo.author.login)
          setLinAdicionadas(commitInfo.stats.additions)
          setLinRemovidas(commitInfo.stats.deletions)
          setMensagem(commitInfo.commit.message)
          setUrl(commitInfo.html_url)
          for (let i = 0; i < commitInfo.files.length; i++) {
            arquivosJSON.push({
              arquivo: commitInfo.files[i].filename
            });
          }
          setArquivos(arquivosJSON)
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

  function botaoCodigo(index, arquivos){
    setCodigoArquivo(commit.files[index.rowIndex].patch)
    setId(index.rowIndex)
    openModal()
  }

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
                  <Column className='coluna' body={(rowData, rowIndex) => (
                    <Button onClick={() => botaoCodigo(rowIndex, arquivos)} style={{ display: 'flex', alignItems: 'center' }}><FaCode /></Button>
                  )} style={{ width: '3%', textAlign: 'center' }} />
                  <Column className='coluna' field="arquivo" header="Arquivo" sortable style={{ width: '100%' }} ></Column>
                </Grid> 
                {isModalOpen && <CommitsCodigo
                  isOpen={isModalOpen}
                  onClose={closeModal}
                  codigo={codigoArquivo}
                  fileName={arquivos[id].arquivo}
                />}
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