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
import ListManageUsers from './ListManageUsers';
import ErrorTwoToneIcon from '@mui/icons-material/ErrorTwoTone';
import Text from 'src/components/Text';
import Label from 'src/components/Label';
import NextLink from 'next/link';
import { useState } from 'react';

function ManageUsersTab({ infos, total }) {
  return (
    
    <Card>
      
      <ListManageUsers product={infos} total={total} />
    </Card>
     
  
  );
}

export default ManageUsersTab;
