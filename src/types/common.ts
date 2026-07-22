export type TGeneratedImage = {
  buffer: Buffer
  ext: string
}

export type TJobResult =
  | { filename: string; ok: true; path: string }
  | { filename: string; ok: false; error: string }

export type TProvider = "openai" | "gemini"
