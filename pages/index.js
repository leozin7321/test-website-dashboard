import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import Footer from 'src/components/Footer';
import jwt from 'jsonwebtoken'

import { Grid, Container } from '@mui/material';
import ProfileCover from 'src/content/Management/Users/details/ProfileCover';
import RecentActivity from 'src/content/Management/Users/details/RecentActivity';
import Feed from 'src/content/Management/Users/details/Feed';
import axios from 'axios';
import PopularTags from 'src/content/Management/Users/details/PopularTags';
import Cookies from 'js-cookie';
import { useRouter } from "next/router";
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 function ManagementUserProfile({user, id, users, infos}){
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Informação do BOT - Diamonds Store</title>
      </Head>
      <ToastContainer />
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid 
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={8}>
            <ProfileCover user={user} />
          </Grid>
          <Grid item xs={12} md={4}> 
            <RecentActivity infos={infos} />
          </Grid>
          {/* <Grid item xs={12} md={8}>
            <Feed users={user}/>
          </Grid> */}
          <Grid item xs={12} md={4}>
            <PopularTags />
          </Grid>
          {/* <Grid item xs={12} md={7}>
            <MyCards />
          </Grid>
          <Grid item xs={12} md={5}>
            <Addresses />
          </Grid> */}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export async function getServerSideProps({ req, res }) {
  const id = req.cookies.user || null
  // const verifyToken = jwt.verify(id, process.env.JWT_SECRET_KEY)
  const decoded = jwt.decode(id)
    if(decoded == null){
    res.writeHead(303, { Location: '/login' });
    res.end();
  return {
    props: {user: null, id}, 
  }
} else {
  const userApi = await fetch('/infobot/'+decoded)
  .then(r => r.json())
  
  const infosApi = await fetch('/api/infogeral/'+decoded)
  .then(r => r.json())
  .catch(console.error)
  return {
    props: {user: userApi, id, infos: infosApi}, 
  }
}
}

export default ManagementUserProfile;
