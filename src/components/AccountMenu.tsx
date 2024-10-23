"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import {
    Favorite,
    PersonOutlineOutlined,
    Settings,
    Logout
} from '@mui/icons-material';
import { pink, grey } from '@mui/material/colors';
import Link from 'next/link';

export default function AccountMenu() {
  const [popoverAnchor, setPopoverAnchor] = React.useState<null | HTMLElement>(null);
  const open = Boolean(popoverAnchor);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopoverAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setPopoverAnchor(null);
  };

  return (
    <React.Fragment>

      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="My Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: pink[500] }} src='elon.png'></Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={popoverAnchor}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/user/profile">
            <PersonOutlineOutlined sx={{ mr: 1 }} /> My account
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
            <Link href="/user/wishlist">
              <Favorite sx= {{ color: pink[500], mr: 1 }}/> My Wishlist
            </Link>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>
          <Link href="/user/settings">
              <Settings fontSize="small" sx={{ mr: 1, color: grey[700] }}/> Settings
          </Link>
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <Link href="/logout">
            <Logout fontSize="small" sx={{ mr: 1, color: grey[700] }}/> Logout
          </Link>
        </MenuItem>

      </Menu>

    </React.Fragment>
  );
}
