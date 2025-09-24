#!/usr/bin/env node

// Quickdraw Achievement Generator - Close issue/PR in 5 minutes
// Quickdraw = Fast response time

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

console.log('🎊 QUICKDRAW ACHIEVEMENT GENERATOR');
console.log('===================================');
console.log('Target: Close issue/PR within 5 minutes');

function apiCall(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: path,
      method: method,
      headers: {
        Authorization: `token ${TOKEN}`,
        'User-Agent': 'QuickdrawBot',
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

async function createQuickdraw() {
  try {
    const time = Date.now();
    const startTime = new Date();

    console.log(
      `\n⏰ Quickdraw started at: ${startTime.toLocaleTimeString('id-ID')}`
    );
    console.log(`🎯 Target: Close within 5 minutes for Quickdraw badge`);

    console.log(`\n1. Creating quick issue for immediate resolution...`);

    const issue = await apiCall(`/repos/${USERNAME}/${REPO}/issues`, 'POST', {
      title: `🎊 Quickdraw Challenge #${time}`,
      body: `# 🎊 Quickdraw Achievement Challenge

**Created at**: ${startTime.toISOString()}
**Challenge**: Close this issue within 5 minutes for Quickdraw achievement!

## Quick Resolution Needed:
This is a demonstration issue for the **Quickdraw** achievement. The challenge is to respond and close this issue as quickly as possible.

## What makes this Quickdraw-worthy:
✅ **Quick identification**: Obvious what needs to be done  
✅ **Fast resolution**: Simple fix or explanation  
✅ **Immediate action**: No delays, quick response  
✅ **Achievement target**: Close within 5 minutes  

## Expected Resolution:
This issue will be immediately resolved with a quick comment explaining the Quickdraw achievement and then closed.

---
**Timer started**: ${startTime.toLocaleTimeString('id-ID')}  
**Target**: Close before ${new Date(startTime.getTime() + 5 * 60 * 1000).toLocaleTimeString('id-ID')}  
**Achievement**: Quickdraw 🎊

*Let's see how quick we can be!* ⚡`,
      labels: ['quickdraw', 'challenge', 'achievement', 'urgent'],
    });

    console.log(
      `✅ Issue #${issue.number} created at ${new Date().toLocaleTimeString('id-ID')}`
    );
    console.log(`🔗 ${issue.html_url}`);

    console.log(`\n2. Quick response time - commenting immediately...`);

    // Quick response (within seconds!)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const responseTime = new Date();
    await apiCall(
      `/repos/${USERNAME}/${REPO}/issues/${issue.number}/comments`,
      'POST',
      {
        body: `# ⚡ QUICKDRAW RESPONSE!

**Response time**: ${((responseTime - startTime) / 1000).toFixed(2)} seconds! 🎊

## Issue Resolution:
This was a **Quickdraw demonstration issue** to unlock the Quickdraw achievement. 

### What was accomplished:
✅ **Issue created**: ${startTime.toLocaleTimeString('id-ID')}  
✅ **Quick response**: ${responseTime.toLocaleTimeString('id-ID')}  
✅ **Resolution time**: Under 1 minute (way under 5 minute target!)  
✅ **Achievement target**: Quickdraw badge 🎊  

### Quickdraw Achievement Requirements:
- Close an issue or PR within **5 minutes** of creation
- Show quick problem-solving skills  
- Demonstrate fast response time
- **This qualifies!** ⚡

## Resolution:
Issue resolved successfully! This was created specifically for achievement demonstration and has been handled appropriately.

**Closing as completed** - Quickdraw challenge successful! 🎉

---
**Total response time**: ${((responseTime - startTime) / 1000).toFixed(2)} seconds  
**Achievement**: Quickdraw 🎊 **UNLOCKED!**  
**Status**: ⚡ LIGHTNING FAST! ⚡`,
      }
    );

    console.log(`✅ Lightning response posted!`);
    console.log(
      `⚡ Response time: ${((responseTime - startTime) / 1000).toFixed(2)} seconds`
    );

    console.log(`\n3. Quickdraw close (within 5 minutes)...`);

    // Close immediately - that's quickdraw!
    await new Promise(resolve => setTimeout(resolve, 1000));

    const closeTime = new Date();
    await apiCall(
      `/repos/${USERNAME}/${REPO}/issues/${issue.number}`,
      'PATCH',
      {
        state: 'closed',
        state_reason: 'completed',
      }
    );

    const totalTime = (closeTime - startTime) / 1000;

    console.log(`✅ Issue closed at ${closeTime.toLocaleTimeString('id-ID')}`);
    console.log(`⚡ Total time: ${totalTime.toFixed(2)} seconds`);
    console.log(`🎯 Target was 5 minutes (300 seconds)`);
    console.log(
      `🏆 Achievement: ${totalTime < 300 ? 'QUICKDRAW UNLOCKED!' : 'Too slow for Quickdraw'}`
    );

    if (totalTime < 300) {
      console.log(`\n🎊 QUICKDRAW ACHIEVEMENT GENERATED!`);
      console.log(`⚡ Lightning fast response: ${totalTime.toFixed(2)}s`);
      console.log(`🏆 Way under 5-minute target!`);
      console.log(`📈 Check your profile for Quickdraw badge`);
      console.log(`🔗 https://github.com/${USERNAME}`);
    }
  } catch (error) {
    console.error(`\n❌ Quickdraw ERROR: ${error.message}`);
    process.exit(1);
  }
}

createQuickdraw();
