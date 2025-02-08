import React from 'react'
import {  
    Grid, 
    Typography,
    IconButton,
    Card,
    CardContent,
    styled,
} from "@mui/material";
// icons
import SportsGymnasticsIcon from '@mui/icons-material/MonetizationOnTwoTone';
import LocalParkingIcon from '@mui/icons-material/PriceCheckTwoTone';
import FastfoodOutlinedIcon from '@mui/icons-material/CurrencyBitcoin';
import PoolOutlinedIcon from '@mui/icons-material/PriceChange';
import WifiPasswordIcon from '@mui/icons-material/Savings';
import Title from './Title'
import Paragraph from './Paragraph'

const TumblingGridItem = styled(Grid)(({ theme }) => ({
    '&:hover': {
        animation: 'tumbling .50s ease-in-out',
    },
}));

const tumblingKeyframes = `
    @keyframes tumbling {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(2deg); }
        40% { transform: rotate(-2deg); }
        70% { transform: rotate(2deg); }
        100% { transform: rotate(0deg); }
    }
`;

const Content = () => {
  return (    
        <Grid container spacing={2}   
        sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            py: 10,
            px: 2,
        }}
        >

            <style>{tumblingKeyframes}</style>

            <Grid item xs={12} sm={12} md={5}
            component = 'section'
            >
                
                <Title
                text={
                    'What we are offering?'
                }
                textAlign={'start'}
                /> 

                <Paragraph 
                    text={
                        'We offer flexible, affordable, and convenient microloans\
                        to help you meet your short-term financial needs.\
                        Our mission is to create a supportive environment\
                        where individuals can grow and thrive.'
                    }
                    maxWidth={'75%'}
                    mx={0}
                    textAlign={'start'}
                />
            </Grid>
            
            <TumblingGridItem  item xs={12} sm={6} md={3}>
                <Card 
                square={ true }
                sx={{
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                    boxShadow: '0px 10px 20px rgba(113, 33, 128, 0.6)',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}}>
                    <CardContent>
                        <IconButton>
                            <SportsGymnasticsIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                            
                        }}
                        >
                        Currency
                        </Typography>
                    </CardContent>
                </Card>
            </TumblingGridItem >

            <TumblingGridItem  item xs={12} sm={6} md={3}>
                <Card 
                square={ true }
                sx={{
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                    boxShadow: '0px 10px 20px rgba(113, 33, 128, 0.6)',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}}>
                    <CardContent>
                        <IconButton>
                            <LocalParkingIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Price Checkout
                        </Typography>
                    </CardContent>
                </Card>
            </TumblingGridItem >

            <TumblingGridItem  item xs={12} sm={6} md={3}>    
                <Card 
                square={ true }
                sx={{
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                    boxShadow: '0px 10px 20px rgba(113, 33, 128, 0.6)',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}}>
                    <CardContent>
                        <IconButton>
                            <FastfoodOutlinedIcon
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        CryptoCurrency
                        </Typography>
                    </CardContent>
                </Card>
            </TumblingGridItem >

            <TumblingGridItem  item xs={12} sm={6} md={3}>
                <Card 
                square={ true }
                sx={{
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                    boxShadow: '0px 10px 20px rgba(113, 33, 128, 0.6)',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}}>
                    <CardContent>
                        <IconButton>
                            <PoolOutlinedIcon 
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Price Change
                        </Typography>
                    </CardContent>
                </Card>
            </TumblingGridItem >

            <TumblingGridItem  item xs={12} sm={6} md={3}>
                <Card 
                square={ true }
                sx={{
                    minHeight: 200,
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    '&:hover': {
                    boxShadow: '0px 10px 20px rgba(113, 33, 128, 0.6)',
                    transition: 'box-shadow 0.3s ease-in-out',
                }}}>
                    <CardContent>
                        <IconButton>
                            <WifiPasswordIcon
                            fontSize="large"
                            color="secondary" />
                        </IconButton>
                        <Typography 
                        variant="h5" 
                        component="p"
                        sx={{
                            fontWeight: 700,
                            textTransform: 'capitalize',
                        }}
                        >
                        Savings
                        </Typography>
                    </CardContent>
                </Card>
            </TumblingGridItem > 
        </Grid>
    );
}

export default Content;
