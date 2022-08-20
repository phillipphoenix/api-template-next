import { AppProps } from "next/app";
import { LoginPage } from "../components/LoginPage";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <LoginPage />;
  return <Component {...pageProps} />;
}

export default MyApp;
