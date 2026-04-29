/**
 * Formats the AI issues JSON into a Markdown comment for GitHub PRs
 */
const createMarkdownComment = (issues) => {
  let comment = '## 🤖 GitGuard AI Code Review\n\n';

  if (!issues || issues.length === 0) {
    return comment + 'No major issues found. Great work! 🎉';
  }

  issues.forEach((issue) => {
    // Determine emoji based on severity
    let emoji = 'ℹ️';
    if (issue.severity === 'High') emoji = '🚨';
    else if (issue.severity === 'Medium') emoji = '⚠️';

    comment += `### ${emoji} Issue: ${issue.type} (${issue.severity})\n`;
    comment += `**Description:** ${issue.description}\n\n`;
    comment += `**Suggested Fix:**\n`;
    comment += `\`\`\`javascript\n${issue.fix}\n\`\`\`\n\n`;
    comment += `---\n\n`;
  });

  return comment;
};

module.exports = {
  createMarkdownComment
};
