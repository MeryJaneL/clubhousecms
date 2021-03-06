// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Link, Divider, Container, Typography, Stack, Box } from '@mui/material';
// routes
// import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from '../../public/logo/BounceNFT.svg';
// import SocialsButton from '../../components/SocialsButton';

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: '메뉴',
    children: [
      { name: '탐색하기', href: '#' },
      { name: '발행하기', href: '#' },
      { name: '마이페이지', href: '#' },
      { name: 'Project ', href: '#' },
    ],
  },
  {
    headline: '회사',
    children: [
      { name: '우리에 대해', href: '#' },
      { name: '개인정보 보호 정책', href: '#' },
      { name: '서비스 이용약관', href: '#' },
    ],
  },
  {
    headline: '문의',
    children: [
      { name: 'support@bouncecode.io', href: '#' },
      { name: '서울시 강서구 마곡중앙로161-8, A동 1011호 (마곡동, 두산더랜드파크)', href: '#' },
    ],
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

const logo = (
  <svg width="151" height="36" viewBox="0 0 151 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.42969 27H8.625C12.457 27 14.4727 25.0078 14.4844 22.3125C14.4727 19.8047 12.668 18.2812 10.7578 18.1875V18.0234C12.5039 17.6367 13.8164 16.3828 13.8047 14.3906C13.8164 11.8359 11.918 10.0312 8.17969 10.0312H1.42969V27ZM4.94531 24.0938V19.5469H8.01562C9.75 19.5469 10.8398 20.5547 10.8281 21.9844C10.8398 23.2617 9.96094 24.1055 7.92188 24.0938H4.94531ZM4.94531 17.1328V12.8906H7.73438C9.33984 12.8906 10.2539 13.7227 10.2422 14.9531C10.2539 16.3125 9.14062 17.1445 7.66406 17.1328H4.94531Z"
      fill="black"
    />
    <path
      d="M32.25 18.5156C32.25 12.9727 28.8164 9.79688 24.3281 9.79688C19.8047 9.79688 16.3828 12.9727 16.3828 18.5156C16.3828 24.0352 19.8047 27.2344 24.3281 27.2344C28.8164 27.2344 32.25 24.0586 32.25 18.5156ZM19.9688 18.5156C19.9688 14.8828 21.6914 12.9258 24.3281 12.9141C26.9414 12.9258 28.6758 14.8828 28.6641 18.5156C28.6758 22.1367 26.9414 24.1055 24.3281 24.1172C21.6914 24.1055 19.9688 22.1367 19.9688 18.5156Z"
      fill="black"
    />
    <path
      d="M45.2812 10.0312V20.7656C45.293 22.7227 43.9102 24.1289 41.7891 24.1406C39.6914 24.1289 38.3086 22.7227 38.2969 20.7656V10.0312H34.7812V21.0469C34.7812 24.7617 37.5703 27.2461 41.7891 27.2344C45.9961 27.2461 48.8203 24.7617 48.8203 21.0469V10.0312H45.2812Z"
      fill="black"
    />
    <path
      d="M65.8359 10.0312H62.3438V20.8125H62.1797L54.7734 10.0312H51.6797V27H55.1953V16.2188H55.3359L62.7891 27H65.8359V10.0312Z"
      fill="black"
    />
    <path
      d="M80.0391 15.9375H83.6016C83.1328 12.0352 80.1797 9.79688 76.2656 9.79688C71.7891 9.79688 68.3672 12.9727 68.3672 18.5156C68.3672 24.0352 71.7305 27.2344 76.2656 27.2344C80.5781 27.2344 83.2148 24.375 83.6016 21.2344L80.0391 21.2109C79.6992 23.0508 78.2461 24.1055 76.3125 24.1172C73.7227 24.1055 71.9531 22.1719 71.9531 18.5156C71.9531 14.9414 73.6992 12.9258 76.3359 12.9141C78.3164 12.9258 79.7578 14.0625 80.0391 15.9375Z"
      fill="black"
    />
    <path
      d="M86.0625 27H97.4766V24.0938H89.5781V19.9688H96.8672V17.0625H89.5781V12.9375H97.4531V10.0312H86.0625V27Z"
      fill="black"
    />
    <path
      d="M119.883 10.0312H116.391V20.8125H116.227L108.82 10.0312H105.727V27H109.242V16.2188H109.383L116.836 27H119.883V10.0312Z"
      fill="#3366FF"
    />
    <path
      d="M122.742 27H126.258V19.9688H133.195V17.0625H126.258V12.9375H133.922V10.0312H122.742V27Z"
      fill="#3366FF"
    />
    <path
      d="M135.586 12.9375H140.789V27H144.281V12.9375H149.484V10.0312H135.586V12.9375Z"
      fill="#3366FF"
    />
  </svg>
);

// ----------------------------------------------------------------------

export default function MainFooter() {
  return (
    <RootStyle>
      <Divider sx={{ mt: 60 }} />
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          {/* <Grid item xs={12} sx={{ mb: 3 }}>
           
          </Grid> */}
          <Grid item xs={8} md={3}>
            <Box sx={{ width: 40, height: 40, cursor: 'pointer', marginBottom: '24px' }}>
              {logo}
            </Box>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              The starting point for your next project with Minimal UI Kit, built on the newest
              version of Material-UI ©, ready to be customized to your style.
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              {/* <SocialsButton sx={{ mx: 0.5 }} /> */}
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <NextLink key={link.name} href={link.href} passHref>
                      <Link color="inherit" variant="body2" sx={{ display: 'block' }}>
                        {link.name}
                      </Link>
                    </NextLink>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

        <Typography
          component="p"
          variant="body2"
          sx={{
            mt: 10,
            pb: 5,
            fontSize: 13,
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          © 2022. All rights reserved
        </Typography>
      </Container>
    </RootStyle>
  );
}
