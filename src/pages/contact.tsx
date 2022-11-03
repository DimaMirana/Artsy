import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useTranslation from '../common/hooks/useTranslation';

const Contact = () => {
    const {t}=useTranslation();
    return ( 
        <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography gutterBottom variant="h3" component="div">
                    {t('CONTACT_HEADER')}
                </Typography>
        </Box>
     );
}
 
export default Contact;