import {notFound} from "next/navigation"
import {Locale, hasLocale, NextIntlClientProvider} from "next-intl"
import {getTranslations, setRequestLocale} from "next-intl/server"
import {ReactNode} from "react"
import {clsx} from "clsx"
import {Inter} from "next/font/google"
import {Caveat} from "next/font/google"
import {Orbitron} from "next/font/google"
import {routing} from "@/i18n/routing"
import "./styles.css"
import CommonLayout from "@/components/layout/Layout"

type Props = {
  children: ReactNode
  params: Promise<{locale: Locale}>
}

const inter = Inter({subsets: ["latin"], variable: "--font-inter"})
const caveat = Caveat({subsets: ["latin"], variable: "--font-caveat"})
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-orbitron",
  display: "swap",
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}))
}

export async function generateMetadata(props: Omit<Props, "children">) {
  const {locale} = await props.params

  const t = await getTranslations({locale, namespace: "LocaleLayout"})

  return {
    title: t("title"),
    description: t("title"),
  }
}

export default async function LocaleLayout({children, params}: Props) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  return (
    <html
      lang={locale}
      className={clsx(
        "h-fll",
        inter.variable,
        caveat.variable,
        orbitron.variable
      )}
    >
      <body className={clsx("h-full", inter.className)}>
        <NextIntlClientProvider>
          <CommonLayout>{children}</CommonLayout>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
