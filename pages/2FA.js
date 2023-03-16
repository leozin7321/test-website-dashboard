import {
    Box,
    Card,
    Typography,
    Container,
    Divider,
    Button,
    FormControl,
    OutlinedInput,
    InputAdornment,
    styled
  } from '@mui/material';
  import jwt from 'jsonwebtoken'
  import Head from 'next/head';
  import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
  import useSWR from 'swr'
  import BaseLayout from 'src/layouts/BaseLayout';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useState } from 'react';
  
  const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  `
  );
  
  const TopWrapper = styled(Box)(
    ({ theme }) => `
    display: flex;
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: ${theme.spacing(6)};
  `
  );
  
  const OutlinedInputWrapper = styled(OutlinedInput)(
    ({ theme }) => `
      background-color: ${theme.colors.alpha.white[100]};
  `
  );
  
  const ButtonSearch = styled(Button)(
    ({ theme }) => `
      margin-right: -${theme.spacing(1)};
  `
  );
  
  
  function DuploFa({ user, id }) {
   const NotifyContainer = <ToastContainer
    position="top-center"
    autoClose={2000}
    hideProgressBar={true}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    const router = useRouter();
const [button, setButton] = useState(false)

 
    const handleSubmit = async (event) => {
      document.getElementById('submit').textContent = 'Processando…';
      setButton(true)
      event.preventDefault()
      const DoisFatores = await axios.get('/api/2fa/check/'+user.userID)

  
      
    

  if(DoisFatores.data == 'confirm_login'){
    
        const token = jwt.sign({
      id:user.userID,
      username:user.Username,
      coins: user.Coins,
      avatar: user.Avatar,
      banco: user.BancoCoins,
      VIP: user.VIP,
      DevBot: user.DevBot,
      Fa: user.fa
  }, 'JWT.Password', {
      expiresIn:'3d'
  })
         
           Cookies.remove('TwoFA')
           Cookies.set('user', token, {expires: 3 })
          
          
           const clearResult = await axios.get('/api/2fa/finaly/'+user.userID)
        router.push('/')
     

      } else if(DoisFatores.data == 'no_login'){
    
   
        toast.error("Autorização negada, você será levado a pagina de login!", {theme: "colored"}); 
        Cookies.remove('TwoFA')
        const clearResult = await axios.get('/api/2fa/finaly/'+user.userID)
        setTimeout(() => {
          router.push('/login')
        }, 4000);
      
      } else if(DoisFatores.data == 'not_response'){

      
          toast.error('Não houve resposta, tente novamente!', {theme: 'colored'})
        Cookies.remove('TwoFA')
      

setTimeout(() => {
  router.push('/login')
}, 4000);
      }
    
  }
  
    
    return (
      <>
        <Head>
          <title>Verificação - 2FA</title>
        </Head>
        <MainContent>
          <TopWrapper>
            <Container maxWidth="md">
              <Box textAlign="center">
              <img
                alt="Maintenance"
                height={250}
                src="/static/images/status/maintenance.svg"
              />
                <Typography variant="h2" sx={{ my: 2 }}>
                 Enviamos a confirmação -  2FA
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                 Autoriza a entrada na sua conta pela mensagem que o BOT enviou ao seu privado! (Após selecionar a opção no BOT, você 2 minutos para verificar)
                 <br></br>
                 Caso saia da pagina, irá ter que fazer o login novamente.
                 <br></br>
                 Após selecionar a opção, clique no botão até aparacer: Processando…
                </Typography>
              </Box>
              <Container maxWidth="sm">
                <Card component="form" id="form1" onSubmit={handleSubmit} sx={{ textAlign: 'center', mt: 3, p: 4 }}>
              
                  <Button type="submit" id="submit" disabled={button} variant="outlined">
                 Ja confirmei e desejo solicitar a verificação
                  </Button>
                </Card>
                {NotifyContainer}
              </Container>
            </Container>
          </TopWrapper>
        </MainContent>
      </>
    );
  }
  
  export default DuploFa;
  
  DuploFa.getLayout = function getLayout(page) {
    return <BaseLayout>{page}</BaseLayout>;
  };

  export async function getServerSideProps({ req, res }) {
    const id = req.cookies.TwoFA || null
const decoded = jwt.decode(id)
    if(id == null){
      res.writeHead(303, { Location: '/login' });
      res.end();
      
    return {
      props: {user: null}, 
    }
  } else {
    if(req.headers?.referer !== '/login'){
      res.writeHead(303, { Location: '/login' });
     return res.end();
     
    }   
     const userApi = await fetch('/api/infouser/'+decoded.id)
      .then(r => r.json())
      .catch(console.error)
    return {
      props: { user: userApi, id }, 
    }
  
  } 
  

    
  
  }
  
  