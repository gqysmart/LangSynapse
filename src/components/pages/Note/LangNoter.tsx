"use client"

import {Suspense, useActionState, useEffect} from "react"
import {useRef} from "react"
import {handleNoteAction} from "@/app/actions/note.action"
import LexEditor from "@/components/lexical/LexEditor"
import ToolPanel from "./ToolPanel"

const initialState = {result: ""}

export type JournalFormHandle = {
  submitWithAction: (type: string) => void
}

type LexEditorRef = {
  updateEditor: (text: string) => void
  getContent: () => string
  clear: () => void
}
const tools = [
  {key: "voice", label: "🎤"},
  {key: "correct", label: "✅"},
  {key: "guide", label: "🧭"},
  {key: "b2", label: "📘"},
]

function LangNote() {
  const [textProcessed, formAction] = useActionState(
    handleNoteAction,
    initialState
  )
  useEffect(() => {
    //修改lexEditor
    lexRef.current?.updateEditor(textProcessed.result)
  }, [textProcessed])

  const formRef = useRef<HTMLFormElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const lexRef = useRef<LexEditorRef>(null)
  const toolRef = useRef<HTMLInputElement>(null)

  const handleFormSubmit = (selected: string) => {
    //提交表单

    const content = lexRef.current?.getContent()
    if (content !== undefined && hiddenInputRef.current && toolRef.current) {
      hiddenInputRef.current.value = content
      toolRef.current.value = selected
    }
    formRef.current?.requestSubmit()
  }
  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 h-screen w-full"
    >
      <LexEditor ref={lexRef}></LexEditor>
      <input type="hidden" name="noteContent" ref={hiddenInputRef} />

      <ToolPanel onAction={handleFormSubmit} toolParamsList={tools}></ToolPanel>
      <input type="hidden" name="toolSelected" ref={toolRef}></input>
    </form>
  )
}

export default LangNote
