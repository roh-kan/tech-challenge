import { TextField, Button, InputAdornment } from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { fieldStyle } from "../common/constants";
import {
  MUTATION_INSERT_MAIN_STARTUPS,
  QUERY_STARTUP_ID,
  MUTATION_UPDATE_STARTUP_ID,
} from "../common/queries";
import { initializeApollo } from "../lib/apolloClient";
import { useUser } from "../lib/userProvider";
import styles from "../styles/Home.module.css";
import { v4 as uuidv4 } from "uuid";
import Layout from "../components/layout";

const StartupInfo = () => {
  const user = useUser();
  const isLoggedIn = user && user.email;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  });

  const insertStartup = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const size = event.target.size.value;
    const funding = event.target.funding.value;

    const apolloClient = initializeApollo();
    const result = await apolloClient.mutate({
      mutation: MUTATION_INSERT_MAIN_STARTUPS,
      variables: {
        id: uuidv4(),
        name: name,
        size: size,
        funding: funding,
      },
    });

    // Fetch id of startup
    const queryStartupId = await apolloClient.query({
      query: QUERY_STARTUP_ID,
      variables: {
        name: name,
      },
    });

    // Update startup id for user
    const updateStartupIdResult = await apolloClient.mutate({
      mutation: MUTATION_UPDATE_STARTUP_ID,
      variables: {
        startupid: queryStartupId.data.main_Startups[0].id,
        email: user.email,
      },
    });

    router.push("dashboard/");
  };

  return (
    isLoggedIn && (
      <div className={styles.container}>
        <h5 className={styles.title}>Tell us more about your startup</h5>

        <form onSubmit={insertStartup} className={styles.form}>
          <div className={styles.field}>
            <TextField
              id="name"
              label="Company Name"
              variant="standard"
              style={fieldStyle}
            />
          </div>

          <div className={styles.field}>
            <TextField
              id="size"
              label="Company Size "
              variant="standard"
              type="number"
              style={fieldStyle}
            />
          </div>

          <div className={styles.field}>
            <TextField
              id="funding"
              label="Funding Raised"
              helperText="in USD"
              variant="standard"
              type="number"
              style={fieldStyle}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
            />
          </div>
          <div className={styles.field}>
            <Button type="submit" variant="contained" style={fieldStyle}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

StartupInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default StartupInfo;
