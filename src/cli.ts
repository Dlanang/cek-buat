#!/usr/bin/env node

import figlet from 'figlet';
import gradient from 'gradient-string';
import inquirer from 'inquirer';
import boxen from 'boxen';
import { PullSharkGenerator } from './generators/pullShark';
import { GalaxyBrainGenerator } from './generators/galaxyBrain';
import { config } from './config';

const sleep = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms));

async function showWelcome() {
  console.clear();
  
  const title = figlet.textSync('GitHub\nAchievement\nGenerator', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default'
  });
  
  console.log(gradient.pastel.multiline(title));
  
  await sleep(1000);
  
  const welcomeBox = boxen(
    `🦈 Pull Shark Generator
🌌 Galaxy Brain Generator  
🏔️ Arctic Code Vault Generator
🌟 Starstruck Generator
💎 YOLO Generator
🎊 Quickdraw Generator
❤️ Heart On Your Sleeve Generator
🔋 Pair Extraordinaire Generator

Automated GitHub Achievement Unlocking Tool
Created by: Dlanang`,
    {
      title: '🏆 GitHub Achievements',
      titleAlignment: 'center',
      padding: 1,
      margin: 1,
      borderStyle: 'round',
      borderColor: 'cyan'
    }
  );
  
  console.log(welcomeBox);
  await sleep(500);
}

async function checkConfiguration() {
  const issues: string[] = [];
  
  if (!config.GITHUB_TOKEN) {
    issues.push('❌ GITHUB_TOKEN not set');
  }
  
  if (!config.GITHUB_USERNAME) {
    issues.push('❌ GITHUB_USERNAME not set');
  }
  
  if (issues.length > 0) {
    console.log('\n🔧 Configuration Issues:\n');
    issues.forEach(issue => console.log(issue));
    console.log('\n💡 Please check your .env file and set required variables.');
    process.exit(1);
  }
  
  console.log('✅ Configuration looks good!\n');
}

async function showMainMenu() {
  const choices = [
    { name: '🦈 Generate Pull Shark Achievement (2 PRs)', value: 'pull-shark' },
    { name: '🌌 Generate Galaxy Brain Achievement (Discussion answers)', value: 'galaxy-brain' },
    { name: '🏔️ Generate Arctic Code Vault (Contribute to archived repos)', value: 'arctic-vault' },
    { name: '🌟 Generate Starstruck (16+ stars)', value: 'starstruck' },
    { name: '🚀 Generate ALL Achievements', value: 'all' },
    { name: '📊 Check Current Achievement Progress', value: 'check' },
    { name: '⚙️ Configure Settings', value: 'config' },
    { name: '❌ Exit', value: 'exit' }
  ];
  
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices
    }
  ]);
  
  return action;
}

async function executeAction(action: string) {
  switch (action) {
    case 'pull-shark':
      const pullShark = new PullSharkGenerator();
      await pullShark.generate();
      break;
      
    case 'galaxy-brain':
      const galaxyBrain = new GalaxyBrainGenerator();
      await galaxyBrain.generate();
      break;
      
    case 'arctic-vault':
      console.log('🏔️ Arctic Code Vault generator coming soon...');
      break;
      
    case 'starstruck':
      console.log('🌟 Starstruck generator coming soon...');
      break;
      
    case 'all':
      console.log('🚀 Generating all achievements...');
      await executeAction('pull-shark');
      await sleep(2000);
      await executeAction('galaxy-brain');
      break;
      
    case 'check':
      console.log('📊 Checking achievement progress...');
      // Implementation for checking current achievements
      break;
      
    case 'config':
      console.log('⚙️ Configuration options coming soon...');
      break;
      
    case 'exit':
      console.log('\n👋 Thanks for using GitHub Achievement Generator!');
      console.log('🌟 Don\'t forget to star the repo: https://github.com/Dlanang/cek-buat');
      process.exit(0);
      
    default:
      console.log('Unknown action');
  }
}

async function main() {
  try {
    await showWelcome();
    await checkConfiguration();
    
    // Main loop
    while (true) {
      const action = await showMainMenu();
      await executeAction(action);
      
      if (action !== 'exit') {
        await sleep(2000);
        
        const { continue: continueApp } = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'continue',
            message: 'Continue using the generator?',
            default: true
          }
        ]);
        
        if (!continueApp) break;
      }
    }
    
  } catch (error) {
    console.error('❌ An error occurred:', error);
    process.exit(1);
  }
}

// Run if this file is executed directly
if (require.main === module) {
  main();
}

export { main };