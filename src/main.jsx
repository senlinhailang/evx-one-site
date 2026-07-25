import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme } from 'antd'
import App from './App'
import './styles.css'

const brandTheme = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#a855f7',
    colorInfo: '#a855f7',
    colorSuccess: '#7cff6b',
    colorBgBase: '#07111f',
    colorTextBase: '#f4f8ff',
    borderRadius: 10,
    fontFamily: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Button: {
      controlHeight: 46,
      fontWeight: 700,
      primaryShadow: '0 0 24px rgba(168, 85, 247, 0.22)',
    },
    Input: {
      activeBorderColor: '#a855f7',
      hoverBorderColor: '#a855f7',
    },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider theme={brandTheme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </StrictMode>,
)
