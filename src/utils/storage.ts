import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"
import type { TProvider } from "@/types/common"

export const sanitize_segment = (value: string): string =>
  value
    .trim()
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")

export const build_image_filename = (params: {
  filename: string
  provider: TProvider
  model: string
  ext: string
}): string => {
  const base = sanitize_segment(params.filename)
  const model = sanitize_segment(params.model)
  const stamp = Date.now()
  return `${base}-${params.provider}-${model}-${stamp}.${params.ext}`
}

export const ensure_dir = async (dir: string): Promise<void> => {
  await mkdir(dir, { recursive: true })
}

export const save_image = async (
  dir: string,
  filename: string,
  buffer: Buffer
): Promise<string> => {
  const full_path = path.join(dir, filename)
  await writeFile(full_path, buffer)
  return full_path
}

export const ext_from_mime = (mime?: string): string => {
  if (!mime) return "png"
  if (mime.includes("jpeg") || mime.includes("jpg")) return "jpg"
  if (mime.includes("webp")) return "webp"
  if (mime.includes("gif")) return "gif"
  return "png"
}
