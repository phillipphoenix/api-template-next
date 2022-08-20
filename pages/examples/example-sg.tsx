import useUser from "../../hooks/useUser";

export default function ExampleSg() {
  const { user } = useUser({ redirectTo: "/login" });

  return (
    <div>
      <h1>Hello {user?.email}</h1>
    </div>
  );
}
