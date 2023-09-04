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
  const [atendendente, setAtendente] = useState(null);
  const atendentes = [
        { name: 'Todos', code: 0 },
        { name: 'Adriano', code: 1 },
        { name: 'Artur', code: 2 },
        { name: 'Augusto', code: 4 },
        { name: 'Fabricio', code: 5 },
        { name: 'Marcus', code: 6 },
        { name: 'Michel', code: 7 },
        { name: 'Samuel', code: 8 }
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

  const buscarCommits = async () => {
    const token = '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';
    const repoName = 'GespamWeb';
    const user = 'Abase-Sistemas';
    const usuariosDesejados = ['augustowjerke', 'fabriciowiez', 'sammsts', 'arturcmeneghini', 'MarcusVSN2022', 'AdrianoJMReidel', 'brissowkevin', 'michelmachado7'];
    const dataInicio = '2023-08-01T00:00:00Z';
    const dataFim = '2023-08-31T23:59:59Z';
    const headers = {
      Authorization: `token ${token}`,
    };
    let commits = [];
    let page = 1;
  
    //GESPAM
    while (true) {
      const apiUrl = `https://api.github.com/repos/${user}/${repoName}/commits?since=${dataInicio}&until=${dataFim}&page=${page}`;
      try {
        const response = await axios.get(apiUrl, { headers });
        const pageCommits = response.data;
        if (pageCommits.length === 0) {
          break;
        }
        commits = commits.concat(
          pageCommits.filter((commit) =>
            usuariosDesejados.includes(commit.commit.author.name)
          ).map((commit) => ({
            codigo: commit.sha,
            autor: trocarNome(commit.commit.author.name),
            mensagem: commit.commit.message,
            repositorio: 'Gespam'
          }))
        );
        setCommits(commits)
        page++;
      } catch (error) {
        console.error('Erro ao buscar os commits:', error);
        break;
      }
    }
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