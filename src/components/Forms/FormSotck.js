import { useState } from "react";
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


function FormStock() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Lógica de envio do formulário aqui
  };

  return (
    <DialogContent>
        
          <form onSubmit={console.log('tst')}>
           
            <TextField
              autoFocus
              margin="dense"
              id="message"
              label="Conteudo do novo estoque "
              multiline
              fullWidth
              required
            />
            <TextField 
             autoFocus
             margin="dense"
             id="message"
             type="number"
             InputProps={{ inputProps: { min: 1, max: 15 } }}
             label="Quantidade vai ser adicionada deste estoque "
             fullWidth
             required
             
              /> 
            <Button type="submit" sx={{ mt: 2 }}>
              Adicionar
            </Button>
          </form>
        </DialogContent>
  );
}

export default FormStock