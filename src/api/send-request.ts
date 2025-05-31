const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER;
const REPO = process.env.GITHUB_REPO;

export async function sendRequest(url: string) {
  const response = await fetch(
    `https://api.github.com/repos/${OWNER}/${REPO}${url}`,
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

export async function sendRequestJson<T>(url: string) {
  const response = await sendRequest(url);
  const data = await response.json();

  return data as T;
}
