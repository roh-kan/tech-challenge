import router from "next/router";
import { QUERY_MAIN_USER_EMAIL } from "../common/queries";
import { initializeApollo } from "../lib/apolloClient";
import { useUser } from "../lib/userProvider";
import styles from "../styles/Style.module.css";
import { Alert, Button, TextField } from "@mui/material";
import { useState } from "react";
import Layout from "../components/layout";
import { fieldStyle } from "../common/constants";

const Home = () => {
  const user = useUser();
  const [error, setError] = useState<boolean>(false);

  async function checkUser(event) {
    event.preventDefault();

    const apolloClient = initializeApollo();
    const result = await apolloClient.query({
      query: QUERY_MAIN_USER_EMAIL,
      variables: { email: event.target.name.value },
    });

    const userData = result.data.main_Users[0];
    if (userData) {
      setError(false);
      user.setData(userData.email, userData.id);

      // Already onboarded: Route to dashboard
      if (userData.linkedin_url) {
        router.push("dashboard");
      } else {
        router.push("basicInfo/");
      }
    } else {
      setError(true);
      console.log("Show error");
      return <p>Error :(</p>;
    }
  }

  return (
    <div className={styles.container}>
      <h5 className={styles.title}>Welcome!</h5>
      <div className={styles.description}>
        Please provide your registered email to proceed further with your
        onboarding process
      </div>
      <form onSubmit={checkUser} className={styles.form}>
        <div className={styles.field}>
          <TextField
            id="name"
            label="Please enter your email"
            variant="standard"
            required
            type="email"
            style={fieldStyle}
          />
        </div>
        <div className={styles.field}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
      {error && (
        <Alert severity="error" className={styles.field}>
          You have not registered for this program. Please register and visit
          this page again!
        </Alert>
      )}{" "}
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Home;
