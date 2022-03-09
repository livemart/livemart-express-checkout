import React, { useEffect, useState } from "react"
import { Box, Flex, Text } from "@theme-ui/components"
import { livemartStorage } from "../../../utils/client"

const ShippingOption = ({ selected, option, region, onClick }) => {
  return (
    <Flex
      onClick={onClick}
      sx={{
        cursor: "pointer",
        fontSize: "14px",
        fontWeight: selected ? 600 : 350,
        width: "100%",
        height: "40px",
        border: selected ? "2px solid #111827;" : "1px solid #E5E7EB",
        padding: "10px",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: "4px",
        mt: "8px"
      }}
      value={option?.id}>
      {option && region && (
        <>
          <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Flex
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "12px",
                height: "12px",
                bg: selected ? "black" : "white",
                border: selected ? "none" : "1px solid #D1D5DB;",
                borderRadius: "50%"
              }}>
              {selected && (
                <Box
                  sx={{
                    width: "6px",
                    height: "6px",
                    bg: "white",
                    borderRadius: "50%"
                  }}
                />
              )}
            </Flex>
            <Text sx={{ mx: "1rem" }}>{option.displayName}</Text>
          </Flex>
        </>
      )}
    </Flex>
  )
}

const SelectShipping = ({ formik, name, set, region }) => {
  const [shippingOptions, setShippingOptions] = useState(null)
  const [paymentOptions, setPaymentOptions] = useState(null)
  const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null)
  const [selectedShippingMethodId, setSelectedShippingMethodId] = useState(null)

  useEffect(() => {
    if (shippingOptions !== null) {
      return
    }

    setShippingOptions(JSON.parse(livemartStorage.retrieveShippingMethods()))
    setPaymentOptions(JSON.parse(livemartStorage.retrievePaymentMethods()))
  }, [shippingOptions, paymentOptions])

  const handleClick = async (id, selected) => {
    if (selected) {
      return
    }
    formik.setFieldValue(`${set}.${name}`, id)
    livemartStorage.setShippingMethodId(id)
    setSelectedShippingMethodId(livemartStorage.getShippingMethodId())
  }

  const handlePaymentSelectedClick = async (id, selected) => {
    if (selected) {
      return
    }
    formik.setFieldValue(`${set}.${name}`, id)
    livemartStorage.setPaymentMethodId(id)
    setSelectedPaymentMethodId(livemartStorage.getPaymentMethodId())
  }

  return (
    <div>
      <Flex sx={{ flexDirection: "column" }}>
        {shippingOptions?.map(s => (
          <ShippingOption
            key={s.id}
            onClick={() => handleClick(s.id, s.id === selectedShippingMethodId)}
            selected={s.id === selectedShippingMethodId}
            option={s}
            region={region}
          />
        ))}
      </Flex>
      <Text mt={2} as="h3" sx={{}} variant="subheading">
        Payment method
      </Text>
      <Flex sx={{ flexDirection: "column" }}>
        {paymentOptions?.map(p => (
          <ShippingOption
            key={p.id}
            onClick={() => handlePaymentSelectedClick(p.id, p.id === selectedPaymentMethodId)}
            selected={p.id === selectedPaymentMethodId}
            option={p}
            region={region}
          />
        ))}
      </Flex>
    </div>
  )
}

export default SelectShipping
