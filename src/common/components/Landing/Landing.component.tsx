import React from 'react';
import {FC, Fragment}  from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Image from 'next/image';
import Style from './Landing.module.css';

interface Props {
  setClickLogin: Function
}

const LandingComponent:FC<Props>=({setClickLogin})=> {
    
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '100vh' }} >
            <Image 
              src="/landing-page.jpg" 
              sizes='100vw' 
              fill 
              className={Style.imageBackground} 
              alt="logo"/>
            <div className={Style.bgText}>
              Collect Art from leading Aritst
              <Button variant="contained"
               onClick={() =>{setClickLogin()}}
               >
                Log in to Discover
              </Button>
              </div>
        </Box>
      </Container>
    </Fragment>
  );
}

export default LandingComponent;