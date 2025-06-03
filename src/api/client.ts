import { Octokit } from 'octokit';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  throw new Error('GITHUB_TOKEN env variable is required');
}

export const octokit = new Octokit({
  auth: GITHUB_TOKEN,
  userAgent: 'github-actions-mcp-server',
});
