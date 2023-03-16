import { Typography } from '@mui/material';

function PageHeader({ user }) {
const Username = user.Username
  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
       Configuração de conta
      </Typography>
      <Typography variant="subtitle2">
        {Username.slice(0, Username.indexOf('#'))}, aqui está seu painel de controle da sua conta
      </Typography>
    </>
  );
}

export default PageHeader;
