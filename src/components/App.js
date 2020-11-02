import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import {
  LivrosPage,
  NotFoundPage,
} from 'components'

// https://github.com/diegohaz/arc/wiki/Styling
import theme from './themes/default'
import history from './history'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
const App = () => {
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            {/* General routes */}
            <Route path="/" component={LivrosPage} exact />
            <Route path="/livros" component={LivrosPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
