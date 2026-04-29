const { Octokit } = require('octokit');

// Helper to get an authenticated octokit instance
const getOctokit = () => {
  return new Octokit({
    auth: process.env.GITHUB_TOKEN
  });
};

/**
 * Fetches the raw diff of a Pull Request
 */
const getPRDiff = async (owner, repo, prNumber) => {
  try {
    const octokit = getOctokit();
    
    // GitHub API allows fetching PRs in 'diff' format
    const { data: diff } = await octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: prNumber,
      mediaType: {
        format: 'diff' // This tells GitHub to return the raw diff string
      }
    });

    return diff;
  } catch (error) {
    console.error('Error fetching PR diff from GitHub:', error.message);
    return null;
  }
};

/**
 * Posts a comment to the Pull Request
 */
const postPRComment = async (owner, repo, prNumber, body) => {
  try {
    const octokit = getOctokit();
    
    await octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: prNumber, // PRs are treated as issues for comments
      body: body
    });
  } catch (error) {
    console.error('Error posting PR comment to GitHub:', error.message);
  }
};

module.exports = {
  getPRDiff,
  postPRComment
};
