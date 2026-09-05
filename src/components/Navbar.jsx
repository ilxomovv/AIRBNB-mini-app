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
                src="data:image/jpeg;base64,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3/AEk5v8A/TfD/qfhf/s9v/uX3L3e9Nf+45f/AE23P/Xf4j/e93mX3L3b1/r/AOpuf+e8S+X40+H/AE13X9d+3d91l1vO8498v8t9/m1P803v698s/X8XvD1eH2m72/499v+6z/APv5T58T/wDPf/S2270G4L8J47S5m+4epye33f528T/aO8eI26mXiOP/AKf3f+1e/c4c6Gv5G+j1eXy//wCY7i//AEnf8u31+5w/2J4XpL/A2p/N8Xl0uXz/AHr76N4v20+o1vEfi1x/P+r4a35I2b/fXq35/X8Tvx6m/wBz+YxXb/61fI/u/m3/AOP6j1853/8A287m/tf6Dvf2/m/3/wDJ2/4L1vCfj+5fA88P3S/f2O/x/E+92+f8zX/y5y/33j+08X59/S5fL/ffo94vx/m7l6vE5/wD39vX8J+3/AJ/ffv8AmG8i+I27t5fGv6m8bf327m4/v4G/u3r/AOfd3+B8b12/a15+7/W8N9+4v4pL+f/4Lq+O9s/3994/s8eJ/u9f3bfv3l909bfv2aXvf09+3z394X172/f3e/w/0a+6X784/XvA/X8S842f1f3P/v2X/AHm13+bf0/wG6X3T3d2/6fze+3P42t43/evs8/f84394fH328vXp57T7+6b1f23/S3v2N7e8p/2N4X333m3f8S+9N9+/vvD2X3D+/9y3v2m3vMbd3qXvfe/e/3m9vd/d4x393m9S/6H3/E6/v7vf3e/vvF6b1/f0/aP3v3zeN1f1e/fM3/k84e/51N+/sXvfeXq9P8AUb/zfxP3p9f2Xv2f69y97vvv230/a/ze5e92Xm3/AH4fX9f52vvvAn413/U5e/3m/eS4/vf5/ff/AHm2f9X3S39m99313+T/AHzf53G1vfe/u4/f3p9+9vveHqbf8v431/be97e93vv/AHv399m3r/q+9m+4f/M6v7pve+S43v8Afe+2/fP3/D3i9N3/ANu5ef5193vv63vL/E1t96e9594fH9N7e9/m/vff093n/fvz29P9l2+6N/e/vf2/o9vd/dve+5v6+/evv8A2v6X6Wp/sXb+s36e1S2s9f41t/ve39z/AHzf9x396ff2/u7230/3/wCvevfd/e32/s9x1a2/a/473f324393v8/mPfff7m3vNvf52e9f39/efN3s4b8/s+S43/iX911/N/e/P194/t9rX9Xz/c/f3T9p3/AHl5f5X9/fvM+/uvfL3zeH933N5d7fub+4fX/aXm/m/zefeb5+4/fvf3vvffvv23497d3ze62/evvv294fH9931393vS2+f+/f8AW33re8Pj/X7ve93e29/X7x9v6n+Z931vf3i6m72a2++/x7/pL43/AH328X5/mbf8+8f598vfv3/PvvD133vv7p9e4uv7r2a/v++432+8Pvb7vvvv31L434aX4e/S2++/e33m3vH+f2s22+/52726nv3e9fve/6334fH9X728/6s7Nffvvfe89+0X42++/e+/wB3fG/q98f/AH2f3vv2/e/r52a23393ve33+fL3b3+a/wB3f4vf3943p7+a4v9vd9feG932/re39Xf/AHvv36m/u8vXpffL/S8p3d5vv91vd++83p2/a2233f2vfL9/e35vD/q13f3Tf3v2ff9ve7e8m5e/vvNvd4uvfv52a3vvvvvvv293i9+/u4f3d2433fL7reL03r++4uvvefe3/U5b5ve9/eLp/mN3+fvv95ff8Ovv+6S43+fffe+/wAt4/X8/uf3reL3d++vv3S9++98f1evvv394vT+t94vffvvveL03fv3veL0v39/eLqX+/u3vvd9veL3/f5m1/vff1v03i+N38f/AH/a3i/m9/vv3e+I91729/e5bfu7l7NzeXq/a/u5fX+s2a2m8ve6S3vvvvvefdf906+/eS43++/e/f3p9+fL4//f3f6e9t6+3vF5f43+/vvb3r/U5fe+97e+8f23f33/8AZve3f/S+N6e/uXp/W+8X3x1a9XfvLp+q1/eL/X2m0vf9p3Nvbze0bS3dveL83/G2u59fL/s/3i+6+/e+5evfe++2v3/eL42+3X3m+5eXq1/32fX94f8Af53fLffuN1O9rXfe7233a7e0+s3e+8f4+m8/X9f/AHl9591vfL2vf3i/vf6m03fe/a/f93n++/veb8f8/e30+e5e/wCv8Gvv3i82m/3962++34v843X/AFm1vb/5e/e+1vf1m03X3ze7S972l8a/53tL0/vv3X1f9xvb95ev02f4+veXm+vefeXre72+/wBrS2e3vvN5bzeL0a37u/vvff4Xf95ve9594Xvv94/1m23vfe/z5/q3eX3eL8f+/m3t/ff/AG3p43vG2931pbfN/ef5v55931/S8vXvbve/eb/Pvv2+9L53l3d91vfd5fvv3t4vvTvf3j2f6vXv23r7vJd/pA2e/wC0bfz2v+73G9e++S435v3d69++G/D3vv2/e/r5vNbfvv1vG3p5vvD7++9e33s3ve/4fO8+/fe/vv8As0/f3XzeL/e13f4S+6fv63/SffvePvv3029vfvG9vf8Ad79427Xv/P7vO/y19119++vveb1+/m9fe9+81/25t4/ve8fvv7j/AAnze5e38/fv7m+3f/feL8/8fS/09427feL++/51/wC6X2Xze12/vv3i7e3fv9293a9/39316719+3vF5f3ze+/vf/d4+X3933e8fv38f997ve/u+/e/3l/e/f3evvv/vv294en3m0+43f5N73+/e95v6ze+9/l7vev9/eb7a++/u729m939fe8/wDvfvL4/veve7m+7f3i9/693t/dveNvd++f8ze/+veG295+tv3v3evX3j/S2/d7m1/l94vXfeL3l3vze8ffvvfePvvS+/e/fe8bb+e/0vf333X1/p9/fe+m8v3962/a9/mXv499vH2f62/vebXv3XvvL7f+3vfdff8/3i8f4+3f6Wv9++P+Lvf96X2Xv2/ve+63e/fF/9+0vfvvvb8/1/eLre9vv7X/W24/b4x1evX8/Xfe/vv4e773295+fvvv28f6ze++/fe82Xvv3m9vfv5vvveb3S3ffN5fvevvfvvHvvvfv2f3+ftP2ve++Xrf4853t/wDLv33fS+m93vvfvf78e4f5v/03/wD2Q=="
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
