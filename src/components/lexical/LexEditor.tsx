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
import {forwardRef, useImperativeHandle} from "react"
import clsx from "clsx"
import {useLineNumbers} from "@/hooks/useLineNumbers"

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

const LexicalEditor = forwardRef(({className}: {className: string}, ref) => {
  // const [output, setOutput] = useState("")

  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      // const root = $getRoot()
      // const text = root.getTextContent()
      // setOutput(text)
    })
  }
  const lineNumberClass = useLineNumbers(5)

  return (
    <div className={clsx(className, "relative h-full p-4 ")}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="relative h-full">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={clsx(
                  "h-full min-h-24 p-2 outline-none",
                  lineNumberClass,
                  "editor-paper-lines"
                )}
              />
            }
            placeholder={
              <div className="absolute top-2 left-2 text-gray-400 pointer-events-none">
                {"C'est YUMIlanguia, écris des choses ,SVP."}
              </div>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
        </div>
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
        <EditorController ref={ref} />
      </LexicalComposer>
    </div>
  )
})
LexicalEditor.displayName = "LexicalEditor"
export default LexicalEditor
