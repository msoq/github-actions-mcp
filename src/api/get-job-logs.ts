import { sendRequest } from './send-request.js';

export async function getJobLogs(jobId: number) {
  let response = await sendRequest(`/actions/jobs/${jobId}/logs`);

  if (response.status === 302) {
    // GitHub returns a redirect to the actual log file
    const logUrl = response.headers.get('Location');

    if (logUrl) {
      response = await sendRequest(logUrl);
    }
  }

  const logs = await response.text();

  if (!logs) {
    throw new Error('No logs found');
  }

  return logs;
}
