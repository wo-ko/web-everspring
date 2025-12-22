// import { SignIn } from "@app/admin/(components)/sign-in";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignIn } from "./(components)/sign-in";
// import { SignIn } from "./(components)/sign-in";
export default async function LoginPage() {
  const session = await auth();

  if (!session?.user) {
    return (
      <>
        <SignIn />
      </>
    )
  }

  redirect('/admin/dashboard');
}