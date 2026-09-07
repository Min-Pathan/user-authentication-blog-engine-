import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme/theme.js'
import { BrowserRouter } from 'react-router'
import ToastProvider from './components/common/ToastProvider.jsx'
import { CssBaseline } from '@mui/material'
import { store } from './app/store.js'
import {
  Provider,
} from "react-redux";


createRoot(document.getElementById('root')).render(
   <StrictMode>
     <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <ToastProvider>
          <App />
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
