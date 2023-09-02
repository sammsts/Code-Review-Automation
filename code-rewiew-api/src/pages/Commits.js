import React, { useState, useEffect } from 'react';
import '../styles.css';
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
  const [selectedDateInitial, setSelectedDateInitial] = useState('');
  const [selectedDateFinal, setSelectedDateFinal] = useState('');
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
        <Grid id="grid-commits">
          <Column className='coluna' field="mus_codigo" header="Código" sortable style={{ width: '5%' }}></Column>
          <Column className='coluna' field="mus_artista" header="Artista" sortable style={{ width: '23%' }} ></Column>
        </Grid> 
      </grid>
    </div>
  )
}

export default Commits