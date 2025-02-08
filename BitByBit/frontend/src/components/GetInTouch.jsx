import React from 'react'
import {  
    Button,
    Stack,
} from '@mui/material'
import Title from './Title'
import Paragraph from './Paragraph'
import { Link } from 'react-router-dom'

const GetInTouch = () => {

    return (
        <Stack 
        component='section'
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            my: 5,
            mx: 2,
            p:5,
            fontFamily: 'Yatra One',
            backgroundColor: '#F5F5F5',
        }}
        >
            <Title 
            text={
                'Blockchain-based Microloans'
                } 
            textAlign={'center'}
            variant='h4'
            sx={{ mt: 6 }}
            />
            <Paragraph 
            text={
                'We are proud to offer blockchain-based microloans to help \
                homebuyers overcome financial barriers. Our platform ensures \
                transparency, security, and efficiency in the loan process. \
                Contact us to learn more about our blockchain-based microloans.'
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            />
            <Button component={Link} 
            to={'/contact'}
            variant="contained" 
            type="submit"
            size="medium"
            sx= {{ 
                fontSize: '0.9rem',
                textTransform: 'capitalize', 
                py: 2,
                px: 4,
                mt: 3, 
                mb: 2,
                borderRadius: 0,
                backgroundColor: '#14192d',
                "&:hover": {
                    backgroundColor: '#1e2a5a',
                }
            }}
            >
                Get in touch
            </Button>

            
        </Stack>
    )
}

export default GetInTouch;
