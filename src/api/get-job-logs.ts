import { sendRequest } from './send-request.js';

export async function getJobLogs(jobId: number, owner: string, repo: string) {
  let response = await sendRequest(`/actions/jobs/${jobId}/logs`, owner, repo);

  if (response.status === 302) {
    // GitHub returns a redirect to the actual log file
    const logUrl = response.headers.get('Location');

    if (logUrl) {
      response = await fetch(logUrl);
    }
  }

  const logs = await response.text();

  if (!logs) {
    throw new Error('No logs found');
  }

  return logs;
}
