const GITHUB_LOGS_FAILED_DEPLOYMENT_PREFIX = '│';
const GITHUB_LOGS_FAILED_TESTS_PREFIX = 'FAIL ';

export function getErrorsFromLogs(logs: string) {
  const lines = logs.split('\n');
  let errors = lines.filter((line) =>
    line.includes(GITHUB_LOGS_FAILED_DEPLOYMENT_PREFIX)
  );

  if (!errors.length) {
    const failIndex = lines.findIndex((line) =>
      line.includes(GITHUB_LOGS_FAILED_TESTS_PREFIX)
    );

    if (failIndex !== -1) {
      errors = lines.slice(failIndex, failIndex + 50);
    }
  }

  return errors.join('\n');
}
