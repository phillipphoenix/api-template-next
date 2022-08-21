import { AuthedLayout } from "../../components/layouts/AuthedLayout";
import useUser from "../../hooks/useUser";

export default function ExampleSg() {
  const { user } = useUser({ redirectTo: "/login" });

  return (
    <AuthedLayout user={user}>
      <div>
        <h1>Hello {user?.email}, from a static page</h1>
      </div>
    </AuthedLayout>
  );
}
