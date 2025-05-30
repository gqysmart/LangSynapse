// import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext"
// import {useEffect, useState} from "react"
// import ReactDOM from "react-dom"

// export function CorrectionFloatPlugin({anchorKey, anchorOffset, correction}) {
//   const [editor] = useLexicalComposerContext()
//   const [position, setPosition] = useState(null)

//   useEffect(() => {
//     editor.getEditorState().read(() => {
//       const element = editor.getElementByKey(anchorKey)
//       if (!element) return

//       const domText = element.firstChild // usually text node
//       if (!domText || domText.nodeType !== Node.TEXT_NODE) return

//       const range = document.createRange()
//       try {
//         range.setStart(domText, anchorOffset)
//         range.setEnd(domText, anchorOffset)
//         const rect = range.getBoundingClientRect()
//         setPosition({
//           top: rect.top + window.scrollY,
//           left: rect.left + window.scrollX,
//         })
//       } catch (e) {
//         console.warn("Offset out of range", e)
//       }
//     })
//   }, [anchorKey, anchorOffset, correction])

//   if (!position) return null

//   return ReactDOM.createPortal(
//     <div
//       style={{
//         position: "absolute",
//         top: position.top - 24,
//         left: position.left,
//         backgroundColor: "#ecfdf5",
//         color: "#15803d",
//         padding: "2px 6px",
//         fontSize: "0.875rem",
//         fontWeight: "bold",
//         borderRadius: "4px",
//         whiteSpace: "nowrap",
//         pointerEvents: "none",
//         boxShadow: "0 0 2px rgba(0,0,0,0.1)",
//       }}
//     >
//       ↑ {correction}
//     </div>,
//     document.body
//   )
// }
