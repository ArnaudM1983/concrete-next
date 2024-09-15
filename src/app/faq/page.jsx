import React from 'react';
import styles from './faq.module.css';

const Faq = () => {
    return (
        <div className={styles.container}>
            <iframe
                src="https://cjezdhm.cluster029.hosting.ovh.net/index.php/faq/"
                title="FAQ"
                style={{ width: '100%', height: '100vh', border: 'none' }}
            ></iframe>
        </div>
    );
};

export default Faq;