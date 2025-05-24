// LexicalEditor.tsx
"use client"

import {LexicalComposer} from "@lexical/react/LexicalComposer"
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin"
import {ContentEditable} from "@lexical/react/LexicalContentEditable"
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin"
import {OnChangePlugin} from "@lexical/react/LexicalOnChangePlugin"
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary"
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
import {$getRoot, $createParagraphNode, $createTextNode} from "lexical"
import {EditorState} from "lexical"
import {useState, forwardRef, useImperativeHandle} from "react"

const editorConfig = {
  namespace: "LangSynapseEditor",
  theme: {},
  onError: (error: Error) => console.error(error),
}
const EditorController = forwardRef((_, ref) => {
  const [editor] = useLexicalComposerContext()

  useImperativeHandle(ref, () => ({
    updateEditor: (newText: string) => {
      editor.update(() => {
        const root = $getRoot()
        root.clear()
        root.append($createParagraphNode().append($createTextNode(newText)))
      })
    },
    getContent: () => {
      let result = ""
      editor.getEditorState().read(() => {
        result = $getRoot().getTextContent() // 或 .toJSON() 返回结构化内容
      })
      return result
    },
    clear: () => {},
  }))

  return null // 这个组件不需要渲染任何内容，只操作编辑器
})
EditorController.displayName = "EditorController"

const LexicalEditor = forwardRef((_, ref) => {
  const [output, setOutput] = useState("")

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot()
      const text = root.getTextContent()
      setOutput(text)
    })
  }

  return (
    <div className="p-4 border rounded-md">
      <LexicalComposer initialConfig={editorConfig}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="min-h-[150px] p-2 border rounded-md outline-none" />
          }
          placeholder={<div className="text-gray-400">Start writing...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
        <EditorController ref={ref}></EditorController>
      </LexicalComposer>

      <div className="mt-4 text-sm text-muted-foreground">
        <strong>Preview:</strong>
        <p className="mt-1 whitespace-pre-wrap border p-2 bg-gray-50 rounded">
          {output || "(empty)"}
        </p>
      </div>
    </div>
  )
})
LexicalEditor.displayName = "LexicalEditor"
export default LexicalEditor
