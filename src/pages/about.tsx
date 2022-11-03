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
                    <h3>information about company:</h3>
                    <p>The product wind is a wallet app that is build on blockchain. This walled can be used to transactions between people that are connected in this app with nominal fees. Wind works on the end-to-end transaction via chain varification (block chain algorithm) and in this way there is no third paty involved. This makes transactions instant and without giving extra additional charge to any other 3rd party provider. This app use the currency name stablecoins that can be later transferred to usd via KYC check. As it's a non-custodial wallet, only the owner thas the access to their money and thus only the sole owner has the access to thier asset. To earn on this app one can work as a mine worker This app can be found on Play store or App Store.</p>
                </div>
            </Box>
        </div>
     );
}
 
export default About;