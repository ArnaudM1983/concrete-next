import React from 'react'
import styles from "./login.module.css";


const Login = () => {
  return (
    <div className={styles.container}>
      
      <form className={styles.form}>
        <h1>Connexion</h1>
        <input type="text" placeholder="Nom d'utilisateur" name="username" required />
        <input type="password" placeholder="Mot de passe" name="password" required />
        <button type="submit">Se Connecter</button>
      </form>
      </div>
    
  )
}

export default Login