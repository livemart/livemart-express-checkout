import { Flex, Image, Text } from "@theme-ui/components"
import React, { useEffect, useState } from "react"
import { livemartStorage } from "../../utils/client"

const Review = () => {
  const [item, setItem] = useState(null)

  useEffect(() => {
    if (item !== null) {
      return
    }

    let items = JSON.parse(livemartStorage.get("cart")).cartItems
    setItem(items.length ? items[0] : null)
  })

  return (
    <Flex
      key={item?.id}
      sx={{
        alignItems: "top"
      }}>
      <Image
        src={item?.product?.fullImages.length ? item.product.fullImages[0] : ""}
        alt={item?.product?.name}
        sx={{
          height: "90px",
          width: "50%",
          borderRadius: "4px",
          objectFit: "contain",
          objectPosition: "center center"
        }}
      />
      <Flex
        sx={{
          flex: 1,
          flexDirection: "column",
          fontWeight: "500",
          fontSize: ".8em",
          paddingLeft: "20px"
        }}>
        <Text sx={{ fontWeight: 550, marginBottom: "10px" }}>{item?.product?.title}</Text>
        {item?.attributes.map((a, i) => {
          return (
            <Flex
              sx={{
                width: "100%",
                fontWeight: 300,
                justifyContent: "space-between"
              }}>
              <Text sx={{ marginBottom: "5px" }}>
                <Text sx={{ color: "#6aa1f3" }}>{a.name}: {a.selectedValue}</Text>
              </Text>
            </Flex>
          )
        })}
        <Text sx={{ fontWeight: 300 }}>
          <Text sx={{ color: "#3f3e3e" }}>Quantity: </Text>
          {item?.quantity}
        </Text>
        <Text sx={{ fontWeight: 300, marginTop: "5px" }}>
          <Text sx={{ color: "#3f3e3e" }}>Price: </Text>
          {(item?.purchasePrice / 100).toFixed(2)} USD
        </Text>
      </Flex>
    </Flex>
  )
}

export default Review
