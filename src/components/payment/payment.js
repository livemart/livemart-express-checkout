import React, { useEffect, useState } from "react"
import { Button } from "theme-ui"
import { livemartStorage } from "../../utils/client"

const Payment = ({ handleSubmit, setLoading }) => {
  const [placeOrder, setPlaceOrder] = useState(false)

  useEffect(() => {
    if (parseInt(livemartStorage.get("pay_total")) === 0) {
      setPlaceOrder(true)
      return
    }

    JSON.parse(livemartStorage.retrievePaymentMethods()).forEach(pm => {
      if (pm.id === livemartStorage.getPaymentMethodId() && !pm.isDigitalPayment) {
        setPlaceOrder(true)
      }
    })
  })

  async function handlePlaceOrder() {
    handleSubmit(true)
  }

  async function handlerPayNow() {
    handleSubmit(false)
  }

  return (
    placeOrder ? (
        <Button onClick={handlePlaceOrder}>Place Order</Button>) :
      (<Button onClick={handlerPayNow}>Pay Now</Button>)
  )
}

export default Payment
