import Head from "next/head";
import styles from "../styles/Style.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Antler Onboarding</title>
        <meta name="description" content="Onboard registered users" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}></footer>
    </>
  );
}
