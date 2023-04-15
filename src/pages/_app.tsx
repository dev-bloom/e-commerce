import { wrapper } from "@/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(App);
