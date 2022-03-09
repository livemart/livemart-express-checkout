import { Card, Flex } from "@theme-ui/components"
import React from "react"
import OrderConfirmation from "../steps/order-confirmation"
import Layout from "./layout"

const CompletedLayout = ({ order }) => {
  return (
    <Layout>
      <Card variant="container">
        <>
          <OrderConfirmation order={order} />
          <Flex
            pt={4}
            sx={{
              flexDirection: ["column", "row"],
              fontSize: "12px",
              width: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}
          ></Flex>
        </>
      </Card>
    </Layout>
  )
}

export default CompletedLayout
