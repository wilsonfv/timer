import React, {useState} from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TimerIcon from '@mui/icons-material/HourglassTop';
import GithubIcon from '@mui/icons-material/GitHub';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Countdown, {zeroPad, CountdownApi} from 'react-countdown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';

export default function Timer() {
  const minMinute = 1;
  const maxMinute = 60;

  const [inputMinuteValue, setInputMinuteValue] = useState<number>();
  const [inputCountdownValue, setInputCountdownValue] = useState<number>(Date.now());
  const [alertOpen, setAlertOpen] = React.useState(false);

  let countdownApi: CountdownApi | null = null;
  const setRef = (countdown: Countdown | null): void => {
    if (countdown) {
      countdownApi = countdown.getApi();
    }
  };

  const onHandleStart = () => {
    countdownApi?.start()
  }

  const onHandlePauseResume = () => {
    if (countdownApi?.isStarted()) {
      countdownApi?.pause();
    }
  }

  const onHandleInputMinute = (e) => {
    let value = parseInt(e.target.value, 10);

    if (value > maxMinute) value = maxMinute;
    if (value < minMinute) value = minMinute;

    setInputMinuteValue(value);
    if (!isNaN(value)){
      setInputCountdownValue(Date.now() + value * 60 * 1000);
    }
  }

  const onHandleCountdownComplete = () => {
    setAlertOpen(true)
  }

  const renderer = ({ minutes, seconds }) => {
    return (
      <Stack direction="row" spacing={3}>
        <Typography variant="h1">
          {zeroPad(minutes)}
        </Typography>
        <Typography variant="h1">
          :
        </Typography>
        <Typography variant="h1">
          {zeroPad(seconds)}
        </Typography>
      </Stack>
      );
  };

  return (
    <Box sx={{width: '300px'}}>
      <Stack spacing={5}>
        <div>
          <Stack direction="row">
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
            >
              <Stack alignItems="center" direction="row">
                <TimerIcon/>
                <Typography variant="h5">
                  Timer
                </Typography>
              </Stack>
            </Grid>
            <Grid container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
            >
              <Stack alignItems="center" direction="row">
                <Tooltip title="go to soure code repository">
                <IconButton href={""} target={"_blank"}>
                    <GithubIcon/>
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>
          </Stack>
        </div>
        <div>
          <Stack direction="row">
            <Grid container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
            >
              <TextField
                id="outlined-number"
                label="Minutes"
                type="number"
                value={inputMinuteValue}
                onChange={onHandleInputMinute}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{ inputProps: { min: minMinute, max: maxMinute } }}
                variant="standard"
                sx={{
                  width: 100
                }}
              />
            </Grid>
            <Grid container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
            >
              <ButtonGroup variant="outlined">
                <Button
                  size={"small"}
                  onClick={onHandleStart}
                >start</Button>
                <Button
                  size={"small"}
                  onClick={onHandlePauseResume}
                >pause</Button>
              </ButtonGroup>
            </Grid>
          </Stack>
        </div>
        <div>
          <Countdown
            date={inputCountdownValue}
            ref={setRef}
            autoStart={false}
            renderer={renderer}
            onComplete={onHandleCountdownComplete}
          />
        </div>
        <Stack sx={{ width: '100%' }}>
          <Collapse in={alertOpen}>
            <Alert
              variant="filled"
              severity="success"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setAlertOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              sx={{ mb: 2 }}
            >
              Time is up
            </Alert>
          </Collapse>
        </Stack>
      </Stack>
    </Box>
  );
}
