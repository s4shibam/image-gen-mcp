import { McpServer } from "@modelcontextprotocol/server"
import { serveStdio } from "@modelcontextprotocol/server/stdio"
import { z_generate_image_gemini } from "@/schemas/generate-image-gemini"
import { z_generate_image_openai } from "@/schemas/generate-image-openai"
import { handle_generate_image_gemini } from "@/tools/generate-image-gemini"
import { handle_generate_image_openai } from "@/tools/generate-image-openai"
import {
  GENERATE_IMAGE_GEMINI_DESCRIPTION,
  GENERATE_IMAGE_OPENAI_DESCRIPTION,
  SERVER_NAME,
  SERVER_VERSION
} from "@/utils/constants"
import { load_workspace_env } from "@/utils/env"

load_workspace_env()

const create_server = (): McpServer => {
  const server = new McpServer({
    name: SERVER_NAME,
    version: SERVER_VERSION
  })

  server.registerTool(
    "generate_image_gemini",
    {
      description: GENERATE_IMAGE_GEMINI_DESCRIPTION,
      inputSchema: z_generate_image_gemini
    },
    handle_generate_image_gemini
  )

  server.registerTool(
    "generate_image_openai",
    {
      description: GENERATE_IMAGE_OPENAI_DESCRIPTION,
      inputSchema: z_generate_image_openai
    },
    handle_generate_image_openai
  )

  return server
}

serveStdio(create_server)
