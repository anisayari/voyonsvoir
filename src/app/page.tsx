import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
        <button className={styles.button}>
          Surprise
        </button>
          <a
            className={styles.button}
            href="/promos"
          >
            🛒 Promotions
          </a>
          <a
            className={styles.button}
            href="/contributors"
          >
            🎉 Voir les Contributeurs
          </a>
    </main>
  );
}
