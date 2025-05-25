//主内容区域容器

export default function Main({
  children,
  className,
}: {
  children: React.ReactNode
  className: string
}) {
  return <main className={className}>{children}</main>
}
