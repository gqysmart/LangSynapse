// 顶部栏
import {clsx} from "clsx"
import {Link} from "@/i18n/navigation"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-gray-800 text-white">
      <div className="max-w-2xl mx-auto  p-4  flex items-center justify-between">
        <Link href="/">
          <div className={clsx("font-orbitron", "text-3xl")}>YuMiLanguia</div>
        </Link>
        <div>menu</div>
        <div>Langue</div>

        <div>login</div>
      </div>
    </header>
  )
}
