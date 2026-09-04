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
import ReplyAllIcon from "@mui/icons-material/ReplyAll";
import ClearIcon from "@mui/icons-material/Clear";
import { useAuth } from "../Store/useAuth";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const favoritesData = gql`
  query Fav {
    favorites {
      title
      images
      id
      location
      pricePerNight
      rating
    }
  }
`;
const RemoveFavorite = gql`
  mutation remove($listingId: ID!) {
    removeFavorite(listingId: $listingId) {
      id
    }
  }
`;
function Favorites() {
  const { data, loading, error, refetch } = useQuery(favoritesData);
  const [removeFavorite] = useMutation(RemoveFavorite, {
    onCompleted: () => refetch(),
  });
  const handleFavoriteInclude = (listingId) => {
    if (accessToken) {
      removeFavorite({ variables: { listingId } });
    }
  };
  const navigate = useNavigate();
  const { accessToken } = useAuth();

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
  const malumotBorYokiYoq = data?.favorites;

  return (
    <Container>
      <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIosIcon />}>
        Back
      </Button>
      <h1>{malumotBorYokiYoq.length === 0 ? "no information" : null}</h1>
      <Grid container spacing={2}>
        {data?.favorites?.map((e) => (
          <Grid size={{ xs: 11, sm: 6, md: 3 }} key={e.id}>
            <Stack spacing={1}>
              <Box
                sx={{ position: "relative", width: "100%", height: "180px" }}
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
                  <ClearIcon />
                </IconButton>
              </Box>
              <Typography variant="h5">{e.title}</Typography>
              <Stack direction="row" spacing={1}>
                <Typography variant="subtitle2">
                  ${e.pricePerNight} / night •
                </Typography>
                <Typography variant="body2">{e.location} •</Typography>
                <Typography variant="body2"> {e.rating}</Typography>
              </Stack>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
export default Favorites;
