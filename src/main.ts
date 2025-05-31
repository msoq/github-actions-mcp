import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getLatestFailedJobTool } from './tools/get-latest-failed-run-logs.js';

export const server = new McpServer({
  name: 'github-actions-mcp-server',
  version: '1.0.0',
});

server.tool(...getLatestFailedJobTool);

await server.connect(new StdioServerTransport());
