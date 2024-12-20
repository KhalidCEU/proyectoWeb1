"use client"

import * as React from 'react';
import Link from 'next/link';
import { pink, grey } from '@mui/material/colors';
import {
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Favorite,
  PersonOutlineOutlined,
  Settings,
  Logout
} from '@mui/icons-material';

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
    <>
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
            <Avatar sx={{ width: 32, height: 32, bgcolor: pink[500] }} src='../elon.png'></Avatar>
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        anchorEl={popoverAnchor}
        id="account-menu"
        open={open}
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

        <MenuItem>
          <Link href="/user/profile">
            <PersonOutlineOutlined sx={{ mr: 1 }} /> My account
          </Link>
        </MenuItem>

        <Divider />

        <MenuItem>
            <Link href="/user/wishlist">
              <Favorite sx= {{ color: pink[500], mr: 1 }}/> My Wishlist
            </Link>
        </MenuItem>

        <Divider />

        <MenuItem>
          <Link href="/user/settings">
              <Settings fontSize="small" sx={{ mr: 1, color: grey[700] }}/> Settings
          </Link>
        </MenuItem>

        <MenuItem>
          <Link href="/logout">
            <Logout fontSize="small" sx={{ mr: 1, color: grey[700] }}/> Logout
          </Link>
        </MenuItem>

      </Menu>

      </>
    );
}
