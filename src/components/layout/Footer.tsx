//底部栏

export default function Footer() {
  return (
    <footer className="w-full border-t py-6 text-sm text-gray-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} ACE AI. All rights reserved.</p>

        <div className="flex items-center gap-2">
          <span>Powered by</span>
          <strong className="text-gray-700">ACE AI</strong>
        </div>
      </div>
    </footer>
  )
}
