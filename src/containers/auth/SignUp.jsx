/* eslint-disable react/no-unknown-property */
import React from "react";
import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../validators/auth";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { removeDoubleQuotes } from "../../utils/helpers";

function SignUp() {
  const navigate = useNavigate();

  const { handleSubmit, errors, control } = useForm({
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(signupSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
    },
  });

  // const onSignup = (data) => {
  //   const payload = {
  //     ...data,
  //     userId: uuidv4(),
  //   };

  //   delayedAction({
  //     startLoader: () => {
  //       dispatch(isLoadingTrue());
  //     },
  //     onSucces: () => {
  //       dispatch(isLoadingFalse());
  //       dispatch(signUpUser(payload));
  //     },
  //     setToast: "New User Created",
  //   });
  // };
  return (
    <Container className="unauth-wrap" component="main" maxWidth="xs">
      <div>
        <Typography
          component="h5"
          variant="h5"
          style={{ marginBottom: "14px" }}
        >
          Create New Account
        </Typography>
        <form>
          <Controller
            control={control}
            name="firstName"
            render={({ onChange, value, onBlur }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="firstName"
                label="First Name"
                onBlur={onBlur}
                error={errors?.firstName}
                variant="outlined"
                helperText={
                  errors?.firstName &&
                  removeDoubleQuotes(errors?.firstName.message)
                }
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ onChange, value, onBlur }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="lastName"
                label="Last Name"
                onBlur={onBlur}
                error={errors?.lastName}
                variant="outlined"
                helperText={
                  errors?.lastName &&
                  removeDoubleQuotes(errors?.lastName.message)
                }
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ onChange, value, onBlur }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                label="Email Address"
                name="email"
                onBlur={onBlur}
                error={errors?.email}
                variant="outlined"
                helperText={
                  errors?.email && removeDoubleQuotes(errors?.email.message)
                }
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ onChange, value, onBlur }) => (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                onBlur={onBlur}
                error={errors?.password}
                variant="outlined"
                helperText={
                  errors?.password &&
                  removeDoubleQuotes(errors?.password.message)
                }
                value={value}
                onChange={(e) => onChange(e.target.value)}
              />
            )}
          />

          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            // onClick={handleSubmit(onSignup)}
          >
            Sign Up
          </Button>
          <div component="h5" variant="h5" className="unauth-wrap-link">
            Already have an account?
            <span onClick={() => navigate("/signin")}> Sign In</span>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
