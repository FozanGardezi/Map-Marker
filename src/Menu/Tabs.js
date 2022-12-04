import React from 'react';
import SwipeableDrawer from '@mui/material';
import { Box, Tab, Tabs } from '@mui/material';
// import TabContext from '@mui/lab/TabContext';
import Typography from '@mui/material/Typography';
import AddLatLong from './AddLatLong';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function MenuTabs({handleSubmit}) {
    const [value, setValue] = React.useState(1);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const allyProps = (index) => {
      return {
        id: `menu-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
      }
    }
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="Select Options">
              <Tab value={1} label="Upload Images" {...allyProps(0)} />
              <Tab value={2} label="Add Position" {...allyProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={1}>Upload Images</TabPanel>
          <TabPanel value={value} index={2}>
            <AddLatLong handleSubmit={handleSubmit} />
          </TabPanel>
      </Box>
    );
  }