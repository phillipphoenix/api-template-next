import Head from "next/head";
import { AuthedLayout } from "../components/layouts/AuthedLayout";
import useDbInfo from "../hooks/useDbInfo";
import useUser from "../hooks/useUser";

export default function Home() {
  const { user } = useUser({ redirectTo: "/login" });
  const { dbInfo } = useDbInfo();

  return (
    <AuthedLayout user={user}>
      <div className="">
        <Head>
          <title>API Template Project - Models</title>
          <meta
            name="description"
            content="Generated from API Template Project"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="p-5">
          <h1 className="">Models</h1>
          <p className="mb-4">
            This page displays all models from the database, both built-in (ones
            used for this backoffice) and custom models used for the API.
          </p>

          <div className="flex flex-col gap-4">
            <div className="collapse-arrow collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-2xl font-medium">
                Built-in models
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-4 gap-4 py-4">
                  {dbInfo?.builtInTables.map((model) => (
                    <div
                      key={model.name}
                      className="rounded-lg border-2 border-base-300 bg-primary-content p-5"
                    >
                      <h3>{model.name}</h3>
                      <div className="divider"></div>
                      {model.properties.map((field) => (
                        <div key={field}>{field}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="collapse-arrow collapse bg-base-200">
              <input type="checkbox" />
              <div className="collapse-title text-2xl font-medium">
                Custom models
              </div>
              <div className="collapse-content">
                <div className="grid grid-cols-4 gap-4 py-4">
                  {!dbInfo ||
                    (dbInfo.customTables.length === 0 && (
                      <div>No custom models defined</div>
                    ))}
                  {dbInfo &&
                    dbInfo.customTables.length > 0 &&
                    dbInfo?.customTables.map((model) => (
                      <div
                        key={model.name}
                        className="rounded-lg border-2 border-base-300 bg-secondary-content p-5"
                      >
                        <h3>{model.name}</h3>
                        <div className="divider"></div>
                        {model.properties.map((field) => (
                          <div key={field}>{field}</div>
                        ))}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className=""></footer>
      </div>
    </AuthedLayout>
  );
}
