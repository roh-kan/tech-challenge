import Layout from "../components/layout";
import styles from "../styles/Style.module.css";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard: Launching Soon!</h1>
      <p className={styles.description}>
        Thank you for providing info about you and your startup. Please visit
        this space again to experience our Dashboard.
      </p>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Dashboard;
