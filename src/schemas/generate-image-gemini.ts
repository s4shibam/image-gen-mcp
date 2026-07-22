import z from "zod"
import { z_image_job } from "./index"

const GEMINI_ASPECT_RATIOS = [
  "1:1",
  "2:3",
  "3:2",
  "3:4",
  "4:3",
  "4:5",
  "5:4",
  "9:16",
  "16:9",
  "21:9",
  "1:8",
  "8:1",
  "1:4",
  "4:1"
] as const

const GEMINI_IMAGE_SIZES = ["512", "1K", "2K", "4K"] as const

const GEMINI_MIME_TYPES = ["image/jpeg"] as const

export const z_generate_image_gemini = z.object({
  model: z
    .string()
    .min(1)
    .describe(
      "Gemini image model id, e.g. gemini-3.1-flash-image, gemini-3-pro-image, gemini-2.5-flash-image, nano-banana-pro-preview."
    ),
  images: z.array(z_image_job).min(1).describe("List of images to generate (prompt + filename)"),
  output_folder: z
    .string()
    .optional()
    .describe(
      "Optional folder relative to workspace root (or absolute). Defaults to .image-gen-mcp"
    ),
  aspect_ratio: z
    .enum(GEMINI_ASPECT_RATIOS)
    .optional()
    .describe(
      "Aspect ratio of the generated image. One of 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, 1:8, 8:1, 1:4, 4:1."
    ),
  image_size: z
    .enum(GEMINI_IMAGE_SIZES)
    .optional()
    .describe('Image resolution. One of "512", "1K", "2K", "4K" (uppercase K required).'),
  mime_type: z
    .enum(GEMINI_MIME_TYPES)
    .optional()
    .describe('Output MIME type. Currently only "image/jpeg" is supported.')
})

export type TGenerateImageGeminiInput = z.infer<typeof z_generate_image_gemini>
