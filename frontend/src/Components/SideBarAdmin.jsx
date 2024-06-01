import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { Link } from 'react-router-dom';

export default function SideBarAdmin({ items }) {
  const [open, setOpen] = React.useState(false);
  const [openSkill, setOpenSkill] = React.useState(Array(items.length).fill(false));

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleClickSkill = (index) => (event) => {
    event.stopPropagation();
    const updatedOpenSkill = [...openSkill];
    updatedOpenSkill[index] = !updatedOpenSkill[index];
    setOpenSkill(updatedOpenSkill);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {items.map((parent, index) => (
          <React.Fragment key={index}>
            <ListItem disablePadding onClick={parent.children ? handleClickSkill(index) : undefined}>
              <ListItemButton>
                <ListItemIcon>
                  {parent.icon} {/* Use the icon from props */}
                </ListItemIcon>
                <ListItemText primary={parent.name} />
                {parent.children ? (openSkill[index] ? <ExpandLess /> : <ExpandMore />) : null}
              </ListItemButton>
            </ListItem>
            {parent.children && (
              <Collapse in={openSkill[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {parent.children.map((child, childIndex) => (
                    <ListItem key={childIndex} disablePadding>
                      <ListItemButton component={Link} to={child.link}>
                        <ListItemIcon>
                          {child.icon} {/* Use the icon from props */}
                        </ListItemIcon>
                        <ListItemText primary={child.name} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ mr: 2 }}
      >
        <DashboardIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}
