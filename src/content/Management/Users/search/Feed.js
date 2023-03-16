import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  Grid,
  Button
} from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function FeedSearch({ user, users }) {
  const listUsers = users.sort((a, b) => (b.Coins + b.BancoCoins) - (a.Coins + a.BancoCoins)).filter(b => (b.Coins + b.BancoCoins) > 0).slice(0, 3)
  
  let rankCoins;
  for(var i=0; i<listUsers.length; i++) {
    if(listUsers[i].userID === user.userID) {
       rankCoins = i
    }
  }

  return (
    <Card> 
      <CardHeader title="Rank deste usuario nas tabelas de liderança do LaionBOT" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          
            <Grid key={user.userID} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={user.Avatar} />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {rankCoins + 1}º Lugar
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                   {user.Username}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {user.Coins + user.BancoCoins} Coins
                  </Typography>
                
                </Box>
              </Box>
            </Grid>
          
        </Grid>
      </Box>
    </Card>
  );
}


export default FeedSearch;
