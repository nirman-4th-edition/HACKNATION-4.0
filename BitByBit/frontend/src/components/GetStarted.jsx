import React from 'react'
import { Alert, AlertTitle, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { 
    Box,
    Grid,
    styled,
    Typography,
} from '@mui/material'
import Title from './Title'
import imgDetail from '../assets/eth5.jpeg';
import imgDetail2 from '../assets/eth4.jpeg';

const NewsContainer = styled(Box)({
        width: '95%',
        padding: '2rem',
        marginTop: '2rem',

      });
      const NewsAlert = styled(Alert)({
        marginBottom: '2rem',
        '& .MuiAlert-message': {
          width: '100%'
        },backgroundColor: '#f3f3f3', // Added light gray background
        borderRadius: '10px', // Added border radius for better aesthetics
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      });

const GetStarted = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const retryFetch = async (url, attempts = 3) => {
        for (let i = 0; i < attempts; i++) {
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                return await response.json();
            } catch (err) {
                if (i === attempts - 1) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
            }
        }
    };
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(
                    'https://newsdata.io/api/1/news?apikey=pub_683677ffd1ab74700feb62b11015cfaf1f683&q=blockchain%20OR%20cryptocurrency&language=en&size=3'
                );
                const data = await response.json();
                if (data.results) {
                    setNews(data.results);
                }
            } catch (err) {
                setError('Failed to fetch news');
                console.error('News fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

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
            <Grid item xs={12}>
            <NewsContainer>
                    <Title
                        text={'Latest Blockchain News'}
                        textAlign={'center'}
                    />
                    
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <NewsAlert severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </NewsAlert>
                    ) : (
                        news.map((item, index) => (
                            <NewsAlert
                                key={index}
                                severity="info"
                                sx={{
                                    '& .MuiAlert-message': {
                                        width: '90%'
                                    }
                                }}
                            >
                                <AlertTitle>{item.title}</AlertTitle>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {item.description?.slice(0, 200)}...
                                </Typography>
                                <Box sx={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    mt: 1 
                                }}>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(item.pubDate).toLocaleDateString()}
                                    </Typography>
                                    <a 
                                        href={item.link} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        style={{
                                            color: '#007bff',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        Read more
                                    </a>
                                </Box>
                            </NewsAlert>
                        ))
                    )}
                </NewsContainer>
            </Grid>
        </Grid>
    );
}
export default GetStarted;
