import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { useAuth } from "../Store/useAuth";
import { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Navbar from "./Navbar";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";

const DATA_HOME = gql`
  query Homee($limit: Int) {
    featuredListings(limit: $limit) {
      title
      rating
      pricePerNight
      images
      id
      location
    }
  }
`;

const addFavoritee = gql`
  mutation addFavorites($listingId: ID!) {
    addFavorite(listingId: $listingId) {
      id
    }
  }
`;

function HomePage() {
  const { data, loading, error } = useQuery(DATA_HOME, {
    variables: { limit: 15 },
  });
  const [favorites, setFavorites] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [addFavorite] = useMutation(addFavoritee);
  const { accessToken, user, logout } = useAuth();

  const handleFavoriteInclude = (listingId) => {
    if (!accessToken) {
      setDialogOpen(true);
    } else {
      addFavorite({ variables: { listingId } });
    }
    if (favorites.includes(listingId)) {
      setFavorites(favorites.filter((id) => id !== listingId));
    } else {
      setFavorites([...favorites, listingId]);
      addFavorite({ variables: { listingId: listingId } });
    }
  };
  const [dialogOpenProf, setDialogOpenProf] = useState(false);

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <Typography variant="h3">Loading...</Typography>
      </Container>
    );
  }
  if (error) {
    return (
      <Container sx={{ mt: 5 }}>
        <Typography color="error" variant="h4">
          Error: {error.message}
        </Typography>
      </Container>
    );
  }
  return (
    <Container>
      <Navbar
        accessToken={accessToken}
        setDialogOpenProf={setDialogOpenProf}
        user={user}
      />
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="h5">Popular homes in airbnb</Typography>
        <ArrowRightAltIcon />
      </Stack>

      <Grid container spacing={2}>
        {data?.featuredListings?.map((e) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={e.id}>
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
                to={`/listings/${e.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={e.images}
                  alt={e.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
              </Link>

              <IconButton
                onClick={() => {
                  handleFavoriteInclude(e.id);
                }}
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
                {favorites.includes(e.id) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Box>
            <Link
              to={`/listings/${e.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" sx={{ mt: 1 }}>
                {e.title}
              </Typography>
            </Link>
            <Stack direction="row" spacing={1}>
              <Typography>{e.location} • </Typography>
              <Typography>{e.pricePerNight} / night • </Typography>
              <Typography>★{e.rating}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
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
      <Dialog
        sx={{ padding: 2 }}
        open={dialogOpenProf}
        onClose={() => setDialogOpenProf(false)}
      >
        <DialogTitle>Profile settings</DialogTitle>
        <DialogContent>
          <Typography variant="h5">User name: {user?.name}</Typography>
          <Typography variant="h5">User email: {user?.email}</Typography>
          <br />
          <Stack direction="row" spacing={2}>
            <Link to="/favorites">
              <Button variant="outlined">Favorites</Button>
            </Link>

            <Link to="/bookings">
              <Button variant="contained">Bookings</Button>
            </Link>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDialogOpenProf(false)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              logout();
              setDialogOpenProf(false);
            }}
          >
            Log-out
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
export default HomePage;
