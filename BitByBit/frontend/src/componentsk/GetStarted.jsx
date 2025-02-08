import React from 'react'
import { 
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material'
import Title from './Title'
import imgDetail from '../assets/eth5.jpeg';
import imgDetail2 from '../assets/eth4.jpeg';


const GetStarted = () => {

    const CustomGridItem = styled(Grid) ({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
    })

    const CustomTypography = styled(Typography) ({
        fontSize: '1.3rem',
        textAlign: 'start',
        lineHeight: '1.5',
        color: '#515151',
        marginTop: '1.5rem',
        fontFamily: 'Almendra',
        fontWeight: 400,
        fontStyle: 'normal',
    })

    return (

        <Grid container spacing={{ xs: 4, sm: 4, md: 0 }}   
        sx={{
            py: 10,
            px: 2,

        }}
        >
            <CustomGridItem item xs={12} sm={8} md={6} 
            component = 'section'

            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Easily access affordable loans for micro-investments'
                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                        Our blockchain-based microloans platform connects<br />
                        borrowers with lenders in real-time, ensuring<br />
                        fair and transparent financing options.
                    </CustomTypography> 
                </Box>

            </CustomGridItem>

            <Grid item xs={12} sm={4} md={6}>
                <img src={imgDetail} alt="" 
                style={{
                    width: '100%',
                }}
                />
            </Grid>

            <Grid item xs={12} sm={4} md={6}
            sx={{
                order: {xs: 4, sm: 4, md: 3}
            }}
            >
                <img src={imgDetail2} alt="" 
                style={{ 
                    width: "100%",
                }}
                />
            </Grid>

            <CustomGridItem item xs={12} sm={8} md={6}
            sx={{
                order: {xs: 3, sm: 3, md: 4}
            }}
            >
                <Box component='article'
                sx={{
                    px: 4,
                }}
                >
                    <Title
                    text={
                        'Trustworthy and secure lending'

                    }
                    textAlign={'start'}
                    />
                    <CustomTypography>
                        Our blockchain technology ensures transparency and<br />
                        security in the lending process, reducing fraud and<br />
                        increasing trust among borrowers and lenders.
                    </CustomTypography>
                </Box>
            </CustomGridItem>
        </Grid>
    )
}

export default GetStarted;
