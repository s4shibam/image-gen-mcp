<p align="center">
    <a href="https://github.com/s4shibam/image-gen-mcp">
        <img alt="Image Gen MCP" width="100" src="./.readme/logo.svg">
    </a>
</p>

<div align="center">
    <h1>Image Gen MCP</h1>
    <p>Generate images with OpenAI and Gemini from any MCP client</p>
</div>

<p align="center">
    <img src="https://img.shields.io/github/languages/code-size/s4shibam/image-gen-mcp?style=flat-square" alt="Code Size">
    <img src="https://img.shields.io/github/license/s4shibam/image-gen-mcp?style=flat-square" alt="License">
    <img src="https://img.shields.io/github/stars/s4shibam/image-gen-mcp?style=flat-square&logo=github" alt="Stars">
</p>

<br />

## ⚡ Introduction

Image Gen MCP is a STDIO MCP server for generating images with OpenAI and Google Gemini. It lets AI coding tools create image assets and save them directly inside your project, without a separate image generation workflow or manual downloads.

## ✨ Features

- 🧠 **Two AI providers** - Generate images with OpenAI or Google Gemini
- 🖼️ **Batch generation** - Create several images in one request, with up to 10 jobs running at once
- 🎨 **Image controls** - Set size, quality, aspect ratio, format, and background when supported by the model
- 💾 **Direct file output** - Save generated images into the current workspace or a custom folder
- 🏷️ **Clear filenames** - Files include the requested name, provider, model, and timestamp
- 📋 **Useful results** - Get a summary of saved files and any jobs that failed

## ⚙️ Tech Stack

- **Language** - TypeScript
- **Runtime** - Node.js 20 or newer
- **MCP** - Model Context Protocol server over STDIO
- **AI SDKs** - OpenAI and Google Gen AI
- **Validation** - Zod
- **Build tools** - tsup and Biome

## 📦 Installation

**Requirements:**

- Node.js 20 or newer
- An OpenAI API key, a Gemini API key, or both
- An MCP-compatible client

Add the following server configuration to your MCP client. The exact location of this configuration depends on the client.

```json
{
  "mcpServers": {
    "image-gen-mcp": {
      "command": "npx",
      "args": ["-y", "@s4shibam/image-gen-mcp"],
      "env": {
        "OPENAI_API_KEY": "your-openai-api-key",
        "GEMINI_API_KEY": "your-gemini-api-key"
      }
    }
  }
}
```

You only need the API key for the provider you want to use. You can also place the keys in a `.env` file in the workspace where the MCP server runs:

```env
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
```

## 🚀 Quick Start

After connecting the server, ask your MCP client to create an image. For example:

```text
Use Gemini model gemini-3.1-flash-image to create a 16:9 hero image for a coffee shop website. Save it as coffee-shop-hero.
```

```text
Use OpenAI model gpt-image-2 to create three square product icons and save them in assets/images.
```

The generated files are saved in `.image-gen-mcp` by default. If you provide `output_folder`, they are saved there instead.

## Tools

| Tool | Description | Main options |
| --- | --- | --- |
| `generate_image_openai` | Generate one or more images with the OpenAI Image API | `model`, `images`, `output_folder`, `size`, `quality`, `output_format`, `background` |
| `generate_image_gemini` | Generate one or more images with the Gemini Interactions API | `model`, `images`, `output_folder`, `aspect_ratio`, `image_size`, `mime_type` |

Each item in `images` needs:

- `prompt` - What the image should contain
- `filename` - Base filename without an extension

## 📚 Notes

### Output files

The default output folder is `.image-gen-mcp` in the server's current working directory. Relative and absolute custom paths are supported.

Files use this format:

```text
{filename}-{provider}-{model}-{timestamp}.{ext}
```

Example:

```text
coffee-shop-hero-gemini-gemini-3.1-flash-image-1784412779099.jpg
```

### Provider options

- OpenAI supports model-specific settings such as size, quality, output format, and background.
- Gemini supports aspect ratio, image size, and JPEG output.
- Not every option works with every model. The provider's API rules still apply.
- If one image in a batch fails, successful images are still saved and the result lists each failure.

## 👋🏻 Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/s4shibam)
[![Twitter](https://img.shields.io/badge/Twitter-00ACEE?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/s4shibam)
