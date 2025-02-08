import React,{ useState } from 'react'
// mui
import { 
    Box,
    Stack,
} from "@mui/material";
// carousel
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
// components
import Title from './Title'
import Paragraph from './Paragraph'


const Gallery = () => {
    
    const [currentIndex, setCurrentIndex] = useState();

    const imageData = [
        {
            alt: 'image1',
            url: 'https://images.pexels.com/photos/8369770/pexels-photo-8369770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        },
        {
            alt: 'image2',
            url: 'https://media.istockphoto.com/id/887389924/photo/bitcoin-and-ethereum-exchange-on-blackboard.jpg?b=1&s=612x612&w=0&k=20&c=4-uzjb1SikoW5QDOVnM71PUwhFL-LHZLqr00hdLU3gs='
        },
        {
            alt: "image3",
            url: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            alt: "image4",
            url: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            alt: "image5",
            url: 'https://images.pexels.com/photos/6771607/pexels-photo-6771607.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            alt: "image6",
            url: 'https://images.pexels.com/photos/1263324/pexels-photo-1263324.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            alt: "image7",
            url: 'https://images.pexels.com/photos/6764526/pexels-photo-6764526.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
        {
            alt: "image8",
            url: 'https://images.pexels.com/photos/7567236/pexels-photo-7567236.jpeg?auto=compress&cs=tinysrgb&w=600'
        },
    ];
  
    const renderSlides = imageData.map((image) => (
    <div key={image.alt}>
        <img src={image.url} alt={image.alt} />
    </div>
    ));


    const handleChange = (index) => {
        setCurrentIndex(index);
    }

    return (
        <Stack
        direction='column'
        justifyContent= 'center'
        alignItems= 'center'
        sx={{
            py: 8,
            px: 2,
            display: { xs: 'flex'},
        }}
        >
            <Box
            component='section'
            sx={{
                paddingBottom: 3,
            }}
            >
                <Title 
                text={
                    'Future Plans and Aim'
                }
                textAlign={'center'}
                />
                <Paragraph text={
                    'Our mission is to provide affordable loans\
                    to small businesses and individuals on the Ethereum blockchain.\
                    We aim to create a fair and transparent lending platform\
                    that benefits both borrowers and lenders.'
                } 
                maxWidth = {'sm'}
                mx={'auto'}
                textAlign={'center'}
                />
            </Box>
            
            <Box sx={{ 
                maxWidth: 700,
                width: '100%',
            }}>
                <Carousel
                centerSlidePercentage={10}
                thumbWidth={200}
                dynamicHeight={false}
                centerMode={false}
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                selectedItem={imageData[currentIndex]}
                onChange={handleChange}
                className="carousel-container"
                >
                {renderSlides}
                </Carousel>
            </Box>
        </Stack>
    )
}

export default Gallery