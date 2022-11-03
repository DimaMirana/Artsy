import React, { Fragment, useEffect } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Category from '../Category/Category.component';
import Typography from '@mui/material/Typography';
import useTranslation from '../../hooks/useTranslation';

const HomePage = () => {
    const { t } = useTranslation();
    return ( 
        <Fragment>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography gutterBottom variant="h3" component="div">
                    {t("HOMEPAGE_INTRO")}
                </Typography>
                <div>
                    <Category/>
                </div>
            </Box>
        </Fragment>
     );
}
 
export default HomePage;