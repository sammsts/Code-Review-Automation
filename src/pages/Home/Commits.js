import React, { useState, useEffect } from 'react';
import './styles.css';
import axios from 'axios';
import { Toolbar } from 'primereact/toolbar';
import CommitsDetalhes from './CommitsDetalhes';
import PdfGenerator from '../../PdfGenerator/PdfGenerator';
import { pdf } from '@react-pdf/renderer';
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import Grid from '../../Componentes/grid';
import { Column } from 'primereact/column';
import { hideLoading, showLoading } from '../../Componentes/loading';
import logo_tecnouri from '../../PdfGenerator/public/logo_tecnouri-light.png';

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
  const [atendente, setAtendente] = useState('');
  const [totalizador, setTotalizador] = useState(0);
  const [titleColor, setTitleColor] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const lightColor = "#003"; //Cor para o modo claro
  const darkColor = "#FFF";  //Cor para o modo escuro

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
        { name: 'Samuel', code: 'sammsts' },
        { name: 'Cesario', code: 'Cesario-Stoquero' },
        { name: 'Thiago', code: 'thiagoAbase' },
        { name: 'Paulo', code: 'Paulo-Fritsch' },
    ];

  //ANIMAÇÃO DO TÍTULO============================================================
  const handleTitleMouseLeave = () => {
    const color = isDarkMode ? lightColor : darkColor;
    setTitleColor(color);
  };
  //===============================================================================

  const handleButtonClick = (rowData) => {
    setCodigo(rowData.codigo);
    setRepositorio(rowData.repositorio)
    openModal(); 
  };
  
  const clickImprimir = async () => {
    setLoading(true);

    setTimeout(() => {
        setLoading(false);
    }, 2000);

    const element = <PdfGenerator commits={commits} />;
    const pdfBlob = await pdf(element).toBlob();
  
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${today.getHours().toString().padStart(2, '0')}-${today.getMinutes().toString().padStart(2, '0')}-${today.getSeconds().toString().padStart(2, '0')}`;
    a.download = `commits-${formattedDate}-${formattedTime}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  //Recarregar a página
  const handleLogoClick = () => {
    window.location.reload();
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
      case 'Cesario-Stoquero': return 'Cesario'; break;
      case 'thiago.gomes': return 'Thiago'; break;
      case 'Paulo Cezar Fritsch Junior': return 'Paulo'; break;
    }
  }

  const generatePDF = async () => {
    const element = <PdfGenerator commits={commits} />;
    const pdfBlob = await pdf(element).toBlob();
  
    const url = window.URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    const today = new Date()
    const formattedDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${today.getHours().toString().padStart(2, '0')}-${today.getMinutes().toString().padStart(2, '0')}-${today.getSeconds().toString().padStart(2, '0')}`;
    a.download = `commits-${formattedDate}-${formattedTime}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
    let usuariosDesejados = ['augustowjerke', 'fabriciowiez', 'sammsts', 'arturcmeneghini', 'MarcusVSN2022', 'AdrianoJMReidel', 'brissowkevin', 'michelmachado7', 'thiagoAbase', 'Cesario-Stoquero', 'Paulo-Fritsch'];
    let repositoriosDesejados = ['GespamWeb', 'Portal_Transparencia', 'relatorios-gespam']

    if (nome.code !== '' && nome.code !== undefined) {
      usuariosDesejados = [nome.code];
      if(nome.code == "SAMu3lms")
      {
        usuariosDesejados = ['SAMu3lms', 'sammsts']
      }
    }
    if(repositorio.code !== ''){
      repositoriosDesejados = [repositorio.code]
    }
    const headers = {
      Authorization: `token ${token}`,
    };

    let commits = [];

    for(let i = 0; i<repositoriosDesejados.length; i++)
    {
      for(let j = 0; j<usuariosDesejados.length; j++)
      {
        let pageGespam = 1;
        while (true) {
          const apiUrl = `https://api.github.com/repos/Abase-Sistemas/${repositoriosDesejados[i]}/commits?since=${datainicial}&until=${datafinal}&page=${pageGespam}&author=${usuariosDesejados[j]}`;
          try {
            const response = await axios.get(apiUrl, { headers });
            const pageCommits = response.data;
            if (pageCommits.length === 0) {
              break;
            }
            commits = commits.concat(
              pageCommits.filter((commit) =>
                !commit.commit.message.includes('Merge branch')
              ).map((commit) => ({
                codigo: commit.sha,
                autor: trocarNome(commit.commit.author.name),
                mensagem: commit.commit.message,
                repositorio: repositoriosDesejados[i],
                data: converterData(commit.commit.author.date),
                url: commit.html_url,
                totalizador: commits.length
              }))
            );
            pageGespam++;
          } catch (error) {
            console.error('Erro ao buscar os commits no ' + repositorio.name + ': ', error);
            break;
          }
        }
      };
    }
    setTotalizador(commits.length)
    setCommits(commits);
    hideLoading('commits');
  }

  const repositorioVazio = { name: 'Todos', code: '' };

  const dataAtual = new Date();

  const dataInicial = new Date(dataAtual);
  dataInicial.setHours(0, 0, 0, 0);

  const dataFinal = new Date(dataAtual);
  dataFinal.setHours(23, 59, 59, 999);


  useEffect(() => {
    setInitialDates();
    buscarCommits({ name: 'Todos', code: '' }, repositorioVazio, dataInicial, dataFinal);
  }, []);
  
  function darkMode (){
    const body = document.body;
    body.classList.toggle('dark-mode');
    setIsDarkMode(!isDarkMode);
    handleTitleMouseLeave();
  }

  const startContent = (
    <React.Fragment>
        <img src={logo_tecnouri} alt="Logo tecnoURI" className="logoTecnoURI" onClick={handleLogoClick}/>
        <h1 className={"title"} style={{ color: titleColor }}>Commits</h1>
    </React.Fragment>
);

  const endContent = (
    <React.Fragment>
      <Button id="darkModeButton" label="" icon={isDarkMode ? 'pi pi-sun' : 'pi pi-moon'} onClick={darkMode} />
    </React.Fragment>
  );

  return (
    <div className="container" id="commits">
      <div className={"card"}>
        <Toolbar
          pt={{
            root: { 
              style: { 
                background: isDarkMode 
                  ? 'linear-gradient(to right, #121212, #212b46)'
                  : 'linear-gradient(to right, #fff, #ddd)'
              }
            }
          }} 
          start={startContent} end={endContent}></Toolbar>
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
            style={{ marginLeft: '10px', width: '230px' }}
            id="selectRepositorios"
          />
          <Dropdown
            value={atendente} 
            onChange={(e) => setAtendente(e.value)} 
            options={atendentes} 
            optionLabel="name" 
            placeholder="Todos"
            style={{ width: '120px' }}
            id="selectAtendente"
          />
          <Button
            label="Pesquisar"
            id="pesquisar"
            onClick={() => {
              const selectedRepo = repositorio === '' ? { name: 'Todos', code: '' } : repositorio;
              const selectedAtde = atendente === '' ? { name: 'Todos', code: '' } : atendente;
              buscarCommits(selectedAtde, selectedRepo, selectedDateInitial, selectedDateFinal);
            }}
            icon='pi pi-search'
          />
        </div>
      </div>
      <grid id="gridMain">
        <Grid id="grid-commits" selection={commitsSelecionado} onSelectionChange={(e) => setCommitSelecionado(e.value)} value={commits}>
          <Column className='coluna' body={(rowData) => (
              <Button label="" icon="pi pi-info-circle" outlined onClick={() => handleButtonClick(rowData)} />
            )} style={{ width: '3%', textAlign: 'center' }} />
          <Column className='coluna' field="codigo" header="Código" sortable style={{ width: '28%', textAlign: 'center' }}></Column>
          <Column className='coluna' field="autor" header="Autor" sortable style={{ width: '8%', textAlign: 'center' }} ></Column>
          <Column className='coluna' field="mensagem" header="Mensagem" sortable style={{ width: '38%' }} ></Column>
          <Column className='coluna' field="repositorio" header="Repositorio" sortable style={{ width: '12%', textAlign: 'center' }} ></Column>
          <Column className='coluna' field="data" header="Data" sortable style={{ width: '10%', textAlign: 'center' }} ></Column>
        </Grid> 
      </grid>
      <h3 className={"total"} style={{ color: titleColor }}>Total de Registros: {totalizador}</h3>
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
        loading={loading}
        onClick={clickImprimir}
      />
    </div>
  )
}

export default Commits