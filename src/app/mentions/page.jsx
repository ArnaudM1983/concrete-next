import React from 'react'
import styles from './mentions.module.css'


const Mentions = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>MENTIONS LEGALES</h1>
      <div className={styles.listContainer}>
        <h2 className={styles.subtitle}>1. Éditeur du site</h2>
        <p className={styles.text}>Le site Concrete Jungle Festival est édité par Arnaud Meusy</p>
        <h2 className={styles.subtitle}>2. Hébergement du site</h2>
        <p className={styles.text}>Le site Concrete Jungle Festival est hébergé par [...], dont le siège social est situé à [...].</p>
        <h2 className={styles.subtitle}>3. Propriété intellectuelle</h2>
        <p className={styles.text}>L&aposensemble des éléments du site Concrete Jungle Festival sont protégés par le droit d&aposauteur, des marques et des brevets. Toute reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle du site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est interdite sans autorisation préalable écrite de l&aposéditeur.</p>
        <h2 className={styles.subtitle}>4. Protection des données personnelles</h2>
        <p className={styles.text}>Conformément à la loi Informatique et Libertés du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD), vous disposez d&aposun droit d&aposaccès, de rectification, de suppression, d&aposopposition, et de portabilité de vos données personnelles. Ces droits peuvent être exercés en nous contactant à l&aposadresse suivante : [email@example.com].</p>
        <h2 className={styles.subtitle}>5. Cookies</h2>
        <p className={styles.text}>Le site Concrete Jungle Festival utilise des cookies pour améliorer l&aposexpérience utilisateur, réaliser des statistiques d’audience, et permettre le partage sur les réseaux sociaux. Vous pouvez à tout moment choisir de désactiver ces cookies depuis les paramètres de votre navigateur.</p>
        <h2 className={styles.subtitle}>6. Limitation de responsabilité</h2>
        <p className={styles.text}>L&aposéditeur ne saurait être tenu pour responsable des dommages directs ou indirects, matériels ou immatériels, résultant de l&aposutilisation du site Concrete Jungle Festival ou de l&aposimpossibilité d&aposy accéder. Le site peut contenir des liens hypertextes vers d&aposautres sites. L&aposéditeur décline toute responsabilité quant aux contenus de ces sites tiers.</p>
        <h2 className={styles.subtitle}>7. Loi applicable</h2>
        <p className={styles.text}>Les présentes mentions légales sont régies par la loi française. En cas de litige, et après tentative de recherche d&aposune solution amiable, les tribunaux français seront seuls compétents pour régler ce différend.</p>
      </div>
    </div>
  )
}

export default Mentions