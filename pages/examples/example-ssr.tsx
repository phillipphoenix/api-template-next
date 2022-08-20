import { withIronSessionSsr } from "iron-session/next";
import { InferGetServerSidePropsType } from "next";
import { sessionOptions } from "../../lib/sessionOptions";
import { User } from "../api/auth/user";

export default function ExampleSsr({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>Hello {user?.email}</h1>
    </div>
  );
}

export const getServerSideProps = withIronSessionSsr(async function ({
  req,
  res,
}) {
  const user = req.session.user as User;

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { isLoggedIn: false, id: "", email: "" } as User,
      },
    };
  }

  return {
    props: {
      user: { ...user },
    },
  };
},
sessionOptions);
