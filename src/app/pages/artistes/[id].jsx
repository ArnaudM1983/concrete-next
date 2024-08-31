import React, { useEffect, useState } from 'react';
import styles from './artistes.module.css';
import { useRouter } from 'next/router';

const Artistes = () => {
  const [artiste, setArtiste] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`http://cjezdhm.cluster029.hosting.ovh.net/wp-json/tribe/events/v1/events/${id}`)
        .then(response => response.json())
        .then(data => {
          setArtiste(data);
        })
        .catch(error => console.error('Erreur lors de la récupération des détails de l’artiste :', error));
    }
  }, [id]);

  if (!artiste) {
    return <p>Chargement...</p>;
  }

  return (
    <div className={styles.container}>
      <img src="/groupe.jpg" alt="" className={styles.artistImage} />
      <div className={styles.overlay}>
        <div className={styles.info}>
          <h1 className={styles.name}>{artiste.title}</h1>
          <p className={styles.date}>{artiste.start_date} - {artiste.venue.venue}</p>
          <div className={styles.buttons}>
            <button className={`${styles.button} ${styles.reserveButton}`}>RÉSERVER</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Artistes;
