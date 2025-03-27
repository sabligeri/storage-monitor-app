import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { getUserData } from "../utils/getUserData";

const Home = () => {
  const [username, setUsername] = useState("Guest");

  useEffect(() => {
    const userData = getUserData();
    if (userData?.username) {
      setUsername(userData.username);
    }
  }, []);

  return (
    <Box sx={{ backgroundColor: "beige", color: "black" }}>

      <Box sx={{ backgroundColor: "beige", py: 5, px: 5, textAlign: "center" }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ px: 5 }}>
              <Typography variant="h2" fontWeight="bold">Storage Monitor</Typography>
              <Typography variant="h6" sx={{color: "grey"}}>Welcome, {username}! We have been expecting you!</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <img
              src="https://www.conceptstorage.com/wp-content/uploads/slider/cache/2ec57bf119cf754d61da89a5a2b9bfc2/CONCEPT-STORAGE-01.jpg"
              alt="Storage Monitoring"
              style={{ width: "100%", maxWidth: "700px", borderRadius: "8px", float: "right" }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ backgroundColor: "white", px: 5, color: "black", py: 5 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <img
              src="https://www.allstoragesystems.com.au/wp-content/uploads/2021/07/home-hero-warehouse.jpg"
              alt="Storage Management"
              style={{ width: "100%", maxWidth: "700px", borderRadius: "8px" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ px: 5 }}>
              <Typography variant="h4" fontWeight="bold">About Us</Typography>
              <Typography variant="h6">
                Storage Monitor is a web application that allows you to monitor your storage usage by providing real-time data and insights.
                Monitoring was difficult in the past, but now it's easy. You can keep track of your items in your storages,
                create and use item types to filter the items. You can also simulate the production of products and see if
                you have enough stock to make them.
              </Typography>

            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ py: 6, px: 4, color: "black" }}>
        <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 4 }}>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {[
            {
              title: "Storage Management",
              desc: "Create and manage your personal storages.",
              img: "https://assets.enterprisestorageforum.com/uploads/2021/01/storage-management.png",
              link: "/storagelist",
            },
            {
              title: "Item Management",
              desc: "Track, filter and update your stored items.",
              img: "https://8466950.fs1.hubspotusercontent-na1.net/hubfs/8466950/shutterstock_2232272531.jpg",
              link: "/storagelist",
            },
            {
              title: "Product Management",
              desc: "Define and organize your product compositions.",
              img: "https://jelvix.com/wp-content/uploads/2021/01/product-management.png",
              link: "/products",
            },
            {
              title: "Production Simulation",
              desc: "Check if your storages can support production.",
              img: "https://storiesonboard.com/blog/wp-content/uploads/2022/08/product-management-process-2-1.png",
              link: "/production",
            }
          ].map((service, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="180"
                  image={service.img}
                  alt={service.title}
                />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">{service.title}</Typography>
                  <Typography variant="body2" sx={{ mb: 2, textAlign: "left" }}>{service.desc}</Typography>
                  <Button variant="outlined" fullWidth href={service.link}>Explore</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box sx={{ textAlign: "center",color: "black"}}>
        <Typography variant="body2">© Storage Monitor, Inc. All rights reserved.</Typography>
      </Box>
    </Box>
  );
};

export default Home;
