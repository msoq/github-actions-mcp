import { octokit } from './client.js';

export async function getRun(owner: string, repo: string) {
  const response = await octokit.rest.actions.listWorkflowRunsForRepo({
    owner,
    repo,
    status: 'failure',
    per_page: 1,
  });
  const failedRun = response.data.workflow_runs?.[0];

  if (!failedRun) {
    throw new Error('No failedworkflow run found.');
  }

  return failedRun;
}
