#!/usr/bin/env node

// YOLO Achievement Generator - Merge PR without review
// YOLO = You Only Live Once (merge tanpa review)

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

console.log('💎 YOLO ACHIEVEMENT GENERATOR');
console.log('==============================');
console.log('Target: Merge PR without review');

function apiCall(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'YOLOBot',
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

async function createYOLO() {
  try {
    const time = Date.now();
    const branchName = `yolo-${time}`;

    console.log(`\n1. Getting main branch...`);
    const main = await apiCall(`/repos/${USERNAME}/${REPO}/branches/main`);
    console.log(`✅ Main branch SHA: ${main.commit.sha.substring(0, 7)}`);

    console.log(`\n2. Creating YOLO branch: ${branchName}`);
    await apiCall(`/repos/${USERNAME}/${REPO}/git/refs`, 'POST', {
      ref: `refs/heads/${branchName}`,
      sha: main.commit.sha,
    });
    console.log(`✅ YOLO branch created!`);

    console.log(`\n3. Adding YOLO file...`);
    const fileContent = `# 💎 YOLO Achievement - ${time}

## You Only Live Once! 

This PR demonstrates the YOLO achievement - merging without review.

**YOLO Stats:**
- Generated: ${new Date().toISOString()}
- Branch: ${branchName}
- Method: Direct merge (no review needed)
- Risk Level: YOLO! 💎

## Why YOLO?
- Quick fixes that are obviously correct
- Documentation updates  
- Configuration changes
- Small improvements
- **This achievement file!**

## YOLO Philosophy:
> Sometimes you just gotta YOLO it! 🚀
> Trust your code, trust your skills!

---
*YOLO Achievement Generator - Living dangerously! 💎*
*Timestamp: ${time}*
`;

    await apiCall(
      `/repos/${USERNAME}/${REPO}/contents/achievements/yolo-${time}.md`,
      'PUT',
      {
        message: `💎 YOLO: Add achievement file ${time}`,
        content: Buffer.from(fileContent).toString('base64'),
        branch: branchName,
      }
    );
    console.log(`✅ YOLO file added!`);

    console.log(`\n4. Creating YOLO Pull Request...`);
    const pr = await apiCall(`/repos/${USERNAME}/${REPO}/pulls`, 'POST', {
      title: `💎 YOLO Achievement - Direct Merge ${time}`,
      head: branchName,
      base: 'main',
      body: `# 💎 YOLO Achievement PR

## What's this?
Simple achievement file addition - safe to merge without review!

## Why YOLO?
- ✅ Simple documentation file
- ✅ No breaking changes
- ✅ Obviously safe
- ✅ YOLO spirit! 💎

## Achievement Target:
**YOLO Badge**: Merge PR without review

## Safety Check:
- [x] No code changes
- [x] Just documentation
- [x] Safe to merge immediately
- [x] YOLO time! 🚀

**Ready for immediate merge!**

---
*Generated: ${new Date().toLocaleString('id-ID')}*`,
    });

    console.log(`✅ YOLO PR created: #${pr.number}`);
    console.log(`🔗 ${pr.html_url}`);

    console.log(`\n5. YOLO MERGE (without review)...`);
    console.log(`💎 Living dangerously!`);

    // Immediate merge without waiting (that's the YOLO spirit!)
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      await apiCall(
        `/repos/${USERNAME}/${REPO}/pulls/${pr.number}/merge`,
        'PUT',
        {
          commit_title: `💎 YOLO Merge: Achievement ${time}`,
          merge_method: 'merge',
        }
      );
      console.log(`✅ YOLO MERGED! No review needed! 💎`);
    } catch (e) {
      console.log(`⚠️ YOLO merge failed: ${e.message}`);
      console.log(`💡 Manual YOLO merge needed: ${pr.html_url}`);
    }

    console.log(`\n🎉 YOLO ACHIEVEMENT GENERATED!`);
    console.log(`💎 You Only Live Once - Achievement unlocked!`);
    console.log(`📈 Check your profile for YOLO badge`);
    console.log(`🔗 https://github.com/${USERNAME}`);
  } catch (error) {
    console.error(`\n❌ YOLO ERROR: ${error.message}`);
    process.exit(1);
  }
}

createYOLO();
