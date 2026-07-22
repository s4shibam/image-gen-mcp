import z from "zod"
import { z_image_job } from "./index"

const OPENAI_QUALITIES = ["low", "medium", "high", "auto", "standard", "hd"] as const

const OPENAI_OUTPUT_FORMATS = ["png", "jpeg", "webp"] as const

const OPENAI_BACKGROUNDS = ["transparent", "opaque", "auto"] as const

export const z_generate_image_openai = z.object({
  model: z
    .string()
    .min(1)
    .describe(
      "OpenAI image model id. GPT image models: gpt-image-2, gpt-image-1.5, gpt-image-1, gpt-image-1-mini, chatgpt-image-latest. Also dall-e-2, dall-e-3."
    ),
  images: z.array(z_image_job).min(1).describe("List of images to generate (prompt + filename)"),
  output_folder: z
    .string()
    .optional()
    .describe(
      "Optional folder relative to workspace root (or absolute). Defaults to .image-gen-mcp"
    ),
  size: z
    .string()
    .optional()
    .describe(
      'Image size as WIDTHxHEIGHT or "auto". GPT image models: 1024x1024, 1536x1024, 1024x1536, or auto. gpt-image-2 also supports arbitrary sizes (both sides divisible by 16, aspect ratio 1:3-3:1, max 3840x2160). dall-e-2: 256x256, 512x512, 1024x1024. dall-e-3: 1024x1024, 1792x1024, 1024x1792.'
    ),
  quality: z
    .enum(OPENAI_QUALITIES)
    .optional()
    .describe(
      "Rendering quality. auto (default) picks the best for the model. GPT image models: low, medium, high. dall-e-3: standard, hd. dall-e-2: standard only."
    ),
  output_format: z
    .enum(OPENAI_OUTPUT_FORMATS)
    .optional()
    .describe("Output format for GPT image models only: png (default), jpeg, or webp."),
  background: z
    .enum(OPENAI_BACKGROUNDS)
    .optional()
    .describe(
      "Background for GPT image models that support it: transparent, opaque, or auto (default). transparent requires png or webp. gpt-image-2 does not support transparent — use opaque or auto."
    )
})

export type TGenerateImageOpenAIInput = z.infer<typeof z_generate_image_openai>
