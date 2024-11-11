// pages/_app.tsx
import { PlayerProvider } from "../context/PlayerContext";
import { ThemeProvider } from "../context/ThemeContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Health Industry Leaderboard</title>
      </Head>
      <PlayerProvider>
        <ThemeProvider>
          <Component {...pageProps} />

          <ToastContainer />
        </ThemeProvider>
      </PlayerProvider>
    </>
  );
}

export default MyApp;
