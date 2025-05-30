import {
  $createTextNode,
  $getRoot,
  LexicalEditor,
  TextNode,
  ElementNode,
  LexicalNode,
} from "lexical"

import type {JSX} from "react"

export type CorrectionSuggestion = {
  paragraphNo: number
  errors: {
    positions: number[]
    corrected: string
    reason: string
  }[]
}

// function cloneStyledText(original: TextNode, text: string): TextNode {
//   const newNode = $createTextNode(text)
//   const formats: TextFormatType[] = [
//     "bold",
//     "italic",
//     "underline",
//     "code",
//     "strikethrough",
//   ]
//   for (const f of formats) {
//     if (original.hasFormat(f)) newNode.toggleFormat(f)
//   }
//   return newNode
// }

import {$isParagraphNode, ParagraphNode, $isElementNode} from "lexical"

export function getAllParagraphs(editor: LexicalEditor): ParagraphNode[] {
  const results: ParagraphNode[] = []

  editor.getEditorState().read(() => {
    const root = $getRoot()

    function traverse(node: ElementNode) {
      if ($isParagraphNode(node)) {
        results.push(node)
      }
      for (const child of node.getChildren()) {
        if ($isElementNode(child)) {
          traverse(child)
        }
      }
    }

    traverse(root)
  })

  return results
}
function replaceTextNode(
  textNode: TextNode,
  start: number,
  end: number,
  corrected: string,
  reason: string
) {
  const text = textNode.getTextContent()
  const parent = textNode.getParent()
  if (!parent) return

  const beforeText = text.slice(0, start)
  const errorText = text.slice(start, end)
  const afterText = text.slice(end)

  const newNodes: LexicalNode[] = []

  if (beforeText) {
    newNodes.push($createTextNode(beforeText))
  }

  // 👇 使用你的自定义 ErrorNode（DecoratorNode）
  newNodes.push(new ErrorNode(errorText, corrected, reason))

  if (afterText) {
    newNodes.push($createTextNode(afterText))
  }

  // 替换原始节点
  textNode.replace(newNodes[0])
  let current = newNodes[0]

  for (let i = 1; i < newNodes.length; i++) {
    current.insertAfter(newNodes[i])
    current = newNodes[i]
  }
}

export function applyMultiNodeCorrections(
  editor: LexicalEditor,
  suggestions: CorrectionSuggestion[]
) {
  editor.update(() => {
    const paragraphs = getAllParagraphs(editor)
    for (const suggestion of suggestions) {
      const paramNo = suggestion.paragraphNo - 1 // ai 返回以1开始
      const paraElement = paragraphs[paramNo]

      const errors = suggestion.errors
      for (const error of errors.slice().reverse()) {
        const textNodes = paraElement.getAllTextNodes()
        if (textNodes.length == 0) continue
        const textNode = textNodes[0]
        const start = error.positions[0]
        const end = error.positions[1]
        const corrected = error.corrected
        const reason = error.reason
        replaceTextNode(textNode, start, end, corrected, reason)
      }
    }
    // const flatNodes: {node: TextNode; start: number; end: number}[] = []
    // let offset = 0
    // 获取所有 TextNode 及全局位置
    // const root = $getRoot()
    // $getRoot()
    //   .getAllTextNodes()
    //   .forEach((node) => {
    //     const text = node.getTextContent()
    //     flatNodes.push({node, start: offset, end: offset + text.length})
    //     offset += text.length
    //   })
    // const sorted = [...suggestions].sort(
    //   (a, b) => b.original[0] - a.original[0]
    // )
    // for (const {original, corrected, reason} of sorted) {
    //   const affected = flatNodes.filter(
    //     ({start: s, end: e}) => e > original[0] && s < original[1]
    //   )
    //   let preNode: TextNode | null = null
    //   for (const {node, start: nodeStart} of affected) {
    //     if (preNode != null && node != preNode) {
    //       preNode.remove()
    //       preNode = node
    //     }
    //     const content = node.getTextContent()
    //     const relStart = Math.max(original[0] - nodeStart, 0)
    //     const relEnd = Math.min(original[1] - nodeStart, content.length)
    //     const before = content.slice(0, relStart)
    //     const target = content.slice(relStart, relEnd)
    //     const after = content.slice(relEnd)
    //     const parent = node.getParent()
    //     if (!parent) continue
    //     // node.remove()
    //     if (before) parent.append(cloneStyledText(node, before))
    //     if (target) parent.append(new ErrorNode(target, corrected, reason))
    //     if (after) parent.append(cloneStyledText(node, after))
    //   }
    //   if (preNode != null && preNode.isAttached()) {
    //     preNode.remove()
    //   }
    // }
  })
}

// ✅ ErrorNode.tsx — Lexical 自定义错误高亮节点

import {DecoratorNode, DOMExportOutput, NodeKey} from "lexical"
import * as React from "react"

// ✅ 高亮组件（React 渲染）
function ErrorHighlight({
  text,
  corrected,
  reason,
}: {
  text: string
  corrected: string
  reason: string
}) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 text-xs text-gray-500 mb-1">
        <div className="font-mono text-green-700">✅ {corrected}</div>
        <div className="hidden italic text-red-500">📝 {reason}</div>
      </div>
      <span className="bg-yellow-100 text-red-600 underline decoration-dashed px-1 rounded">
        {text}
      </span>
    </div>
  )
}

// ✅ 自定义 DecoratorNode
export class ErrorNode extends DecoratorNode<JSX.Element> {
  __text: string
  __reason: string
  __corrected: string

  static getType(): string {
    return "error"
  }

  static clone(node: ErrorNode): ErrorNode {
    return new ErrorNode(
      node.__text,
      node.__corrected,
      node.__reason,
      node.__key
    )
  }

  constructor(text: string, corrected: string, reason: string, key?: NodeKey) {
    super(key)
    this.__text = text
    this.__reason = reason
    this.__corrected = corrected
  }

  createDOM(): HTMLElement {
    const container = document.createElement("div")
    container.className = "inline-block" // 保持文本流中渲染
    return container
  }

  updateDOM(): boolean {
    return false // 不自动更新 DOM
  }

  decorate(): JSX.Element {
    return (
      <ErrorHighlight
        text={this.__text}
        corrected={this.__corrected}
        reason={this.__reason}
      />
    )
  }

  isInline(): boolean {
    return true
  }

  exportJSON() {
    return {
      type: "error",
      version: 1,
      text: this.__text,
      reason: this.__reason,
    }
  }

  //   static importJSON(json: any): ErrorNode {
  //     return new ErrorNode(json.text, json.reason)
  //   }

  exportDOM(): DOMExportOutput {
    const el = document.createElement("span")
    el.textContent = this.__text
    el.setAttribute("title", this.__reason)
    el.className = "bg-yellow-100 text-red-600 underline"
    return {element: el}
  }
}

// ✅ 注册方式（放在初始化配置中）
// const editorConfig = {
//   nodes: [ErrorNode],
//   ...
// };
