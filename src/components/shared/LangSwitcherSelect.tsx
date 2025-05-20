"use client"

import {ReactNode, ChangeEvent, useTransition} from "react"
import {useRouter, usePathname} from "@/i18n/navigation"
import {useParams} from "next/navigation"
import {Locale} from "next-intl"
/***** */

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}
export default function LangSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const [, startTransition] = useTransition()
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({pathname, params}, {locale: nextLocale})
    })
  }
  return (
    <label>
      <p className="sr-only">{label}</p>
      <select defaultValue={defaultValue} onChange={onSelectChange}>
        {children}
      </select>
      <span>⌄</span>
    </label>
  )
}
