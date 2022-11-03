import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useTranslation from '../common/hooks/useTranslation';

const About = () => {
    const {t}=useTranslation();
    return ( 
        <div>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography gutterBottom variant="h3" component="div">
                    {t('About')}
                </Typography>
                <div>
                    information abou company will go here
                </div>
            </Box>
        </div>
     );
}
 
export default About;