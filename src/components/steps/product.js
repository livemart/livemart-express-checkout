import { Card, Flex } from "@theme-ui/components"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import ProductSelection from "../product-selection"
import Spinner from "../spinner/spinner"
import { livemartStorage } from "../../utils/client"

const Product = ({
                   product,
                   regions,
                   country,
                   region,
                   storeInfo,
                   activeStep,
                   setActiveStep
                 }) => {
  const [loading, setLoading] = useState(false)
  let triggerStyles = {}

  let cart = null

  useEffect(() => {
    if (livemartStorage.hasCart()) {
      cart = livemartStorage.get("cart")
      triggerStyles.color = "darkgrey"
      triggerStyles.cursor = "pointer"
    }
  })

  return (
    <Flex variant="layout.stepContainer" sx={{ position: "relative" }}>
      {loading && (
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
          }}
        >
          <Spinner />
        </Flex>
      )}
      {activeStep === "product" ? (
        <Card variant="container">
          <ProductSelection
            region={region}
            regions={regions}
            country={country}
            product={product}
            nextStep={() => setActiveStep("shipping")}
            setLoading={setLoading}
            storeInfo={storeInfo}
          />
        </Card>
      ) : (
        <Card
          variant="accordionTrigger"
          onClick={() => setActiveStep("product")}
          sx={triggerStyles}>
          Product
          {cart && (
            <Image src={"/check.png"} height={"11px"} width={"16px"} />
          )}
        </Card>
      )}
    </Flex>
  )
}

export default Product
