import React, { useState, useEffect } from 'react';import './styles.css';
// prime react ---------------------------------
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
//Chakra ---------------------------------------


function App() {
  // Estado para armazenar a data selecionada pelo usuário
  const [selectedDateInitial, setSelectedDateInitial] = useState('');
  const [selectedDateFinal, setSelectedDateFinal] = useState('');

  // Manipula o evento de mudança do campo de entrada
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
            placeholder="Informe o período inicial"
          />
          
          <Calendar
            value={selectedDateFinal}
            onChange={(e) => setSelectedDateFinal(e.value)}
            showIcon
            placeholder="Informe o período final"
            style={{ marginLeft: '10px' }}
          />
        </div>
      </div>

      <grid className="gridMain">

      </grid>
    </div>
  );
}


export default App;