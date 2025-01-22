import { joiResolver } from "@hookform/resolvers/joi";
import { useNavigate } from "react-router-dom";
import { signupSchema } from "../../validators/auth";
import { Controller, useForm } from "react-hook-form";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { signUpAsyncHandler } from "./auth.slice";
import { removeDoubleQuotes } from "../../utils/helpers";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector((state) => state.auth);

  const onSignup = (data) => {
    dispatch(signUpAsyncHandler(data));
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    shouldFocusError: true,
    reValidateMode: "onChange",
    submitFocusError: true,
    shouldUnregister: false,
    resolver: joiResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

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
            name="firstName"
            control={control}
            render={({ field, onBlur }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="First Name"
                variant="outlined"
                onBlur={onBlur}
                error={errors?.firstName}
                helperText={
                  errors?.firstName &&
                  removeDoubleQuotes(errors?.firstName.message)
                }
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field, onBlur }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Last Name"
                variant="outlined"
                onBlur={onBlur}
                error={errors?.lastName}
                helperText={
                  errors?.lastName &&
                  removeDoubleQuotes(errors?.lastName.message)
                }
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, onBlur }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                label="Email Address"
                variant="outlined"
                error={errors?.email}
                onBlur={onBlur}
                helperText={
                  errors?.email && removeDoubleQuotes(errors?.email?.message)
                }
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field, onBlur }) => (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                type="password"
                label="Password"
                variant="outlined"
                error={errors?.password}
                onBlur={onBlur}
                helperText={
                  errors?.password &&
                  removeDoubleQuotes(errors?.password.message)
                }
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
            disabled={loading}
            loading={loading}
            onClick={handleSubmit(onSignup)}
          >
            Sign Up
          </Button>
          <div className="unauth-wrap-link">
            Already have an account?{" "}
            <span onClick={() => navigate("/")}>Sign In</span>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default SignUp;
