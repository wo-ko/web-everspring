import { cleanEnv, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'production'] }),
  NEXT_PUBLIC_API_URL: url(),
  API_URL: url(),
})