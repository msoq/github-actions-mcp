import type { Endpoints } from '@octokit/types';
import { sendRequestJson } from './send-request.js';

type JobsResponse =
  Endpoints['GET /repos/{owner}/{repo}/actions/runs/{run_id}/jobs']['response']['data'];

export async function getJobs(runId: number) {
  const response = await sendRequestJson<JobsResponse>(
    `/actions/runs/${runId}/jobs`
  );

  return response.jobs;
}
