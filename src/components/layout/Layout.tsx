// 总布局容器（页面骨架）
// Layout.tsx
import Header from "./Header"
// import Sidebar from "./Sidebar"
import Footer from "./Footer"
import Main from "./Main"
// import clsx from "clsx"
export default function Layout({
  children,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />

      <div className="flex flex-grow  basis-0 border">
        {/* <aside className="w-64 shrink-0 bg-gray-100">
          <Sidebar />
        </aside> */}

        <Main className="flex-1 p-4 bg-white">{children}</Main>
      </div>

      <Footer />
    </div>
  )
}
