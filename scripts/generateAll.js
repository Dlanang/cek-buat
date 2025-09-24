#!/usr/bin/env node

/**
 * GitHub Achievement Generator - Master Script
 * Runs all achievement generators in sequence
 */

const { spawn } = require('child_process');
const path = require('path');

const achievements = [
  {
    name: '🦈 Pull Shark',
    script: 'pullShark.js',
    description: 'Generate 2+ merged pull requests',
    requirement: '2 merged PRs'
  },
  {
    name: '🌌 Galaxy Brain',
    script: 'galaxyBrain.js',
    description: 'Create helpful discussion answers',
    requirement: '2 accepted answers'
  }
];

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      env: process.env
    });

    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${scriptName} exited with code ${code}`));
      }
    });

    child.on('error', reject);
  });
}

async function generateAllAchievements() {
  console.log('🚀 GitHub Achievement Generator - Master Script');
  console.log('=' .repeat(50));
  console.log();
  
  // Check configuration
  if (!process.env.GITHUB_TOKEN) {
    console.error('❌ GITHUB_TOKEN environment variable is required!');
    console.error('💡 Create a Personal Access Token at: https://github.com/settings/tokens');
    console.error('💡 Set it with: export GITHUB_TOKEN=your_token_here');
    process.exit(1);
  }
  
  if (!process.env.GITHUB_USERNAME) {
    console.error('❌ GITHUB_USERNAME environment variable is required!');
    console.error('💡 Set it with: export GITHUB_USERNAME=your_username');
    process.exit(1);
  }
  
  console.log('✅ Configuration check passed');
  console.log(`👤 GitHub User: ${process.env.GITHUB_USERNAME}`);
  console.log(`🔑 Token: ${process.env.GITHUB_TOKEN.substring(0, 8)}...`);
  console.log();
  
  // Show available achievements
  console.log('🏆 Available Achievements:');
  achievements.forEach((achievement, index) => {
    console.log(`${index + 1}. ${achievement.name}`);
    console.log(`   📝 ${achievement.description}`);
    console.log(`   📋 Requirement: ${achievement.requirement}`);
    console.log();
  });
  
  // Run each achievement generator
  for (let i = 0; i < achievements.length; i++) {
    const achievement = achievements[i];
    
    console.log(`🎯 Generating ${achievement.name}...`);
    console.log('=' .repeat(40));
    
    try {
      await runScript(achievement.script);
      console.log(`✅ ${achievement.name} generation completed!`);
      
      if (i < achievements.length - 1) {
        console.log('\n⏳ Waiting 10 seconds before next achievement...');
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
      
    } catch (error) {
      console.error(`❌ Failed to generate ${achievement.name}:`, error.message);
      console.log('⏭️ Continuing with next achievement...');
    }
    
    console.log();
  }
  
  console.log('🎉 All achievement generators completed!');
  console.log();
  console.log('📊 Summary:');
  console.log('- 🦈 Pull Shark: 2+ PRs created and merged');
  console.log('- 🌌 Galaxy Brain: Discussion Q&As created');
  console.log();
  console.log('💡 Next steps:');
  console.log('1. Wait 10-30 minutes for GitHub to process');
  console.log('2. Check your profile for new badges');
  console.log('3. Enable GitHub Discussions for Galaxy Brain');
  console.log('4. Engage with the community genuinely');
  console.log();
  console.log(`🔗 Check your profile: https://github.com/${process.env.GITHUB_USERNAME}`);
  console.log('🌟 Don\'t forget to star this repo for more tools!');
}

// Sleep function
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

generateAllAchievements()
  .then(() => {
    console.log('\n🏆 Master achievement generation completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Master generation failed:', error.message);
    process.exit(1);
  });