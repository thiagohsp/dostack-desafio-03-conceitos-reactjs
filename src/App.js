import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([]);

  /* Busca os dados da api repositories */
  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data)
    })
  }, []);

  async function handleAddRepository() {
    api.post('repositories', {
        title : `Bootcamp-GoStack-Projeto_${Date.now()}`,
        url: `https://github.com/Rocketseat/${Date.now()}`,
        techs: [
          "Node.js"	,
          "ReactJs" ,
        ],
        "likes": 0
      }
    ).then( response =>
      setRepositories([...repositories, response.data])
    )
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response => {      
      if (!response.status === 204) return;      
      let repos = [ ...repositories ];
      const repoIndex = repos.findIndex(repo => repo.id === id)
      repos.splice(repoIndex, 1);    
      setRepositories(repos)}
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories && repositories.map(repository =>           
          (<li key={repository.id}>
          {repository.title}
          <button onClick={() => {handleRemoveRepository(repository.id)}}>
            Remover
          </button>
        </li>)) }        
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
