// src/pages/_app.tsx
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    // Hapus penggunaan Layout
    <Component {...pageProps} />
  );
}

export default MyApp;
