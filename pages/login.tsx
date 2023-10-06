import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useUser from "../hooks/useUser";

type LoginFormType = {
  email: string;
  password: string;
};

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { login } = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const { register, handleSubmit } = useForm<LoginFormType>();

  const onSubmit = async (data: LoginFormType) => {
    const { error } = await login(data.email, data.password);
    if (error) {
      setErrorMsg(error.message);
    }
  };

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

      <main className="mx-auto w-11/12 py-16 md:w-2/5">
        <h1 className="mb-8 text-center text-4xl font-bold">
          API Template Project
        </h1>
        <div className=" rounded-lg border border-slate-200 bg-white px-6 py-4 drop-shadow-lg">
          <h2 className="text-center">Login</h2>
          <form
            className="flex flex-col items-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <label>Email</label>
              <input
                {...register("email")}
                placeholder="noob-slayer13@dndtest.io"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <button className="btn btn-primary mt-2 w-full">Log in</button>
            {errorMsg && <p className="mt-4 text-red-700">{errorMsg}</p>}
          </form>
        </div>
        <div className="flex flex-col gap-3 py-5">
          <p className="text-center">
            If this is the demo site, you can log in with:
          </p>
          <div className="mx-auto flex flex-col gap-3">
            <p>Email:</p>
            <p className="rounded-lg border bg-slate-200 px-2 py-1 text-center font-mono">
              test@some-test.test
            </p>
            <p>Password:</p>
            <p className="rounded-lg border bg-slate-200 px-2 py-1 text-center font-mono">
              test123456
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
