import React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { CartState,addItemToCart,deleteItemFromCart } from '../common/redux/Slicer/cartSlice';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import useTranslation from '../common/hooks/useTranslation';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const Cart = () => {
    const cart: CartState = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const {t}=useTranslation();
    
    const data = cart.productsInCart
    
    return (
        <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Typography gutterBottom variant="h3" component="div">
                {t('ITEMS_IN_THE_CART')}
            </Typography>
            <Grid xs={12} spacing={3}>
                {data.length >0?
                    (data.map((item,index)=>(
                        <Paper key={index} 
                            sx={{
                            p: 2,
                            margin: '20px',
                            flexGrow: 1,
                            backgroundColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        }}
                            >
                            <Grid container xs={12} spacing={2}>
                                <Grid item>
                                    <ButtonBase sx={{ width: 128, height: 128 }}>
                                        <Img alt="complex" 
                                            src={item.primaryimageurl==null?"https://speakgeekytome.com/wp-content/uploads/2022/04/Ford-cars-and-trucks-painting-with-a-twist-2.png":item.primaryimageurl}
                                            />
                                    </ButtonBase>
                                    </Grid>
                                    <Grid item xs={12} sm container>
                                        <Grid item xs container direction="column" spacing={2}>
                                            <Grid item xs>
                                                <Typography gutterBottom variant="subtitle1" component="div">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {item.provenance}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs container direction="row" spacing={1}>
                                                <Typography 
                                                    onClick={()=>{dispatch(deleteItemFromCart(item))}}
                                                    variant="button" 
                                                    sx={{ cursor: 'pointer',margin:'10px' }}>
                                                    -
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" sx={{margin:'10px'}}>
                                                    Total Amount: {item.quantity}
                                                </Typography>
                                                <Typography 
                                                    onClick={()=>{dispatch(addItemToCart(item))}}
                                                    variant="button" 
                                                    sx={{ cursor: 'pointer',margin:'10px'}}>
                                                    +
                                                </Typography>
                                            </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1" component="div">
                                        ${item.objectid} 
                                    </Typography>
                            </Grid>
                            </Grid>
                        </Paper>
                    )))
                
                :
                <Grid xs={12}>
                    <Typography gutterBottom variant="h5" component="div">
                        There is no item in the cart
                    </Typography>
                </Grid>}
                <Grid>
                    {data.length >0 && <Grid>
                        <Typography>
                            Total number of items in the cart: {cart.quantity}
                        </Typography>
                        <Typography>
                            Total Price:: ${cart.total}
                        </Typography>
                </Grid>}
                </Grid>
            </Grid>
        </Box>
     );
}
 
export default Cart;