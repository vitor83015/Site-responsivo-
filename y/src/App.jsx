import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faRunning, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [atividade, setAtividade] = useState('1.2');
  const [calorias, setCalorias] = useState(null);

  const [notas, setNotas] = useState([]);
  const [novaNota, setNovaNota] = useState('');

  // Função para calcular calorias
  const calcularCalorias = () => {
    console.log(`Peso: ${peso}, Altura: ${altura}, Idade: ${idade}, Atividade: ${atividade}`);
    
    let tdee = 0;
    if (peso && altura && idade) {
      // Harris-Benedict Equation para homens
      tdee = 66.5 + (13.75 * peso) + (5.003 * altura) - (6.755 * idade);
      tdee *= parseFloat(atividade);

      setCalorias(tdee);
    } else {
      setCalorias(null);
    }
  };

  // Função para lidar com o formulário de anotações
  const adicionarNota = () => {
    if (novaNota.trim()) {
      const novasNotas = [...notas, novaNota];
      setNotas(novasNotas);
      localStorage.setItem('notas', JSON.stringify(novasNotas));
      setNovaNota('');
    }
  };

  // Carregar as anotações do localStorage
  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem('notas'));
    if (notasSalvas) {
      setNotas(notasSalvas);
    }
  }, []);

  return (
    <div className="App">
      <h1>Cálculo de Calorias Diárias</h1>
      <div>
        <input
          type="number"
          placeholder="Peso (kg)"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
        />
        <input
          type="number"
          placeholder="Altura (cm)"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
        />
        <input
          type="number"
          placeholder="Idade (anos)"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <select onChange={(e) => setAtividade(e.target.value)} value={atividade}>
          <option value="1.2">Sedentário</option>
          <option value="1.375">Atividade leve</option>
          <option value="1.55">Atividade moderada</option>
          <option value="1.725">Atividade intensa</option>
          <option value="1.9">Atividade muito intensa</option>
        </select>
        <button onClick={calcularCalorias}>Calcular Calorias</button>

        {/* Adicionando os ícones ao lado do resultado */}
        {calorias !== null && (
          <div className="resultado-calorias">
            <p>Calorias queimadas por dia: {calorias.toFixed(2)}</p>
            <div className="icones-calorias">
              <FontAwesomeIcon icon={faFire} title="Foguinho" className="icone" />
              <FontAwesomeIcon icon={faRunning} title="Corrida" className="icone" />
              <FontAwesomeIcon icon={faDumbbell} title="Musculação" className="icone" />
            </div>
          </div>
        )}
      </div>

      <button onClick={() => document.getElementById('notas-section').classList.toggle('show')}>
        Adicionar/Ver Notas
      </button>

      <div id="notas-section" className="notas">
        <h2>Anotações</h2>
        <textarea
          value={novaNota}
          onChange={(e) => setNovaNota(e.target.value)}
          placeholder="Escreva sua nota..."
        />
        <button onClick={adicionarNota}>Salvar Nota</button>
        <ul>
          {notas.map((nota, index) => (
            <li key={index}>{nota}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
