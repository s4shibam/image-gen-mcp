import path from "node:path"
import { config as load_dotenv } from "dotenv"

export const load_workspace_env = (): void => {
  load_dotenv({ path: path.resolve(process.cwd(), ".env"), quiet: true })
}

export const require_env = (key: string): string => {
  const value = process.env[key]?.trim()
  if (!value) {
    throw new Error(`Missing ${key}. Set it in the workspace .env or via MCP envFile/env config.`)
  }

  return value
}
