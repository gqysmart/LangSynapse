"use client"

import {useActionState} from "react"
import {forwardRef, useRef, useImperativeHandle} from "react"
import {handleJournalAction} from "@/app/actions/journal.action"

const initialState = {result: ""}

export type JournalFormHandle = {
  submitWithAction: (type: string) => void
}

const JournalForm = forwardRef<JournalFormHandle>(function JournalForm(_, ref) {
  const [state, formAction, isPending] = useActionState(
    handleJournalAction,
    initialState
  )

  const formRef = useRef<HTMLFormElement>(null)
  const hiddenInputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    submitWithAction(type: string) {
      if (hiddenInputRef.current) hiddenInputRef.current.value = type
      formRef.current?.requestSubmit()
    },
  }))

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-4 h-screen w-full"
    >
      <textarea
        name="text"
        placeholder="Start writing..."
        className="w-full border rounded p-3 h-screen resize-y"
        disabled={isPending}
      />
      <input type="hidden" name="actionType" ref={hiddenInputRef} />

      {state.result && (
        <div className="bg-green-100 text-sm p-3 border rounded">
          AI Response: {state.result}
        </div>
      )}
    </form>
  )
})

export default JournalForm
