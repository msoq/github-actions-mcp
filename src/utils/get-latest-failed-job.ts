import type { getJobs } from '../api/get-jobs.js';

export function getLatestFailedJob(jobs: Awaited<ReturnType<typeof getJobs>>) {
  const job = jobs.findLast((job) => job.conclusion === 'failure');

  if (!job) {
    throw new Error('No failed job found');
  }

  return job;
}
