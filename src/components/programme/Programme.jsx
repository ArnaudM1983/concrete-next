"use client"
import React, { useEffect, useState } from 'react';
import styles from './programme.module.css';
import Link from 'next/link';

const Programme = () => {
  const [concerts, setConcerts] = useState([]);
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedVenue, setSelectedVenue] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    const categories = 'concert,animation';
    const perPage = 25;
  
    // Ajoute un console.log pour voir les paramètres envoyés
    console.log(`Fetching events with categories: ${categories} and perPage: ${perPage}`);
  
    fetch(`http://cjezdhm.cluster029.hosting.ovh.net/wp-json/tribe/events/v1/events?categories=${categories}&per_page=${perPage}`)
      .then(response => {
        console.log('Response status:', response.status);  // Vérifier le statut de la réponse
        return response.json();
      })
      .then(data => {
        console.log('Fetched data:', data);  // Log des données récupérées
        setConcerts(data.events);
        setFilteredConcerts(data.events);
      })
      .catch(error => console.error('Erreur lors de la récupération des événements :', error));
  }, []);
  

  useEffect(() => {
    let filteredData = concerts;

    if (selectedDate) {
      filteredData = filteredData.filter(concert => concert.start_date.includes(selectedDate));
    }

    if (selectedVenue) {
      filteredData = filteredData.filter(concert => concert.venue.venue === selectedVenue);
    }

    if (selectedTime) {
      filteredData = filteredData.filter(concert => {
        const concertTime = new Date(concert.start_date).getHours();
        return concertTime.toString() === selectedTime;
      });
    }

    setFilteredConcerts(filteredData);
  }, [selectedDate, selectedVenue, selectedTime, concerts]);

  const datesOptions = Array.from(new Set(concerts.map(concert => concert.start_date.slice(0, 10))));
  const venuesOptions = Array.from(new Set(concerts.map(concert => concert.venue.venue)));
  const timesOptions = Array.from(new Set(concerts.map(concert => new Date(concert.start_date).getHours().toString())));

  return (
    <div id="programme" className={styles.container}>
      <h2 className={styles.title}>PROGRAMMATION</h2>

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

      {/* Programmation filtrée */}
      <div className={styles.cardContainer}>
        {filteredConcerts.map(concert => {
          const dateDetails = concert.start_date_details; // Récupérez les détails de la date
          const formattedDate = `${dateDetails.day}/${dateDetails.month}/${dateDetails.year}`; // Formatez la date
          const formattedTime = `${String(dateDetails.hour).padStart(2, '0')}:${String(dateDetails.minutes).padStart(2, '0')}`; // Formatez l'heure avec les heures et les minutes

          return (
            <Link key={concert.id} href={`/artistes/${concert.id}`} className={styles.link}>
              <div className={styles.card}>
                <div className={styles.imageContainer}>
                  <img src="/groupe.jpg" alt="" className={styles.image} />
                </div>
                <div className={styles.textContainer}>
                  <h2 className={styles.titleCard}>{concert.title}</h2>
                  <p className={styles.location}>{concert.venue.venue}</p>
                  <p>{formattedDate}</p> 
                  <p>{formattedTime}</p>
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
