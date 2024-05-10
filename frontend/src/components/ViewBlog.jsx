import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ViewBlog = () => {
  var [data, setData] = useState([]);
  var [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3008/api/viewall").then((res) => {
      setData(res.data);
    });
  }, []);

  const updateVal = (data) => {
    setUpdate((update = true));
    console.log("up", update);
    navigate("/add", { state: { data, update } });
  };
  return (
    <div style={{ margin: "6%" }}>
      <Grid container spacing={2}>
        {data.map((val, i) => {
          return (
            <Grid item xs={12} sm={4} md={4} key={i}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={val.image}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" compo nent="div">
                    {val.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {val.post}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Delete</Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      updateVal(val);
                    }}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default ViewBlog;
