import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // GitHub Configuration
  GITHUB_TOKEN: process.env.GITHUB_TOKEN || '',
  GITHUB_USERNAME: process.env.GITHUB_USERNAME || '',
  
  // Achievement Settings
  AUTO_MODE: process.env.AUTO_MODE === 'true',
  DELAY_BETWEEN_ACTIONS: parseInt(process.env.DELAY_BETWEEN_ACTIONS || '5000'),
  MAX_DAILY_ACTIONS: parseInt(process.env.MAX_DAILY_ACTIONS || '50'),
  
  // Pull Shark Configuration
  PULL_SHARK_TARGET_REPO: process.env.PULL_SHARK_TARGET_REPO || '',
  PULL_SHARK_BRANCH_PREFIX: process.env.PULL_SHARK_BRANCH_PREFIX || 'achievement-pr-',
  
  // Galaxy Brain Configuration
  DISCUSSIONS_REPO: process.env.DISCUSSIONS_REPO || '',
  AUTO_ANSWER_DISCUSSIONS: process.env.AUTO_ANSWER_DISCUSSIONS === 'true',
  
  // Arctic Code Vault Configuration
  ARCTIC_REPOS: JSON.parse(process.env.ARCTIC_REPOS || '["microsoft/vscode", "facebook/react", "nodejs/node"]'),
  
  // Starstruck Configuration
  TARGET_STARS: parseInt(process.env.TARGET_STARS || '16'),
  USE_BOT_ACCOUNTS: process.env.USE_BOT_ACCOUNTS === 'true',
  
  // Safety Settings
  DRY_RUN: process.env.DRY_RUN === 'true',
  VERBOSE_LOGGING: process.env.VERBOSE_LOGGING === 'true',
  
  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/github-achievements',
  
  // Server
  PORT: parseInt(process.env.PORT || '3000'),
  NODE_ENV: process.env.NODE_ENV || 'development'
};