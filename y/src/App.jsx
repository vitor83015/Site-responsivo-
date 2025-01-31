import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faRunning, faDumbbell, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [idade, setIdade] = useState('');
  const [atividade, setAtividade] = useState('1.2');
  const [calorias, setCalorias] = useState(null);
  const [notas, setNotas] = useState({ aula1: '' });
  const [notaAberta, setNotaAberta] = useState(null);

  useEffect(() => {
    const notasSalvas = JSON.parse(localStorage.getItem('notas'));
    if (notasSalvas) {
      setNotas(notasSalvas);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas));
  }, [notas]);

  const calcularCalorias = () => {
    let tdee = 0;
    if (peso && altura && idade) {
      tdee = 66.5 + (13.75 * peso) + (5.003 * altura) - (6.755 * idade);
      tdee *= parseFloat(atividade);
      setCalorias(tdee);
    } else {
      setCalorias(null);
    }
  };

  const adicionarAula = () => {
    const novaAula = `aula${Object.keys(notas).length + 1}`;
    setNotas({ ...notas, [novaAula]: '' });
  };

  const removerAula = (aula) => {
    const novasNotas = { ...notas };
    delete novasNotas[aula];
    setNotas(novasNotas);
  };

  return (
    <div className="App">
      <h1>Cálculo de Calorias Diárias</h1>
      <div className="calculo-metabolismo">
        <div className="inputs">
          <input type="number" placeholder="Peso (kg)" value={peso} onChange={(e) => setPeso(e.target.value)} />
          <input type="number" placeholder="Altura (cm)" value={altura} onChange={(e) => setAltura(e.target.value)} />
          <input type="number" placeholder="Idade (anos)" value={idade} onChange={(e) => setIdade(e.target.value)} />
          <select onChange={(e) => setAtividade(e.target.value)} value={atividade}>
            <option value="1.2">Sedentário</option>
            <option value="1.375">Atividade leve</option>
            <option value="1.55">Atividade moderada</option>
            <option value="1.725">Atividade intensa</option>
            <option value="1.9">Atividade muito intensa</option>
          </select>
          <button onClick={calcularCalorias}>Calcular</button>
        </div>

        {calorias !== null && (
          <div className="resultado-calorias">
            <p>Calorias queimadas por dia: {calorias.toFixed(2)}</p>
            <div className="icones-calorias">
              <FontAwesomeIcon icon={faDumbbell} className="icone" title="Musculação" />
              <FontAwesomeIcon icon={faFire} className="icone" title="Fogo" />
              <FontAwesomeIcon icon={faRunning} className="icone" title="Corrida" />
            </div>
          </div>
        )}
      </div>
      <div className="anotacoes">
        <h2>Anotações</h2>
        {Object.keys(notas).map((aula) => (
          <div key={aula} className="nota">
            <button onClick={() => setNotaAberta(notaAberta === aula ? null : aula)}>{aula.toUpperCase()}</button>
            {notaAberta === aula && (
              <div>
                <textarea
                  value={notas[aula]}
                  onChange={(e) => setNotas({ ...notas, [aula]: e.target.value })}
                  placeholder={`Anotações sobre ${aula}`}
                />
                {aula !== 'aula1' && (
                  <button onClick={() => removerAula(aula)} className="delete-button">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <button onClick={adicionarAula} className="add-button">
          <FontAwesomeIcon icon={faPlus} /> Adicionar Aula
        </button>
      </div>
    </div>
  );
}

export default App;