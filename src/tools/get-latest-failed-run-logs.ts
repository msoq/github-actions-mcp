import { getJobLogs, getJobs, getRun } from '../api/index.js';
import { getErrorsFromLogs, getLatestFailedJob } from '../utils/index.js';

export const getLatestFailedRunLogs = [
  'get_latest_failed_run_logs',
  'get the latest failed run logs from the github actions api',
  async () => {
    try {
      const latestFailedRun = await getRun(
        '?status=completed&conclusion=failure&per_page=1'
      );
      const jobs = await getJobs(latestFailedRun.id);
      const latestFailedJob = getLatestFailedJob(jobs);
      const logs = await getJobLogs(latestFailedJob.id);
      const errors = getErrorsFromLogs(logs);

      return { content: [{ type: 'text' as const, text: errors }] };
    } catch (error) {
      const text = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;

      return { content: [{ type: 'text' as const, text }], isError: true };
    }
  },
] as const;
