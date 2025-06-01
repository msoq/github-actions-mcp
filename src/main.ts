#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { getLatestFailedRunLogs } from './tools/index.js';

export const server = new McpServer({
  name: 'github-actions-mcp-server',
  version: '1.0.0',
});

server.tool(...getLatestFailedRunLogs);

await server.connect(new StdioServerTransport());
