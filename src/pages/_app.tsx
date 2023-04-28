import { Spin } from "antd";
import type { AppProps } from "next/app";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { wrapper } from "../store/index";

import "@/styles/globals.scss";

const Loader = () => (
  <Spin
    indicator={<Loading3QuartersOutlined style={{ fontSize: 24 }} spin />}
  />
);

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  const { store } = wrapper.useWrappedStore(rest);
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
