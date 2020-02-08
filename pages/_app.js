import App from "next/app";
import Layout from "../components/_App/Layout";
import { parseCookies, destroyCookie } from "nookies";
import { redirectUser } from "../utils/auth";
import baseUrl from "../utils/baseUrl";
import Router from "next/router";
import axios from "axios";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const { token } = parseCookies(ctx);

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (!token) {
    } else {
      try {
        const payload = { headers: { Authorization: token } }
        const url = `${baseUrl}/api/account`;
        const response = await axios.get(url, payload);
        const user = response.data;

        pageProps.user = user;
      } catch(error) {
        console.error("Error getting user", error);
        destroyCookie(ctx, "token");
        redirectUser(ctx, "/login");
      }
    }

    return { pageProps };
  }

  componentDidMount() {
    window.addEventListener("storage", this.syncLogout);
  }

  syncLogout = event => {
    if (event.key === "logout") {
      Router.push("/login");
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Layout { ...pageProps }>
        <Component { ...pageProps } />
      </Layout>
    );
  }
}

export default MyApp;
