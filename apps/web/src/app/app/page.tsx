import { redirect } from "next/navigation";

// The patient list is where every visit starts, so it is the app's home.
export default function AppHome() {
  redirect("/app/pasien");
}
