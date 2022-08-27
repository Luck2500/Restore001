import React, { useState } from 'react'
import Header from './Header'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';
import Catalog from '../../features/catalog/Catalog';


export default function App() {
  const [mode,setMode] = useState(true)
  const displayMode = mode ? "light" : "dark"

  const darkTheme = createTheme({
    palette: {
      mode: displayMode,
    },
  });

  const handleMode=()=>setMode(!mode)

  return (
    <React.Fragment>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header handleMode={handleMode} />
        <Container>
          <Catalog />
        </Container>
      </ThemeProvider>
    </React.Fragment>
  )
}
