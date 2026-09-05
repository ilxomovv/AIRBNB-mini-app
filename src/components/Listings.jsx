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
  InputLabel,
  MenuItem,
  Select,
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
import { Atom } from "react-loading-indicators";
import Footer from "./Footer";

const addQueary = gql`
  mutation addFavorites($listingId: ID!) {
    addFavorite(listingId: $listingId) {
      id
    }
  }
`;

const Listingsss = gql`
  query Listings(
    $limit: Int
    $page: Int
    $search: String
    $category: ListingCategory
    $maxPrice: Int
    $minPrice: Int
  ) {
    listings(
      limit: $limit
      page: $page
      search: $search
      category: $category
      maxPrice: $maxPrice
      minPrice: $minPrice
    ) {
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

const CATEGORIES = ["APARTMENT", "HOUSE", "VILLA", "CABIN"];

function Listings() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hello, { data, loading, error }] = useLazyQuery(Listingsss);
  const [favorites, setFavorites] = useState([]);
  const { accessToken, logout, user } = useAuth();
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    hello({
      variables: {
        limit: 10,
        page: page,
        search: search || undefined,
        category: category || undefined,
        minPrice: minPrice ? parseInt(minPrice, 0) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      },
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
      variables: {
        limit: 12,
        page: 1,
        search: search || undefined,
        category: category || undefined,
        minPrice: minPrice ? parseInt(minPrice, 0) : undefined,
        maxPrice: maxPrice ? parseInt(maxPrice, 0) : undefined,
      },
    });
  };
  const totolPages = data?.listings?.pagination?.totalPages;

  console.log(data);
  const [dialogOpenProf, setDialogOpenProf] = useState(false);
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
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        sx={{ mb: 3, alignItems: "center" }}
      >
        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ flex: 2, width: "100%" }}
        />

        <TextField
          label="Min Price"
          type="number"
          size="small"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          sx={{ flex: 1, width: "100%" }}
        />

        <TextField
          label="Max Price"
          type="number"
          size="small"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          sx={{ flex: 1, width: "100%" }}
        />

        <Select
          size="small"
          value={category}
          displayEmpty
          onChange={(e) => setCategory(e.target.value)}
          sx={{ flex: 1, width: "100%" }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {CATEGORIES.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          onClick={handleSearch}
          startIcon={<SearchIcon />}
          sx={{ height: "40px", px: 3, width: { xs: "100%", md: "auto" } }}
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

              <Stack
                direction="row"
                sx={{ gap: 1, alignItems: "center", flexWrap: "wrap" }}
              >
                <Typography>{item.pricePerNight} $ USD / Night • </Typography>
                <Typography>{item.rating}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          py: 1,
        }}
      >
        <ButtonGroup sx={{ mt: 3, flexWrap: "wrap", justifyContent: "center" }}>
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
      </Box>

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
      <Footer />
    </Container>
  );
}
export default Listings;
