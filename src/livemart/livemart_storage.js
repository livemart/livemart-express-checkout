class LiveMartStorage {

  setCartId(cartId) {
    localStorage.setItem("cartId", cartId)
  }

  getCartId() {
    return localStorage.getItem("cartId")
  }

  hasCart() {
    return this.getCartId() !== undefined && this.getCartId() !== null
  }

  setShippingMethodId(id) {
    localStorage.setItem("shippingMethod", id)
  }

  getShippingMethodId() {
    return localStorage.getItem("shippingMethod")
  }

  setPaymentMethodId(id) {
    localStorage.setItem("paymentMethod", id)
  }

  getPaymentMethodId() {
    return localStorage.getItem("paymentMethod")
  }

  saveAttribute(value) {
    this.set("attribute", value)
  }

  retrieveAttribute() {
    return this.get("attribute")
  }

  saveShippingMethods(value) {
    this.set("shippingMethods", value)
  }

  retrieveShippingMethods() {
    return this.get("shippingMethods")
  }

  savePaymentMethods(value) {
    this.set("paymentMethods", value)
  }

  retrievePaymentMethods() {
    return this.get("paymentMethods")
  }

  set(key, value) {
    localStorage.setItem(key, value)
  }

  get(key) {
    return localStorage.getItem(key)
  }

  clear() {
    localStorage.clear()
  }
}

export default LiveMartStorage
