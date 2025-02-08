import React from 'react'
import { 
  Box, 
  Stack, 
  styled, 
  Typography,
} from '@mui/material'
import Link from '@mui/material/Link';
import FooterTitle from './FooterTitle'
import FooterLink from './FooterLink'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {

  const StackColumn = styled(Stack) (() => ({
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flex: 1,
    gap: 8,
    textAlign: 'center',
  }));

  const BoxRow = styled(Box) (({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ededed',
    flex: 1,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: 30,
    }
  }));

  return (

    <BoxRow 
    component = 'footer'
    sx={{
      py: 4,
      px: 2,
    }}
    >
      <StackColumn>
        <FooterTitle text={'Contact Us'} />
        <FooterLink 
        text={'Top G Town , IIT Khandagiri'}
        />
        <FooterLink 
        text={'(123) 456-7890'}
        />
        <FooterLink 
        text={'info@microloans.com'}
        />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={'Our Services'} />
        <FooterLink text={'Personal Loans'} />
        <FooterLink text={'Business Loans'} />
        <FooterLink text={'Mortgage Refinancing'} />
        <FooterLink text={'Debt Consolidation'} />
      </StackColumn>
      <StackColumn>
        <FooterTitle text={'About Us'} />
        <FooterLink text={'Our Story'} />
        <FooterLink text={'Careers'} />
        <FooterLink text={'FAQ'} />
      </StackColumn>

      <StackColumn>
        <FooterTitle text={'Eth-MicroLoans'} />
        <Stack 
        direction='row' 
        width= '70px'
        maxWidth='100%'
        justifyContent='space-between'
        >
          <Link href="#" variant="body2" 
          sx={{
            color: '#414141',
            "&:hover": {
              color: 'orange',
            }
          }}
          >
            <InstagramIcon />  
          </Link> 
          <Link href="#"variant="body2" 
          sx={{
            color: '#414141',
            "&:hover": {
              color: 'orange',
            }
          }}
          >
            <FacebookIcon />
          </Link> 
        </Stack>
        <Typography 
        variant='caption'
        component='p' 
        >
          &copy; 2025 MicroLoans Inc.
        </Typography>
      </StackColumn>
    </BoxRow>
  )
}

export default Footer
