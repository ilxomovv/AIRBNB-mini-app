import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 10,
        pt: 5,
        pb: 3,
        bgcolor: "#fafafa",
        borderTop: "1px solid #ddd",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Support
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/help"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Help Center
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/help"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Get help with a safety issue
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/aircover"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  AirCover
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/help/article/2697"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Travel insurance
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/help/article/2867"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Anti-discrimination
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/accessibility"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Disability support
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/help/article/169"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Cancellation options
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/help"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Report neighborhood concern
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Hosting
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/host/homes"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Airbnb your experience
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/resources/hosting-homes"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Hosting resources
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/resources/hosting-homes"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Join a free hosting class
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/host/homes"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Refer a host
                </Link>
              </Box>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Airbnb Clone
            </Typography>
            <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://news.airbnb.com/"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  2026 Summer Release
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://news.airbnb.com/"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Newsroom
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://investors.airbnb.com/"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Investors
                </Link>
              </Box>
              <Box component="li" sx={{ mb: 1.5 }}>
                <Link
                  href="https://www.airbnb.com/giftcards"
                  underline="none"
                  color="inherit"
                  sx={{ fontSize: "14px", "&:hover": { underline: "always" } }}
                >
                  Gift cards
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            mt: 5,
            pt: 3,
            borderTop: "1px solid #ddd",
            textAlign: "center",
          }}
        >
          <Typography variant="body2" color="text.primary">
            © {new Date().getFullYear()} Airbnb, Inc. ·{" "}
            <Link
              href="https://www.airbnb.com/help/article/2855"
              underline="none"
              color="inherit"
            >
              Privacy
            </Link>{" "}
            ·{" "}
            <Link
              href="https://www.airbnb.com/terms"
              underline="none"
              color="inherit"
            >
              Terms
            </Link>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
