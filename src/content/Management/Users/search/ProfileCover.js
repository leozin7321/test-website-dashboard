import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);


const ProfileCoverSearch = ({ user }) => {
  
  const Banner = user.Banner ?  <CardMedia src={user.Banner || ''}/> : <CardMedia sx={{ backgroundColor: user.Banner }} component="div" />

  return (
    <>
      <Box display="flex" mb={3}>
       
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Perfil do(a) {user.Username}
          </Typography>
          <Typography variant="subtitle2">
          Este perfil apresenta informação do BOT.
          </Typography>
        </Box>
      </Box>
      <CardCover>
        
        {Banner}
         
      </CardCover>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user.Username} src={user.Avatar} />
        <ButtonUploadWrapper>
         
          
        </ButtonUploadWrapper>
      </AvatarWrapper>
      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {user.Username} - ID: {user.userID}
        </Typography>
        <Typography  variant="subtitle2">Biografia do usuario: Opa, este é meu perfil no BOT de discord LaionBOT</Typography>
        {/* sx={{ mt: 1}} */}
        <Box
          display={{ xs: 'block', md: 'flex' }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
          <NextLink href="/management/profile/settings" passHref>
            <Button size="small" sx={{ mt: 2  }} variant="outlined">
             Voltar para pagina de consulta de usuarios
            </Button>
            </NextLink>
          
          </Box>
         
        </Box>
      </Box>
    </>
  );
};

ProfileCoverSearch.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCoverSearch;
