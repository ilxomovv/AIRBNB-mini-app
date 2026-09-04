import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
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
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import { Link, useNavigate } from "react-router";

const Reg = gql`
  mutation Regs($email: String!, $name: String!, $password: String!) {
    register(email: $email, name: $name, password: $password) {
      accessToken
      user {
        id
        email
        name
      }
    }
  }
`;

function SignUp() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();
  const [regsiter, { loading }] = useMutation(Reg);

  const handleComp = (data) => {
    toast.success("Registered successfully!");
    console.log(data);
    setAccessToken(data?.register?.accessToken);
    setUser(data?.register?.user);
    navigate("/");
  };
  const handlesign = (data) => {
    regsiter({
      variables: data,
      onCompleted: handleComp,
      onError: (error) => toast.error(error.message),
    });
  };
  return (
    <Container maxWidth="xs">
      <Button startIcon={<ReplyAllIcon />}>
        <Link to="/">Back to Home</Link>
      </Button>
      <Paper elevation={4}>
        <Stack spacing={3} sx={{ padding: 3 }}>
          <Link to="/login">
            <Button variant="contained">Log in →</Button>
          </Link>
          <Typography variant="h5">Welcome This is AirBnb</Typography>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                size="small"
                {...field}
                label="Name"
                error={error}
                helperText={error && error.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                size="small"
                {...field}
                label="Email"
                type="email"
                error={error}
                helperText={error && error.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: { value: true, message: "Email is required!" },
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
            loading={loading}
            variant="contained"
            onClick={handleSubmit(handlesign)}
          >
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}
export default SignUp;
