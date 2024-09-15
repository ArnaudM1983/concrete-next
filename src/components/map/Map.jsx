"use client";

import styles from './map.module.css';


const Map = () => {
  return (
    <div id="map" className={styles.container}>
      <iframe
        title="Carte du Festival"
        src="https://cjezdhm.cluster029.hosting.ovh.net/map/"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
      ></iframe>
    </div>
  );
};

export default Map;