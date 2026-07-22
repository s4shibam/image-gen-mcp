import OpenAI from "openai"
import type { ImageGenerateParamsNonStreaming } from "openai/resources/images"
import type { TGeneratedImage } from "@/types/common"
import { require_env } from "@/utils/env"

export type TOpenAIGenerateOptions = {
  model: ImageGenerateParamsNonStreaming["model"]
  prompt: ImageGenerateParamsNonStreaming["prompt"]
  background?: ImageGenerateParamsNonStreaming["background"]
  output_format?: ImageGenerateParamsNonStreaming["output_format"]
  quality?: ImageGenerateParamsNonStreaming["quality"]
  size?: ImageGenerateParamsNonStreaming["size"]
}

export const create_openai_client = (): OpenAI => {
  const api_key = require_env("OPENAI_API_KEY")

  return new OpenAI({ apiKey: api_key, maxRetries: 2 })
}

export const generate_openai_image = async (
  client: OpenAI,
  options: TOpenAIGenerateOptions
): Promise<TGeneratedImage> => {
  const params: ImageGenerateParamsNonStreaming = {
    model: options.model,
    prompt: options.prompt
  }

  if (options.model === "dall-e-2" || options.model === "dall-e-3") {
    params.response_format = "b64_json"
  }
  if (options.size) params.size = options.size
  if (options.quality) params.quality = options.quality
  if (options.output_format) params.output_format = options.output_format
  if (options.background) params.background = options.background

  const response = await client.images.generate(params)

  const b64 = response.data?.[0]?.b64_json
  if (!b64) {
    throw new Error("OpenAI returned no image data")
  }

  const ext = options.output_format ?? "png"
  return { buffer: Buffer.from(b64, "base64"), ext }
}
