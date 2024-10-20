"use client";
import type { NextPage } from "next";
import styles from "./Profile.module.css";
import { useWeb3Auth } from "@/context/Web3AuthContext";


const Profile: NextPage = () => {
  const {provider} = useWeb3Auth();
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.leftTop}>Guarda tu Información en Budy</div>
        <div className={styles.centerTop}>
          <img src="images/proicons_pdf-2.svg" alt="pdf-download" />
        </div>
        <div className={styles.rightTop}>Compártela con tus médicos</div>
      </div>
      <div className={styles.medium}>
        <button>PROBA PREMIUM</button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.leftBottom}>
          <img src="images/perro.jpg" alt="perro" className={styles.perro} />
          <div>
            <div className={styles.fecha}>18/10/24</div>
            <img src="images/gridicons_share.svg" alt="share" className={styles.share} />
          </div>
        </div>
        <div className={styles.centerBottom}>
          <img src="images/perro.jpg" alt="perro" className={styles.perro} />
          <div>
            <div className={styles.fecha}>18/10/24</div>
            <img src="images/gridicons_share.svg" alt="share" className={styles.share} />
          </div>
        </div>
        <div className={styles.rightBottom}>
          <img src="images/perro.jpg" alt="perro" className={styles.perro} />
          <div>
            <div className={styles.fecha}>18/10/24</div>
            <img src="images/gridicons_share.svg" alt="share" className={styles.share} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;