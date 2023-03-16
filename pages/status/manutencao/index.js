import {
  Box,
  Typography,
  Container,
  Divider,
  IconButton,
  Tooltip,
  styled
} from '@mui/material';

import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';
import Logo from 'src/components/LogoSign';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

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

function StatusMaintenance() {
  return (
    <>
      <Head>
        <title>Manutenção</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            {/* <Logo /> */}
            <Box textAlign="center">
              <Container maxWidth="xs">
                <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                 Este sistema está desabilitado para manutenção!
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                Estamos trabalhando para que em breve volte ao normal
                </Typography>
              </Container>
              <img
                alt="Maintenance"
                height={250}
                src="/static/images/status/maintenance.svg"
              />
            </Box>
            <Divider sx={{ my: 4 }} />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box>
                <Typography component="span" variant="subtitle1">
                  Mais informações no Discord.
                </Typography>
               
               
              </Box>
             
            </Box>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default StatusMaintenance;

StatusMaintenance.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};



export async function getServerSideProps({ req, res }) {
  if(req.headers.referer == process.env.NEXT_PUBLIC_VERCEL_URL+'/status/manutencao' || req.headers.referer == undefined ){
    res.writeHead(303, { Location: '/' });
    res.end();
    return {
      props: { }
     }
  } else {

    return {
      props: { }
     }
  }
}