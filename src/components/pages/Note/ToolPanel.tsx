"use client"
import {ToggleGroup, ToggleGroupItem} from "@/components/shadcn/toggle-group"
import {useState} from "react"
import clsx from "clsx"

export type ToolParams = {
  key: string
  label: string
}

export type ToolTogglePanelProps = {
  onAction: (selected: string) => void
  toolParamsList: ToolParams[]
  className?: string
}

export default function ToggleToolPanel({
  onAction,
  toolParamsList,
  className,
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
      className={clsx(
        className,
        "flex mx-auto items-center justify-center",
        "gap-20"
      )}
    >
      {toolParamsList.map((tool) => (
        <ToggleGroupItem key={tool.key} value={tool.key} className="text-xl">
          <div className="flex flex-col items-center font-orbitron">
            <div>{tool.label}</div>
            <div>{tool.key}</div>
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
