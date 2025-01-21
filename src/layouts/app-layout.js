import { Container } from "@mui/material";
import { Header } from "components/header";
import PropTypes from "prop-types";
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
