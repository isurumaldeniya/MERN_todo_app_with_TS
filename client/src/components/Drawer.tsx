import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { IconContext } from 'react-icons';
import { FcPlus } from 'react-icons/fc';

function SideDrawer() {
  return (
    <Drawer
      open={true}
      disableEnforceFocus
      variant="permanent"
      PaperProps={{ sx: { width: 175, bgcolor: 'lightblue' }, elevation: 5 }}
    >
      <List
        sx={{
          '& .MuiButtonBase-root:hover': {
            bgcolor: 'red',
          },
          '& .MuiButtonBase-root:active': {
            bgcolor: 'orange',
          },
        }}
      >
        <Button>
          <ListItem>
            <IconContext.Provider value={{ size: '25' }}>
              <FcPlus />
            </IconContext.Provider>
            <ListItemText sx={{ paddingLeft: 2 }}>Add Task</ListItemText>
          </ListItem>
        </Button>
      </List>
    </Drawer>
  );
}

export default SideDrawer;
