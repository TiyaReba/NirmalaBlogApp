import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AddBlog = ({props,update}) => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log("loca", location.state);

  var [post, setPost] = useState({title:'',post:'',image:''});

  const inputHandler = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    console.log(post);
  };

  useEffect(() => {
    if (location.state != null) {
      setPost({
        ...post,
        title: location.state.data.title,
        post: location.state.data.post,
        image: location.state.data.image,
      });
      // console.log('useee',location.state.data.title)
    } else {
      // setPost({ ...post, title: "", post: "", image: "" });
    }
  }, []);

  // const addPost = () => {
  //   console.log("btn", post);
  //   axios
  //     .post("http://localhost:3008/api/addblog", post)
  //     .then((res) => {
  //       alert(res.data.message);
  //       navigate("/view");
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };


  const addPost = ()=>{
    if(location.state!=null){
      axios.put("http://localhost:3008/api/edit/"+location.state.data._id,post)
      .then((res)=>{
        if(res.data == "Updated successfully"){
          alert(res.data)
          navigate('/view')
        }else{
          alert("user not found")
        }
      })
      
    }
    else{
      axios.post("http://localhost:3008/api/addblog",post)
      .then((res)=>{
        alert(res.data);
        navigate('/view')
      })
    }
  }

  return (
    <div style={{ margin: "4%" }}>
      <Typography>Add Blogs</Typography>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            variant="outlined"
            label="post title"
            fullWidth
            value={post.title}
            name="title"
            onChange={inputHandler}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            variant="outlined"
            label="Type a post"
            value={post.post}
            multiline
            fullWidth
            rows={10}
            name="post"
            onChange={inputHandler}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <TextField
            variant="outlined"
            label="IMAGE URL"
            fullWidth
            value={post.image}
            name="image"
            onChange={inputHandler}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Button variant="contained" color="secondary" onClick={addPost}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddBlog;
