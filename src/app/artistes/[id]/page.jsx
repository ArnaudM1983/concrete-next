"use client"; 
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; 
import styles from '../artistes.module.css';
import Link from 'next/link';

const Artistes = () => {
  const { id } = useParams(); 
  const [artistDetails, setArtistDetails] = useState(null); 

  useEffect(() => {
    if (id) { // Vérifie que l'ID est disponible avant de faire une requête
      fetch(`https://cjezdhm.cluster029.hosting.ovh.net/wp-json/tribe/events/v1/events/${id}`)
        .then(response => response.json())
        .then(data => setArtistDetails(data))
        .catch(error => console.error('Erreur lors de la récupération des détails de l\'artiste :', error));
    }
  }, [id]); // Déclenchement de l'effet lorsqu'il y a un changement dans l'ID

  if (!artistDetails) return <div>Loading...</div>; // Affiche un état de chargement tant que les détails ne sont pas chargés

  // Formatage de la date et de l'heure
  const dateDetails = artistDetails.start_date_details;
  const formattedDate = `${dateDetails.day}/${dateDetails.month}/${dateDetails.year}`;
  const formattedTime = `${String(dateDetails.hour).padStart(2, '0')}:${String(dateDetails.minutes).padStart(2, '0')}`;

  return (
    <div className={styles.container}>
      <img src="/groupe.jpg" alt="Image de l'artiste" className={styles.artistImage} />
      <div className={styles.overlay}>
        <div className={styles.info}>
          <h1 className={styles.name}>{artistDetails.title}</h1>
          <p className={styles.date}>{formattedDate} - {formattedTime} - {artistDetails.venue.venue}</p>
          <div className={styles.buttons}>
          <Link href="http://cjezdhm.cluster029.hosting.ovh.net/index.php/billetterie/" className={`${styles.button} ${styles.reserveButton}`}>RÉSERVER</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Artistes;
