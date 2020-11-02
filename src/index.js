import { hot } from 'react-hot-loader/root'
import 'babel-polyfill'
import React, { Suspense } from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from 'components/App'
import { ConfigProvider } from 'antd'
import 'antd/dist/antd.css'

const renderApp = () => (
  <Suspense fallback={<h1>Loading...</h1>}>
    <BrowserRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Suspense>
)
const root = document.getElementById('app')
render(renderApp(), root)
export default hot(renderApp)
