import { useState, useEffect } from 'react';
import GitGroupLoader from './components/GitGroupLoader';
import './App.css';

import threedyLogo from './assets/instant3Dhub-logo.svg';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <main>
        <div>
          <a href='https://hubdemo.threedy.io/' target='_blank'>
            <img src={threedyLogo} className='logo ' alt='Threedy logo' />
          </a>
        </div>
        <h1>Code Examples</h1>
        <p>
          instant3Dhub can be integrated into various toolchans and workflows.
          Below are some examples to help you get started
        </p>
        <br />
        <div className='sticky-top'>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              variant='fullWidth'
              value={value}
              onChange={handleChange}
              TabIndicatorProps={{
                sx: { backgroundColor: 'var(--threedy-green)' },
              }}
              sx={{
                backgroundColor: 'var(--threedy-dark-blue)',
                '& button': { color: 'white' },
                '& button:hover': { color: 'var(--threedy-green)' },
                '& button:focus': { color: 'var(--threedy-green)' },
                '& button:active': { color: 'var(--threedy-green)' },
                '& button.Mui-selected': { color: 'var(--threedy-green)' },
              }}
            >
              <Tab label='for end users' />
              <Tab label='for developers' />
              <Tab label='for integrators' />
            </Tabs>
          </Box>
        </div>
        <TabPanel value={value} index={0}>
          {/*end users tab*/}
          <div className='repo-card-container'>
            <GitGroupLoader id={105} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {' '}
          {/*developers tab*/}
          <div className='repo-card-container'>
            <GitGroupLoader id={104} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/*integrators tab*/}
          <div className='repo-card-container'>
            <GitGroupLoader id={106} />
          </div>
        </TabPanel>
      </main>

      <footer>
        <span>© 2023 Threedy. All rights reserved</span>
      </footer>
    </>
  );
}

export default App;
