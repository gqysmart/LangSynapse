import LangSwitcherSelect from "./LangSwitcherSelect"
import {routing} from "@/i18n/routing"
import {useTranslations, useLocale} from "next-intl"

export default function LangSwitcher() {
  const locale = useLocale()
  const t = useTranslations("LocaleSwitcher")

  return (
    <LangSwitcherSelect defaultValue={locale} label={t("label")}>
      {routing.locales.map((cur) => (
        <option key={cur} value={cur}>
          {t("locale", {locale: cur})}
        </option>
      ))}
    </LangSwitcherSelect>
  )
}
