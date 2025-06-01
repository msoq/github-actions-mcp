# GitHub Actions MCP Server

A Model Context Protocol (MCP) server that provides tools for analyzing GitHub Actions workflow failures. This server exposes GitHub Actions error extraction functionality through MCP tools that can be used by AI assistants and other MCP clients.

## MCP Client Configuration

```json
{
  "mcpServers": {
    "github-actions-mcp": {
      "command": "npx",
      "args": ["-y", "github-actions-mcp"],
      "env": {
        "GITHUB_TOKEN": "personal access token with repository read access",
        "GITHUB_OWNER": "repository owner/organization",
        "GITHUB_REPO": "repository name"
      }
    }
  }
}
```

## Available Tools

`get_latest_failed_run_logs`
- Retrieves the latest failed workflow run and extracts error messages from its logs.
