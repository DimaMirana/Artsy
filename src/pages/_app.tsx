/* eslint-disable react-hooks/exhaustive-deps */
import React,{FC,useState,useEffect} from 'react';
import Layout from "../common/components/Layout/Layout.component";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { persistor ,store } from '../common/redux/store';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from '@mui/material';

interface Props {
  Component: any,
  pageProps: any,
}

const lightTheme = createTheme({
  palette: {
    mode: 'light'
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function getActiveTheme(themeMode: 'light' | 'dark') {
  return themeMode === 'light' ? lightTheme : darkTheme;
}

const PREFERENCE_COOKIE_NAME = 'theme-preference';


const App:FC<Props> =({ Component, pageProps  })=> {
  const [pageLoaded,setPageLoaded] = React.useState(false);
  const userSystemThemePreferenceDark = useMediaQuery('(prefers-color-scheme: dark)');
  
  const [activeTheme, setActiveTheme] = useState(lightTheme);
  const [cookieTheme, setCookieTheme] = useCookies([PREFERENCE_COOKIE_NAME]);

  const defaultInitialTheme = userSystemThemePreferenceDark ? 'dark' : 'light';
  const preferredTheme = cookieTheme && cookieTheme[PREFERENCE_COOKIE_NAME] ? cookieTheme[PREFERENCE_COOKIE_NAME] : defaultInitialTheme;

  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(preferredTheme);

  const toggleTheme: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const desiredTheme = selectedTheme === 'light' ? 'dark' : 'light';

    setSelectedTheme(desiredTheme);
    setCookieTheme(PREFERENCE_COOKIE_NAME, desiredTheme);
  };

  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme))
  }, [selectedTheme]);
  
  useEffect(()=>{
      setPageLoaded(true);
    },[]);
    

  return (
      <ThemeProvider theme={activeTheme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Layout toggleTheme={toggleTheme}>
                { (pageLoaded) ?
                <Component {...pageProps} />
                : null
              }
              </Layout> 
            </PersistGate>
          </Provider>
      </ThemeProvider>
);
}

export default App;
  

