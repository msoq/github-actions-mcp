import type { Endpoints } from '@octokit/types';
import { sendRequestJson } from './send-request.js';

type WorkflowRunsResponse =
  Endpoints['GET /repos/{owner}/{repo}/actions/runs']['response']['data'];

export async function getRun(owner: string, repo: string, query = '') {
  const response = await sendRequestJson<WorkflowRunsResponse>(
    `/actions/runs${query}`,
    owner,
    repo
  );
  const run = response.workflow_runs?.[0];

  if (!run) {
    throw new Error('No workflow run found.');
  }

  return run;
}
