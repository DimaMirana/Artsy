import React,{useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchCategoryData ,setSlectedCategory} from '../../redux/Slicer/categorySlice';
import {categoryState} from '../../types/Category/categoryTypes'


const Item = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Category=()=> {
  const category: categoryState = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();
  const data = category.categoryData;
  
  useEffect(() => {
    dispatch(fetchCategoryData())
  },[])
  
  const asymettric=[0,3,4,7,8]
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {!category.loading && data.length>0?(
          data.map((item,index)=>(
              <Grid key={index} item xs={asymettric.includes(index) ?8:4}>
                <Link href={{pathname:item.name,query:{product:item.name}}} key={index} style={{textDecoration:'none'}}>
                <Item sx={{height:'300px',cursor:'pointer'}} 
                  onClick={()=>{dispatch(setSlectedCategory(item));console.log(category)}}>
                  <CardMedia
                      component="img"
                      height="140"
                      image="https://speakgeekytome.com/wp-content/uploads/2022/04/Ford-cars-and-trucks-painting-with-a-twist-2.png"
                      alt="painting"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {item.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Explore</Button>
                    </CardActions>
                </Item>
                </Link>
              </Grid>
            
          ))
        ): <Grid xs={12}><Skeleton /> <Skeleton /><Skeleton /></Grid> 
        }
      </Grid>
    </Box>
  );
}
export default Category;