import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  OutlinedInput,
  IconButton,
  Tooltip,
  FormControl,
  InputAdornment,
  Button,
  styled,
  FormHelperText
} from '@mui/material';

import BaseLayout from 'src/layouts/BaseLayout';

import Head from 'next/head';
import Logo from 'src/components/LogoSign';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

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

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`
);

const ButtonNotify = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`
);

function StatusComingSoon() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2023`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Box textAlign="center" px={3}>
        <TypographyH1 variant="h1">{timeLeft[interval]}</TypographyH1>
        <TypographyH3 variant="h3">{interval}</TypographyH3>
      </Box>
    );
  });

  return (
    <>
      <Head>
        <title>Em breve....</title>
      </Head>
      <MainContent>
        <TopWrapper>
          <Container maxWidth="md">
            {/* <Logo /> */}
            <Box textAlign="center" mb={3}>
              <Container maxWidth="xs">
                <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
                 Aguarde....
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  Estamos trabalhando por novas atualizações como esta, logo estará disponivel!
                </Typography>
              </Container>
              <img
                alt="Coming Soon"
                height={200}
                src="/static/images/status/coming-soon.svg"
              />
            </Box>

            {/* <Box display="flex" justifyContent="center">
              {timerComponents.length ? timerComponents : <>Time's up!</>}
            </Box> */}

            <Container maxWidth="sm">
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <FormControl variant="outlined" fullWidth>
                  <OutlinedInputWrapper
                    type="text"
                    readOnly={true}
                    placeholder="Para mais informações, acesse nosso DISCORD!"
                    endAdornment={
                      <InputAdornment position="end">
                        
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">
                        <MailTwoToneIcon />
                      </InputAdornment>
                    }
                  />
                 
                </FormControl>
                
                
              </Box>
            </Container>
          </Container>
        </TopWrapper>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;

StatusComingSoon.getLayout = function getLayout(page) {
  return <BaseLayout>{page}</BaseLayout>;
};


export async function getServerSideProps({ req, res }) {
  if(req.headers.referer == process.env.NEXT_PUBLIC_VERCEL_URL+'/status/soon' || req.headers.referer == undefined){
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