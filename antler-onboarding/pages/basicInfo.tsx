import { useQuery } from "@apollo/client";
import { TextField, Button } from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { fieldStyle } from "../common/constants";
import { MUTATION_MAIN_USERS, QUERY_MAIN_TOPICS } from "../common/queries";
import { UserTopics } from "../common/types";
import Layout from "../components/layout";
import TopicMultiSelect from "../components/topicMulitSelect";
import { initializeApollo } from "../lib/apolloClient";
import { useUser } from "../lib/userProvider";
import styles from "../styles/Style.module.css";

const BasicInfo = () => {
  const user = useUser();
  const isLoggedIn = user && user.email;

  useEffect(() => {
    if (!isLoggedIn) {
      router.back();
    }
  });

  // Load topic of interests
  const { loading, error, data } = useQuery(QUERY_MAIN_TOPICS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error on loading topics</p>;
  }

  const updateUser = async (event) => {
    event.preventDefault();

    const arr: string[] = event.target.interest.value.split(",");
    const userTopics: UserTopics[] = new Array<UserTopics>();

    arr.map((x: string) => {
      const userTopic: UserTopics = {
        user_id: user.id,
        topic_id: data.main_Topics.find((y) => y.name == x).id,
      };
      userTopics.push(userTopic);
    });

    const linkedin = event.target.linkedin.value;
    const expertise = event.target.expertise.value;

    const apolloClient = initializeApollo();
    const result = await apolloClient.mutate({
      mutation: MUTATION_MAIN_USERS,
      variables: {
        topics: userTopics,
        email: user.email,
        linkedin: linkedin,
        expertise: expertise,
      },
    });

    const userData = result.data.update_main_Users.returning[0];

    // If assigned a startup, show startup data
    // else get more info about startup
    if (userData && userData.startup_id) {
      router.push("startupData/");
    } else {
      router.push("startupInfo/");
    }
  };

  return (
    isLoggedIn && (
      <div className={styles.container}>
        <h5 className={styles.title}>Tell us more about yourself</h5>

        <form onSubmit={updateUser} className={styles.form}>
          <div className={styles.field}>
            <TextField
              id="linkedin"
              label="LinkedIn Profile URL"
              variant="standard"
              type="url"
              style={fieldStyle}
              required
            />
          </div>
          <div className={styles.field}>
            <TextField
              id="expertise"
              label="Expertise "
              helperText="e.g. technical, design, product"
              variant="standard"
              style={fieldStyle}
              required
            />
          </div>
          <div className={styles.field}>
            <TopicMultiSelect id="interest" topics={data.main_Topics} />
          </div>
          <div className={styles.field}>
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    )
  );
};

BasicInfo.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default BasicInfo;
