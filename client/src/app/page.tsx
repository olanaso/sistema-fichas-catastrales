import { redirect } from "next/navigation";

export default function Home() {
  redirect("/auth/login"); // Redirigir a la página de login
}