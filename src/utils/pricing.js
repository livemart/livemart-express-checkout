import { Text } from "@theme-ui/components"
import React from "react"

export function calculatePrice(price) {
  return (price / 100).toFixed(2)
}

export function calculateDiscountedPrice(prod) {
  const discount = (prod.price * prod.productSpecificDiscount) / 100
  return ((prod.price - discount) / 100).toFixed(2)
}

export function calculateDiscountedPriceOnly(prod) {
  const discount = (prod.price * prod.productSpecificDiscount) / 100
  return prod.price - discount
}

export function showDiscount(prod) {
  return (<Text
    sx={{
      fontSize: "10px",
      fontWeight: 300,
      color: "red",
      mb: "1em"
    }}>
    &nbsp;(-{prod.productSpecificDiscount}%)
  </Text>)
}
