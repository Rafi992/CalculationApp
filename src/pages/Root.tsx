import { ThemeProvider } from "../context/theme.context";
import Layout from "../components/Layout";
import { Outlet } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Root = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Helmet>
          <title>Calculation App</title>
          <meta
            name='description'
            content='Aplikacja Calculation App do obliczeń i zapisywania ich historii'
          />
        </Helmet>
        <>
          <Layout>
            <Outlet />
          </Layout>
        </>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default Root;
