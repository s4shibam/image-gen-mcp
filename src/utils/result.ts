import type { TJobResult } from "@/types/common"

export const format_summary = (provider: string, results: TJobResult[]): string => {
  const ok = results.filter((r) => r.ok)
  const failed = results.filter((r) => !r.ok)

  const lines = [`Provider: ${provider}`, `Succeeded: ${ok.length}`, `Failed: ${failed.length}`]

  if (ok.length) {
    lines.push("Saved:")
    for (const item of ok) {
      lines.push(`  - ${item.filename} → ${item.path}`)
    }
  }

  if (failed.length) {
    lines.push("Failed filenames:")
    for (const item of failed) {
      lines.push(`  - ${item.filename}: ${item.error}`)
    }
  }

  return lines.join("\n")
}

export const tool_error = (message: string) => ({
  content: [{ type: "text" as const, text: message }],
  isError: true as const
})

export const tool_ok = (text: string) => ({
  content: [{ type: "text" as const, text }]
})
