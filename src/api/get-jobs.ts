import { octokit } from './client.js';

export async function getJobs(owner: string, repo: string, run_id: number) {
  const response = await octokit.rest.actions.listJobsForWorkflowRun({
    owner,
    repo,
    run_id,
  });

  return response.data.jobs;
}
