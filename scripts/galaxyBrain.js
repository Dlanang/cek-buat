#!/usr/bin/env node

/**
 * Galaxy Brain Achievement Generator
 * Creates discussion-like content to help unlock Galaxy Brain achievement
 */

const https = require('https');
const { Buffer } = require('buffer');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'Dlanang';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required!');
  process.exit(1);
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function githubRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Achievement-Generator'
      }
    };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
    }

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${result.message || body}`));
          }
        } catch (err) {
          reject(new Error(`Parse error: ${err.message}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
}

const discussionTopics = [
  {
    title: "🌌 Best Practices for GitHub Achievement Hunting",
    body: `Saya sedang mencari cara terbaik untuk mendapatkan GitHub achievements secara organic. Apa saja tips dan trik yang bisa dibagikan?

**Pertanyaan spesifik:**
1. Bagaimana cara efektif mendapatkan Pull Shark?
2. Strategi untuk Arctic Code Vault Contributor?
3. Tips untuk Galaxy Brain achievement?

Mohon bantuan dari komunitas! 🙏

**Update:** Saya sudah coba beberapa metode dan ingin share pengalaman saya juga.`,
    answer: `Great question! Berikut beberapa tips untuk mendapatkan GitHub achievements berdasarkan pengalaman saya:

## 🦈 Pull Shark
- Buat PR yang berkualitas ke open source projects
- Kontribusi documentation improvements
- Fix small bugs atau typos
- Buat PR ke repository sendiri dengan perubahan meaningful
- **Pro tip:** Focus pada quality over quantity

## 🏔️ Arctic Code Vault Contributor  
- Kontribusi ke repository populer sebelum snapshot tahunan (biasanya February)
- Focus ke projects seperti Linux kernel, popular frameworks
- Pastikan commit masuk sebelum deadline Arctic Program
- Even small fixes bisa qualify!

## 🌌 Galaxy Brain (Achievement ini!)
- Aktif menjawab pertanyaan di GitHub Discussions
- Berikan jawaban yang helpful dan detailed
- Follow up dengan clarifications jika diperlukan
- **Key:** Answer needs to be marked as "Answer" by question author

## General Tips:
✅ Konsisten berkontribusi setiap hari  
✅ Quality over quantity  
✅ Engage dengan komunitas secara genuine  
✅ Document your contributions  
✅ Be patient - achievements can take time to appear  

## Tools yang membantu:
- GitHub CLI untuk automation
- GitHub API untuk tracking progress
- Contribution graphs untuk monitoring activity

Hope this helps! Happy coding! 🚀

**Personal experience:** Saya sudah unlock beberapa achievements dan yang terpenting adalah genuine contribution. Automated tools membantu, tapi tetap harus meaningful.`
  },
  {
    title: "🔧 GitHub API Rate Limits dan Achievement Tracking",
    body: `Halo developers! 👋

Saya sedang membuat tools untuk tracking GitHub achievements dan menghadapi masalah dengan rate limits. Ada yang punya experience dengan:

1. **Optimal way** untuk query GitHub API tanpa hit rate limit?
2. **Best practices** untuk batch requests?
3. **Alternative approaches** untuk data collection?
4. **Caching strategies** yang efektif?

**Context:** Saya butuh pull data dari multiple repositories dan users untuk achievement tracking system.

Terima kasih untuk sharing knowledge-nya! 🙏`,
    answer: `Excellent question about GitHub API optimization! Saya punya pengalaman dengan ini. 

## 🔄 Rate Limit Management

### Basic Limits:
- **Unauthenticated:** 60 requests/hour
- **Authenticated:** 5,000 requests/hour
- **GitHub Apps:** Up to 15,000 requests/hour

### Best Practices:
\`\`\`javascript
// Use conditional requests
const response = await octokit.repos.get({
  owner: 'user',
  repo: 'repo',
  headers: {
    'If-None-Match': lastEtag  // Avoid unnecessary requests
  }
});

// Monitor rate limits
console.log('Remaining:', response.headers['x-ratelimit-remaining']);
console.log('Reset time:', response.headers['x-ratelimit-reset']);
\`\`\`

## 📊 Batch Strategies
1. **GraphQL over REST** - Get more data per request
   \`\`\`graphql
   query {
     user(login: "username") {
       repositories(first: 100) {
         nodes { name, stargazerCount, forkCount }
       }
       pullRequests(first: 100, states: MERGED) {
         totalCount
       }
     }
   }
   \`\`\`

2. **Pagination optimization** - Use proper per_page limits (max 100)
3. **Request spacing** - Add delays between calls
4. **Exponential backoff** for retries

## 🛡️ Advanced Techniques

### Conditional Requests:
\`\`\`javascript
// Cache ETags and Last-Modified headers
const cachedResponse = cache.get(cacheKey);
const headers = {};
if (cachedResponse?.etag) {
  headers['If-None-Match'] = cachedResponse.etag;
}
\`\`\`

### Smart Caching:
- **Redis/Memory cache** untuk frequently accessed data
- **Database storage** untuk long-term caching
- **TTL strategies** based on data volatility

### GitHub Apps Benefits:
- Higher rate limits
- Fine-grained permissions
- Better for production tools

## 📈 Achievement Tracking Specific Tips

### Data Collection Strategy:
1. **User profile data** - Cache for 1 hour
2. **Repository data** - Cache for 30 minutes  
3. **Achievement status** - Real-time or 15-min intervals
4. **Historical data** - Store permanently

### API Endpoints Priority:
- Use \`/user\` for personal data
- Use \`/search\` carefully (has stricter limits)
- Prefer specific endpoints over search when possible

### Implementation Example:
\`\`\`javascript
class GitHubAchievementTracker {
  constructor(token) {
    this.octokit = new Octokit({ auth: token });
    this.cache = new Map();
  }
  
  async getUserAchievements(username) {
    const cacheKey = \`achievements:\${username}\`;
    const cached = this.cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 900000) { // 15 min
      return cached.data;
    }
    
    // Batch multiple API calls
    const [profile, repos, pullRequests] = await Promise.all([
      this.octokit.users.getByUsername({ username }),
      this.octokit.repos.listForUser({ username, per_page: 100 }),
      this.octokit.search.issuesAndPullRequests({
        q: \`author:\${username} type:pr is:merged\`
      })
    ]);
    
    const achievements = this.calculateAchievements({
      profile: profile.data,
      repos: repos.data,
      pullRequests: pullRequests.data
    });
    
    this.cache.set(cacheKey, {
      data: achievements,
      timestamp: Date.now()
    });
    
    return achievements;
  }
}
\`\`\`

## 🚀 Production Tips
- **Monitor your usage** with GitHub's rate limit headers
- **Implement circuit breakers** for API failures
- **Use webhooks** where possible instead of polling
- **Consider GitHub Apps** for higher limits
- **Queue systems** for background processing

Let me know if you need specific implementation details! 💻

**Personal note:** Saya sudah implement system serupa dan tips ini sangat membantu mengurangi rate limit issues sambil maintain good performance.`
  }
];

async function generateGalaxyBrain() {
  console.log('🌌 Starting Galaxy Brain Achievement Generation...');
  
  try {
    const repoName = 'cek-buat';
    
    console.log('📋 Creating discussion-style issues for Galaxy Brain achievement...');
    console.log('💡 Note: Enable GitHub Discussions in repository settings for full effect');
    
    for (let i = 0; i < discussionTopics.length; i++) {
      const topic = discussionTopics[i];
      const timestamp = Date.now() + i;
      
      console.log(`\n📝 Creating discussion topic ${i + 1}/${discussionTopics.length}...`);
      console.log(`📌 Title: ${topic.title}`);
      
      // Create issue as discussion alternative
      const issue = await githubRequest(`/repos/${GITHUB_USERNAME}/${repoName}/issues`, 'POST', {
        title: topic.title,
        body: `${topic.body}

---
**Generated:** ${new Date().toISOString()}  
**Type:** Discussion-style question for Galaxy Brain achievement  
**ID:** galaxy-brain-${timestamp}`,
        labels: ['discussion', 'galaxy-brain', 'question', 'help wanted']
      });
      
      console.log(`✅ Created issue #${issue.number}: ${issue.html_url}`);
      
      // Wait before answering
      await sleep(3000);
      
      // Answer the issue
      console.log('💬 Posting helpful answer...');
      const comment = await githubRequest(`/repos/${GITHUB_USERNAME}/${repoName}/issues/${issue.number}/comments`, 'POST', {
        body: `${topic.answer}

---
**Answer provided:** ${new Date().toISOString()}  
**Achievement target:** Galaxy Brain (2+ helpful answers)  
**Status:** Auto-generated helpful response`
      });
      
      console.log(`💬 Posted answer: ${comment.html_url}`);
      
      // Wait a bit more
      await sleep(2000);
      
      // Close as resolved
      await githubRequest(`/repos/${GITHUB_USERNAME}/${repoName}/issues/${issue.number}`, 'PATCH', {
        state: 'closed',
        state_reason: 'completed'
      });
      
      console.log(`✅ Closed issue #${issue.number} as resolved`);
      
      // Wait between topics
      if (i < discussionTopics.length - 1) {
        console.log('⏳ Waiting before next topic...');
        await sleep(5000);
      }
    }
    
    console.log('\n🎉 Galaxy Brain achievement generation completed!');
    console.log('📈 Created 2 discussion-style Q&As with helpful answers');
    console.log('\n💡 Next steps:');
    console.log('1. Enable GitHub Discussions in repository settings');
    console.log('2. Convert issues to discussions if needed');
    console.log('3. Get community members to mark answers as helpful');
    console.log(`4. Check your profile: https://github.com/${GITHUB_USERNAME}`);
    
    console.log('\n🌌 Galaxy Brain requires:');
    console.log('- 2+ answers marked as helpful in GitHub Discussions');
    console.log('- Genuine community engagement');
    console.log('- Quality, detailed responses');
    
  } catch (err) {
    console.error('❌ Error generating Galaxy Brain achievement:', err.message);
    throw err;
  }
}

generateGalaxyBrain()
  .then(() => {
    console.log('\n🏆 Galaxy Brain generation finished successfully!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Galaxy Brain generation failed:', err.message);
    process.exit(1);
  });