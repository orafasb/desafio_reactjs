import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";



function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: "Reactjs",
      url: "https://github.com/orafasb/goStack",
      techs: ["Javascript", "NodeJS", "Express"],
    });

    const repositoriy = response.data;
    setRepositories([...repositories, repositoriy]);
  };


  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status !== 204) {
      alert("error try again");
      return;
    }
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );

    setRepositories(newRepositories);
  
  }

  useEffect(() => {
    api.get("/repositories").then((res) => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repositorie => {
          return (<li key={repositorie.id}>
            {repositorie.title}
            <button onClick={() => handleRemoveRepository(repositorie.id)}>
              Remover
          </button>
          </li>
          )
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
