import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { ReactElement, useCallback, useState } from 'react';
import Layout from 'client/layouts';
import ContentCopy from '@mui/icons-material/ContentCopy';
import { UploadAvatar } from 'client/components/upload';
import Header from 'client/app/examples/tailwind/components/Header';

function ExamplesTailwindProfileEdit() {
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleDropAvatar = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setAvatarUrl(
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
    }
  }, []);

  return (
    <>
      <div className="tw relative mb-12">
        <Header />
      </div>
      <Container>
        <Typography variant="h3" component="h4">
          프로필 수정하기
        </Typography>

        <Box component="form" noValidate autoComplete="off" className="mt-12">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth id="outlined-basic" label="닉네임" defaultValue={''} />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="자기소개를 입력해주세요"
                    multiline
                    rows={4}
                    defaultValue=""
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="outlined-basic" label="이메일" defaultValue={''} />
                </Grid>
                <Grid container sx={{ mt: 0.3 }} spacing={2}>
                  <Grid item xs={6}>
                    <TextField fullWidth id="outlined-basic" label="생년월일" defaultValue={''} />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl fullWidth>
                      <InputLabel id="gender-select-label">성별</InputLabel>
                      <Select
                        labelId="gender-select-label"
                        id="demo-simple-select"
                        value={''}
                        label="성별"
                        // onChange={handleChange}
                      >
                        <MenuItem value={'male'}>남성</MenuItem>
                        <MenuItem value={'female'}>여성</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth id="outlined-basic" label="sns 주소" defaultValue={''} />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">내 지갑 주소</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={'text'}
                      value={''}
                      // onChange={handleChange('password')}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            // onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            <ContentCopy />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="프로필 사진" />
                <CardContent>
                  <UploadAvatar
                    // accept="image/*"
                    file={avatarUrl}
                    onDrop={handleDropAvatar}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        {/* <br /> max size of {fData(3145728)} */}
                      </Typography>
                    }
                  />
                </CardContent>
              </Card>
              <Card className="mt-5">
                <CardHeader title="배경 사진" />
                <CardContent>
                  <UploadAvatar
                    // accept="image/*"
                    file={avatarUrl}
                    onDrop={handleDropAvatar}
                    helperText={
                      <Typography
                        variant="caption"
                        sx={{
                          mt: 2,
                          mx: 'auto',
                          display: 'block',
                          textAlign: 'center',
                          color: 'text.secondary',
                        }}
                      >
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        {/* <br /> max size of {fData(3145728)} */}
                      </Typography>
                    }
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item sx={{ mt: 0.3 }} xs={12}>
              <Button size="large" variant="contained">
                저장
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default ExamplesTailwindProfileEdit;
