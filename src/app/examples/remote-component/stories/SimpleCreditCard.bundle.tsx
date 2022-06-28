import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material';
import React from 'react';

const SimpleCreditCard = (props: any) => {
  // form 관련 동작을 위한 함수 및 변수
  const { handleSubmit, handleChange, isSubmitting, errors, values, touched } = props;

  const { title, subTitle } = props;

  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box mb={8}>
              <Typography variant="h4" gutterBottom>
                <strong>{title}</strong>
              </Typography>
              <Typography variant="h4">{subTitle}</Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item container spacing={2}>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="card_number"
              label={'카드번호'}
              name="card_number"
              autoComplete="card_number"
              autoFocus
              onChange={handleChange}
              value={values.card_number}
              helperText={touched.card_number ? errors.card_number : ''}
              error={touched.card_number && Boolean(errors.card_number)}
              // autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="expiry"
              label={'만료일 (YYYY-MM)'}
              name="expiry"
              autoComplete="expiry"
              onChange={handleChange}
              value={values.expiry}
              helperText={touched.expiry ? errors.expiry : ''}
              error={touched.expiry && Boolean(errors.expiry)}
              // autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="birth"
              label={'생년월일 6자리 (또는 사업자등록번호 10자리)'}
              name="birth"
              autoComplete="birth"
              onChange={handleChange}
              value={values.birth}
              helperText={touched.birth ? errors.birth : ''}
              error={touched.birth && Boolean(errors.birth)}
              // autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              id="pwd_2digit"
              label={'카드 비밀번호 앞 2자리'}
              name="pwd_2digit"
              autoComplete="pwd_2digit"
              onChange={handleChange}
              value={values.pwd_2digit}
              helperText={touched.pwd_2digit ? errors.pwd_2digit : ''}
              error={touched.pwd_2digit && Boolean(errors.pwd_2digit)}
              // autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={isSubmitting}
              endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
            >
              등록
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default SimpleCreditCard;
