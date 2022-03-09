import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/layout"
import Steps from "../components/steps"
import { livemart } from "../utils/client"

const ProductPage = ({ product, regions }) => {
  const [region, setRegion] = useState(regions?.[0] || null)
  const [country, setCountry] = useState(region?.[0] || null)

  const handleRegionChange = (regId) => {
    const selected = regions.find(r => r.id === regId)
    setCountry(selected)
    setRegion(selected)
  }

  return (
    <>
      <Layout
        regions={regions}
        country={country}
        handleRegionChange={handleRegionChange}>
        <Head>
          <title>LiveMart Express Checkout - {product.title}</title>
          <meta name="description" content={product?.description || ""} />
        </Head>
        <Steps
          product={product}
          regions={regions}
          region={region}
          country={country}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const handle = ctx.query.handle
  const response = await livemart.product_by_slug(handle)
  const regionResponse = await livemart.list_locations()

  const product = response.data.data.productBySlug
  const regions = regionResponse.data.data.locations

  // Pass post data to the page via props
  return { props: { product, regions } }
}

export default ProductPage
