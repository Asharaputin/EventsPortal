import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/signin");
  }

  return (
    <div>
      <h1>Welcome to Events Portal</h1>
      <p>Это главная страница приложения.</p>
    </div>
  );
}
