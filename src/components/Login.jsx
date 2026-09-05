import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

import {
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../Store/useAuth";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";

const LoginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        email
        id
        name
      }
    }
  }
`;

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { setAccessToken, setUser } = useAuth();
  const [loginUser, { loading, error }] = useMutation(LoginMutation, {
    onCompleted: (data) => {
      if (data?.login) {
        setAccessToken(data.login.accessToken);
        setUser(data.login.user);
        navigate("/");
        toast.success("Logined successfully!");
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const handleS = (dataa) => {
    loginUser({ variables: dataa });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        px: { xs: 2, sm: 3 },
        py: { xs: 2, sm: 4 },
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", alignSelf: "flex-start" }}>
        <Button startIcon={<ReplyAllIcon />} sx={{ mb: 2 }}>
          Back to Home
        </Button>
      </Link>

      <Paper elevation={4} sx={{ borderRadius: 2, width: "100%" }}>
        <Stack spacing={{ xs: 2, sm: 3 }} sx={{ padding: { xs: 2, sm: 3 } }}>
          <Link
            to="/sign"
            style={{ textDecoration: "none", alignSelf: "flex-end" }}
          >
            <Button variant="contained" size="small">
              Sign Up →
            </Button>
          </Link>
          <Typography
            variant="h5"
            sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Welcome to the Airbnb login section.
          </Typography>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required.",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Email"
                size="small"
                fullWidth
                error={!!error}
                helperText={error && error.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Password is required!" },
              minLength: {
                value: 6,
                message: "Password should include at least 6 characters!",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                type={showPassword ? "text" : "password"}
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
                error={!!error}
                label="Password"
                helperText={error && error.message}
              />
            )}
          />
          <Button
            onClick={handleSubmit(handleS)}
            variant="contained"
            disabled={loading}
            fullWidth
          >
            Log In
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
export default Login;
