export const SERVER_NAME = "image-gen-mcp"
export const SERVER_VERSION = "0.0.1"

export const DEFAULT_OUTPUT_DIR = ".image-gen-mcp"

export const CONCURRENCY = 10

export const GENERATE_IMAGE_GEMINI_DESCRIPTION = `
Generate one or more images with Google Gemini (Nano Banana) via the Interactions API and save them to disk.

Use this when the user (or your plan) needs Gemini-generated assets for a website or app.
Pass the Gemini image model id (e.g. gemini-3.1-flash-image, gemini-3-pro-image, gemini-2.5-flash-image),
a list of prompt + filename pairs, and optional response_format settings: aspect_ratio, image_size, mime_type.

Notes:
- aspect_ratio: 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9, 1:8, 8:1, 1:4, 4:1.
- image_size: 512, 1K, 2K, or 4K (uppercase K required).
- mime_type: currently only image/jpeg is supported.

Images are written under the workspace root in ".image-gen-mcp" unless output_folder is set.
Each file is named: {filename}-gemini-{model}-{timestamp}.{ext}
`.trim()

export const GENERATE_IMAGE_OPENAI_DESCRIPTION = `
Generate one or more images with OpenAI's Image API and save them to disk.

Use this when the user (or your plan) needs OpenAI-generated assets for a website or app.
Pass the OpenAI image model id (e.g. gpt-image-2, gpt-image-1.5, gpt-image-1, dall-e-3),
a list of prompt + filename pairs, and optional settings: size, quality, background, output_format.

Notes:
- size: standard GPT sizes are 1024x1024, 1536x1024, 1024x1536, or auto; gpt-image-2 also allows arbitrary WIDTHxHEIGHT (divisible by 16).
- quality: low/medium/high/auto for GPT image models; standard/hd for dall-e-3.
- background: transparent/opaque/auto; transparent is unsupported on gpt-image-2 and requires png or webp.
- output_format: png, jpeg, or webp (GPT image models only).

Images are written under the workspace root in ".image-gen-mcp" unless output_folder is set.
Each file is named: {filename}-openai-{model}-{timestamp}.{ext}
`.trim()
