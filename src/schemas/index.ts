import path from "node:path"
import z from "zod"

export const z_absolute_output_directory = z
  .string()
  .trim()
  .min(1)
  .refine((value) => path.isAbsolute(value), {
    message: "absolute_output_directory must be an absolute path"
  })
  .describe(
    "Required absolute directory path where generated images will be saved. Relative paths are rejected."
  )

export const z_image_job = z.object({
  prompt: z.string().min(1).describe("Text prompt for the image"),
  filename: z.string().min(1).describe("Base filename without extension (e.g. hero-banner)")
})
