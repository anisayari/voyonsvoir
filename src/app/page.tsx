import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.logo}>
        <div className={styles.logoText}>VOYONSVOIR</div>
        <div className={styles.logoSubtext}>REALITY DISTORTION EXPERIMENT</div>
      </div>

      <main className={styles.main}>
        <a className={styles.mainButton} href="/contributors">
          Contributeurs
        </a>
      </main>
    </div>
  );
}
