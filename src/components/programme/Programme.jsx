"use client"
import React, { useEffect, useState } from 'react';
import styles from './programme.module.css';
import Link from 'next/link';

const Programme = () => {
  // États pour stocker les concerts, les concerts filtrés, la date sélectionnée, le lieu sélectionné et l'heure sélectionnée
  const [concerts, setConcerts] = useState([]);
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Effect pour récupérer les événements (concerts) depuis l'API lors du premier rendu du composant
  useEffect(() => {
    const categories = 'concert,animation'; // Catégories d'événements à récupérer
    const perPage = 25; // Nombre maximum d'événements à récupérer par page

    // Requête pour récupérer les événements via l'API REST de WordPress (tribe events)
    fetch(`https://cjezdhm.cluster029.hosting.ovh.net/wp-json/tribe/events/v1/events?categories=${categories}&per_page=${perPage}`)
      .then(response => {
        return response.json(); // Convertir la réponse en JSON
      })
      .then(data => {
        setConcerts(data.events); // Stocker les événements dans l'état concerts
        setFilteredConcerts(data.events); // Initialiser les concerts filtrés avec tous les concerts
      })
      .catch(error => console.error('Erreur lors de la récupération des événements :', error)); // Gérer les erreurs
  }, []);

  // Effect pour appliquer les filtres (date, lieu, heure) aux concerts
  useEffect(() => {
    let filteredData = concerts; // Démarrer avec tous les concerts

    // Filtrer par date si une date est sélectionnée
    if (selectedDate) {
      filteredData = filteredData.filter(concert => concert.start_date.includes(selectedDate));
    }

    // Filtrer par lieu si un lieu est sélectionné
    if (selectedVenue) {
      filteredData = filteredData.filter(concert => concert.venue.venue === selectedVenue);
    }

    // Filtrer par heure si une heure est sélectionnée
    if (selectedTime) {
      filteredData = filteredData.filter(concert => {
        const concertTime = new Date(concert.start_date).getHours(); // Extraire l'heure de l'événement
        return concertTime.toString() === selectedTime; // Comparer avec l'heure sélectionnée
      });
    }

    // Mettre à jour l'état des concerts filtrés
    setFilteredConcerts(filteredData);
  }, [selectedDate, selectedVenue, selectedTime, concerts]); // Appliquer à chaque changement des filtres

  // Options uniques pour les menus déroulants (date, lieu, heure)
  const datesOptions = Array.from(new Set(concerts.map(concert => concert.start_date.slice(0, 10)))); // Récupérer les dates uniques
  const venuesOptions = Array.from(new Set(concerts.map(concert => concert.venue.venue))); // Récupérer les lieux uniques
  const timesOptions = Array.from(new Set(concerts.map(concert => new Date(concert.start_date).getHours().toString()))); // Récupérer les heures uniques

  return (
    <div id="programme" className={styles.container}>
      <h2 className={styles.title}>PROGRAMMATION</h2>

      {/* Section de filtres */}
      <div className={styles.filter}>
        {/* Menu déroulant pour la date */}
        <div className={styles.filterItem}>
          <label htmlFor="dateFilter" className={styles.label}>Filtrer par date : </label>
          <select id="dateFilter" className={styles.button} onChange={(e) => setSelectedDate(e.target.value)}>
            <option value="">Toutes les dates</option>
            {datesOptions.map(date => (
              <option key={date} value={date}>{date}</option>
            ))}
          </select>
        </div>

        {/* Menu déroulant pour le lieu */}
        <div className={styles.filterItem}>
          <label htmlFor="venueFilter" className={styles.label}>Filtrer par scène : </label>
          <select id="venueFilter" className={styles.button} onChange={(e) => setSelectedVenue(e.target.value)}>
            <option value="">Tous les lieux</option>
            {venuesOptions.map(venue => (
              <option key={venue} value={venue}>{venue}</option>
            ))}
          </select>
        </div>

        {/* Menu déroulant pour l'heure */}
        <div className={styles.filterItem}>
          <label htmlFor="timeFilter" className={styles.label}>Filtrer par heure : </label>
          <select id="timeFilter" className={styles.button} onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">Toutes les heures</option>
            {timesOptions.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Affichage des concerts filtrés */}
      <div className={styles.cardContainer}>
        {filteredConcerts.map(concert => {
          // Formater la date et l'heure pour chaque concert
          const dateDetails = concert.start_date_details; // Récupérer les détails de la date
          const formattedDate = `${dateDetails.day}/${dateDetails.month}/${dateDetails.year}`; // Format de la date : JJ/MM/AAAA
          const formattedTime = `${String(dateDetails.hour).padStart(2, '0')}:${String(dateDetails.minutes).padStart(2, '0')}`; // Format de l'heure : HH:MM

          return (
            <Link key={concert.id} href={`/artistes/${concert.id}`} className={styles.link}>
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src="/groupe.jpg" alt="" className={styles.image} /> {/* Image du concert */}
                </div>
                <div className={styles.textContainer}>
                  <h2 className={styles.titleCard}>{concert.title}</h2> {/* Titre du concert */}
                  <p className={styles.location}>{concert.venue.venue}</p> {/* Lieu du concert */}
                  <p>{formattedDate}</p> {/* Date formatée */}
                  <p>{formattedTime}</p> {/* Heure formatée */}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Programme;
