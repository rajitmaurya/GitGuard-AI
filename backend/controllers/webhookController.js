const githubService = require('../services/githubService');
const aiService = require('../services/aiService');
const formatResponse = require('../utils/formatResponse');
const Review = require('../models/Review');

const handleWebhook = async (req, res) => {
  try {
    const event = req.headers['x-github-event'];
    
    // We only care about pull_request events
    if (event !== 'pull_request') {
      return res.status(200).json({ message: 'Event ignored, not a pull request.' });
    }

    const { action, pull_request, repository } = req.body;

    // Only trigger when a PR is opened or new code is pushed (synchronize)
    if (action !== 'opened' && action !== 'synchronize') {
      return res.status(200).json({ message: `Ignored action: ${action}` });
    }

    const repoName = repository.full_name;
    const prNumber = pull_request.number;
    const owner = repository.owner.login;
    const repo = repository.name;

    console.log(`\n📥 Received PR webhook: ${repoName} #${prNumber}`);

    // Send immediate response to GitHub so the webhook doesn't timeout
    // GitHub expects a response within 10 seconds.
    res.status(200).json({ message: 'Webhook received. Processing PR...' });

    // --- Processing in background ---
    
    // 1. Fetch PR Diff
    const diff = await githubService.getPRDiff(owner, repo, prNumber);
    if (!diff) {
      console.log('❌ No diff found or error fetching diff.');
      return;
    }

    // 2. Send diff to AI for analysis
    console.log('🧠 Analyzing code diff with AI...');
    const analysis = await aiService.analyzeCode(diff);

    // 3. Format response into a markdown comment
    if (analysis && analysis.issues && analysis.issues.length > 0) {
      const commentBody = formatResponse.createMarkdownComment(analysis.issues);
      
      // 4. Post comment back to GitHub PR
      await githubService.postPRComment(owner, repo, prNumber, commentBody);
      console.log('💬 Successfully posted review comment to PR.');

      // 5. Store review in MongoDB
      await Review.create({
        repo: repoName,
        prNumber: prNumber,
        issues: analysis.issues
      });
      console.log('💾 Review saved to database.');
    } else {
      // If AI found no issues
      console.log('✅ No issues found by AI. Code looks good!');
      await githubService.postPRComment(owner, repo, prNumber, "### ✅ GitGuard AI Review\nNo bugs or major issues found. Great job!");
    }

  } catch (error) {
    console.error('❌ Error handling webhook:', error.message);
  }
};

module.exports = {
  handleWebhook
};
