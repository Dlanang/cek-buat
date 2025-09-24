#!/usr/bin/env node

// Pair Extraordinaire Achievement - Co-authored commit
// Show collaboration through co-authored commits

const https = require('https');

const TOKEN = process.env.GITHUB_TOKEN || '';
const USERNAME = process.env.GITHUB_USERNAME || 'Dlanang';
const REPO = 'cek-buat';

// Security validation
if (!TOKEN) {
  console.error('❌ GITHUB_TOKEN environment variable is required!');
  console.error(
    '💡 Set it in your.env file or run: export GITHUB_TOKEN=your_token_here'
  );
  console.error('🔗 Get token at: https://github.com/settings/tokens');
  process.exit(1);
}

if (TOKEN === 'your_token_here' || TOKEN === 'your_github_token_here') {
  console.error('❌ Please set a real GitHub token, not the placeholder!');
  console.error('🔗 Get token at: https://github.com/settings/tokens');
  process.exit(1);
}

console.log('🔋 PAIR EXTRAORDINAIRE GENERATOR');
console.log('=================================');
console.log('Target: Co-authored commit with another user');

function apiCall(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'PairBot',
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

async function createPairExtraordinaire() {
  try {
    const time = Date.now();
    const branchName = `pair-extraordinaire-${time}`;

    console.log(`\n1. Getting main branch...`);
    const main = await apiCall(`/repos/${USERNAME}/${REPO}/branches/main`);
    console.log(`✅ Main branch SHA: ${main.commit.sha.substring(0, 7)}`);

    console.log(`\n2. Creating collaboration branch: ${branchName}`);
    await apiCall(`/repos/${USERNAME}/${REPO}/git/refs`, 'POST', {
      ref: `refs/heads/${branchName}`,
      sha: main.commit.sha,
    });
    console.log(`✅ Collaboration branch created!`);

    console.log(`\n3. Creating pair programming content...`);
    const fileContent = `# 🔋 Pair Extraordinaire Achievement

## Collaboration in Code! 

This file demonstrates the **Pair Extraordinaire** achievement through collaborative development.

**Generated**: ${new Date().toISOString()}
**Method**: Co-authored commit
**Branch**: ${branchName}

## What is Pair Programming?

Pair programming is a collaborative software development technique where two programmers work together on the same code:

### Roles in Pair Programming:
🚗 **Driver**: Types the code, focuses on implementation  
🗺️ **Navigator**: Reviews code, thinks about direction  

### Benefits of Pair Programming:
✅ **Code Quality**: Two sets of eyes catch more bugs  
✅ **Knowledge Sharing**: Learn from each other  
✅ **Faster Problem Solving**: Two minds are better than one  
✅ **Team Building**: Stronger collaboration  
✅ **Achievement Unlocking**: Pair Extraordinaire badge! 🔋  

## Collaboration Techniques:
- **Mob Programming**: More than two developers
- **Remote Pairing**: Using screen sharing tools  
- **Async Collaboration**: Co-authored commits
- **Code Reviews**: Collaborative feedback

## This Achievement:
This file was created as part of the **Pair Extraordinaire** achievement, demonstrating:
- Collaborative development practices
- Co-authored commit structure  
- Team programming concepts
- GitHub collaboration features

---
**Collaboration Style**: Co-authored commit  
**Achievement**: Pair Extraordinaire 🔋  
**Timestamp**: ${time}  

*Better together than apart!* 🤝
`;

    await apiCall(
      `/repos/${USERNAME}/${REPO}/contents/achievements/pair-extraordinaire-${time}.md`,
      'PUT',
      {
        message: `🔋 Pair Extraordinaire: Collaborative development file

Co-authored-by: GitHub Achievement Bot <achievement-bot@github.com>
Co-authored-by: Pair Programming Partner <pair-partner@example.com>`,
        content: Buffer.from(fileContent).toString('base64'),
        branch: branchName,
      }
    );
    console.log(`✅ Pair programming file added!`);

    console.log(`\n4. Creating collaborative Pull Request...`);
    const pr = await apiCall(`/repos/${USERNAME}/${REPO}/pulls`, 'POST', {
      title: `🔋 Pair Extraordinaire - Collaborative Achievement ${time}`,
      head: branchName,
      base: 'main',
      body: `# 🔋 Pair Extraordinaire Achievement PR

## Collaborative Development Demonstration

This PR showcases the **Pair Extraordinaire** achievement through collaborative development practices.

### What's Included:
✅ **Co-authored commit**: Multiple contributors listed  
✅ **Pair programming content**: Documentation about collaboration  
✅ **Team development**: Simulated pair programming session  
✅ **Achievement target**: Pair Extraordinaire badge 🔋  

### Collaboration Details:
- **Primary Developer**: ${USERNAME}
- **Co-authors**: GitHub Achievement Bot, Pair Programming Partner  
- **Method**: Co-authored commit message
- **Focus**: Demonstrating collaborative development

### Pair Programming Benefits Demonstrated:
🤝 **Teamwork**: Multiple contributors on single commit  
💡 **Knowledge Sharing**: Documented best practices  
🔍 **Code Review**: Collaborative approach to development  
🎯 **Achievement Unlocking**: Pair Extraordinaire badge  

### Commit Message Structure:
\`\`\`
🔋 Pair Extraordinaire: Collaborative development file

Co-authored-by: GitHub Achievement Bot <achievement-bot@github.com>
Co-authored-by: Pair Programming Partner <pair-partner@example.com>
\`\`\`

This demonstrates the proper format for co-authored commits in GitHub!

---
**Collaboration Type**: Pair Programming Simulation  
**Generated**: ${new Date().toLocaleString('id-ID')}  
**Achievement**: Pair Extraordinaire 🔋`,
    });

    console.log(`✅ Collaborative PR created: #${pr.number}`);
    console.log(`🔗 ${pr.html_url}`);

    console.log(`\n5. Merging collaborative work...`);
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      await apiCall(
        `/repos/${USERNAME}/${REPO}/pulls/${pr.number}/merge`,
        'PUT',
        {
          commit_title: `🔋 Merge Pair Extraordinaire collaboration ${time}`,
          commit_message: `Collaborative achievement demonstration

Co-authored-by: GitHub Achievement Bot <achievement-bot@github.com>
Co-authored-by: Pair Programming Partner <pair-partner@example.com>

This merge demonstrates collaborative development for the Pair Extraordinaire achievement.`,
          merge_method: 'merge',
        }
      );
      console.log(`✅ Collaborative work merged!`);
    } catch (e) {
      console.log(`⚠️ Merge failed: ${e.message}`);
      console.log(`💡 Manual merge needed: ${pr.html_url}`);
    }

    console.log(`\n🔋 PAIR EXTRAORDINAIRE ACHIEVEMENT GENERATED!`);
    console.log(`🤝 Co-authored commit created`);
    console.log(`💻 Collaborative development demonstrated`);
    console.log(`🎯 Pair programming concepts documented`);
    console.log(`📈 Check your profile for Pair Extraordinaire badge`);
    console.log(`🔗 https://github.com/${USERNAME}`);
  } catch (error) {
    console.error(`\n❌ Pair ERROR: ${error.message}`);
    process.exit(1);
  }
}

createPairExtraordinaire();
