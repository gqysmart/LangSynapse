// app/actions.ts
"use server"

export async function voiceAction(formData: FormData) {
  const text = formData.get("text")
  console.log("[语音输入] 收到：", text)
}

export async function correctAction(formData: FormData) {
  const text = formData.get("text")
  console.log("[语法纠正] 收到：", text)
}

export async function guideAction(formData: FormData) {
  const text = formData.get("text")
  console.log("[向导写作] 收到：", text)
}

export async function referenceAction(formData: FormData) {
  const text = formData.get("text")
  console.log("[进阶参考] 收到：", text)
}

type JournalState = {
  result: string
}

export async function handleNoteAction(
  prevState: JournalState,
  formData: FormData
): Promise<JournalState> {
  const noteContent = formData.get("noteContent")?.toString() || ""
  const toolSelected = formData.get("toolSelected")?.toString() || ""

  // Do something, like validation or API call...

  return {
    result: ` ${toolSelected} + ${noteContent}`,
  }
}
