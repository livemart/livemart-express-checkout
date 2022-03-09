import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import * as React from "react"
import { Button, Card, Flex, Text } from "theme-ui"
import Layout from "../components/layout/layout"
import { livemart } from "../utils/client"

const IndexPage = ({ product }) => {
  const router = useRouter()

  return (
    <main>
      <Head>
        <title>LiveMart Express Checkout</title>
        <meta name="description" content="One-page checkout" />
      </Head>
      <Layout>
        <Card variant="container">
          <Flex sx={{ flexDirection: "column" }}>
            <Text
              sx={{
                mb: "16px",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                pb: "16px",
                borderBottom: "1px solid #E5E7EB"
              }}>
              LiveMart Express Checkout
            </Text>
            <Text variant="heading3" sx={{ mb: "16px" }}>
              Welcome!
            </Text>
            <Text variant="landingpageText">
              LiveMart Express is a drop-in storefront for your{" "}
              <a href="https://livemart.store" target={"_blank"}>
                LiveMart
              </a>{" "}
              store, that automatically creates pages for the products in your
              catalog, each of them optimized to make the purchasing experience
              as frictionless as possible, by bundling the checkout flow
              alongside the product.
            </Text>
            <Button
              variant="cta"
              sx={{
                my: "16px"
              }}
              onClick={() => router.push(`/${product.slug}`)}>
              Explore the demo
            </Button>
            <Text
              as={"a"}
              variant="landingpageLink"
              sx={{
                mb: "16px"
              }}
              target="_blank"
              href="https://livemart.store">
              Read more
            </Text>
            <Flex
              sx={{
                borderTop: "1px solid #E5E7EB",
                paddingTop: "8px",
                flexDirection: "column"
              }}>
              <Text
                as={"a"}
                variant="landingpageLink"
                sx={{
                  mb: "16px"
                }}
                target="_blank"
                href="https://livemart.store">
                Get your own in only a couple of minutes
              </Text>
            </Flex>
            <Flex
              sx={{
                borderTop: "1px solid #E5E7EB",
                paddingTop: "8px",
                flexDirection: "column"
              }}>
              <Text
                variant="landingpageText"
                sx={{ my: "8px", color: "#111827", fontWeight: "600" }}>
                Built with:
              </Text>
              <Text
                as="a"
                variant="landingpageLink"
                href="https://livemart.store"
                target="_blank">
                LiveMart: Commerce engine
              </Text>
              <Text
                target="_blank"
                as="a"
                variant="landingpageLink"
                href="https://nextjs.org">
                Next.js: React framework
              </Text>
              <Text
                target="_blank"
                as="a"
                variant="landingpageLink"
                href="https://stripe.com">
                Stripe: Payment provider
              </Text>
            </Flex>
            <Flex sx={{ width: "100%", justifyContent: "center", mt: [3] }}>
              <Flex
                as="a"
                href="https://github.com/livemart/livemart-express-checkout"
                target="_blank"
                rel="noreferrer"
                mx={2}>
                <Image src={"/github.png"} width={"15px"} height={"15px"} />
              </Flex>
            </Flex>
          </Flex>
        </Card>
      </Layout>
    </main>
  )
}

export async function getStaticProps({ params }) {
  const response = await livemart.list_products(1, 1)
  const [product, ...rest] = response.data.data.products
  return { props: { product } }
}

export default IndexPage
