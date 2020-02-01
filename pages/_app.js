import App from "next/app";
import Layout from "../components/_App/Layout";

class MyApp extends App {
  static async getInitialProps({ Component, appContext }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(appContext);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout>
        <Component { ...pageProps } />
      </Layout>
    );
  }
}

export default MyApp;
