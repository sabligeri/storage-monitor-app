import { Box, Typography } from "@mui/material";

export const LoadingScreen = () => (
  <Box
    sx={{
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <Box
      sx={{
        border: "16px solid #dbd2d2",
        borderRadius: "50%",
        borderTop: "16px solid #942323",
        width: 120,
        height: 120,
        animation: "spin 2s linear infinite",
        "@keyframes spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      }}
    />
  </Box>
);

export const ErrorScreen = ({ error }: { error: string }) => (
  <Box
    sx={{
      margin: "auto",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "x-large",
      fontWeight: "bold",
      fontStyle: "italic",
      color: "orange",
    }}
  >
    <i className="bi bi-cone-striped"></i>
    <Typography sx={{ mx: 1 }}>{error}</Typography>
    <i className="bi bi-cone-striped"></i>
  </Box>
);
