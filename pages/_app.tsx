import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Rui } from "node_modules";
import { SSRProvider } from "@react-aria/ssr";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <>
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Amjad GPT" />
          <meta name="title" content="Amjad GPT" />
          <meta
            property="og:description"
            content="Amjad GPT is a chatbot trained to speak like Amjad Masad.  Built with LangChain and Next.js"
          />
          <meta
            name="description"
            content="Amjad GPT is a chatbot trained to speak like Amjad Masad.  Built with LangChain and Next.js"
          />
          <meta property="og:image" content="/cover.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="1372" />
          <meta property="og:image:height" content="772" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="copyright" content="2023" />
          <link rel="icon" type="image/svg" href="/icon.png"></link>
          <title>Amjad GPT</title>
        </Head>
        <Rui theme="dark">
          <Component {...pageProps} />
        </Rui>
      </>
    </SSRProvider>
  );
}

export default MyApp;
