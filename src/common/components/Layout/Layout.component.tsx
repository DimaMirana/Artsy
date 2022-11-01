import {Fragment, FC} from 'react';
import Button from '@mui/material/Button';

type AppProps = {
    onClick: Function;
};

const Layout:FC<AppProps> = ({onClick}) => {
    return ( 
        <Fragment>
            <Button variant="contained"
               onClick={() =>{onClick(true)}}
               >
                Log out
              </Button>
        </Fragment>
     );
}
 
export default Layout;