import { useState } from 'react';
import GitDataLoader from './components/GitDataLoader';
import './App.css';

import threedyLogo from './assets/instant3Dhub-logo.svg';

import { TabPanel } from './components/TabPanel';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Repo } from './types';
import RepoCards from './components/RepoCards';

function App() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // stores repo information for each group
  const [group1Data, setGroup1Data] = useState<Repo[] | null>(null);
  const [group2Data, setGroup2Data] = useState<Repo[] | null>(null);
  const [group3Data, setGroup3Data] = useState<Repo[] | null>(null);

  const handleData1Loaded = (newRepos: Repo[]) => {
    setGroup1Data(newRepos);
  };
  const handleData2Loaded = (newRepos: Repo[]) => {
    setGroup2Data(newRepos);
  };

  const handleData3Loaded = (newRepos: Repo[]) => {
    setGroup3Data(newRepos);
  };

  return (
    <>
      <main>
        <div>
          {/* replace IDs with groups you want to render */}
          <GitDataLoader
            id={import.meta.env.VITE_USECASE_GROUP_ID}
            onDataLoaded={handleData1Loaded}
          />
          <GitDataLoader
            id={import.meta.env.VITE_DEVELOPER_GROUP_ID}
            onDataLoaded={handleData2Loaded}
          />
          <GitDataLoader
            id={import.meta.env.VITE_INTEGRATOR_GROUP_ID}
            onDataLoaded={handleData3Loaded}
          />

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
              <Tab label='use cases' />
              <Tab label='for developers' />
              <Tab label='for integrators' />
            </Tabs>
          </Box>
        </div>
        <TabPanel value={value} index={0}>
          {/*end users tab*/}
          <div className='repo-card-container'>
            <RepoCards repos={group1Data} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          {' '}
          {/*developers tab*/}
          <div className='repo-card-container'>
            <RepoCards repos={group2Data} />
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
          {/*integrators tab*/}
          <div className='repo-card-container'>
            <RepoCards repos={group3Data} />
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
