// "use client";
// import clsx from "clsx";
// import { signIn } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { useRef, useState } from "react";

// export function SignIn() {
//   const usernameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   const router = useRouter();

//   const [isIncorrect, setIsIncorrect] = useState<boolean>(false);
//   // const isIncorrect = useRef<boolean>(false);
//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const errorClass = 'border-red-500'
//     try {
//       if (!usernameRef.current || !passwordRef.current) return;

//       usernameRef.current.classList.remove(errorClass);
//       passwordRef.current.classList.remove(errorClass);
//       if (!usernameRef.current.value || !passwordRef.current.value) {
//         usernameRef.current.classList.add(errorClass);
//         passwordRef.current.classList.add(errorClass);
//         return;
//       };
//       const res = await signIn("credentials", {
//         username: usernameRef.current.value,
//         password: passwordRef.current.value,
//         redirect: false,
//       });

//       if (res?.error) {
//         setIsIncorrect(true);
//       } else {
//         router.push('/admin/th');
//       }
//     } catch (error) {
//       console.log('error', error)
//     }
//   }

//   return (
//     <>
//       <form
//         onSubmit={handleSubmit}
//       >
//         <label htmlFor="credentials-username">
//           Username:
//           <input
//             ref={usernameRef}
//             type="text"
//             id="credentials-username"
//             className="border"
//           />
//         </label>
//         <label htmlFor="credentials-password">
//           Password:
//           <input
//             ref={passwordRef}
//             type="password"
//             id="credentials-password"
//             className="border"
//           />
//         </label>
//         <input type="submit" value="Sign In" />
//       </form>
//       <div
//         className={clsx(
//           "text-red-600",
//           isIncorrect === false && "hidden"
//           )}>Username or password is incorrect</div>
//     </>
//   )
// }
"use client";
import clsx from "clsx";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export function SignIn() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [isIncorrect, setIsIncorrect] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorClass = "border-red-500";

    if (!usernameRef.current || !passwordRef.current) return;

    usernameRef.current.classList.remove(errorClass);
    passwordRef.current.classList.remove(errorClass);

    if (!usernameRef.current.value || !passwordRef.current.value) {
      usernameRef.current.classList.add(errorClass);
      passwordRef.current.classList.add(errorClass);
      return;
    }

    const res = await signIn("credentials", {
      username: usernameRef.current.value,
      password: passwordRef.current.value,
      redirect: false,
    });

    if (res?.error) {
      setIsIncorrect(true);
    } else {
      router.push("/admin/th");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 shadow-md rounded-lg p-8">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-slate-800">
            Company Internal System
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Authorized personnel only
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="credentials-username"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              id="credentials-username"
              className="w-full rounded-md border border-slate-300 px-3 py-2
                         text-sm
                         focus:outline-none focus:ring-1 focus:ring-slate-500
                         focus:border-slate-500 transition"
              placeholder="Corporate username"
            />
          </div>

          <div>
            <label
              htmlFor="credentials-password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="credentials-password"
              className="w-full rounded-md border border-slate-300 px-3 py-2
                         text-sm
                         focus:outline-none focus:ring-1 focus:ring-slate-500
                         focus:border-slate-500 transition"
              placeholder="Password"
            />
          </div>

          <div
            className={clsx(
              "text-xs text-red-600 text-center",
              !isIncorrect && "hidden"
            )}
          >
            Invalid username or password
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-slate-800 py-2.5 text-sm font-medium
                       text-white hover:bg-slate-900 transition"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 border-t border-slate-200 pt-4 text-center text-xs text-slate-500">
          Unauthorized access is prohibited and may be monitored.
        </div>
      </div>
    </div>
  );
}
