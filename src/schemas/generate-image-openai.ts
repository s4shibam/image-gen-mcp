import z from "zod"
import { z_absolute_output_directory, z_image_job } from "./index"

const OPENAI_QUALITIES = [
  "low",
  "medium",
  "high",
  "xhigh",
  "max",
  "auto",
  "standard",
  "hd"
] as const

const OPENAI_OUTPUT_FORMATS = ["png", "jpeg", "webp"] as const

const OPENAI_BACKGROUNDS = ["transparent", "opaque", "auto"] as const

export const z_generate_image_openai = z.object({
  model: z
    .string()
    .min(1)
    .describe(
      "OpenAI image model id. GPT image models: gpt-image-2.5-sunburst, gpt-image-2.5-flare, gpt-image-2, gpt-image-1.5, gpt-image-1, gpt-image-1-mini, chatgpt-image-latest. Dated snapshots: gpt-image-2-2026-04-21, gpt-image-2.5-sunburst-2026-09-08, gpt-image-2.5-flare-2026-09-08. Also dall-e-2, dall-e-3."
    ),
  images: z.array(z_image_job).min(1).describe("List of images to generate (prompt + filename)"),
  absolute_output_directory: z_absolute_output_directory,
  size: z
    .string()
    .optional()
    .describe(
      'Image size as WIDTHxHEIGHT or "auto". GPT image models: 1024x1024, 1536x1024, 1024x1536, or auto. gpt-image-2, gpt-image-2.5-sunburst, and gpt-image-2.5-flare (and their dated snapshots) also support arbitrary sizes (both sides divisible by 16, aspect ratio 1:3-3:1, max 3840x2160; above 2560x1440 is experimental). dall-e-2: 256x256, 512x512, 1024x1024. dall-e-3: 1024x1024, 1792x1024, 1024x1792.'
    ),
  quality: z
    .enum(OPENAI_QUALITIES)
    .optional()
    .describe(
      "Rendering quality. auto (default) picks the best for the model. GPT image models: low, medium, high. gpt-image-2.5-sunburst and gpt-image-2.5-flare also support xhigh and max. dall-e-3: standard, hd. dall-e-2: standard only."
    ),
  output_format: z
    .enum(OPENAI_OUTPUT_FORMATS)
    .optional()
    .describe("Output format for GPT image models only: png (default), jpeg, or webp."),
  background: z
    .enum(OPENAI_BACKGROUNDS)
    .optional()
    .describe(
      "Background for GPT image models: transparent, opaque, or auto (default). transparent requires png or webp. gpt-image-2.5-sunburst and gpt-image-2.5-flare support transparent and opaque. On gpt-image-2, transparent support is in preview."
    )
})

export type TGenerateImageOpenAIInput = z.infer<typeof z_generate_image_openai>
