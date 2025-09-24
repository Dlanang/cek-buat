#!/usr/bin/env node

// Heart On Your Sleeve Achievement - React with heart emoji
// Show your emotions with heart reactions

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

console.log('❤️ HEART ON YOUR SLEEVE GENERATOR');
console.log('==================================');
console.log('Target: React with heart emoji on issue/PR');

function apiCall(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'HeartBot',
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

async function createHeartOnSleeve() {
  try {
    const time = Date.now();

    console.log(`\n1. Creating heartwarming content...`);

    const issue = await apiCall(`/repos/${USERNAME}/${REPO}/issues`, 'POST', {
      title: `❤️ Heart On Your Sleeve Achievement - ${time}`,
      body: `# ❤️ Heart On Your Sleeve Achievement

## Spreading Love in the GitHub Community! 

This issue is created to demonstrate the **Heart On Your Sleeve** achievement - showing emotions through heart reactions! ❤️

### What makes this heartwarming:
💖 **Community spirit**: Celebrating open source contributions  
💝 **Appreciation**: Showing gratitude for helpful content  
💕 **Emotional connection**: Making GitHub more human  
💓 **Achievement unlocking**: Heart reactions for badges  

### Why Hearts Matter:
In the world of code and pull requests, sometimes we need to show that there are real humans behind the screens. A simple ❤️ reaction can:

- Show appreciation for someone's hard work
- Acknowledge a great solution  
- Express gratitude for help received
- Build community connections
- **Unlock the Heart On Your Sleeve achievement!**

### Community Love Examples:
✨ **Great documentation** → ❤️  
✨ **Helpful code review** → ❤️  
✨ **Beginner-friendly explanation** → ❤️  
✨ **Creative solution** → ❤️  
✨ **This achievement demonstration** → ❤️  

## Call to Action:
If you found this helpful or heartwarming, please react with a ❤️ emoji! Let's spread some love in the developer community!

---
**Created with ❤️**: ${new Date().toISOString()}  
**Achievement Target**: Heart On Your Sleeve ❤️  
**Message**: Code with heart, react with love! 💝

*Let's make GitHub a more loving place, one heart at a time!* ❤️✨`,
      labels: ['heart', 'community', 'achievement', 'wholesome', 'love'],
    });

    console.log(`✅ Heartwarming issue #${issue.number} created`);
    console.log(`🔗 ${issue.html_url}`);

    console.log(`\n2. Adding heart reaction to own issue...`);

    // Wait a moment then add heart reaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    // React with heart emoji
    await apiCall(
      `/repos/${USERNAME}/${REPO}/issues/${issue.number}/reactions`,
      'POST',
      {
        content: 'heart',
      }
    );

    console.log(`✅ ❤️ Heart reaction added!`);

    console.log(`\n3. Creating heartfelt comment...`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create heartfelt comment
    await apiCall(
      `/repos/${USERNAME}/${REPO}/issues/${issue.number}/comments`,
      'POST',
      {
        body: `# ❤️ Heartfelt Response!

## Achievement Update: Heart On Your Sleeve

Just demonstrated the **Heart On Your Sleeve** achievement by reacting with ❤️ to this issue!

### What happened:
✅ **Issue created**: With heartwarming, community-focused content  
✅ **Heart reaction added**: ❤️ emoji reaction applied  
✅ **Emotional expression**: Showed genuine appreciation  
✅ **Achievement target**: Heart On Your Sleeve badge  

### Why This Matters:
The **Heart On Your Sleeve** achievement encourages developers to:
- Show appreciation through reactions ❤️
- Express emotions in technical spaces
- Build warmer, more human communities
- Celebrate others' contributions with love

### Community Impact:
By using heart reactions, we:
💖 Make contributors feel appreciated  
💝 Show that code review can be loving  
💕 Build stronger community bonds  
💓 Encourage continued participation  

## Achievement Status: 
**❤️ HEART ON YOUR SLEEVE UNLOCKED!** 

---
**With love and appreciation**: ${new Date().toISOString()}  
**Achievement**: Heart On Your Sleeve ❤️  
**Community Message**: *Spread love, not just code!* 💝`,
      }
    );

    console.log(`✅ Heartfelt comment posted!`);

    console.log(`\n4. Adding heart reaction to comment too...`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get comment ID and react to it
    const comments = await apiCall(
      `/repos/${USERNAME}/${REPO}/issues/${issue.number}/comments`
    );
    if (comments.length > 0) {
      const lastComment = comments[comments.length - 1];
      await apiCall(
        `/repos/${USERNAME}/${REPO}/issues/comments/${lastComment.id}/reactions`,
        'POST',
        {
          content: 'heart',
        }
      );
      console.log(`✅ ❤️ Heart reaction added to comment too!`);
    }

    console.log(`\n5. Final heart celebration...`);

    await new Promise(resolve => setTimeout(resolve, 1000));

    await apiCall(
      `/repos/${USERNAME}/${REPO}/issues/${issue.number}/comments`,
      'POST',
      {
        body: `## ❤️❤️❤️ HEART CELEBRATION! ❤️❤️❤️

**ACHIEVEMENT UNLOCKED**: Heart On Your Sleeve! 

### Final Heart Stats:
💖 **Issue created**: With love and community spirit  
❤️ **Heart reactions**: Added to issue and comments  
💝 **Community message**: Spread love in code  
💕 **Achievement**: Heart On Your Sleeve badge earned!  

### Thank You Message:
Thank you to everyone who makes the GitHub community a warmer, more welcoming place through:
- ❤️ Heart reactions on helpful content
- 💝 Appreciative comments and reviews  
- 💖 Support for new contributors
- 💕 Building inclusive spaces

**Keep spreading the love!** ❤️✨

---
*Achievement generated with ❤️: ${new Date().toLocaleString('id-ID')}*`,
      }
    );

    console.log(`✅ Heart celebration comment posted!`);

    console.log(`\n❤️ HEART ON YOUR SLEEVE ACHIEVEMENT GENERATED!`);
    console.log(`💝 Multiple heart reactions added`);
    console.log(`💖 Heartwarming content created`);
    console.log(`💕 Community love spread`);
    console.log(`📈 Check your profile for Heart On Your Sleeve badge`);
    console.log(`🔗 https://github.com/${USERNAME}`);
  } catch (error) {
    console.error(`\n❌ Heart ERROR: ${error.message}`);
    process.exit(1);
  }
}

createHeartOnSleeve();
