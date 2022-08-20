import Head from "next/head";
import useUser from "../hooks/useUser";

export default function Home() {
  const { user } = useUser({ redirectTo: "/login" });

  return (
    <div className="">
      <Head>
        <title>API Template Project</title>
        <meta
          name="description"
          content="Generated from API Template Project"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="">
        <h1 className="">API Template Project</h1>
      </main>

      <footer className=""></footer>
    </div>
  );
}
