import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader({ userInfos }) {
  // const user = {
  //   name: 'Catherine Pike',
  //   avatar: '/static/images/avatars/1.jpg'
  // };
  const userName = userInfos.Username
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Extrato bancário
        </Typography>
        <Typography variant="subtitle2">
        {userName.slice(0, userName.indexOf('#'))}, abaixo está seu extrato bancario mais recente
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Fazer uma trasnferencia (Desenvolvimento)
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
