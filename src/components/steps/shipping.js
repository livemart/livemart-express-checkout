import { Card, Flex } from "@theme-ui/components"
import Image from "next/image"
import React from "react"
import ShippingAndInfo from "../shipping"

const Shipping = ({
                    regions,
                    country,
                    activeStep,
                    setActiveStep,
                    setLoading,
                    storeInfo
                  }) => {

  const hasShipping = false
  let triggerStyles = {}

  if (hasShipping) {
    triggerStyles.color = "darkgrey"
  }

  // Cart not initialized yet
  if (true) {
    triggerStyles.pointerEvents = "none"
  } else {
    triggerStyles.cursor = "pointer"
  }

  return (
    <Flex variant="layout.stepContainer">
      {activeStep === "shipping" ? (
        <Card variant="container">
          <ShippingAndInfo
            country={country}
            regions={regions}
            setLoading={setLoading}
            nextStep={() => setActiveStep("payment")}
          />
        </Card>
      ) : (
        <Card
          variant="accordionTrigger"
          onClick={() => setActiveStep("shipping")}
          sx={triggerStyles}>
          Shipping and info
          {hasShipping && (
            <Image src={"/check.png"} height={"11px"} width={"16px"} />
          )}
        </Card>
      )}
    </Flex>
  )
}

export default Shipping
