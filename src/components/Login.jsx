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
    <Container maxWidth="xs">
      <Link to="/">
        <Button startIcon={<ReplyAllIcon />}>Back to Home</Button>
      </Link>

      <Paper elevation={4}>
        <Stack spacing={3} sx={{ padding: 3 }}>
          <Link to="/sign">
            <Button variant="contained">Sign Up →</Button>
          </Link>
          <Typography variant="h5">
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
                error={error}
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
          <Button onClick={handleSubmit(handleS)} variant="contained">
            Log In
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
export default Login;
