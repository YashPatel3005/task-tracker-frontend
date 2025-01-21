/* eslint-disable react/no-unknown-property */
import React from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "../../validators/auth/index";
import { joiResolver } from "@hookform/resolvers/joi";
import { delayedAction, removeDoubleQuotes } from "../../utils/helpers";

function SignIn() {
  const navigate = useNavigate();
  // const { isError = false, errorMsg } = useSelector(
  //   (state) => state.authReducer
  // );

  const { handleSubmit, errors, control } = useForm({
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const onSignIn = (data) => {
  //   delayedAction({
  //     startLoader: () => {
  //       dispatch(isLoadingTrue());
  //     },
  //     onSucces: () => {
  //       dispatch(isLoadingFalse());
  //       dispatch(loginUser(data));
  //     },
  //     showToast: false,
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
          Sign in Task Tracker
        </Typography>
        <form>
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
                type="password"
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
          {/* {isError && <p>{errorMsg}</p>} */}

          <Button
            style={{ marginTop: "10px" }}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            // onClick={handleSubmit(onSignIn)}
          >
            Sign In
          </Button>
          <div component="h5" variant="h5" className="unauth-wrap-link">
            Don't have an account?
            <span onClick={() => navigate("/signup")}> Sign Up</span>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default SignIn;
