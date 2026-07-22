import { GoogleGenAI, type Interactions } from "@google/genai"
import type { TGeneratedImage } from "@/types/common"
import { require_env } from "@/utils/env"
import { ext_from_mime } from "@/utils/storage"

type TImageResponseFormat = Interactions.ImageResponseFormat

export type TGeminiGenerateOptions = {
  model: Interactions.CreateModelInteractionParamsNonStreaming["model"]
  prompt: Extract<Interactions.CreateModelInteractionParamsNonStreaming["input"], string>
  aspect_ratio?: TImageResponseFormat["aspect_ratio"]
  image_size?: TImageResponseFormat["image_size"]
  mime_type?: TImageResponseFormat["mime_type"]
}

export const create_gemini_client = (): GoogleGenAI => {
  const api_key = require_env("GEMINI_API_KEY")

  return new GoogleGenAI({
    apiKey: api_key,
    httpOptions: { retryOptions: { attempts: 3 } }
  })
}

export const generate_gemini_image = async (
  client: GoogleGenAI,
  options: TGeminiGenerateOptions
): Promise<TGeneratedImage> => {
  let response_format: TImageResponseFormat | undefined

  if (options.aspect_ratio || options.image_size || options.mime_type) {
    response_format = { type: "image" }
    if (options.aspect_ratio) response_format.aspect_ratio = options.aspect_ratio
    if (options.image_size) response_format.image_size = options.image_size
    if (options.mime_type) response_format.mime_type = options.mime_type
  }

  const interaction = await client.interactions.create({
    model: options.model,
    input: options.prompt,
    response_format
  })

  const image = interaction.output_image
  if (!image?.data) {
    throw new Error("Gemini returned no image data")
  }

  return {
    buffer: Buffer.from(image.data, "base64"),
    ext: ext_from_mime(image.mime_type ?? options.mime_type)
  }
}
