import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { Rui } from "node_modules";
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SSRProvider>
      <>
        <Rui theme="dark">
          <Component {...pageProps} />
        </Rui>
      </>
    </SSRProvider>
  );
}

export default MyApp;
