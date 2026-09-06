import { Category, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "../Store/useAuth";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { toast } from "react-toastify";
import { Link } from "react-router";

const CREATE_LISTING_MUTATION = gql`
  mutation CreateListing($input: CreateListingInput!) {
    createListing(input: $input) {
      id
      title
      description
      category
      pricePerNight
      location
      address
      guests
      bedrooms
      beds
      bathrooms
      amenities
      images
      isFavorite
      isFeatured
      rating
      reviewsCount
      createdAt
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        createdAt
        email
        id
        name
      }
      accessToken
    }
  }
`;

const ADMIN_EMAIL = "admin@example.com";

function AdminPanel() {
  const { user, accessToken, setAccessToken, setUser, logout } = useAuth();
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const {
    control: controlAddListing,
    handleSubmit: handleSubmitAddListing,
    reset: resetAddListing,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      pricePerNight: "",
      location: "",
      address: "",
      guests: 1,
      bedrooms: 1,
      beds: 1,
      bathrooms: 1,
      amenities: "",
      images: "",
      isFeatured: false,
      rating: 0,
      reviewsCount: 0,
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState("");
  const [createListing, { loading: loadingAddListing, error }] = useMutation(
    CREATE_LISTING_MUTATION,
  );

  const [login, { loading, error: apiError }] = useMutation(LOGIN_MUTATION, {
    onCompleted: () => {
      reset();
    },
  });

  const handleS = async (formData) => {
    setAuthError("");
    try {
      const { data } = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });

      const loggedUser = data?.login?.user;
      const token = data?.login?.accessToken;

      if (loggedUser && token) {
        if (loggedUser.email === ADMIN_EMAIL) {
          setAccessToken(token);
          setUser(loggedUser);
        } else {
          setAuthError("Error");
        }
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const input = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        pricePerNight: parseFloat(formData.pricePerNight),
        location: formData.location,
        address: formData.address,
        guests: parseInt(formData.guests),
        bedrooms: parseInt(formData.bedrooms),
        beds: parseInt(formData.beds),
        bathrooms: parseInt(formData.bathrooms),
        amenities: formData.amenities
          ? formData.amenities.split(",").map((item) => item.trim())
          : [],
        images: formData.images
          ? formData.images.split(",").map((item) => item.trim())
          : [],
        isFeatured: Boolean(formData.isFeatured),
        rating: parseInt(formData.rating),
        reviewsCount: parseInt(formData.reviewsCount),
      };

      await createListing({
        variables: { input },
      });

      toast.success("done");
      resetAddListing();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (accessToken && user) {
    return (
      <Container
        maxWidth="xs"
        sx={{ mt: { xs: 2, sm: 8 }, px: { xs: 2, sm: 3 } }}
      >
        <Button variant="contained" color="error" onClick={() => logout()}>
          LogOut
        </Button>

        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Create Listing
        </Typography>

        {error && toast.error(error.message)}

        <form onSubmit={handleSubmitAddListing(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={controlAddListing}
              rules={{ required: "title is required!" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="title"
                  error={error}
                  helperText={error && error?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  label="description"
                />
              )}
            />

            <Controller
              name="category"
              control={controlAddListing}
              render={({ field }) => (
                <>
                  <InputLabel id="test-select-label">Category</InputLabel>
                  <Select
                    label="Category"
                    labelId="test-select-label"
                    {...field}
                    size="small"
                  >
                    <MenuItem value={"APARTMENT"}>APARTMENT</MenuItem>
                    <MenuItem value={"CABIN"}>CABIN</MenuItem>
                    <MenuItem value={"HOTEL"}>HOTEL</MenuItem>
                    <MenuItem value={"HOUSE"}>HOUSE</MenuItem>
                    <MenuItem value={"VILLA"}>VILLA</MenuItem>
                  </Select>
                </>
              )}
            />

            <Controller
              name="isFeatured"
              control={controlAddListing}
              render={({ field }) => (
                <>
                  <InputLabel id="test-select-labell">isFeatured</InputLabel>

                  <Select
                    labelId="test-select-labell"
                    label="isFeatured"
                    {...field}
                    size="small"
                  >
                    <MenuItem value={false}>not Featured</MenuItem>
                    <MenuItem value={true}>Featured</MenuItem>
                  </Select>
                </>
              )}
            />

            <Controller
              name="pricePerNight"
              control={controlAddListing}
              rules={{ required: "pricePerNight is required!" }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  label="pricePerNight"
                  error={error}
                  helperText={error && error.message}
                />
              )}
            />

            <Controller
              name="location"
              control={controlAddListing}
              render={({ field }) => (
                <TextField {...field} fullWidth size="small" label="location" />
              )}
            />
            <Controller
              name="rating"
              control={controlAddListing}
              rules={{
                max: {
                  value: 5,
                  message: "Value must be greater than 5",
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  error={error}
                  helperText={error && error.message}
                  fullWidth
                  size="small"
                  label="rating"
                />
              )}
            />

            <Controller
              name="address"
              control={controlAddListing}
              render={({ field }) => (
                <TextField {...field} fullWidth size="small" label="address" />
              )}
            />

            <Controller
              name="guests"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  label="guests"
                />
              )}
            />

            <Controller
              name="bedrooms"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  label="bedrooms"
                />
              )}
            />

            <Controller
              name="beds"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  label="beds"
                />
              )}
            />

            <Controller
              name="bathrooms"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  type="number"
                  label="bathrooms"
                />
              )}
            />

            <Controller
              name="amenities"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="amenities"
                />
              )}
            />

            <Controller
              name="reviewsCount"
              control={controlAddListing}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  size="small"
                  label="reviewsCount"
                />
              )}
            />
            <Controller
              name="images"
              control={controlAddListing}
              render={({ field }) => (
                <TextField {...field} fullWidth size="small" label="images" />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
              loading={loadingAddListing}
            >
              Create
            </Button>
          </Stack>
        </form>
      </Container>
    );
  }
  return (
    <Container
      maxWidth="xs"
      sx={{ mt: { xs: 2, sm: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Link to="/">
        <Button variant="contained">Back to Home</Button>
      </Link>
      <br />
      <br />
      <Paper sx={{ p: { xs: 2, sm: 3 } }} elevation={3}>
        <form onSubmit={handleSubmit(handleS)}>
          <Stack spacing={2}>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              Admin login
            </Typography>

            {(apiError || authError) && (
              <Alert severity="error">{authError || apiError?.message}</Alert>
            )}

            <Controller
              name="email"
              control={control}
              rules={{ required: "Email is required." }}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email"
                  type="email"
                  size="small"
                  error={error}
                  helperText={error && error?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required!",
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
                  error={error}
                  label="Password"
                  helperText={error && error?.message}
                />
              )}
            />

            <Button
              loading={loading}
              type="submit"
              variant="contained"
              sx={{ mt: 1 }}
            >
              Login Admin
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}

export default AdminPanel;
