import { useEffect, useState } from "react";

import styles from "./ReposList.module.css";

const ReposList = ({ nomeUsuario }) => {
  const [repos, setRepos] = useState([]);
  const [estaCarregando, setEstaCarregando] = useState(true);

  useEffect(() => {
    setEstaCarregando(true);
    fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
      .then((res) => res.json())
      .then((resJson) => {
        // console.log(resJson);
        setTimeout(() => {
          setEstaCarregando(false);
          setRepos(resJson);
        }, 3000);
      });
  }, [nomeUsuario]);

  return (
    <div className="container">
      {estaCarregando ? (
        <h1>Carregando....</h1>
      ) : (
        <ul className={styles.list}>
          {repos.map(
            (
              repositorio //aqui tbm repositorio poderia ser desestruturado {id, name, language...}
            ) => (
              <li className={styles.listItem} key={repositorio.id}>
                <div className={styles.listName}>
                  <b>Nome: </b>
                  {repositorio.name} <br />
                </div>
                <div className={styles.listLanguage}>
                  <b>Linguagem: </b>
                  {repositorio.language} <br />
                </div>
                <a
                  className={styles.listLink}
                  target="_blank"
                  href={repositorio.html_url}
                >
                  Visitar no GitHub
                </a>{" "}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
};

export default ReposList;
