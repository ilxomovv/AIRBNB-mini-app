import { gql } from "@apollo/client";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client/react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../Store/useAuth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link } from "react-router";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import Navbar from "./Navbar";

const addQueary = gql`
  mutation addFavorites($listingId: ID!) {
    addFavorite(listingId: $listingId) {
      id
    }
  }
`;

const Listingsss = gql`
  query Listings($limit: Int, $page: Int, $search: String) {
    listings(limit: $limit, page: $page, search: $search) {
      items {
        id
        title
        pricePerNight
        rating
        images
        amenities
      }

      pagination {
        totalPages
      }
    }
  }
`;

function Listings() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hello, { data, loading, error }] = useLazyQuery(Listingsss);
  const [favorites, setFavorites] = useState([]);
  const { accessToken, logout, user } = useAuth();

  useEffect(() => {
    hello({
      variables: { limit: 10, page: page, search: search },
    });
  }, [page]);
  const handleFavoriteClick = (itemId) => {
    if (!accessToken) {
      setDialogOpen(true);
      return;
    }

    if (favorites.includes(itemId)) {
      setFavorites(favorites.filter((id) => id !== itemId));
    } else {
      setFavorites([...favorites, itemId]);
      addFavorite({ variables: { listingId: itemId } });
    }
  };
  const [addFavorite] = useMutation(addQueary);
  const handleSearch = () => {
    hello({
      variables: { limit: 12, page: 1, search: search },
    });
  };
  const totolPages = data?.listings?.pagination?.totalPages;

  console.log(data);
  const [dialogOpenProf, setDialogOpenProf] = useState(false);
  if (loading) {
    return (
      <Typography style={{ textAlign: "center" }} variant="h3">
        Loading...
      </Typography>
    );
  }
  if (error) {
    return (
      <Typography style={{ textAlign: "center" }} variant="h3">
        {error.message}
      </Typography>
    );
  }

  return (
    <Container>
      <Navbar
        accessToken={accessToken}
        setDialogOpenProf={setDialogOpenProf}
        user={user}
      />
      <Stack direction="row" spacing={2}>
        <TextField
          label="search"
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          value={search}
        />
        <Button
          variant="contained"
          onClick={() => handleSearch()}
          startIcon={<SearchIcon />}
          loading={loading}
        >
          Search
        </Button>
      </Stack>
      <br />

      <Grid container spacing={4}>
        {data?.listings?.items?.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={item.id}>
            <Stack>
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
                  to={`/listings/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={item.images}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                </Link>

                <IconButton
                  onClick={() => handleFavoriteClick(item.id)}
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
                  {favorites.includes(item.id) ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>
              <Link
                to={`/listings/${item.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h6" sx={{ mt: 1 }}>
                  {item.title}
                </Typography>
              </Link>

              <Stack direction="row" sx={{ gap: 1, alignItems: "center" }}>
                <Typography>{item.pricePerNight} $ USD / Night • </Typography>
                <Typography>{item.rating}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <ButtonGroup sx={{ mt: 3 }}>
        {Array.from({ length: totolPages }, (_, index) => {
          const pageNum = index + 1;
          return (
            <Button
              key={pageNum}
              variant={page === pageNum ? "contained" : "outlined"}
              onClick={() => setPage(pageNum)}
            >
              {pageNum}
            </Button>
          );
        })}
      </ButtonGroup>
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
export default Listings;
