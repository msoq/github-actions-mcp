import { z } from 'zod';
import { getJobLogs, getJobs, getRun } from '../api/index.js';
import { getErrorsFromLogs, getLatestFailedJob } from '../utils/index.js';

export const getLatestFailedRunLogs = [
  'get_latest_failed_run_logs',
  'get the latest failed run logs from the github actions api',
  {
    owner: z
      .string()
      .describe('github repository owner (username or organization)'),
    repo: z.string().describe('github repository name'),
  },
  async (args: { owner: string; repo: string }) => {
    try {
      const latestFailedRun = await getRun(args.owner, args.repo);
      const jobs = await getJobs(args.owner, args.repo, latestFailedRun.id);
      const latestFailedJob = getLatestFailedJob(jobs);
      const logs = await getJobLogs(args.owner, args.repo, latestFailedJob.id);
      const errors = getErrorsFromLogs(logs);

      return { content: [{ type: 'text' as const, text: errors }] };
    } catch (error) {
      const text = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;

      return { content: [{ type: 'text' as const, text }], isError: true };
    }
  },
] as const;
