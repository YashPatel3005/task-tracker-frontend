import { Container } from "@mui/material";
import PropTypes from "prop-types";
import { Header } from "../components/Header";

function AppLayout({ children }) {
  return (
    <>
      <Header />
      <Container maxWidth="lg" className="container-main">
        {children}
      </Container>
    </>
  );
}

AppLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export { AppLayout };
