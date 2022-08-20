import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./atoms/buttons/Button";

type LoginFormType = {
  username: string;
  password: string;
};

export const LoginPage: FC = () => {
  const { register, handleSubmit } = useForm<LoginFormType>();
  const onSubmit = (data: LoginFormType) => console.log("DATA: ", data);

  return (
    <div>
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
              <label>Username</label>
              <input
                {...register("username")}
                placeholder="noob-slayer13"
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
          </form>
        </div>
      </main>
    </div>
  );
};
