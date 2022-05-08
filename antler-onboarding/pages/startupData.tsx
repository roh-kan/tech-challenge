import { useQuery } from "@apollo/client";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import router from "next/router";
import { useEffect } from "react";
import { QUERY_MAIN_STARTUPS_DATA } from "../common/queries";
import Layout from "../components/layout";
import { useUser } from "../lib/userProvider";
import styles from "../styles/Style.module.css";

const StartupData = () => {
  const user = useUser();
  const isLoggedIn = user && user.email;

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  });

  const { loading, error, data } = useQuery(QUERY_MAIN_STARTUPS_DATA, {
    variables: { userId: user.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    return <p>Error error</p>;
  }

  const startupData = data.main_Startups[0];
  const coFounders: string = Object.keys(startupData.Users)
    .map((k) => {
      return startupData.Users[k]["name"];
    })
    .join(", ");

  const rows = [
    { name: "Company Name", value: startupData.name },
    { name: "Company Size", value: startupData.size },
    { name: "Funding Raised", value: "$" + startupData.funding_raised },
    { name: "Co-Founders", value: coFounders },
  ];
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Registered Info</h1>

      <TableContainer
        component={Paper}
        sx={{ maxWidth: 350, marginTop: "2em" }}
      >
        <Table sx={{ maxWidth: 350 }} aria-label="simple table">
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={styles.tableMainColumn}
                >
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.field}>
        <Button variant="contained" href="/dashboard">
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
};

StartupData.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
export default StartupData;
