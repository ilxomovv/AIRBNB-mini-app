import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import Rating from "@mui/material/Rating";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  InputLabel,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate, useParams } from "react-router";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAuth } from "../Store/useAuth";
import { useState } from "react";
import { Atom } from "react-loading-indicators";

const DETAILS = gql`
  query Query($listingId: ID!) {
    listing(id: $listingId) {
      title
      reviewsCount
      rating
      pricePerNight
      location
      isFeatured
      images
      isFavorite
      id
      guests
      description
      createdAt
      category
      beds
      bedrooms
      bathrooms
      amenities
      address
    }
  }
`;

const CreateBookings = gql`
  mutation Mutation(
    $checkIn: String!
    $checkOut: String!
    $guests: Int!
    $listingId: ID!
  ) {
    createBooking(
      checkIn: $checkIn
      checkOut: $checkOut
      guests: $guests
      listingId: $listingId
    ) {
      checkIn
      checkOut
      guests
      pricePerNight
      status
      totalNights
      totalPrice
      id
    }
  }
`;

function ListingsDetail() {
  const { control, handleSubmit } = useForm();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { accessToken } = useAuth();

  const { id } = useParams();
  const { data, loading, error } = useQuery(DETAILS, {
    variables: { listingId: id },
  });
  const [createBooking, { loading: bookingLoading }] = useMutation(
    CreateBookings,
    {
      onCompleted: (data) => {
        toast.success("successfully bookings");
      },
      onError: (err) => {
        toast.error(err.message);
      },
    },
  );
  const handleS = (formData) => {
    if (!accessToken) {
      setDialogOpen(true);
      return;
    }
    createBooking({
      variables: {
        listingId: id,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: parseInt(formData.guests, 10),
      },
    });
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Atom
          color="#32cd32"
          size="medium"
          text="Loading..."
          textColor="#c49696"
        />
      </div>
    );
  }
  console.log(data);

  const listing = data?.listing;
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Typography variant="h5">
        <IconButton onClick={() => navigate(-1)}>
          <ArrowBackIosIcon />
          Back
        </IconButton>
      </Typography>
      <br />
      <br />

      {error && (
        <Typography variant="h1" color="error">
          {error.message}
        </Typography>
      )}
      {listing && (
        <Container key={listing.id}>
          {Array.isArray(listing.images) &&
            listing.images.map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`${listing.title} - ${index + 1}`}
                style={{
                  width: "350px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
            ))}

          <Stack direction="row" sx={{ alignItems: "center", gap: 35 }}>
            <Typography variant="h4">{listing.title}</Typography>
            <Paper sx={{ padding: 1 }} elevation={3}>
              <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
                <LocalOfferIcon color="action" fontSize="small" />
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  The price includes all fees
                </Typography>
              </Stack>
            </Paper>
          </Stack>
          <Stack direction="row" sx={{ gap: 1 }}>
            <Typography variant="h6">{listing.guests} Guests •</Typography>
            <Typography variant="h6"> {listing.bedrooms} Bathroom •</Typography>
            <Typography variant="h6">{listing.beds} Beds •</Typography>
            <Typography variant="h6">
              {listing.bathrooms} Bathrooms •
            </Typography>
            <Typography variant="h6">{listing.category} •</Typography>
            <Typography color="success" variant="h6">
              {listing.rating} Rating
            </Typography>
          </Stack>
          <br />
          <Divider />
          <br />
          <Stack>
            <Stack direction="row" spacing={70}>
              <Stack>
                <Typography variant="h4">Address: </Typography>
                <br />
                <Typography variant="h6">{listing.address}</Typography>
                <br />
                <Typography variant="h4">Location: </Typography>
                <Typography variant="h6">{listing.location}</Typography>
              </Stack>
              <Paper elevation={4}>
                <Stack sx={{ padding: 2 }}>
                  <Stack direction="row" spacing={0.6}>
                    <Typography color="textDisabled" variant="h5">
                      <del>$512</del>
                    </Typography>
                    <Typography variant="h5">
                      ${listing.pricePerNight}
                    </Typography>
                    <Typography variant="h6" color="textDisabled">
                      for 1 nights
                    </Typography>
                    <br />
                    <br />
                  </Stack>
                  <Stack direction="row" spacing={1}>
                    <Stack>
                      <InputLabel>CheckIn: </InputLabel>
                      <Controller
                        name="checkIn"
                        control={control}
                        rules={{
                          required: "don't be empty",
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={error}
                            type="date"
                            size="small"
                            helperText={error && error.message}
                          />
                        )}
                      />
                    </Stack>
                    <Stack>
                      <InputLabel>CheckOut: </InputLabel>
                      <Controller
                        name="checkOut"
                        control={control}
                        rules={{
                          required: "don't be empty",
                        }}
                        render={({ field, fieldState: { error } }) => (
                          <TextField
                            {...field}
                            error={error}
                            type="date"
                            size="small"
                            helperText={error && error.message}
                          />
                        )}
                      />
                    </Stack>
                  </Stack>
                  <Stack>
                    <br />
                    <Controller
                      name="guests"
                      control={control}
                      rules={{
                        required: "don't be empty",
                      }}
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          error={error}
                          label="Guests"
                          type="number"
                          size="small"
                          helperText={error && error.message}
                        />
                      )}
                    />
                    <br />
                    <Button
                      onClick={handleSubmit(handleS)}
                      variant="contained"
                      color="error"
                      loading={bookingLoading}
                    >
                      Reserve
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Stack>
            <br />

            <Divider />
            <br />
            <Typography variant="h5">
              {listing.isFavorite === true
                ? "This list has been added to favorites"
                : "This listing has not been added to favorites."}
            </Typography>
            <br />
            <Typography variant="h4">Amenities: </Typography>
            <br />
            {listing.amenities.map((e) => (
              <Typography key={e} variant="h5">
                • {e}
              </Typography>
            ))}
          </Stack>
          <br />
          <Divider />
          <br />
          <Typography variant="h4">Description: </Typography>
          <br />
          <Typography variant="h6">{listing.description}</Typography>
          <br />
          <Divider />
          <br />
          <Typography variant="h4">Comments: {listing.reviewsCount}</Typography>
          <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>You are not registered.</DialogTitle>
            <DialogActions>
              <Link to="/sign">
                <Button variant="outlined">Sing Up</Button>
              </Link>

              <Link to="/login">
                <Button variant="contained">Log In</Button>
              </Link>
            </DialogActions>
          </Dialog>
        </Container>
      )}
    </Container>
  );
}
export default ListingsDetail;
