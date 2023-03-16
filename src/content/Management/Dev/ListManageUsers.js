import { useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import Slide from "@mui/material/Slide";
import {
  Tooltip,
  Divider,
  Box,
  Button,
  FormControl,
  InputLabel,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import FormStock from 'src/components/Forms/FormSotck';
import AddCircleTwoToneIcon from '@mui/icons-material/AddCircleTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import InfoTwoToneIcon from '@mui/icons-material/InfoTwoTone';
import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

const getStatusLabel = (usersStatus) => {
  const map = {
    false: {
      text: 'Sistema Desativado',
      color: 'error'
    },
    true: {
      text: 'Sistema Ativado',
      color: 'success'
    },
    notfound: {
      text: 'Não encontrado',
      color: 'warning'
    }
   
  };

  const { text, color } = map[usersStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (usersStatus, filters) => {
  return usersStatus.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};



const applyPagination = (cryptoOrders, page, limit) => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const ListManageUsers = ({ product, total }) => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const checkMsgProduct = (productId, serverId) => {
    const objetoComProps = total[1].some(objeto => objeto.produtoId === productId && objeto.server_id === serverId);
    return objetoComProps
  }

  const [openDialog, setOpenDialog] = useState(false);

  const handleStatussChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handlePageChange = (_event, newPage) => {
    setPage(newPage);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredUsers = applyFilters(product, filters);
  const paginatedUsers = applyPagination(
   filteredUsers,
    page,
    limit
  );
  const theme = useTheme();

  return (
    <Card>
      <CardHeader
        
        title="Lista de produtos encontrados no banco de dados"
      />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>ID Servidor</TableCell>
              <TableCell>Valor</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Mensagem de compra</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((products) => {
       
              return (
                <TableRow hover key={products._id}>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {products.nome || 'N/A'}
                    </Typography>
                   
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {products._id || 'N/A'}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {products.server_id}
                  </TableCell>
                  <TableCell>
                    {products.valor}
                  </TableCell>
                  <TableCell>
                    {products.quantidade}
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(checkMsgProduct(products._id, products.server_id))}
                  </TableCell>
                  <TableCell>
                  <Dialog open={openDialog} onClose={handleClose} 
                    TransitionComponent={Slide}
                    transitionDuration={500}
                    maxWidth="sm"
                    >
<DialogTitle>Adicionar estoque no produto: {products.nome || 'N/a'}</DialogTitle>
        <FormStock />
</Dialog>
                  <Tooltip title="Mais informações" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#87CEFA'
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => { console.log('Test:'+users.userID)}}
                      >
                        <InfoTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  <Tooltip title="Editar produtos" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {  console.log('Test:'+users.userID)}}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Adicionar estoque" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#37c458'
                        }}
                        color="inherit"
                        size="small"
                        onClick={handleClickOpen}
                      >
                        <AddCircleTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remover estoque" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: '#cf2323'
                        }}
                        color="inherit"
                        size="small"
                        onClick={console.log('tst')}
                      >

                        <RemoveCircleTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir produtos" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {  console.log('Test:'+users.userID)}}
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10]}
          labelRowsPerPage={'Linhas por pagina:'}
          labelDisplayedRows={
            ({ from, to, count }) => {
              return  '' + from + '-' + to + ' de ' + count 
            }
          }
        />
      </Box>
    </Card>
  );
};

ListManageUsers.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

ListManageUsers.defaultProps = {
  cryptoOrders: []
};

export default ListManageUsers;
