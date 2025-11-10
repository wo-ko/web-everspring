"use client";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
  // const isIncorrect = useRef<boolean>(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorClass = 'border-red-500'
    try {
      if (!usernameRef.current || !passwordRef.current) return;

      usernameRef.current.classList.remove(errorClass);
      passwordRef.current.classList.remove(errorClass);
      if (!usernameRef.current.value || !passwordRef.current.value) {
        usernameRef.current.classList.add(errorClass);
        passwordRef.current.classList.add(errorClass);
        return;
      };
      const res = await signIn("credentials", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
        redirect: false,
      });

      if (res?.error) {
        setIsIncorrect(true);
      } else {
        router.push('/admin/th');
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
      >
        <label htmlFor="credentials-username">
          Username:
          <input
            ref={usernameRef}
            type="text"
            id="credentials-username"
            className="border"
          />
        </label>
        <label htmlFor="credentials-password">
          Password:
          <input
            ref={passwordRef}
            type="password"
            id="credentials-password"
            className="border"
          />
        </label>
        <input type="submit" value="Sign In" />
      </form>
      <div
        className={clsx(
          "text-red-600",
          isIncorrect === false && "hidden"
          )}>Username or password is incorrect</div>
    </>
  )
}