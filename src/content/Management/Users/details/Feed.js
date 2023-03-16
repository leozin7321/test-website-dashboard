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

function Feed({ users }) {
  
  const listUsers = users.sort((a, b) => (b.Coins + b.BancoCoins) - (a.Coins + a.BancoCoins)).filter(b => (b.Coins + b.BancoCoins) > 0).slice(0, 3)
  
 

  return (
    <Card> 
      <CardHeader title="TOP 3 Mais compraram na LOJA" />
      <Divider />
      <Box p={2}>
        <Grid container spacing={0}>
          {listUsers.map((_feed, i) => (
            <Grid key={_feed.Username} item xs={12} sm={6} lg={4}>
              <Box p={3} display="flex" alignItems="flex-start">
                <Avatar src={_feed.Avatar} />
                <Box pl={2}>
                  <Typography gutterBottom variant="subtitle2">
                    {i + 1}º Lugar
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {_feed.Username}
                  </Typography>
                  <Typography color="text.primary" sx={{ pb: 2 }}>
                    {_feed.Coins + _feed.BancoCoins} Coins
                  </Typography>
                
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Card>
  );
}


export default Feed;
