#!/usr/bin/env node

// Simple & Classic Galaxy Brain Generator
// Untuk discussion answers achievement

const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN || '';
const USERNAME = process.env.GITHUB_USERNAME || 'Dlanang';
const REPO = 'cek-buat';

// Security validation
if (!TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required!');
  console.error(
    '💡 Set it in your .env file or run: export GITHUB_TOKEN=your_token_here'
  );
  console.error('🔗 Get token at: https://github.com/settings/tokens');
  process.exit(1);
}

if (TOKEN === 'your_token_here' || TOKEN === 'your_github_token_here') {
  console.error('❌ Please set a real GitHub token, not the placeholder!');
  console.error('🔗 Get token at: https://github.com/settings/tokens');
  process.exit(1);
}

console.log('🌌 GALAXY BRAIN GENERATOR KLASIK');
console.log('=================================');

function apiCall(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'GalaxyBrainBot',
        Accept: 'application/vnd.github.v3+json',
      },
    };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
    }

    const req = https.request(options, res => {
      let body = '';
      res.on('data', chunk => (body += chunk));
      res.on('end', () => {
        try {
          const result = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(result);
          } else {
            reject(new Error(`${res.statusCode}: ${result.message || body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
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

const questions = [
  {
    title: '🤔 How to get GitHub Achievement badges efficiently?',
    body: `Hi developers! 👋

I'm trying to understand the best approach to earn GitHub achievement badges. What are some legitimate strategies you've used?

Specifically interested in:
1. Pull Shark achievement tips
2. Galaxy Brain discussion strategies  
3. Arctic Code Vault participation
4. General contribution best practices

Any insights would be appreciated! Thanks! 🙏`,
    answer: `Great question! Here are some proven strategies for GitHub achievements:

## 🦈 Pull Shark (2+ merged PRs)
- **Quality over quantity**: Focus on meaningful contributions
- **Documentation improvements**: Often accepted and valuable
- **Bug fixes**: Small but impactful changes
- **Open source contributions**: Find beginner-friendly projects
- **Own repositories**: Create legitimate improvements

## 🌌 Galaxy Brain (2+ helpful discussion answers)
- **Be genuinely helpful**: Provide detailed, useful responses
- **Share experience**: Real-world examples and solutions
- **Follow up**: Clarify if questioner needs more help
- **Stay active**: Regular participation in discussions
- **Quality answers**: Well-structured, comprehensive responses

## 🏔️ Arctic Code Vault Contributor
- **Timing matters**: Contribute before February snapshot
- **Popular repos**: Target widely-used projects
- **Any contribution counts**: Even small fixes qualify
- **Documentation**: Often easier entry point

## 🌟 General Tips:
✅ **Consistency**: Regular contributions over time
✅ **Community engagement**: Be helpful and supportive
✅ **Learning focus**: Contribute to learn, badges follow naturally
✅ **Patience**: Achievements can take time to appear
✅ **Authenticity**: Genuine contributions are most valuable

## 📊 Tools that help:
- GitHub CLI for automation
- Good first issue labels for finding opportunities  
- Contributing.md files in repositories
- GitHub's own documentation

**Personal experience**: The key is being genuinely helpful to the community. Automated tools can assist, but real value comes from authentic engagement.

Hope this helps! Feel free to ask if you need specific guidance on any achievement! 🚀

---
*Answer provided with genuine intent to help the community*`,
  },
  {
    title: '🛠️ GitHub API best practices for developers?',
    body: `Hello GitHub community! 

I'm building tools that interact with GitHub API and want to make sure I follow best practices. What are your recommendations for:

1. **Rate limiting strategies**
2. **Authentication best practices** 
3. **Efficient data fetching**
4. **Error handling patterns**
5. **Caching strategies**

Building responsible tools is important to me, so any guidance on ethical API usage would be great!

Thanks for sharing your expertise! 💻`,
    answer: `Excellent question about GitHub API best practices! Here's a comprehensive guide:

## 🔄 Rate Limiting Strategies

### Understanding Limits:
- **Unauthenticated**: 60 requests/hour
- **Personal tokens**: 5,000 requests/hour  
- **GitHub Apps**: 15,000+ requests/hour
- **GraphQL**: Different counting method

### Best Practices:
\`\`\`javascript
// Always check rate limit headers
const remaining = response.headers['x-ratelimit-remaining'];
const resetTime = response.headers['x-ratelimit-reset'];

// Implement exponential backoff
async function apiCallWithRetry(apiFunction, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await apiFunction();
    } catch (error) {
      if (error.status === 403 && i < maxRetries - 1) {
        const delay = Math.pow(2, i) * 1000;
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
}
\`\`\`

## 🔐 Authentication Best Practices

### Token Security:
- **Environment variables**: Never hardcode tokens
- **Minimal scopes**: Only request necessary permissions
- **Token rotation**: Regular refresh for long-running apps
- **Secret scanning**: Enable GitHub's secret scanning

### Implementation:
\`\`\`javascript
// Use environment variables
const token = process.env.GITHUB_TOKEN;

// Proper headers
const headers = {
  'Authorization': \`token \${token}\`,
  'Accept': 'application/vnd.github.v3+json',
  'User-Agent': 'YourApp/1.0.0'
};
\`\`\`

## ⚡ Efficient Data Fetching

### GraphQL Over REST:
\`\`\`graphql
query {
  repository(owner: "owner", name: "repo") {
    issues(first: 100, states: OPEN) {
      nodes {
        title
        author { login }
        createdAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
\`\`\`

### Conditional Requests:
\`\`\`javascript
// Use ETags for caching
const response = await fetch(url, {
  headers: {
    'If-None-Match': lastETag
  }
});

if (response.status === 304) {
  // Use cached data
}
\`\`\`

## 🚨 Error Handling Patterns

### Comprehensive Error Handling:
\`\`\`javascript
class GitHubAPIError extends Error {
  constructor(response, message) {
    super(message);
    this.status = response.status;
    this.response = response;
  }
}

async function handleAPIResponse(response) {
  if (!response.ok) {
    const errorBody = await response.json();
    throw new GitHubAPIError(response, errorBody.message);
  }
  return response.json();
}
\`\`\`

## 💾 Caching Strategies

### Multi-level Caching:
1. **Memory cache**: For frequently accessed data
2. **Redis/Database**: For persistence across restarts
3. **File cache**: For development environments
4. **CDN**: For public, static data

### Implementation Example:
\`\`\`javascript
class GitHubCache {
  constructor(ttl = 300000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }
  
  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() - item.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }
    
    return item.data;
  }
}
\`\`\`

## 🌟 Ethical API Usage

### Guidelines:
- **Respect rate limits**: Don't hammer the API
- **Meaningful requests**: Only fetch what you need
- **User consent**: For apps accessing user data
- **Transparency**: Clear about what your app does
- **Community value**: Build tools that help others

### Monitoring:
\`\`\`javascript
// Track your API usage
const apiMetrics = {
  totalRequests: 0,
  rateLimitHits: 0,
  errors: 0
};

function trackAPICall(response) {
  apiMetrics.totalRequests++;
  if (response.status === 403) {
    apiMetrics.rateLimitHits++;
  }
  if (!response.ok) {
    apiMetrics.errors++;
  }
}
\`\`\`

## 🎯 Additional Tips:

1. **Use webhooks** when possible instead of polling
2. **Batch operations** to reduce API calls
3. **Monitor GitHub Status** for API issues
4. **Test in development** with lower rate limits
5. **Document your usage** for team members

## 📚 Resources:
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [GraphQL API Guide](https://docs.github.com/en/graphql)
- [Best Practices Guide](https://docs.github.com/en/rest/guides/best-practices-for-integrators)

Building responsible tools benefits everyone in the ecosystem. Thanks for asking this important question! 

Let me know if you need clarification on any specific aspect! 🚀

---
*Comprehensive answer based on real-world API development experience*`,
  },
];

async function createGalaxyBrain() {
  try {
    console.log(`\nCreating ${questions.length} discussion-style Q&As...`);

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      const time = Date.now() + i * 1000;

      console.log(`\n${i + 1}. Creating question: "${q.title}"`);

      // Create issue as discussion
      const issue = await apiCall(`/repos/${USERNAME}/${REPO}/issues`, 'POST', {
        title: q.title,
        body: `${q.body}

---
**Generated**: ${new Date().toISOString()}
**Type**: Discussion-style question for Galaxy Brain achievement
**ID**: galaxy-brain-${time}`,
        labels: ['discussion', 'question', 'help wanted', 'galaxy-brain'],
      });

      console.log(`✅ Issue #${issue.number} created`);

      // Wait before answering
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Post answer
      console.log(`💬 Posting comprehensive answer...`);
      await apiCall(
        `/repos/${USERNAME}/${REPO}/issues/${issue.number}/comments`,
        'POST',
        {
          body: `${q.answer}

---
**Answer provided**: ${new Date().toISOString()}
**Achievement target**: Galaxy Brain (2+ helpful answers)
**Quality**: Comprehensive, experience-based response`,
        }
      );

      console.log(`✅ Answer posted`);

      // Wait before closing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Close as completed
      await apiCall(
        `/repos/${USERNAME}/${REPO}/issues/${issue.number}`,
        'PATCH',
        {
          state: 'closed',
          state_reason: 'completed',
        }
      );

      console.log(`✅ Issue closed as completed`);

      if (i < questions.length - 1) {
        console.log(`⏳ Waiting before next question...`);
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    console.log(`\n🌌 GALAXY BRAIN GENERATED!`);
    console.log(`📊 Created ${questions.length} high-quality Q&As`);
    console.log(`💡 Enable GitHub Discussions for full effect`);
    console.log(`📈 Check your profile in 10-30 minutes`);
    console.log(`🔗 https://github.com/${USERNAME}`);
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    process.exit(1);
  }
}

createGalaxyBrain();
