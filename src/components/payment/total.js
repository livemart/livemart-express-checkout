import { Flex, Text } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { livemart, livemartStorage } from "../../utils/client"

const Total = ({}) => {
  const [total, setTotal] = useState(null)
  const [subtotal, setSubtotal] = useState(null)
  const [shippingCharge, setShippingCharge] = useState(null)
  const [paymentProcessingFee, setPaymentProcessingFee] = useState(null)

  useEffect(() => {
    if (total !== null) {
      return
    }

    async function calculateFees() {
      let cart = JSON.parse(livemartStorage.get("cart"))
      let subtotal = 0
      cart.cartItems.forEach(i => {
        subtotal += i.purchasePrice * i.quantity
      })
      setSubtotal(subtotal)

      let shippingChargeResp = await livemart.getShippingCharge(livemartStorage.getCartId(), livemartStorage.getShippingMethodId())
      let shippingCharge = shippingChargeResp.data.data.checkShippingCharge
      setShippingCharge(shippingCharge)

      let paymentFeeResp = await livemart.getPaymentProcessingCharge(livemartStorage.getCartId(), livemartStorage.getShippingMethodId(), livemartStorage.getPaymentMethodId())
      let paymentFee = paymentFeeResp.data.data.checkPaymentProcessingFee
      setPaymentProcessingFee(paymentFee)

      let total = subtotal + shippingCharge + paymentFee
      setTotal(total)

      livemartStorage.set("pay_total", total)
    }

    calculateFees()
  }, [total, subtotal, shippingCharge])

  return (
    <Flex
      sx={{
        flexDirection: "column",
        mt: "1em",
        mb: "8px",
        py: "16px",
        borderBottom: "1px solid #E5E7EB",
        borderTop: "1px solid #E5E7EB"
      }}>
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          mb: "8px"
        }}>
        <Text sx={{ color: "#6B7280", fontSize: "12px" }}>Subtotal</Text>
        <Text sx={{ fontWeight: 400, color: "#111827", fontSize: "12px" }}>
          USD {subtotal ? (subtotal / 100).toFixed(2) : 0}
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          mb: "8px"
        }}>
        <Text sx={{ color: "#6B7280", fontSize: "12px" }}>Shipping</Text>
        <Text sx={{ fontWeight: 400, color: "#111827", fontSize: "12px" }}>
          USD {shippingCharge ? (shippingCharge / 100).toFixed(2) : 0}
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          mb: "8px"
        }}>
        <Text sx={{ color: "#6B7280", fontSize: "12px" }}>Payment Fee</Text>
        <Text sx={{ fontWeight: 400, color: "#111827", fontSize: "12px" }}>
          USD {paymentProcessingFee ? (paymentProcessingFee / 100).toFixed(2) : 0}
        </Text>
      </Flex>
      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between"
        }}>
        <Text sx={{ fontWeight: 500, color: "#111827", fontSize: "12px" }}>
          Total
        </Text>
        <Text sx={{ fontWeight: 500, color: "#111827", fontSize: "12px" }}>
          USD {total ? (total / 100).toFixed(2) : 0}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Total
