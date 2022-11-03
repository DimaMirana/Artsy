/* eslint-disable react-hooks/rules-of-hooks */
import React,{useEffect,FC} from 'react';
import { useRouter } from 'next/router'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import { useAppDispatch, useAppSelector } from '../common/hooks/hooks';
import { fetchProductData } from '../common/redux/Slicer/productSlice';
import { addItemToCart } from '../common/redux/Slicer/cartSlice';
import {productState} from '../common/types/Product/productTypes';
import {categoryState} from '../common/types/Category/categoryTypes';
import useTranslation from '../common/hooks/useTranslation';

const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  overflow: 'auto'
}));

const ProductDetail:FC = () => {
    const router = useRouter();
    const {t}=useTranslation();
    const category: categoryState = useAppSelector(state => state.category);
    const product: productState = useAppSelector(state => state.product);
    const dispatch = useAppDispatch();
    const data = product.productData;
    useEffect(() => {
        if(category.selectedCategory.id!=0){
            dispatch(fetchProductData(category.selectedCategory.name));
        } else {
            // @ts-ignore
            dispatch(fetchProductData(router.query.product));
        }
    },[])
    
    return ( 
        <div>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Typography gutterBottom variant="h3" component="div">
                    {t('ALL_PRODUCT')} {category.selectedCategory.name}
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={3}>
                        {!product.loading && data.length>0?(
                            data.map((item,index)=>(
                            <Grid key={index} item xs={4}>
                                <Item sx={{height:'fitContent'}}>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={item.primaryimageurl==null?"https://speakgeekytome.com/wp-content/uploads/2022/04/Ford-cars-and-trucks-painting-with-a-twist-2.png":item.primaryimageurl}
                                    alt="painting"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {item.provenance}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: {item.objectid} usd
                                    </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="small"
                                        onClick={()=>{dispatch(addItemToCart(item))}}>Add to Cart</Button>
                                    </CardActions>
                                </Item>
                            </Grid>))
                        ):<Grid xs={12}><Skeleton /> <Skeleton /><Skeleton /></Grid> 
                        }
                    </Grid>
                </Box>
        </Box>
        </div>
     );
}
 
export default ProductDetail;