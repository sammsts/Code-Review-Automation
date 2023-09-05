import React, { useState, useEffect } from 'react';
import '../styles.css';
import axios from 'axios';
// prime react ---------------------------------
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Grid from '../Componentes/grid';
import { Column } from 'primereact/column';
//Chakra ---------------------------------------

function Commits(){

  useEffect(() => {
    buscarCommits();
  },[]);

  const [selectedDateInitial, setSelectedDateInitial] = useState('');
  const [selectedDateFinal, setSelectedDateFinal] = useState('');
  const [commits, setCommits] = useState([]);
  const [commitsSelecionado, setCommitSelecionado] = useState('');
  const [atendendente, setAtendente] = useState('');
  const atendentes = [
        { name: 'Todos', code: '' },
        { name: 'Adriano', code: 'AdrianoJMReidel' },
        { name: 'Artur', code: 'arturcmeneghini' },
        { name: 'Augusto', code: 'augustowjerke' },
        { name: 'Fabricio', code: 'fabriciowiez' },
        { name: 'Marcus', code: 'MarcusVSN2022' },
        { name: 'Michel', code: 'michelmachado7' },
        { name: 'Samuel', code: 'sammsts' }
    ];

  const handleDateInitialChange = (event) => {
    setSelectedDateInitial(event.target.value);
  };
  const handleDateFinalChange = (event) => {
    setSelectedDateFinal(event.target.value);
  };

  const trocarNome = (nome) => {
    switch(nome){
      case 'augustowjerke': return 'Augusto'; break;
      case 'fabriciowiez': return 'Fabrício'; break;
      case 'sammsts': return 'Samuel'; break;
      case 'arturcmeneghini': return 'Artur'; break;
      case 'MarcusVSN2022': return 'Marcus'; break;
      case 'AdrianoJMReidel': return 'Adriano'; break;
      case 'brissowkevin': return 'Kevin'; break;
      case 'michelmachado7': return 'Michel'; break;
    }
  }

  const buscarCommits = async (nome) => {
    debugger
    const token = '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';
    const user = 'Abase-Sistemas';
    let usuariosDesejados = ['augustowjerke', 'fabriciowiez', 'sammsts', 'arturcmeneghini', 'MarcusVSN2022', 'AdrianoJMReidel', 'brissowkevin', 'michelmachado7'];
    if(nome != undefined){
      if(nome.nome != 'Todos')
      usuariosDesejados = nome.code
    }
    let dataInicio = '2023-08-01T00:00:00Z';
    let dataFim = '2023-08-31T23:59:59Z';
    const headers = {
      Authorization: `token ${token}`,
    };
    let commits = [];
  
    // GESPAM
    const gespamRepoName = 'GespamWeb';
    let pageGespam = 1;
    while (true) {
      const apiUrl = `https://api.github.com/repos/${user}/${gespamRepoName}/commits?since=${dataInicio}&until=${dataFim}&page=${pageGespam}`;
      try {
        const response = await axios.get(apiUrl, { headers });
        const pageCommits = response.data;
        if (pageCommits.length === 0) {
          break;
        }
        commits = commits.concat(
          pageCommits.filter((commit) =>
            usuariosDesejados.includes(commit.commit.author.name) && !commit.commit.message.includes('Merge branch')
          ).map((commit) => ({
            codigo: commit.sha,
            autor: trocarNome(commit.commit.author.name),
            mensagem: commit.commit.message,
            repositorio: 'Gespam',
          }))
        );
        pageGespam++;
      } catch (error) {
        console.error('Erro ao buscar os commits no Gespam:', error);
        break;
      }
    }
  
    // API_RELATORIOS
    const relatoriosRepoName = 'relatorios-gespam';
    let pageRelatorios = 1;
    while (true) {
      const apiUrl = `https://api.github.com/repos/${user}/${relatoriosRepoName}/commits?since=${dataInicio}&until=${dataFim}&page=${pageRelatorios}`;
      try {
        const response = await axios.get(apiUrl, { headers });
        const pageCommits = response.data;
        console.log(pageCommits)
    
        if (pageCommits.length === 0) {
          break;
        }
        commits = commits.concat(
          pageCommits.filter((commit) =>
            usuariosDesejados.includes(commit.commit.author.name) && !commit.commit.message.includes('Merge branch')
          ).map((commit) => ({
            codigo: commit.sha,
            autor: trocarNome(commit.commit.author.name),
            mensagem: commit.commit.message,
            repositorio: 'API Relatórios',
          }))
        );
        pageRelatorios++;
      } catch (error) {
        console.error('Erro ao buscar os commits no API Relatórios:', error);
        break;
      }
    }

    // API_RELATORIOS
    pageRelatorios = 1;
    while (true) {
      const apiUrl = `https://api.github.com/repos/${user}/Portal_Transparencia/commits?since=${dataInicio}&until=${dataFim}&page=${pageRelatorios}`;
      try {
        const response = await axios.get(apiUrl, { headers });
        const pageCommits = response.data;
        console.log(pageCommits)
    
        if (pageCommits.length === 0) {
          break;
        }

        commits = commits.concat(
          pageCommits.filter((commit) =>
            usuariosDesejados.includes(commit.commit.author.name) && !commit.commit.message.includes('Merge branch')
          ).map((commit) => ({
            codigo: commit.sha,
            autor: trocarNome(commit.commit.author.name),
            mensagem: commit.commit.message,
            repositorio: 'Transparência',
          }))
        );
        pageRelatorios++;
      } catch (error) {
        console.error('Erro ao buscar os commits na Transparencia', error);
        break;
      }
    }
    setCommits(commits);
  };
  

  return (
    <div className="container">
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
          />
          <Calendar
            value={selectedDateFinal}
            onChange={(e) => setSelectedDateFinal(e.value)}
            showIcon
            placeholder="Informe a data final"
            style={{ marginLeft: '10px' }}
          />
          <Dropdown
            value={atendendente} 
            onChange={(e) => setAtendente(e.value)} 
            options={atendentes} 
            optionLabel="name" 
            placeholder="Atendente"
            showClear
            id="selectAtendente"
          />
          <Button
            label="Pesquisar"
            id="pesquisar"
            onClick={() => buscarCommits(atendendente)}
          />
        </div>
      </div>
      <grid id="gridMain">
        <Grid id="grid-commits" selection={commitsSelecionado} onSelectionChange={(e) => setCommitSelecionado(e.value)} value={commits}>
          <Column className='coluna' field="codigo" header="Código" sortable style={{ width: '28%', textAlign: 'center' }}></Column>
          <Column className='coluna' field="autor" header="Autor" sortable style={{ width: '15%', textAlign: 'center' }} ></Column>
          <Column className='coluna' field="mensagem" header="Mensagem" sortable style={{ width: '40%' }} ></Column>
          <Column className='coluna' field="repositorio" header="Repositorio" sortable style={{ width: '20%', textAlign: 'center' }} ></Column>
        </Grid> 
      </grid>
    </div>
  )
}

export default Commits