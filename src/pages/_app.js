import Head from "next/head"
import React from "react"
import { ThemeProvider } from "theme-ui"
import "../fonts/index.css"
import theme from "../theme"

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
