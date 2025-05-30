// app/actions.ts
"use server"
import getModelWithOpenAI from "@/lib/langchain/ai/openAI"
import {HumanMessage} from "@langchain/core/messages"
import {SystemMessage} from "@langchain/core/messages"
import {
  MessageContent,
  // MessageContentComplex,
} from "@langchain/core/messages"

import {PrismaClient} from "@prisma/client"
// import {AIRst} from "@/lib/langchain/ai/testData"
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
  await createNote(noteContent)

  const intro = `
  Tu es un assistant intelligent spécialisé dans la correction grammaticale du français. 
  Tu dois analyser un texte, détecter les erreurs, et proposer des corrections précises.
   Ne fais pas de commentaires hors JSON."
   Tu es un assistant strictement programmé pour retourner uniquement un JSON brut. Tu ne dois jamais utiliser des balises Markdown, ni ajouter d'explications. Ton rôle est de produire un format exploitable automatiquement par une machine.

`

  const formatInstruction = `
Ta réponse doit être strictement au format JSON, comme ceci :

{
  "errors": [
    {
      "paragraphNo": numéro_du_paragraphe,
      "errors": [
        {
          "positions": [index_début, index_fin],
          "corrected": "texte corrigé",
          "reason": "explication grammaticale claire en français"
        },
        ...
      ]
    },
    ...
  ]
}

- "positions" : une liste de trois entiers représentant [ la position de début et de fin dans ce paragraphe]
- "corrected" : la version correcte du texte fautif
- "reason" : la justification grammaticale ou orthographique
`

  const rules = `Règles :
- Retourne uniquement un objet JSON strictement valide.
- ❌ Ne précède ni ne suis l'objet JSON d'aucun commentaire, texte ou explication.
- ❌ N'utilise jamais de balise Markdown (comme \`\`\`json).
- ❌ Ne mets jamais l'objet JSON dans une chaîne de caractères.
- ✅ Le résultat doit être un objet JSON brut, directement exploitable par un parseur JSON (JSON.parse()).
- Exemple attendu : { "errors": [...] } (sans guillemets, sans \`\`\`, sans indentation excessive).
`

  const systemPrompt = new SystemMessage(
    `${intro}\n${formatInstruction}\n${rules}`
  )

  // Do something, like validation or API call...

  function extractText(content: MessageContent): string {
    if (typeof content === "string") return content

    return content
      .filter((c): c is {type: "text"; text: string} => c.type === "text")
      .map((c) => c.text)
      .join("\n")
  }

  const openAIModel = await getModelWithOpenAI({modelName: "gpt-4o"})
  const res = await openAIModel.invoke([
    systemPrompt,
    new HumanMessage(noteContent),
  ])
  // const res2 = AIRst
  const content = extractText(res.content)
  console.log(content)
  // const content = res2
  return {result: content}
}

// save the note to the server
const prisma = new PrismaClient()
export async function createNote(content: string) {
  await prisma.note.create({
    data: {
      content: content,
      user: 10000,
    },
  })
}
