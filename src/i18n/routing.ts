import {defineRouting} from "next-intl/routing"

export const routing = defineRouting({
  locales: ["en", "de", "fr", "zh", "es"],
  defaultLocale: "en",
  pathnames: {
    "/": "/",
    "/pathnames": {
      de: "/pfadnamen",
    },
  },
})
