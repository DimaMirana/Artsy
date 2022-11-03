import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import useTranslation from '../../hooks/useTranslation';


const Footer = () => {
    const { t } = useTranslation();
    return ( 
        <Box sx={{ flexGrow: 1 }}>
            <Grid xs={12}>
                {t('FOOTER')}
            </Grid>
        </Box>
     );
}
 
export default Footer;