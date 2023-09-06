import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Box, Tabs, Tab } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  const toolbarStyle = {
    backgroundColor: '#000000', // Change this to your desired color
  };
  
  const [value, setValue] = useState();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar style={toolbarStyle}>
          <Typography variant="h4">YoSecure</Typography>
          <Box sx={{marginLeft: "auto"}}>
            <Tabs textColor="inherit" onChange={(e,val) => setValue(val)} value={value}>
              <Tab to = "/login" LinkComponent = {Link} label = "Login"/>
              <Tab to = "/signup" LinkComponent = {Link} label = "SignUp"/>
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
