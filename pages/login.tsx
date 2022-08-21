import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/atoms/buttons/Button";
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

      <main className="py-16 w-11/12 md:w-2/5 mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">
          API Template Project
        </h1>
        <div className=" bg-white rounded-lg drop-shadow-lg border border-slate-200 px-6 py-4">
          <h2 className="text-center">Login</h2>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-3">
              <label>Email</label>
              <input
                {...register("email")}
                placeholder="noob-slayer13@dndtest.io"
                className="border border-slate-300 p-2 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Password</label>
              <input
                {...register("password")}
                type="password"
                className="border border-slate-300 p-2 rounded-lg"
              />
            </div>
            <Button className="mt-6">Log in</Button>
            {errorMsg && <p className="mt-4 text-red-700">{errorMsg}</p>}
          </form>
        </div>
        <div className="py-5 flex flex-col gap-3">
          <p className="text-center">
            If this is the demo site, you can log in with:
          </p>
          <div className="flex flex-col gap-3 mx-auto">
            <p>Email:</p>
            <p className="font-mono px-2 py-1 border rounded-lg bg-slate-200 text-center">
              test@some-test.test
            </p>
            <p>Password:</p>
            <p className="font-mono px-2 py-1 border rounded-lg bg-slate-200 text-center">
              test123456
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
