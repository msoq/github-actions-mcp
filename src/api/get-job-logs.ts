import { octokit } from './client.js';

export async function getJobLogs(owner: string, repo: string, job_id: number) {
  const response = await octokit.rest.actions.downloadJobLogsForWorkflowRun({
    owner,
    repo,
    job_id,
  });

  if (response.url) {
    const logs = await fetch(response.url);

    return await logs.text();
  }

  throw new Error('No logs found');
}
