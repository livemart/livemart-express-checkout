import { Flex, Text } from "@theme-ui/components"
import moment from "moment"
import React from "react"

const OrderConfirmation = ({ order }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column"
      }}>
      <Flex
        mt={3}
        pb={3}
        sx={{
          fontSize: "24px",
          borderBottom: "1px solid #E5E7EB",
          flexDirection: "column",
          fontWeight: "500"
        }}>
        <Flex sx={{ lineHeight: "36px" }}>
          Thank you, {order?.customer?.firstName} {order?.customer?.lastName}! <br />
          We take care of it.
        </Flex>
        <Text variant="summary" sx={{ mt: "8px" }}>
          Your order has been placed. We are working to get it settled. Check
          your email for order confirmation.
        </Text>
      </Flex>
      <Flex my={3} pb={3} sx={{ flex: 1 }}>
        <Flex
          sx={{
            flex: 1,
            flexDirection: "column"
          }}>
          <Flex sx={{ mb: "8px" }}>
            <Text variant="summary" sx={{ mr: "5px" }}>
              Order number:
            </Text>
            <Text variant="summary" sx={{ color: "#111827" }}>
              {order?.hash}
            </Text>
          </Flex>
          <Flex sx={{ mb: "8px" }}>
            <Text variant="summary" sx={{ mr: "5px" }}>
              Date:
            </Text>
            <Text variant="summary" sx={{ color: "#111827" }}>
              {moment(order?.createdAt).format("LLLL")}
            </Text>
          </Flex>
          <Flex sx={{ mb: "24px" }}>
            <Text variant="summary" sx={{ mr: "5px" }}>
              We have sent an order confirmation to{" "}
              <span style={{ color: "#111827", fontWeight: 500 }}>
                {order?.customer.email}.
              </span>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default OrderConfirmation
