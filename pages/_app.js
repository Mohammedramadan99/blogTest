import AOS from "aos";
import { Provider} from "react-redux";
import { wrapper } from "../redux/store";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Layout from "../components/Layout/Layout";
import '../styles/Style.scss'

export default function App({ Component, ...rest }) {

  const { store, props } = wrapper.useWrappedStore(rest)
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      // once: true,
      offset: 50,
    });
  }, []);
  return(
    <Provider store={store}>
      <Layout>
        <Component {...props.pageProps} />
      </Layout>
    </Provider>
  )
}