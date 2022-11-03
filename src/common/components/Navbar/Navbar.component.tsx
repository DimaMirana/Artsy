import React,{useCallback} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from 'next/link';
import styles from './Navbar.module.css'
import { useAppSelector } from '../../hooks/hooks';
import  useTranslation  from '../../hooks/useTranslation';
import { CartState} from '../../redux/Slicer/cartSlice';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window,
  toggleTheme: Function,
}

const drawerWidth = 240;
const navItems = [{
    name: 'Home',
    url: '/'
 }, {
    name: 'About',
    url: '/about'
 }, {
    name: 'Contact',
    url: '/contact'
 },{
    name: 'Cart',
    url: '/cart'
 },];
 
const LANGUAGES_FLAGS = {
  fr: "fr",
  en: "en",
};


const Navbar = (props:Props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const cart: CartState = useAppSelector(state => state.cart);
    const data = cart.quantity;

    const { locale, setLocale,t } = useTranslation();

  // @ts-ignore
  const toggleLanguage = useCallback((newLocale) => setLocale(newLocale), [locale]);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
  
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <div>
            Artsy
        </div>
        <Divider />
        <List>
            {navItems.map((item) => (
              <Link href={item.url} key={item.name} className={styles.navbarDrawer}>
                {t(`${item.name}`)}{item.name=='Cart' && data>0?' '+data:''}
              </Link>
            ))}
            <Button sx={{color:'#fff'}} onClick={()=>props.toggleTheme()}>Toggle Theme</Button>
            {Object.entries(LANGUAGES_FLAGS).map((e,i) => (
              <Button sx={{color:'#fff'}} key={e[0]} onClick={() => toggleLanguage(e[0])}>
                {e[i]}
              </Button>
            ))}
        </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{ flexGrow: 1, 
          }}
          >
            Artsy
          </div>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link href={item.url} key={item.name} className={styles.navbar}>
                {t(`${item.name}`)}{item.name=='Cart' && data>0?' '+data:''}
              </Link>
            ))}
            <Button sx={{color:'#fff'}} onClick={()=>props.toggleTheme()}>{t('TOGGLE_THEME_NAME')}</Button>
            {Object.entries(LANGUAGES_FLAGS).map((e,i) => (
              <Button sx={{color:'#fff'}} key={e[0]} onClick={() => toggleLanguage(e[0])}>
                {e[i]}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

 
export default Navbar;