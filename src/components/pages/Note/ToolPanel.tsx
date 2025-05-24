"use client"
import {ToggleGroup, ToggleGroupItem} from "@/components/shadcn/toggle-group"
import {useState} from "react"

export type ToolParams = {
  key: string
  label: string
}

export type ToolTogglePanelProps = {
  onAction: (selected: string) => void
  toolParamsList: ToolParams[]
}

export default function ToggleToolPanel({
  onAction,
  toolParamsList,
}: ToolTogglePanelProps) {
  const [selected, setSelected] = useState<string | undefined>(undefined) // which tool is selected, default :none  is selected;
  function selectedChanged(sel: string): void {
    if (sel === selected) {
      setSelected(undefined)
    } else {
      setSelected(sel)
      onAction(sel)
    }
  }

  return (
    <ToggleGroup
      type="single"
      value={selected}
      onValueChange={(value) => selectedChanged(value)}
      className="mt-4"
    >
      {toolParamsList.map((tool) => (
        <ToggleGroupItem key={tool.key} value={tool.key} className="text-xl">
          {tool.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
