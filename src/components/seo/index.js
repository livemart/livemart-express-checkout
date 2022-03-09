import React from "react"
import Helmet from "react-helmet"

const SEO = ({ title }) => {
  return (
    <Helmet
      title={title || "LiveMart Express Checkout"}
      meta={[]}
    />
  )
}

export default SEO
