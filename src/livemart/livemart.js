import axios from "axios"

class LiveMart {

  constructor(config) {
    this.client = axios.create({
      baseURL: config.api_url,
      timeout: 3000,
      headers: this.default_headers(config.headers)
    })
  }

  default_headers(headers) {
    headers["Content-Type"] = "application/json"
    return headers
  }

  list_categories(currentPage, limit) {
    console.log("calling list_categories...")
    let query = `query { categories(sort: { by: Position direction: Desc }, pagination: { perPage: ${limit} page: ${currentPage} }) { id name slug description image productCount } }`
    return this._send_request(query)
  }

  list_collections(currentPage, limit) {
    console.log("calling list_collections...")
    let query = `query { collections(sort: { by: Position direction: Desc }, pagination: { perPage: ${limit} page: ${currentPage} }) { id name slug description image productCount } }`
    return this._send_request(query)
  }

  list_products_by_category(currentPage, limit, categoryId) {
    console.log("calling list_products_by_category...")
    let query = `query { products(sort: { by: CreatedAt direction: Desc }, pagination: { perPage: ${limit} page: ${currentPage} }, search: { query: "" filters: [ { key: category value: "${categoryId}" } ] }) { id name slug description sku stock maxItemPerOrder price productSpecificDiscount productUnit images fullImages isDigitalProduct views createdAt updatedAt attributes { id name values isRequired createdAt updateAt } variations { id name price sku stock } digitalItems { id title description contents { id title contentType isTrialAllowed contentText contentUrl updatedAt } } feedbacks { rating comment createdAt } } }`
    return this._send_request(query)
  }

  list_products_by_collection(currentPage, limit, collectionId) {
    console.log("calling list_products_by_collection...")
    let query = `query { products(sort: { by: CreatedAt direction: Desc }, pagination: { perPage: ${limit} page: ${currentPage} }, search: { query: "" filters: [ { key: collection value: "${collectionId}" } ] }) { id name slug description sku stock maxItemPerOrder price productSpecificDiscount productUnit images fullImages isDigitalProduct views createdAt updatedAt attributes { id name values isRequired createdAt updateAt } variations { id name price sku stock } digitalItems { id title description contents { id title contentType isTrialAllowed contentText contentUrl updatedAt } } feedbacks { rating comment createdAt } } }`
    return this._send_request(query)
  }

  list_products(currentPage, limit) {
    console.log("calling list_products...")
    let query = `query { products(sort: { by: CreatedAt direction: Desc }, pagination: { perPage: ${limit} page: ${currentPage} }, search: { query: "" filters: [] }) { id name slug description sku stock maxItemPerOrder price productSpecificDiscount productUnit images fullImages isDigitalProduct views createdAt updatedAt attributes { id name values isRequired createdAt updateAt } variations { id name price sku stock } digitalItems { id title description contents { id title contentType isTrialAllowed contentText contentUrl updatedAt } } feedbacks { rating comment createdAt } } }`
    return this._send_request(query)
  }

  search_products(currentPage, limit, searchQuery) {
    console.log("calling list_products...")
    let query = `query { productSearch(sort: { by: CreatedAt direction: Desc }, pagination: { perPage: ${limit} page: ${currentPage} }, search: { query: "${searchQuery}" filters: [] }) { id name slug description sku stock maxItemPerOrder price productSpecificDiscount productUnit images fullImages isDigitalProduct views createdAt updatedAt attributes { id name values isRequired createdAt updateAt } variations { id name price sku stock } digitalItems { id title description contents { id title contentType isTrialAllowed contentText contentUrl updatedAt } } feedbacks { rating comment createdAt } } }`
    return this._send_request(query)
  }

  product_by_slug(slug) {
    console.log("calling product_by_slug...")
    let query = `query { productBySlug(productSlug: "${slug}") { id name slug description sku stock maxItemPerOrder price productSpecificDiscount productUnit images fullImages isDigitalProduct views createdAt updatedAt attributes { id name values isRequired createdAt updateAt } variations { id name price sku stock } digitalItems { id title description contents { id title contentType isTrialAllowed contentText contentUrl updatedAt } } feedbacks { rating comment createdAt } } }`
    return this._send_request(query)
  }

  getCart(cartId) {
    console.log("calling getCart...")
    let query = `query { cart(cartId: "${cartId}") { id isShippingRequired cartItems { id product { id name slug description sku stock maxItemPerOrder fullImages isDigitalProduct views productUnit createdAt productSpecificDiscount } quantity purchasePrice attributes { name selectedValue } variation { id name price sku stock } } } }`
    return this._send_request(query)
  }

  createCart() {
    console.log("calling createCart...")
    let query = `mutation { newCart(params: {cartItems: []}) { id } }`
    return this._send_request(query)
  }

  updateCart(params) {
    console.log("calling updateCart...")
    let query = `mutation { updateCart(id: "${params.cartId}", params: { cartItems: ${params.cartItems} }) { id isShippingRequired cartItems { id product { id name slug description sku stock maxItemPerOrder productSpecificDiscount price fullImages isDigitalProduct productUnit createdAt updatedAt } quantity purchasePrice attributes { name selectedValue } variation { id name price sku stock } } } }`
    return this._send_request(query)
  }

  list_locations() {
    console.log("calling list_locations...")
    let query = "query { locations { id name shortCode } }"
    return this._send_request(query)
  }

  list_shipping_methods() {
    console.log("calling list_shipping_methods...")
    let query = "query { shippingMethods { id displayName deliveryCharge deliveryTimeInDays WeightUnit isFlat isActive } }"
    return this._send_request(query)
  }

  list_payment_methods() {
    console.log("calling list_payment_methods...")
    let query = "query { paymentMethods { id displayName currencyName currencySymbol isDigitalPayment } }"
    return this._send_request(query)
  }

  getShippingCharge(cartId, shippingMethodId) {
    console.log("calling getShippingCharge...")
    let query = `query { checkShippingCharge(shippingMethodId: "${shippingMethodId}", cartId: "${cartId}") }`
    return this._send_request(query)
  }

  getPaymentProcessingCharge(cartId, shippingMethodId, paymentMethodId) {
    console.log("calling getPaymentProcessingCharge...")
    let query = `query { checkPaymentProcessingFee(cartId: "${cartId}", shippingMethodId: "${shippingMethodId}", paymentMethodId: "${paymentMethodId}") }`
    return this._send_request(query)
  }

  checkout(query) {
    console.log("calling checkout...")
    return this._send_request(query)
  }

  generate_payment_nonce_for_guest_checkout(orderId, customerEmail) {
    console.log("calling generate_payment_nonce...")
    let query = `mutation { orderGeneratePaymentNonceForGuest(orderId: "${orderId}", customerEmail: "${customerEmail}") { PaymentGatewayName Nonce StripePublishableKey } }`
    return this._send_request(query)
  }

  getOrderByGuest(orderHash, email) {
    let query = `query { orderByCustomerEmail(hash: "${orderHash}", email: "${email}") { id hash shippingCharge paymentProcessingFee subtotal grandTotal discountedAmount status paymentStatus createdAt updatedAt billingAddress { id street streetTwo city state postcode email phone location { id name shortCode } } shippingAddress { id street streetTwo city state postcode email phone location { id name shortCode } } cart { isShippingRequired cartItems { product { id name slug description fullImages isDigitalProduct productUnit } quantity purchasePrice attributes { name selectedValue } variation { id name price sku stock } } } customer { email phone firstName lastName profilePicture } paymentMethod { id displayName currencyName currencySymbol isDigitalPayment } shippingMethod { id displayName deliveryCharge deliveryTimeInDays WeightUnit isFlat isActive } couponCode { code } payments { isPaid payableAmount gatewayName } } }`
    return this._send_request(query)
  }

  getStoreBySecret() {
    let query = `query { storeBySecret { name title description tags metaName metaDescription metaTags logo favicon bannerImage isOpen currency website supportEmail supportPhone createdAt updatedAt street streetOptional city state postcode location { id name shortCode } } }`
    return this._send_request(query)
  }

  _send_request(query) {
    let reqBody = {
      "query": query
    }
    return this.client.post("/query", reqBody)
  }
}

export default LiveMart
