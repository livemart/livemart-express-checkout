import { Flex, Link, Text } from "@theme-ui/components"
import React from "react"
import RegionSelector from "../region-selector/region-selector"

const Layout = ({ children, country, regions, handleRegionChange }) => {
  return (
    <Flex
      sx={{
        width: "100%",
        flexDirection: "column",
        backgroundColor: "#F3F4F6"
      }}>
      <Flex
        sx={{
          justifyContent: ["center", "space-between"],
          alignItems: "center",
          flexDirection: ["column", "row"],
          minHeight: "100vh",
          py: "2em"
        }}>
        <Flex
          sx={{
            justifyContent: ["center", "flex-end"],
            alignItems: "center",
            width: ["100%", "50%"]
          }}>
          {children}
        </Flex>
        <Flex
          sx={{
            justifyContent: ["center", "flex-start"],
            paddingTop: "10px",
            paddingLeft: [0, "100px"],
            width: "50%",
            height: "100px",
            backgroundColor: "#F3F3F6"
          }}>
          <Flex
            sx={{
              paddingTop: "10px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}>
            <Text
              sx={{
                fontWeight: "500",
                fontSize: "10px",
                color: "#A3A3A3",
                letterSpacing: "4px"
              }}>
              Powered by
            </Text>
            <Link
              sx={{
                textDecoration: "none",
                color: "medusa100",
                "& image": {
                  opacity: 0.5
                }
              }}
              href="https://livemart.store/">
              <Flex sx={{ paddingTop: "10px", alignItems: "center" }}>
                <Text
                  sx={{
                    ml: "10px",
                    color: "#A3A3A3",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "1"
                  }}>
                  LiveMart{" "}
                </Text>
              </Flex>
            </Link>
            {regions?.length && (
              <RegionSelector
                selected={country}
                regions={regions}
                handleRegionChange={handleRegionChange}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Layout
