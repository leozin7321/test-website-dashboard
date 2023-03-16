import { useRef, useState } from 'react';

import NextLink from 'next/link';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';
import Logged from './Logged'
import NoLogged from './NotLogged'
import InboxTwoToneIcon from '@mui/icons-material/InboxTwoTone';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import AccountBoxTwoToneIcon from '@mui/icons-material/AccountBoxTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import AccountTreeTwoToneIcon from '@mui/icons-material/AccountTreeTwoTone';
import { ContactPageSharp } from '@mui/icons-material';
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie';

function HeaderUserbox( ){
  const check = Cookies.get('user')
  const avatar = jwt.decode(check)

return avatar ?  <Logged user={avatar} /> : <NoLogged  />

  
}


export default HeaderUserbox;
