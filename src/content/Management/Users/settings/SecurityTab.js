
import {
  Box,
  Typography,
  Card,
  Grid,
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
  ListItemAvatar,
  Avatar,
  Switch,
  CardHeader,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  styled,
  fabClasses
} from '@mui/material';
import NextLink from 'next/link';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { format, subHours, subWeeks, subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import useSWR from 'swr';
const ButtonError = styled(Button)(
  ({ theme }) => `
     background: ${theme.colors.error.main};
     color: ${theme.palette.error.contrastText};

     &:hover {
        background: ${theme.colors.error.dark};
     }
    `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(5)};
    height: ${theme.spacing(5)};
`
);

function SecurityTab({ user } ) {
  const userFa = user.fa
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const [verifyTwofa, setTwoFA] = useState(userFa)
 useEffect(() => {
  const update = {
    id: user.userID,
    result: verifyTwofa
  }
fetch("/api/twofa", {
     method: "POST",
     headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(update)
  });
 }, [verifyTwofa])
  
 
  const theme = useTheme(true);

  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const logs = [
    {
      id: 1,
      browser: ' Safari/537.36',
      ipaddress: '3.70.73.142',
      location: 'United States',
      date: subDays(new Date(), 2).getTime()
    },
    
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
       <Box pb={2}>
          <Typography variant="h3">Segurança da conta</Typography>
          <Typography variant="subtitle2">
          Veja/Trocar informações de seguração da sua conta
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Modificar senha da conta"
                secondary="Você tem permissão de trocar a senha desta conta"
              />
              <NextLink href="/edit/account/password" passHref>
              <Button size="large" variant="outlined">
              Insira uma nova senha
              </Button>
              </NextLink>
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Verificação de 2 Fatores (2FA)"
                secondary="Ative a verificação de 2FA via confirmação Discord (Em BETA)"
              />
              <Switch {...label} onChange={(event) => setTwoFA(event.target.checked)} defaultChecked={verifyTwofa}/>
            </ListItem>
          </List>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Logs da conta"
            subheader="Em desenvolvimento, aguarde!"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                {/* <TableRow>
                  <TableCell></TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow> */}
              </TableHead>
              {/* <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{log.ipaddress}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip placement="top" title="Deletar" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody> */}
            </Table>
          </TableContainer>
          {/* <Box p={2}>
             <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={'Linhas por pagina:'}
              labelDisplayedRows={
                ({ from, to, count }) => {
                  return  '' + from + '-' + to + ' de ' + count 
                }
              }
            /> 
          </Box> */}
        </Card>
      </Grid>
    </Grid>
  );
}

export default SecurityTab;


