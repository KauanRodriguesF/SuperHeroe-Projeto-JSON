//INTEGRANTES DO GRUPO: Kauan Rodrigues(10438316) , Antonio Pereira(10436919), Henrique Totti(10436584), Fernando Lacava(10438026), Rafael Trindade(10431850)

"use client";

import { useEffect, useState } from "react";
import styles from "./components/superhero.module.css";
import Superhero from "./components/superhero";

interface Hero {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
  };
  image: {
    url: string;
  };
}

export default function Home() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const ACCESS_TOKEN = "e33882d3acf7c95986c1c709816bf8bc";
  const BASE_URL = `https://superheroapi.com/api.php/${ACCESS_TOKEN}/`;

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const ids = [717, 470, 69];
        const promises = ids.map((id) =>
          fetch(`${BASE_URL}${id}`).then((res) => res.json())
        );
        const results: Hero[] = await Promise.all(promises);
        setHeroes(results);
      } catch (error) {
        console.error("Erro ao buscar os heróis:", error);
      }
    };

    fetchHeroes();
  }, []);

  return (
    <main className={styles.container}>
      <div className={styles.heroGrid}>
        {heroes.map((hero) => (
          <Superhero key={hero.id} hero={hero} />
        ))}
      </div>
    </main>
  );
}
