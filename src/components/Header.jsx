/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ConformationModal } from "./ConformationModal";
import {
  AppBar,
  Avatar,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { LocalStorage } from "../utils/helpers";

function Header() {
  const sessionData = JSON.parse(LocalStorage.getItem("UserSession") ?? "");

  const [logoutModal, setLogoutModal] = useState(false);

  const handleLogout = () => {
    LocalStorage.removeItem("UserSession");
    window.location.href = "/";
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg">
        <Toolbar disableGutters className="d-flex">
          <Typography variant="h6" component="div">
            Task Tracker
          </Typography>
          <div className="d-flex">
            <span>{sessionData?.userData?.email ?? ""}</span>
            <Avatar className="user-avtar">
              {(sessionData?.userData?.email ?? "")?.substring(0, 1) || "t"}
            </Avatar>

            <Button color="inherit" onClick={() => setLogoutModal(true)}>
              Logout
            </Button>
          </div>
        </Toolbar>
        {logoutModal && (
          <ConformationModal
            onClickYes={handleLogout}
            isOpen={logoutModal}
            modalHeader="Are you sure you want to Logout"
            onClose={() => setLogoutModal(false)}
          />
        )}
      </Container>
    </AppBar>
  );
}

export { Header };
