import { Box, Button, Divider, Flex, Text } from "@theme-ui/components"
import React from "react"
import ProductDisplay from "./product-display"
import { livemart, livemartStorage } from "../../utils/client"

const ProductSelection = ({
                            product,
                            region,
                            country,
                            nextStep,
                            setLoading
                          }) => {
  const handleSubmit = async () => {
    setLoading(true)

    let quantity = parseInt(livemartStorage.get(`${product.id}_quantity`))

    const shippingMethodsResp = await livemart.list_shipping_methods()
    livemartStorage.saveShippingMethods(JSON.stringify(shippingMethodsResp.data.data.shippingMethods))

    const paymentMethodsResp = await livemart.list_payment_methods()
    livemartStorage.savePaymentMethods(JSON.stringify(paymentMethodsResp.data.data.paymentMethods))

    if (!livemartStorage.hasCart()) {
      let newCartResp = await livemart.createCart()
      let newCartId = newCartResp.data.data.newCart.id
      livemartStorage.setCartId(newCartId)
    }

    let attributes = `[`
    if (livemartStorage.retrieveAttribute() !== null && livemartStorage.retrieveAttribute() !== null) {
      let options = JSON.parse(livemartStorage.retrieveAttribute())
      Object.keys(options).forEach(k => {
        attributes += `{ Id: "${k}" attributeSelectedValue: "${options[k]}" }`
      })
    }
    attributes += `]`

    let cart = `[{ productId: "${product.id}" quantity: ${quantity} productAttributes: ${attributes}}]`

    let cartId = livemartStorage.getCartId()
    let params = {}
    params.cartId = cartId
    params.cartItems = cart

    let cartUpdateResp = await livemart.updateCart(params)
    livemartStorage.set("cart", JSON.stringify(cartUpdateResp.data.data.updateCart))

    setLoading(false)
    nextStep()
  }

  return (
    <Box>
      <Text variant="header3">Product</Text>
      <Flex sx={{ mt: "16px", justifyContent: "center" }}>
        <ProductDisplay region={region} product={product} />
      </Flex>
      <Divider sx={{ color: "#E5E7EB", my: "16px" }} />
      <Button sx={{}} onClick={() => handleSubmit()} variant="cta">
        Continue
      </Button>
    </Box>
  )
}

export default ProductSelection
