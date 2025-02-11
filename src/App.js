import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const [numero, setNumero] = useState(0);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center',height: '100vh',backgroundColor: 'whitesmoke',padding: '30px'
    }}>
      <h1 style={{ color: 'black', fontSize: '40px' }}>
        Manipulacion de DOM - Diego Morales Rodr guez
      </h1>
      <div style={{borderRadius: '10px',boxShadow: '0 0 10px rgba(0,0,0,0.2)',padding: '30px',width: '500px',backgroundColor: 'white',display: 'flex',flexDirection: 'column',alignItems: 'center',justifyContent: 'center'
      }}>
        <button
          style={{backgroundColor: '#4CAF50',color: 'white',padding: '15px 32px',borderRadius: '5px',cursor: 'pointer',fontSize: '20px'
          }}
          onClick={() => {
            setNumero(numero + 1);
            const ul = document.querySelector('#miLista');
            const li = document.createElement('li');
            li.textContent = `nuevo elemento ${numero}`;
            li.style.backgroundColor = getRandomColor();
            li.style.padding = '8px';
            li.style.marginBottom = '5px';
            li.style.borderRadius = '4px';
            li.onclick = () => {
              ul.removeChild(li);
            };
            ul.appendChild(li);
          }}
        >
          Agregar elemento a la lista
        </button>
        <ul id="miLista" style={{paddingLeft: '0px',listStyle: 'none',marginTop: '20px',border: '1px solid #ccc',borderRadius: '5px',padding: '10px',width: '100%'
        }}></ul>
      </div>
    </div>
  );
}

export default App;
