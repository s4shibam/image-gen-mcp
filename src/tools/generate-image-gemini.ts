import p_limit from "p-limit"
import { create_gemini_client, generate_gemini_image } from "@/providers/gemini"
import type { TGenerateImageGeminiInput } from "@/schemas/generate-image-gemini"
import type { TJobResult } from "@/types/common"
import { CONCURRENCY } from "@/utils/constants"
import { format_summary, tool_error, tool_ok } from "@/utils/result"
import { build_image_filename, ensure_dir, save_image } from "@/utils/storage"

export const handle_generate_image_gemini = async (input: TGenerateImageGeminiInput) => {
  try {
    const gemini = create_gemini_client()
    const out_dir = input.absolute_output_directory
    await ensure_dir(out_dir)

    const limit = p_limit(CONCURRENCY)

    const results = await Promise.all(
      input.images.map((job) =>
        limit(async (): Promise<TJobResult> => {
          try {
            const { buffer, ext } = await generate_gemini_image(gemini, {
              model: input.model,
              prompt: job.prompt,
              aspect_ratio: input.aspect_ratio,
              image_size: input.image_size,
              mime_type: input.mime_type
            })

            const file = build_image_filename({
              filename: job.filename,
              provider: "gemini",
              model: input.model,
              ext
            })
            const saved_path = await save_image(out_dir, file, buffer)
            return { filename: job.filename, ok: true, path: saved_path }
          } catch (err) {
            const error = err instanceof Error ? err.message : String(err)
            return { filename: job.filename, ok: false, error }
          }
        })
      )
    )

    const summary = format_summary("gemini", results)
    const has_failures = results.some((r) => !r.ok)
    return has_failures ? tool_error(summary) : tool_ok(summary)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return tool_error(message)
  }
}
