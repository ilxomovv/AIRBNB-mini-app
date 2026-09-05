import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deepOrange } from "@mui/material/colors";

function Navbar({ accessToken, setDialogOpenProf, user }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 0 }}
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        padding: { xs: "10px", sm: "10px 20px" },
      }}
    >
      <Stack>
        <Link to="/">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8OrlP3IdXiC90WzVUJZrn8GB9FID8hTVViUkv_7ZKNg&s=10"
            alt=""
            width={126}
            height={46}
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Link>
      </Stack>
      <Stack
        direction="row"
        spacing={{ xs: 1, sm: 3 }}
        sx={{
          justifyContent: "flex-end",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link style={{ textDecoration: "none" }} to="/listings">
          <Stack direction="row" sx={{ alignItems: "center" }} spacing={1}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1WNMbiNOAFmvUlK9LmrLBhfohVRymbdP208cHWAqNUg&s=10"
              width={30}
              height={30}
              alt=""
            />
            {!isMobile && <Typography>Homes</Typography>}
          </Stack>
        </Link>
        {accessToken && (
          <Link style={{ textDecoration: "none" }} to="/bookings">
            <Stack sx={{ alignItems: "center" }} direction="row" spacing={1}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHJoqH8MbIOJpIfoYSkjJT4GckawQfdH_-gG9If4dhrA&s=10"
                width={30}
                height={30}
                alt=""
              />
              {!isMobile && <Typography>Bookings</Typography>}
            </Stack>
          </Link>
        )}
        {accessToken && (
          <IconButton size="small">
            <Link to="/favorites">
              <FavoriteBorderIcon fontSize={isMobile ? "small" : "medium"} />
            </Link>
          </IconButton>
        )}
        {!accessToken ? (
          <Stack direction="row" spacing={1}>
            <Link to="/sign" style={{ textDecoration: "none" }}>
              <Button variant="outlined" size={isMobile ? "small" : "medium"}>
                Sign-Up
              </Button>
            </Link>

            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button variant="contained" size={isMobile ? "small" : "medium"}>
                Log-In
              </Button>
            </Link>
          </Stack>
        ) : (
          <Stack
            spacing={1}
            direction="row"
            sx={{ justifyContent: "flex-end" }}
          >
            <Box
              sx={{
                width: { xs: 40, sm: 50 },
                height: { xs: 40, sm: 50 },
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              <Avatar
                sx={{
                  bgcolor: deepOrange[700],
                  width: { xs: 40, sm: 50 },
                  height: { xs: 40, sm: 50 },
                  cursor: "pointer",
                }}
                sizes="(max-width: 600px) 48px, 96px"
                onClick={() => setDialogOpenProf(true)}
              >
                {user?.name.charAt(0).toUpperCase()}
              </Avatar>
            </Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}

export default Navbar;
