#!/usr/bin/env node

// Simple & Classic Pull Shark Generator
// Langsung jalan tanpa ribet!

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

console.log('🦈 PULL SHARK GENERATOR KLASIK');
console.log('================================');

function apiCall(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'PullSharkBot',
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

async function createPullShark() {
  try {
    const time = Date.now();
    const branchName = `pull-shark-${time}`;

    console.log(`\n1. Getting main branch...`);
    const main = await apiCall(`/repos/${USERNAME}/${REPO}/branches/main`);
    console.log(`✅ Main branch SHA: ${main.commit.sha.substring(0, 7)}`);

    console.log(`\n2. Creating branch: ${branchName}`);
    await apiCall(`/repos/${USERNAME}/${REPO}/git/refs`, 'POST', {
      ref: `refs/heads/${branchName}`,
      sha: main.commit.sha,
    });
    console.log(`✅ Branch created!`);

    console.log(`\n3. Adding file...`);
    const fileContent = `# Pull Shark Achievement #${time}

🦈 Classic Pull Shark Generator berhasil jalan!

Generated: ${new Date().toISOString()}
Method: Simple & Direct API calls
Target: Pull Shark Achievement (2+ merged PRs)

## Stats:
- Time: ${time}
- Branch: ${branchName}  
- User: ${USERNAME}
- Repo: ${REPO}

Ini adalah kontribusi legitimate untuk unlock Pull Shark! 🚀

---
*Classic GitHub Achievement Generator*
`;

    await apiCall(
      `/repos/${USERNAME}/${REPO}/contents/pull-sharks/shark-${time}.md`,
      'PUT',
      {
        message: `🦈 Add Pull Shark achievement file ${time}`,
        content: Buffer.from(fileContent).toString('base64'),
        branch: branchName,
      }
    );
    console.log(`✅ File added!`);

    console.log(`\n4. Creating Pull Request...`);
    const pr = await apiCall(`/repos/${USERNAME}/${REPO}/pulls`, 'POST', {
      title: `🦈 Pull Shark Achievement #${time}`,
      head: branchName,
      base: 'main',
      body: `Auto-generated PR untuk Pull Shark achievement! 🦈

## What's this?
- Menambahkan file documentation achievement
- Legitimate contribution untuk GitHub badge
- Classic method - simple & works!

## Achievement Progress:
- Target: Pull Shark (2+ merged PRs)
- Method: Automated but meaningful
- Generated: ${new Date().toLocaleString('id-ID')}

Safe to merge! ✅`,
    });

    console.log(`✅ PR created: #${pr.number}`);
    console.log(`🔗 ${pr.html_url}`);

    console.log(`\n5. Auto-merging PR...`);
    await new Promise(resolve => setTimeout(resolve, 3000));

    try {
      await apiCall(
        `/repos/${USERNAME}/${REPO}/pulls/${pr.number}/merge`,
        'PUT',
        {
          commit_title: `🦈 Merge Pull Shark achievement #${time}`,
          merge_method: 'merge',
        }
      );
      console.log(`✅ PR merged successfully!`);
    } catch (e) {
      console.log(`⚠️ Auto-merge failed: ${e.message}`);
      console.log(`💡 Please merge manually: ${pr.html_url}`);
    }

    console.log(`\n🎉 PULL SHARK GENERATED!`);
    console.log(`📈 Check your profile in 10-30 minutes`);
    console.log(`🔗 https://github.com/${USERNAME}`);
  } catch (error) {
    console.error(`\n❌ ERROR: ${error.message}`);
    process.exit(1);
  }
}

createPullShark();
