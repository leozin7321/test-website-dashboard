import Head from 'next/head';
import SidebarLayout from 'src/layouts/SidebarLayout';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';
import jwt from 'jsonwebtoken'
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
    Button,
    IconButton,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider
} from '@mui/material';
import { useRouter } from 'next/router';
import Footer from 'src/components/Footer';
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const currencies = [
  {
    value: 'USD',
    label: '$'
  },
  {
    value: 'EUR',
    label: '€'
  },
  {
    value: 'BTC',
    label: '฿'
  },
  {
    value: 'JPY',
    label: '¥'
  }
];

function ChangeInfos({ user, id }) {
  const router = useRouter();
    const NotifyContainer = <ToastContainer
    position="bottom-right"
    autoClose={3000}
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
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');



if(!oldPassword  || !newPassword ) return toast.warn('Insira as informações no espaço a esquerda!', {theme: "colored"})
if(user.Password !== oldPassword) return toast.error("Senha atual invalida!", {theme: "colored"}); 
if(user.Password == newPassword) return toast.error("Você nao pode definir a mesma senha!", {theme: "colored"}); 

 const setPasswordApi = await axios.post(process.env.NEXT_PUBLIC_API_URL+'/api/setsenha', {
    novaSenha: newPassword,
    id: id,
 })

toast.success('Senha atualizada com sucesso, irei te enviar para pagina principal', {theme: "colored"}) 
return setTimeout(() => {
  router.push('/')
}, 3000);
}
  

  return (
    <>
      <Head> 
        <title>Alteração de informações - LaionBOT</title>
      </Head>
      <PageTitleWrapper>
        <PageTitle
          heading="Alteração de dados"
          subHeading="Siga os passos abaixos para mudar seus dados registrados "
        />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Perguntas para alteração de dados" />
              <Divider />
              <CardContent>
                <Box 
                onSubmit={handleSubmit}
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                    type='password'
                      required={true}
                      id="oldPassword"
                      disabled={true}
                      name="oldPassword"
                      label="Insira seu nome de usuario"
                     
                    />
                    <TextField
                    type='password'
                      required={true}
                      id="newPassword"
                      name="newPassword"
                      disabled={true}
                      label="Insira seu novo codigo de autorização"
                    />
                     <Button sx={{ margin: 1.7 }} type="submit"  disabled variant="contained" size="medium" color="success">
                  Enviar formulario (Desativado)
                </Button>  
                {NotifyContainer}
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

ChangeInfos.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;


export async function getServerSideProps({ req, res }) {
    const id = req.cookies.user || null
    const decoced = jwt.decode(id)
    if(id == null){
      res.writeHead(303, { Location: '/login' });
      res.end();
    return {
      props: {user: null}, 
    }
  } else {
    const userApi = await fetch(process.env.NEXT_PUBLIC_API_URL+'/api/infouser/'+decoced.id)
    .then(r => r.json())
    .catch(console.error)
   
    return {
      props: {user: userApi, id}, 
    }
  }
}
export default ChangeInfos
