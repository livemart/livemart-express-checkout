import { Box, Card, Flex, Text } from "@theme-ui/components"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import PaymentDetails from "../payment/payment"
import Review from "../payment/review"
import Total from "../payment/total"
import Spinner from "../spinner/spinner"
import { livemart, livemartStorage } from "../../utils/client"
import { loadStripe } from "@stripe/stripe-js"

const DeliveryReview = () => (
  <Flex
    sx={{
      flexDirection: "column",
      borderBottom: "1px solid #E5E7EB",
      pb: "16px",
      pt: "8px"
    }}>
    <Text variant="subheading" sx={{ mb: "8px" }}>
      Delivery
    </Text>
    <Text
      variant="summary">{JSON.parse(livemartStorage.get("shippingAddress")).shipping_address.first_name} {JSON.parse(livemartStorage.get("shippingAddress")).shipping_address.last_name}</Text>
    <Text variant="summary">{JSON.parse(livemartStorage.get("shippingAddress")).shipping_address.address_1}</Text>
    <Text
      variant="summary">{JSON.parse(livemartStorage.get("shippingAddress")).shipping_address.postal_code} {JSON.parse(livemartStorage.get("shippingAddress")).shipping_address.city}</Text>
    <Text variant="summary">{JSON.parse(livemartStorage.get("shippingAddress")).shipping_address.country_code}</Text>
  </Flex>
)

const Payment = ({ region, country, activeStep }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const [cart, setCart] = useState(null)

  useEffect(() => {
    if (cart !== null) {
      return
    }

    setCart(JSON.parse(livemartStorage.get("cart")))
  })

  const submitPayment = async (isPlaceOrder) => {
    setLoading(true)

    let shippingAddress = JSON.parse(livemartStorage.get("shippingAddress"))
    let address = shippingAddress.shipping_address
    let email = shippingAddress.email
    let isShippingRequired = JSON.parse(livemartStorage.get("cart")).isShippingRequired

    let params = `{`
    params += `cartId: "${livemartStorage.getCartId()}" `
    params += `billingAddress: { street: "${address.address_1}" city: "${address.city}" state: "${address.state ? address.state : ``}" postcode: "${address.postal_code}" email: "${email}" phone: "${address.phone}" locationId: "${livemartStorage.get("selected_region_id")}" } `

    if (isShippingRequired) {
      params += `shippingAddress: { street: "${address.address_1}" city: "${address.city}" state: "${address.state ? address.state : ``}" postcode: "${address.postal_code}" email: "${email}" phone: "${address.phone}" locationId: "${livemartStorage.get("selected_region_id")}" } `
    }

    params += `paymentMethodId: "${livemartStorage.getPaymentMethodId()}" `

    if (isShippingRequired) {
      params += `shippingMethodId: "${livemartStorage.getShippingMethodId()}" `
    }

    params += `couponCode: "" `
    params += `firstName: "${address.first_name}" `
    params += `lastName: "${address.last_name}" `
    params += `email: "${email}" `
    params += `}`
    let checkoutQuery = `mutation { orderGuestCheckout(params: ${params} ) { id hash } }`
    let checkoutResp = await livemart.checkout(checkoutQuery)
    if (checkoutResp.data.data === null) {
      console.log("error")
      setLoading(false)
      return
    }

    let order = checkoutResp.data.data.orderGuestCheckout
    let customerEmail = shippingAddress.email

    if (isPlaceOrder || true) {
      livemartStorage.clear()
      await router.push(`/completed?orderHash=${order.hash}&customerEmail=${customerEmail}`)
      return
    }

    let nonceResp = await livemart.generate_payment_nonce_for_guest_checkout(order.id, customerEmail)
    if (nonceResp.data.data === null) {
      console.log("error")
      setLoading(false)
      return
    }

    livemartStorage.clear()

    let nonce = nonceResp.data.data.orderGeneratePaymentNonceForGuest
    if (nonce.PaymentGatewayName === "Stripe") {
      const stripePromise = loadStripe(
        nonce.StripePublishableKey
      )
      const stripe = await stripePromise
      stripe.redirectToCheckout({ sessionId: nonce.Nonce })
      return
    } else if (nonce.PaymentGatewayName === "SSLCommerz") {
      window.location.href = nonce.Nonce
      return
    } else {
      console.log("Unknown payment provider")
      await router.push(`/completed?orderHash=${order.hash}&customerEmail=${customerEmail}`)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (activeStep === "payment") {
      // setFullCountry(
      //   region.countries.find(c => c.iso_2 === country).display_name
      // )
    }
  }, [country, region, activeStep])

  return (
    <Flex variant="layout.stepContainer">
      {activeStep === "payment" ? (
        <Card variant="container">
          <Flex
            sx={{
              position: "relative",
              width: "100%",
              flexDirection: "column"
            }}>
            {(loading) && (
              <Flex
                sx={{
                  position: "absolute",
                  bg: "#ffffff",
                  opacity: 0.8,
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                <Spinner />
              </Flex>
            )}
            <Text variant="header3">Payment</Text>
            <Box mt={"16px"}>
              <Review /> <Total />
              <DeliveryReview />
              <Flex
                sx={{
                  flexDirection: "column",
                  py: "16px"
                }}>
                <PaymentDetails
                  handleSubmit={submitPayment}
                  setLoading={setLoading}
                />
              </Flex>
            </Box>
          </Flex>
        </Card>
      ) : (
        <Card variant="accordionTrigger">Payment</Card>
      )}
    </Flex>
  )
}

export default Payment
