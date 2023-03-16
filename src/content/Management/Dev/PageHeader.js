import { Typography } from '@mui/material';

function PageHeader({ user }) {
const Username = user.Username

  return (
    <>

      <Typography variant="h3" component="h3" gutterBottom>
      Painel de gerencimentom de produtos/estoque
      </Typography>
      <Typography variant="subtitle2">
        {Username.slice(0, Username.indexOf('#'))}, aqui está disponivel o sistema do BOT
      </Typography>
    </>
  );
}

export default PageHeader;
     