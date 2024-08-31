import React from 'react'
import styles from './landing.module.css'
import Link from 'next/link'

const Landing = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CONCRETE<br /> JUNGLE<br /> FESTIVAL</h1>
      <p className={styles.date}>15 JUILLET 2025</p>
      <Link href="http://cjezdhm.cluster029.hosting.ovh.net/index.php/billetterie/" className={styles.button}>BILLETTERIE</Link>
    </div>
  )
}

export default Landing