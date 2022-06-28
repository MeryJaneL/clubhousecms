import {
  Box,
  Button,
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Modal,
  Paper,
  Radio,
  Typography,
} from '@mui/material';
import React from 'react';
import moment from 'moment';
import PlanStarterIcon from '../assets/ic_plan_starter';
import ThemeProvider from 'client/theme';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 326,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  borderRadius: 5,
  boxShadow: 24,
};

const Simple = (props: any) => {
  // 구독 해지 모달 설정
  const [cancelSubscription, setCancelSubscription] = React.useState(false);

  // 결제 페이지 타이틀, 서브 타이틀
  const { title, subTitle } = props;

  // MR Login에서 설정한 결제 목록 리스트
  const { pricingPlanList } = props;

  // 이전에 구독한 정보가 있다면 기본값으로 설정하기 위한 변수
  const { values } = props;

  // 사용자의 결제 관련한 정보
  const { userData } = props;

  // 구독 중인 회원인지 확인
  const isExistsSubscription = !!userData?.membershipUser?.subscription?.nextPlan;

  // 구독 중인 회원인지 확인
  const { isExistsCreditCard } = props;

  // form event 관련 변수
  const { handleSubmit, handleChange, isSubmitting } = props;

  // 결제 수단 변경 페이지 이동 함수
  const { navigateCreditCard } = props;

  // 구독 취소 요청 함수
  const { deleteSubscription } = props;

  const { path } = props;

  return (
    <ThemeProvider>
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

          <Grid item xs={12}>
            <Paper
              elevation={3}
              style={{
                paddingTop: 40,
                paddingLeft: 15,
                paddingBottom: 40,
                paddingRight: 15,
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={10}>
                  <Typography variant="h5" gutterBottom>
                    <strong>플랜</strong>
                    {isExistsSubscription && (
                      <label style={{ fontSize: 18, marginLeft: 20 }}>
                        {userData?.membershipUser?.subscription?.currentPlan?.name} 플랜이용중
                      </label>
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {isExistsSubscription && (
                    <Button
                      variant="text"
                      style={{ color: '#3366FF' }}
                      onClick={() => {
                        setCancelSubscription(true);
                      }}
                    >
                      구독해지
                    </Button>
                  )}
                </Grid>
              </Grid>
              <Grid
                container
                spacing={0}
                style={{
                  marginTop: 15,
                  marginBottom: 15,
                  paddingTop: 15,
                  paddingBottom: 15,
                  backgroundColor: '#F4F6F8',
                  borderRadius: 15,
                }}
              >
                <Grid item xs={8} alignItems="center">
                  <label style={{ marginLeft: 15 }}>
                    <strong>제품</strong>
                  </label>
                </Grid>
                <Grid item xs={4} alignItems="center">
                  <label>
                    <strong>합계 가격</strong>
                  </label>
                </Grid>
              </Grid>
              <List>
                {pricingPlanList?.map((pricingPlan: any) => {
                  return (
                    <ListItem key={pricingPlan.id}>
                      <ListItemIcon>
                        {/* 이미지를 변경의 경우 http://, https:// 외부 주소를 사용  */}
                        {/* <img src={path + img} height={60} width={60} /> */}
                        <PlanStarterIcon />
                      </ListItemIcon>

                      <ListItemText
                        primary={pricingPlan.name}
                        secondary={pricingPlan.description}
                      />
                      <ListItemText
                        primary={Number(pricingPlan.standard).toLocaleString('ko-KR') + '원'}
                      />
                      <ListItemSecondaryAction>
                        <Radio
                          edge="end"
                          name="nextPlanId"
                          // color="primary"
                          checked={values.nextPlanId === pricingPlan.id}
                          onChange={handleChange}
                          value={pricingPlan.id}
                          style={{ color: '#3366FF' }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Grid>

          <Grid item container spacing={2}>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                // color="primary"
                style={{ color: '#FFFFFF', backgroundColor: '#3366FF' }}
                size="large"
                disabled={isSubmitting}
                endIcon={isSubmitting ? <CircularProgress size={16} /> : undefined}
              >
                {isExistsCreditCard ? '저장' : '다음'}
              </Button>
            </Grid>
            {isExistsCreditCard ? (
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="text"
                  color="primary"
                  size="large"
                  onClick={() => {
                    navigateCreditCard();
                  }}
                >
                  결제수단 변경
                </Button>
              </Grid>
            ) : undefined}
          </Grid>
        </Grid>
      </form>
      <Modal
        open={cancelSubscription}
        onClose={() => {
          setCancelSubscription(false);
        }}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style }}>
          <Box
            style={{
              width: '100%',
              height: '100%',
              paddingTop: 45,
              paddingLeft: 30,
              paddingRight: 30,
              paddingBottom: 30,
              textAlign: 'center',
            }}
          >
            <Box>
              <h2>현재 플랜 구독을 취소할까요?</h2>
            </Box>

            <Box style={{ marginTop: 40, marginBottom: 40 }}>
              <p>
                구독을 취소할 시
                <strong style={{ marginLeft: 5 }}>
                  {moment(userData?.membershipUser?.subscription?.expiresDate).format('YYYY')}년
                </strong>
                <strong style={{ marginLeft: 5 }}>
                  {moment(userData?.membershipUser?.subscription?.expiresDate).format('MM')}월
                </strong>
                <strong style={{ marginLeft: 5 }}>
                  {moment(userData?.membershipUser?.subscription?.expiresDate).format('DD')}일
                </strong>{' '}
                부터 해지됩니다.
              </p>
            </Box>
            <Box style={{ marginTop: 40, marginBottom: 40 }}>
              <p>
                현재 플랜:{' '}
                <label style={{ color: '#3366FF' }}>
                  {userData?.membershipUser?.subscription?.currentPlan?.name} 플랜
                </label>
              </p>
            </Box>

            <Grid container justifyContent="center" style={{ marginTop: 30 }}>
              <Grid item xs={6} style={{ padding: 15 }}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ color: '#637381', backgroundColor: '#F4F6F8' }}
                  onClick={async () => {
                    deleteSubscription();
                    setCancelSubscription(false);
                    window.location.reload();
                  }}
                >
                  <strong>구독취소</strong>
                </Button>
              </Grid>
              <Grid item xs={6} style={{ padding: 15 }}>
                <Button
                  fullWidth
                  variant="contained"
                  style={{ color: '#ffffff', backgroundColor: '#3366FF' }}
                  onClick={() => {
                    setCancelSubscription(false);
                  }}
                >
                  <strong>취소하기</strong>
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default Simple;
