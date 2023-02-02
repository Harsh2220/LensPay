import "@/styles/globals.css";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";
import type { AppProps } from "next/app";

const provider = new AuthProvider(process.env.NEXT_PUBLIC_ARCANA_KEY);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth provider={provider}>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
