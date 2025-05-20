// 总布局容器（页面骨架）
// Layout.tsx
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex flex-1">
        <aside>
          <Sidebar>siderbar</Sidebar>
        </aside>
        <main className="flex-1">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
