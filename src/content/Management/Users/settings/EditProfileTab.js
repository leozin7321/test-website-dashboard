import {
  Grid,
  Typography,
  CardContent,
  Card,
  Box,
  Divider,
  Button
} from '@mui/material';

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import NextLink from 'next/link';
import { useState } from 'react';

function EditProfileTab({ user }) {
 
  const StatsColor = user.Ban ? 'error' : 'success'; 
  const StatsIcon = user.Ban ? <ErrorTwoToneIcon style={{ marginRight: '4px' }}fontSize='small'/> : <DoneTwoToneIcon fontSize='small'/>;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
               Dados pessoais
              </Typography>
              <Typography variant="subtitle2">
               Gerencie seus informações registradas no BOT
              </Typography>
            </Box>
            <Box>
            <NextLink href='/edit/account/data' passHref>
            <Button variant="text" startIcon={<EditTwoToneIcon />}>
              Editar
            </Button>
            </NextLink>
            </Box>
          </Box>
          
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    Nome do usuario:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.Username}</b>
                  </Text>
                </Grid>
                
                
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                    ID do Discord:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>{user.userID}</b>
                  </Text>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                   Dados publicos: 
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">
                    <b>Desativado/Em Desenvolvimento</b>
                    </Text>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                   Plano VIP: 
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Box sx={{ maxWidth: { xs: 'auto', sm: 300 } }}>
                    <Text color="black">
                    <b>{user.VIP ? 'Ativado' : 'Desativado'}</b>
                    </Text>
                  </Box>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <Box
            p={3}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h4" gutterBottom>
               Configurações 
              </Typography>
              <Typography variant="subtitle2">
             Verifique o estado da sua conta
              </Typography>
            </Box>
           
          </Box>
          <Divider />
          <CardContent sx={{ p: 4 }}>
            <Typography variant="subtitle2">
              <Grid container spacing={0}>
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                   Linguagem: 
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Text color="black">
                    <b>Portugues (BR)</b>
                  </Text>
                </Grid>
                
                <Grid item xs={12} sm={4} md={3} textAlign={{ sm: 'right' }}>
                  <Box pr={3} pb={2}>
                  Status da conta:
                  </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={9}>
                  <Label color={StatsColor}>
                   {StatsIcon}
                    <b>{user.Ban ? 'Desativada/Banida' : 'Ativada'}</b>
                  </Label>
                </Grid>
              </Grid>
            </Typography>
          </CardContent>
        </Card>
      </Grid>
     
    </Grid>
  );
}

export default EditProfileTab;
