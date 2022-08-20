import Head from "next/head";
import { LoginPage } from "../components/LoginPage";

export default function Login() {
  return (
    <div className="">
      <Head>
        <title>API Template Project - Login</title>
        <meta
          name="description"
          content="Generated from API Template Project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LoginPage />
    </div>
  );
}
