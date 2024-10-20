"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import styles from '../public/Header.module.css';
import { useWeb3Auth } from '@/context/Web3AuthContext'; // Importa el contexto

function ChatbotHeader() {
  const { provider, loggedIn, login, logout } = useWeb3Auth(); // Usa el contexto

  const pathname = usePathname();
  if (pathname === "/debug") return null;

  const loggedInView = (
    <div className={styles.buttonContainer}>
      <button onClick={logout} className={styles.button}>
        Log Out
      </button>
    </div>
  );

  const unloggedInView = (
    <div className={styles.buttonContainer}>
      <button onClick={login} className={styles.button}>
        Login
      </button>
    </div>
  );

  return (
    <div className={styles.header}>
      <Link href="/">
        <div className={styles.logoContainer}>
          <Image src="/images/budy.png" width={50} height={50} alt="Budy Logo" />
          <h1 className={styles.title}>Budy</h1>
        </div>
      </Link>
      <div>{loggedIn ? loggedInView : unloggedInView}</div>
    </div>
  );
}

export default ChatbotHeader;
