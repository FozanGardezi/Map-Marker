import React from 'react';
import SwipeableDrawer from '@mui/material';
import { Box, Tab, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';

export default function MenuTabs() {
    const [value, setValue] = React.useState('1');
  
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
              <Tab label="Upload Images" {...allyProps(0)} />
              <Tab label="Add Position" {...allyProps(0)} />
            </Tabs>
          </Box>
          <TabPanel value="1">Upload Images</TabPanel>
          <TabPanel value="2">Add Position</TabPanel>
      </Box>
    );
  }