import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Head from 'next/head'  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import TextField from '@mui/material/TextField';
import { useRouter } from "next/router";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';



export default function SignIn(){
  const [users, setUsers] = useState()
  const router = useRouter();
  const NotifyContainer = <ToastContainer
    position="bottom-center"
    autoClose={2000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />

  const handleSubmit = async (event) => {
event.preventDefault();

const data = new FormData(event.currentTarget);
  const userid = data.get('id')
  const password = data.get('password')
const resultado = await axios.post('/api/login',{
  userID: userid,
  password: password
}).then(async(res) => {
  if(res.data.message == 'invalid') {
  return  toast.error('ID e Senha incorreta!', {theme: 'colored'})
  }
    
  if(!res.data.dataUser.fa){



if(res.data.message == 'logged'){

if(res.data.dataUser.Ban == true){
  return toast.error('Este usuario foi banido dos sistemas do LaionBOT, procure suporte no Discord!', {theme: 'colored'})
}

  if(res.data.token){
    Cookies.set('user', res.data.token, { expires: 3})
    router.push('/')
  }
}
  } else {
    if(res.data.message == 'logged'){

      if(res.data.dataUser.Ban == true){
        return toast.error('Este usuario foi banido dos sistemas do LaionBOT, procure suporte no Discord!', {theme: 'colored'})
      }

      if(res.data.token){


        const id = jwt.decode(res.data.token).id
        const token2fa = jwt.sign({
          id: id
        }, 'JWT.2FATOKEN', {
          expiresIn: '300'
        })
      const valorCookie = Cookies?.get('TwoFA')
if(valorCookie !== token2fa){
  Cookies.remove('TwoFA')
  Cookies.set('TwoFA', token2fa, { path: '/2FA'})
} 
        router.push('/2FA')
        const DoisFatores = await axios.get(process.env.NEXT_PUBLIC_VERCEL_URL+'/api/2fa/'+id)
      }
    }
  }
 
  
})

  }
  return (
    <>
    <Head>
    <title>Login - LaionBOT</title>
  </Head>
      <Container component="main" maxWidth="xs">
        {/* <CssBaseline /> */}
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ mt: 3, mb: 2, backgroundColor: '#8C7CF0'}}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
           Login para painel adminstrativo
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="id"
              label="ID do usuario"
              name="id"
              type="text" 
              placeholder='Seu ID'
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              placeholder='Sua senha'
            />
          
            <Button
            
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                {NotifyContainer}
  
              </Grid>
             
              
            
            </Grid>
          </Box>
        </Box>
      
      </Container>
      </>
  );
        }
      

        export async function getServerSideProps({ req, res }) {
          const id = req.cookies.user || null
          if(id !== null){
            res.writeHead(303, { Location: '/' });
            res.end();
          return {
            props: { }, 
          }
        } else {
          
          return {
            props: { }, 
          }
        
        }
        
      
          
        
        }
