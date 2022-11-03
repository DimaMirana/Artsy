import React from 'react';
import { FC} from 'react';
import Grid from '@mui/material/Grid';
import Navbar from '../Navbar/Navbar.component';
import Footer from '../Footer/Footer.component';

interface Props { 
    children:any,
    toggleTheme: Function
}

const Layout:FC<Props> = ({toggleTheme, children}) => {
    return ( 
        <Grid sx={{flexGrow: 1}}>
            <Navbar toggleTheme={toggleTheme}/>
            <Grid sx={{flexGrow: 1, minHeight:'90vh'}}>
                {children}
            </Grid>
            <Footer/>
        </Grid>
     );
}
 
export default Layout;