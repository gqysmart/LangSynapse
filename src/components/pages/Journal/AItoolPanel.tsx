"use client"

// import {useState} from "react"
import {Mic, SpellCheck2, WandSparkles, BookOpenCheck} from "lucide-react"

const tools = [
  {label: "Voice", icon: Mic, type: "voice"},
  {label: "Correct", icon: SpellCheck2, type: "correct"},
  {label: "Guide", icon: WandSparkles, type: "guide"},
  {label: "Reference", icon: BookOpenCheck, type: "reference"},
]

type Props = {
  onSelect: (type: string) => void
  active?: string
}

export default function AIToolPanel({onSelect, active}: Props) {
  return (
    <aside
      aria-label="AI Writing Assistant Tools"
      className="fixed max-w-lg mx-auto bottom-0 inset-x-0 bg-white border-t shadow-sm z-50"
    >
      <nav
        aria-label="Writing Function Navigation"
        className="flex justify-around items-center h-14"
      >
        {tools.map(({label, icon: Icon, type}) => {
          const isActive = active === type
          return (
            <button
              key={type}
              onClick={() => onSelect(type)}
              type="button"
              className={`flex flex-col items-center text-xs transition ${
                isActive
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600 hover:text-black"
              }`}
              aria-pressed={isActive}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span>{label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
