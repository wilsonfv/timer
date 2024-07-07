"use client";

import * as React from 'react';
import { ThemeProvider, createTheme, ThemeOptions } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Timer from "@/app/ui/timer";
import {Paper} from "@mui/material";

const theme = createTheme();

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper sx={{width: "100%"}}>
        <div className="grid h-screen place-items-center">
          <Timer />
        </div>
      </Paper>
    </ThemeProvider>
  );
}
