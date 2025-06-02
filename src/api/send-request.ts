const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function sendRequest(url: string, owner: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repo}${url}`,
    {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'User-Agent': 'github-actions-mcp-server',
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }

  return response;
}

export async function sendRequestJson<T>(
  url: string,
  owner: string,
  repo: string
) {
  const response = await sendRequest(url, owner, repo);
  const data = await response.json();

  return data as T;
}
