import { Button, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { IconContext } from 'react-icons';
import { FcPlus } from 'react-icons/fc';
import { FcSearch } from 'react-icons/fc';
import { FcFinePrint } from 'react-icons/fc';
import { FcCalendar } from 'react-icons/fc';
import { FcList } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom';

function SideDrawer() {
  const navigate = useNavigate();
  return (
    <Drawer
      open={true}
      disableEnforceFocus
      variant="permanent"
      PaperProps={{ sx: { width: 175, bgcolor: '#A1E8CC' }, elevation: 5 }}
    >
      <List
        sx={{
          '& .MuiButtonBase-root:hover': {
            bgcolor: '#C5DECD',
          },
          '& .MuiButtonBase-root': {
            color: '#1B512D',
            textTransform: 'none',
            width: 165,
            marginLeft: 0.75,
          },
        }}
      >
        <Button onClick={() => navigate('/')}>
          <ListItem>
            <IconContext.Provider value={{ size: '25' }}>
              <FcPlus />
            </IconContext.Provider>
            <ListItemText sx={{ paddingLeft: 2 }}>Add Task</ListItemText>
          </ListItem>
        </Button>
        <Button onClick={() => navigate('/todos')}>
          <ListItem>
            <IconContext.Provider value={{ size: '25' }}>
              <FcList />
            </IconContext.Provider>
            <ListItemText sx={{ paddingLeft: 2 }}>Task List</ListItemText>
          </ListItem>
        </Button>
        <Button>
          <ListItem>
            <IconContext.Provider value={{ size: '25' }}>
              <FcSearch />
            </IconContext.Provider>
            <ListItemText sx={{ paddingLeft: 2 }}>Search</ListItemText>
          </ListItem>
        </Button>
        <Button>
          <ListItem>
            <IconContext.Provider value={{ size: '25' }}>
              <FcCalendar />
            </IconContext.Provider>
            <ListItemText sx={{ paddingLeft: 2 }}>Today</ListItemText>
          </ListItem>
        </Button>
        <Button>
          <ListItem>
            <IconContext.Provider value={{ size: '25' }}>
              <FcFinePrint />
            </IconContext.Provider>
            <ListItemText sx={{ paddingLeft: 2 }}>Upcoming</ListItemText>
          </ListItem>
        </Button>
      </List>
    </Drawer>
  );
}

export default SideDrawer;
