"use client"

import {useRef, useState} from "react"
import JournalForm, {
  JournalFormHandle,
} from "@/components/pages/Journal/JournalForm"

import AIToolPanel from "@/components/pages/Journal/AItoolPanel"

export default function JournalPage() {
  const formRef = useRef<JournalFormHandle>(null)
  const [currentAction, setCurrentAction] = useState("")

  const handleSubmit = (type: string) => {
    setCurrentAction(type)
    formRef.current?.submitWithAction(type)
  }

  const actionLabelMap: Record<string, string> = {
    voice: "Voice Input In Progress",
    correct: "Grammar Correction In Progress",
    guide: "Guided Writing In Progress",
    reference: "Advanced Reference Lookup",
  }

  return (
    <section className="relative max-w-2xl mx-auto pb-20">
      <h2 className="sr-only">
        {currentAction
          ? actionLabelMap[currentAction]
          : "Journal Writing Section"}
      </h2>
      <div className="relative w-full h-screen">
        <JournalForm ref={formRef} />
      </div>
      <AIToolPanel active={currentAction} onSelect={handleSubmit} />
    </section>
  )
}
