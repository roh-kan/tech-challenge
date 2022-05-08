import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../lib/apolloClient";
import { UserProvider } from "../lib/userProvider";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps);
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <UserProvider>
      <ApolloProvider client={client}>
        {getLayout(<Component {...pageProps} />)}
      </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
