import z from "zod"

export const z_image_job = z.object({
  prompt: z.string().min(1).describe("Text prompt for the image"),
  filename: z.string().min(1).describe("Base filename without extension (e.g. hero-banner)")
})
