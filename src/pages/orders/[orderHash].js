import Head from "next/head"
import React from "react"
import CompletedLayout from "../../components/layout/completed-layout"
import { livemart } from "../../utils/client"

const CompletedPage = ({ order }) => {
  return (
    <>
      <Head>
        <title>Order completed!</title>
        <meta name="description" content="One-page checkout" />
      </Head>
      <CompletedLayout order={order} />
    </>
  )
}

export async function getServerSideProps(ctx) {
  const orderHash = ctx.query.orderHash
  const customerEmail = ctx.query.customerEmail

  const response = await livemart.getOrderByGuest(orderHash, customerEmail)
  const order = response.data.data.orderByCustomerEmail

  return { props: { order } }
}

export default CompletedPage
