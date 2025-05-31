const GITHUB_LOGS_ERROR_PREFIX = '│';

export function getErrorsFromLogs(logs: string) {
  const lines = logs.split('\n');
  const errors = lines
    .filter((line) => line.includes(GITHUB_LOGS_ERROR_PREFIX))
    .join('\n');

  return errors;
}
