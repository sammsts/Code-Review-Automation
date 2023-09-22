import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import CommitsDetalhes from './CommitsDetalhes';

// prime react ---------------------------------
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Grid from '../../Componentes/grid';
import { Column } from 'primereact/column';
import { hideLoading, showLoading } from '../../Componentes/loading';
//Chakra ---------------------------------------


function Commits(){

  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const [selectedDateInitial, setSelectedDateInitial] = useState('');
  const [selectedDateFinal, setSelectedDateFinal] = useState('');
  const [codigo, setCodigo] = useState('');
  const [repositorio, setRepositorio] = useState('');
  const [commits, setCommits] = useState([]);
  const [commitsSelecionado, setCommitSelecionado] = useState('');
  const [atendendente, setAtendente] = useState('');
  const repositorios = [
    { name: 'Todos', code: '' },
    { name: 'GespamWeb', code: 'GespamWeb' },
    { name: 'Portal da Transparência', code: 'Portal_Transparencia' },
    { name: 'Api (relatórios)', code: 'relatorios-gespam' }
];
  const atendentes = [
        { name: 'Todos', code: '' },
        { name: 'Adriano', code: 'AdrianoJMReidel' },
        { name: 'Artur', code: 'arturcmeneghini' },
        { name: 'Augusto', code: 'augustowjerke' },
        { name: 'Fabricio', code: 'fabriciowiez' },
        { name: 'Marcus', code: 'MarcusVSN2022' },
        { name: 'Michel', code: 'michelmachado7' },
        { name: 'Kevin', code: 'brissowkevin' },
        { name: 'Samuel', code: 'SAMu3lms' }
    ];

  const handleDateInitialChange = (event) => {
    setSelectedDateInitial(event.target.value);
  };
  const handleDateFinalChange = (event) => {
    setSelectedDateFinal(event.target.value);
  };
  const handleButtonClick = (rowData) => {
    setCodigo(rowData.codigo);
    setRepositorio(rowData.repositorio)
    openModal(); 
  };
  
  function converterData(dataString) {
    const data = new Date(dataString);
  
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    const ano = data.getFullYear();

    const dataFormatada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${ano}`;
  
    return dataFormatada;
  }
  
  const trocarNome = (nome) => {
    switch(nome){
      case 'augustowjerke': return 'Augusto'; break;
      case 'fabriciowiez': return 'Fabrício'; break;
      case 'SAMu3lms': return 'Samuel'; break;
      case 'arturcmeneghini': return 'Artur'; break;
      case 'MarcusVSN2022': return 'Marcus'; break;
      case 'AdrianoJMReidel': return 'Adriano'; break;
      case 'brissowkevin': return 'Kevin'; break;
      case 'michelmachado7': return 'Michel'; break;
    }
  }

  const setInitialDates = () => {
    const dataAtual = new Date();

    const selectedDateInitial = new Date(dataAtual);
    selectedDateInitial.setHours(0, 0, 0, 0);

    const selectedDateFinal = new Date(dataAtual);
    selectedDateFinal.setHours(23, 59, 59, 999);

    setSelectedDateInitial(selectedDateInitial);
    setSelectedDateFinal(selectedDateFinal);
  };

  const buscarCommits = async (nome, repositorio, datainicial, datafinal) => {
    showLoading('commits');
    const token = process.env.REACT_APP_API_KEY;
    const user = 'Abase-Sistemas';
    let usuariosDesejados = ['augustowjerke', 'fabriciowiez', 'SAMu3lms', 'arturcmeneghini', 'MarcusVSN2022', 'AdrianoJMReidel', 'brissowkevin', 'michelmachado7'];

    if (nome !== '') {
      usuariosDesejados = [nome.code];
    }

    const headers = {
      Authorization: `token ${token}`,
    };

    let commits = [];

    if (repositorio.code !== '') {
      let pageGespam = 1;
      while (true) {
        const apiUrl = `https://api.github.com/repos/${user}/${repositorio.code}/commits?since=${datainicial}&until=${datafinal}&page=${pageGespam}`;
        try {
          const response = await axios.get(apiUrl, { headers });
          const pageCommits = response.data;
          if (pageCommits.length === 0) {
            break;
          }
          console.log(pageCommits);
          commits = commits.concat(
            pageCommits.filter((commit) =>
              usuariosDesejados.includes(commit.commit.author.name) && !commit.commit.message.includes('Merge branch')
            ).map((commit) => ({
              codigo: commit.sha,
              autor: trocarNome(commit.commit.author.name),
              mensagem: commit.commit.message,
              repositorio: repositorio.name,
              data: converterData(commit.commit.author.date),
            }))
          );
          pageGespam++;
        } catch (error) {
          console.error('Erro ao buscar os commits no ' + repositorio.name + ': ', error);
            break;
        }
      }
    } else {
      const repos = [
        { name: 'GespamWeb', code: 'GespamWeb' },
        { name: 'Portal da Transparência', code: 'Portal_Transparencia' },
        { name: 'Api (relatórios)', code: 'relatorios-gespam' },
      ];
      for (let i = 0; i < 3; i++) {
        let pageTodos = 1;
        while(true){
          const apiUrl = `https://api.github.com/repos/${user}/${repos[i].code}/commits?since=${datainicial}&until=${datafinal}&page=${pageTodos}`;
          try {
            const response = await axios.get(apiUrl, { headers });
            const pageCommits = response.data;
            if (pageCommits.length === 0) {
              break;
            }
            console.log(pageCommits);
            commits = commits.concat(
              pageCommits.filter((commit) =>
                usuariosDesejados.includes(commit.commit.author.name) && !commit.commit.message.includes('Merge branch')
              ).map((commit) => ({
                codigo: commit.sha,
                autor: trocarNome(commit.commit.author.name),
                mensagem: commit.commit.message,
                repositorio: repos[i].name,
                data: converterData(commit.commit.author.date),
              }))
            );
            pageTodos++;
          } catch (error) {
            console.error('Erro ao buscar os commits no ' + repositorio[i].name + ': ', error);
            break;
          }
        }
      }
    }

    setCommits(commits);
    hideLoading('commits');
  };

  const repositorioVazio = { name: 'Todos', code: '' };

  const dataAtual = new Date();

  const dataInicial = new Date(dataAtual);
  dataInicial.setHours(0, 0, 0, 0);

  const dataFinal = new Date(dataAtual);
  dataFinal.setHours(23, 59, 59, 999);


  useEffect(() => {
    setInitialDates();
    buscarCommits('', repositorioVazio, dataInicial, dataFinal);
  }, []);
  

  return (
    <div className="container" id="commits">
      <div className="ctnTitle">
        <h1 className="title">Commits tecnoURI</h1>
      </div>
      <div className="ctnInputFiltros">
        <div className="datePickerContainer">
          <Calendar
            value={selectedDateInitial}
            onChange={(e) => setSelectedDateInitial(e.value)}
            showIcon
            placeholder="Informe a data inicial"
            dateFormat="dd/mm/yy"
          />
          <Calendar
            value={selectedDateFinal}
            onChange={(e) => setSelectedDateFinal(e.value)}
            showIcon
            placeholder="Informe a data final"
            dateFormat="dd/mm/yy"
            style={{ marginLeft: '10px' }}
          />
          <Dropdown
            value={repositorio} 
            onChange={(e) => setRepositorio(e.value)} 
            options={repositorios} 
            optionLabel="name" 
            placeholder="Todos"
            style={{ marginLeft: '10px' }}
            id="selectRepositorios"
          />
          <Dropdown
            value={atendendente} 
            onChange={(e) => setAtendente(e.value)} 
            options={atendentes} 
            optionLabel="name" 
            placeholder="Todos"
            id="selectAtendente"
          />
          <Button
            label="Pesquisar"
            id="pesquisar"
            onClick={() => {
              const selectedRepo = repositorio === '' ? { name: 'Todos', code: '' } : repositorio;
              buscarCommits(atendendente, selectedRepo, selectedDateInitial, selectedDateFinal);
            }}
            icon='pi pi-search'
          />
        </div>
      </div>
      <grid id="gridMain">
        <Grid id="grid-commits" selection={commitsSelecionado} onSelectionChange={(e) => setCommitSelecionado(e.value)} value={commits}>
          <Column className='coluna' body={(rowData) => (
              <Button label="" icon="pi pi-info-circle" onClick={() => handleButtonClick(rowData)} />
            )} style={{ width: '3%', textAlign: 'center' }} />
          <Column className='coluna' field="codigo" header="Código" sortable style={{ width: '28%', textAlign: 'center' }}></Column>
          <Column className='coluna' field="autor" header="Autor" sortable style={{ width: '8%', textAlign: 'center' }} ></Column>
          <Column className='coluna' field="mensagem" header="Mensagem" sortable style={{ width: '38%' }} ></Column>
          <Column className='coluna' field="repositorio" header="Repositorio" sortable style={{ width: '12%', textAlign: 'center' }} ></Column>
          <Column className='coluna' field="data" header="Data" sortable style={{ width: '10%', textAlign: 'center' }} ></Column>
        </Grid> 
      </grid>
      {isModalOpen && <CommitsDetalhes
        isOpen={isModalOpen}
        onClose={closeModal}
        commitCode={codigo}
        repositorio={repositorio}
      />}
      <Button
        label="Imprimir"
        id="imprimir"
        icon="pi pi-print"
      />
    </div>
  )
}

export default Commits