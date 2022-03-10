import { Flex, Text } from "@theme-ui/components"
import React from "react"
import { calculateDiscountedPrice, calculatePrice, showDiscount } from "../../../utils/pricing"

const Info = ({ product, region, storeInfo }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        justifyContent: "center",
        width: "50%",
        height: "100%",
        px: "16px"
      }}>
      <Flex
        sx={{
          flexDirection: "column"
        }}>
        <Text
          sx={{
            fontSize: "12px",
            fontWeight: 300,
            mb: "8px",
            color: "#6B7280"
          }}>
          {product?.category?.name || ""}
        </Text>
        <Text
          sx={{
            fontSize: "14px",
            fontWeight: 600,
            mb: "8px"
          }}>
          {product.name}
        </Text>
        <Text
          sx={{
            fontSize: "14px",
            fontWeight: 300,
            mb: "1em"
          }}>
          {`${storeInfo?.currency} ${product.productSpecificDiscount ?
            calculateDiscountedPrice(product) : calculatePrice(product.price)}`}
          {product.productSpecificDiscount ? showDiscount(product) : ""}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Info
