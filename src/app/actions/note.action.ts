// app/actions.ts
"use server"
import getModelWithOpenAI from "@/lib/langchain/ai/openAI"
import {HumanMessage} from "@langchain/core/messages"
import {SystemMessage} from "@langchain/core/messages"
import {
  MessageContent,
  // MessageContentComplex,
} from "@langchain/core/messages"

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
  // const toolSelected = formData.get("toolSelected")?.toString() || ""

  //根据用户不同给出不同的systemMessage
  const systemMsg = new SystemMessage(
    `Tu es un professeur de grammaire française.

      Quand un étudiant te donne une phrase, analyse-la.

      1. Vérifie s’il y a une ou plusieurs erreurs de grammaire, d’accord, de conjugaison, de genre, d’article, ou d’usage.

      2 . S’il y a des erreurs, corrige la phrase.

      3. Pour chaque erreur, indique :
         - Où se trouve l’erreur (location),
         - Quelle est la correction exacte (correction),
         - Et pourquoi cette modification est nécessaire (raison), en français simple.

      4. Réponds uniquement en JSON, dans le format suivant :

   {
  
  "errors": [
    {
      "location": "...",
      "correction": "...",
      "reason": "..."
    }
  ]
}
`
  )

  // Do something, like validation or API call...

  function extractText(content: MessageContent): string {
    if (typeof content === "string") return content

    return content
      .filter((c): c is {type: "text"; text: string} => c.type === "text")
      .map((c) => c.text)
      .join("\n")
  }

  const openAIModel = await getModelWithOpenAI()
  const res = await openAIModel.invoke([
    systemMsg,
    new HumanMessage(noteContent),
  ])
  const content = extractText(res.content)
  console.log(content)
  return {result: content}
}
