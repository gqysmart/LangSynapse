// 顶部栏
import {Orbitron} from "next/font/google"
import {clsx} from "clsx"
import {Link} from "@/i18n/navigation"

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-orbitron",
  display: "swap",
})
export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white">
      <div className="flex items-center justify-between mx-auto p-4 max-w-2xl">
        <Link href="/">
          <div className={clsx(orbitron.className, "text-3xl")}>
            🧠 YumiLanguia
          </div>
        </Link>
        <div>menu</div>
        <div>Langue</div>

        <div>login</div>
      </div>
    </header>
  )
}
