import { Grid, Container, Card,
    CardHeader,
    CardContent, Divider, CardMedia, Typography, CardActions, Button, CardActionArea} from '@mui/material';

function Cards() {
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography sx={{whiteSpace: 'pre-wrap'}} variant="body2" color="text.secondary">
     Tst
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
  );
}

export default Cards;
