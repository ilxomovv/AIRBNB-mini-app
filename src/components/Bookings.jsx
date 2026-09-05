import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../Store/useAuth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Atom } from "react-loading-indicators";
import { toast } from "react-toastify";

const BOOKINGS_API = gql`
  query Query {
    bookings {
      checkIn
      checkOut
      createdAt
      guests
      id
      pricePerNight
      status
      totalNights
      totalPrice
      listing {
        id
        images
        location
        pricePerNight
        title
      }
    }
  }
`;

const CancelBookings = gql`
  mutation Mutation($bookingId: ID!) {
    cancelBooking(bookingId: $bookingId) {
      id
    }
  }
`;

function Bookings() {
  const { data, loading, error, refetch } = useQuery(BOOKINGS_API);
  const { accessToken } = useAuth();
  const [cancelBookingss] = useMutation(CancelBookings, {
    onCompleted: () => refetch(),
  });
  const navigete = useNavigate();
  console.log(data);

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
  if (error) {
    return toast.error(error.message);
  }

  const handleRemove = (bookingId) => {
    if (accessToken) {
      cancelBookingss({ variables: { bookingId } });
    }
  };
  const activeBookings = data?.bookings?.filter(
    (e) => e.status !== "CANCELLED",
  );
  const malumot = activeBookings.length;

  return (
    <Container>
      <IconButton onClick={() => navigete(-1)}>
        <ArrowBackIosIcon /> Back
      </IconButton>
      <Typography color="textDisabled" variant="h3">
        {malumot === 0 ? "no information" : null}
      </Typography>
      <Grid container spacing={2}>
        {activeBookings.map((e) => (
          <Grid key={e.id} size={{ xs: 12, sm: 6.5, md: 3.5 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "170px",
                borderRadius: 3,
                overflow: "hidden",
              }}
            >
              <Link
                to={`/listings/${e.listing.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={e.listing.images[0]}
                  alt={e.listing.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Link>

              <IconButton
                onClick={() => handleRemove(e.id)}
                sx={{
                  position: "absolute",
                  top: 8,
                  backgroundColor: "white",
                  right: 8,
                  "&:hover": {
                    backgroundColor: "white",
                  },
                }}
              >
                <ClearIcon color="error" />
              </IconButton>
            </Box>
            <Link
              to={`/listings/${e.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" sx={{ mt: 1 }}>
                {e.listing.title}
              </Typography>
            </Link>
            <Stack direction="row" spacing={1}>
              <Typography>{e.listing.location} • </Typography>
              <Typography>
                ${e.pricePerNight} / {e.totalNights} night
              </Typography>
              <Typography>Total: ${e.totalPrice}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default Bookings;
