import Head from "next/head"
import React, { useState } from "react"
import Layout from "../components/layout"
import Steps from "../components/steps"
import { livemart } from "../utils/client"

const ProductPage = ({ product, regions, storeInfo }) => {
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
          storeInfo={storeInfo}
        />
      </Layout>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const handle = ctx.query.handle
  const response = await livemart.product_by_slug(handle)
  const regionResponse = await livemart.list_locations()
  const storeInfoResp = await livemart.getStoreBySecret()

  const product = response.data.data.productBySlug
  const regions = regionResponse.data.data.locations
  const storeInfo = storeInfoResp.data.data.storeBySecret

  // Pass post data to the page via props
  return { props: { product, regions, storeInfo } }
}

export default ProductPage
