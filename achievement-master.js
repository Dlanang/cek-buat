#!/usr/bin/env node

// Master Achievement Generator - Run All Achievements
// Complete GitHub badge collection!

console.log(`
🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆
🏆                                                    🏆
🏆        GITHUB ACHIEVEMENT MASTER GENERATOR        🏆  
🏆                                                    🏆
🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆

🎯 Target: ALL GitHub Achievement Badges!
⚡ Method: Classic & Direct API Calls
🚀 Status: Ready to unlock everything!
`);

const { spawn } = require('child_process');
const fs = require('fs');

const achievements = [
  {
    name: '🦈 Pull Shark',
    file: 'classic-pull-shark.js',
    description: '2+ merged pull requests',
    time: 30,
  },
  {
    name: '🌌 Galaxy Brain',
    file: 'classic-galaxy-brain.js',
    description: '2+ helpful discussion answers',
    time: 45,
  },
  {
    name: '💎 YOLO',
    file: 'classic-yolo.js',
    description: 'Merge PR without review',
    time: 15,
  },
  {
    name: '🎊 Quickdraw',
    file: 'classic-quickdraw.js',
    description: 'Close issue/PR within 5 minutes',
    time: 10,
  },
  {
    name: '❤️ Heart On Your Sleeve',
    file: 'classic-heart.js',
    description: 'React with heart emoji',
    time: 20,
  },
  {
    name: '🔋 Pair Extraordinaire',
    file: 'classic-pair.js',
    description: 'Co-authored commit',
    time: 25,
  },
];

function runGenerator(file) {
  return new Promise((resolve, reject) => {
    console.log(`\n▶️ Running ${file}...`);

    if (!fs.existsSync(file)) {
      reject(new Error(`File ${file} not found`));
      return;
    }

    const child = spawn('node', [file], {
      stdio: 'inherit',
    });

    child.on('exit', code => {
      if (code === 0) {
        console.log(`✅ ${file} completed successfully!`);
        resolve();
      } else {
        console.log(`⚠️ ${file} exited with code ${code}`);
        resolve(); // Continue with other generators
      }
    });

    child.on('error', error => {
      console.log(`❌ Error running ${file}: ${error.message}`);
      resolve(); // Continue with other generators
    });
  });
}

async function generateAllAchievements() {
  const startTime = new Date();

  console.log('📋 ACHIEVEMENT CHECKLIST:');
  achievements.forEach((achievement, index) => {
    console.log(`${index + 1}. ${achievement.name}`);
    console.log(`   📝 ${achievement.description}`);
    console.log(`   ⏱️ Estimated time: ${achievement.time}s`);
    console.log();
  });

  const totalEstimatedTime = achievements.reduce((sum, a) => sum + a.time, 0);
  console.log(`⏱️ Total estimated time: ${totalEstimatedTime} seconds`);
  console.log(`🎯 Target: ${achievements.length} achievement badges`);
  console.log();

  console.log('🚀 Starting achievement generation marathon...');
  console.log('='.repeat(60));

  let completed = 0;
  let failed = 0;

  for (let i = 0; i < achievements.length; i++) {
    const achievement = achievements[i];

    console.log(
      `\n🎯 [${i + 1}/${achievements.length}] Generating ${achievement.name}...`
    );
    console.log(`📝 Target: ${achievement.description}`);
    console.log('─'.repeat(50));

    try {
      await runGenerator(achievement.file);
      completed++;
      console.log(`✅ ${achievement.name} COMPLETED!`);

      if (i < achievements.length - 1) {
        console.log(
          `\n⏳ Cooling down for 10 seconds before next achievement...`
        );
        await new Promise(resolve => setTimeout(resolve, 10000));
      }
    } catch (error) {
      failed++;
      console.log(`❌ ${achievement.name} FAILED: ${error.message}`);
      console.log(`⏭️ Continuing with next achievement...`);
    }
  }

  const endTime = new Date();
  const totalTime = Math.floor((endTime - startTime) / 1000);

  console.log('\n' + '🏆'.repeat(60));
  console.log('🎉 ACHIEVEMENT GENERATION MARATHON COMPLETED!');
  console.log('🏆'.repeat(60));

  console.log(`\n📊 FINAL RESULTS:`);
  console.log(`✅ Completed: ${completed}/${achievements.length} achievements`);
  console.log(`❌ Failed: ${failed}/${achievements.length} attempts`);
  console.log(`⏱️ Total time: ${totalTime} seconds`);
  console.log(
    `📈 Success rate: ${Math.round((completed / achievements.length) * 100)}%`
  );

  console.log(`\n🏆 ACHIEVEMENTS GENERATED:`);
  achievements.forEach((achievement, index) => {
    const status = index < completed ? '✅' : '❌';
    console.log(`${status} ${achievement.name} - ${achievement.description}`);
  });

  console.log(`\n⏰ TIMELINE FOR BADGE APPEARANCE:`);
  console.log(`📅 Now: All activities generated and committed`);
  console.log(`🕐 10-30 minutes: GitHub processes the activities`);
  console.log(`🕕 1-24 hours: Achievement badges appear on profile`);

  console.log(`\n🔗 CHECK YOUR RESULTS:`);
  console.log(`👤 Your Profile: https://github.com/Dlanang`);
  console.log(`📂 Repository: https://github.com/Dlanang/cek-buat`);
  console.log(`📋 Pull Requests: https://github.com/Dlanang/cek-buat/pulls`);
  console.log(`💬 Issues: https://github.com/Dlanang/cek-buat/issues`);

  console.log(`\n🎊 WHAT TO EXPECT:`);
  console.log(
    `🦈 Pull Shark: ${completed >= 1 ? 'Badge should appear!' : 'Need to run Pull Shark generator'}`
  );
  console.log(
    `🌌 Galaxy Brain: ${completed >= 2 ? 'Badge should appear!' : 'Need helpful discussions'}`
  );
  console.log(
    `💎 YOLO: ${completed >= 3 ? 'Badge should appear!' : 'Need no-review merge'}`
  );
  console.log(
    `🎊 Quickdraw: ${completed >= 4 ? 'Badge should appear!' : 'Need fast issue close'}`
  );
  console.log(
    `❤️ Heart On Your Sleeve: ${completed >= 5 ? 'Badge should appear!' : 'Need heart reactions'}`
  );
  console.log(
    `🔋 Pair Extraordinaire: ${completed >= 6 ? 'Badge should appear!' : 'Need co-authored commit'}`
  );

  console.log(`\n🌟 BONUS TIPS:`);
  console.log(`🔄 Re-run individual generators if needed`);
  console.log(`💬 Enable GitHub Discussions for Galaxy Brain`);
  console.log(`⭐ Star repositories to work toward Starstruck`);
  console.log(`🏔️ Contribute to popular repos for Arctic Code Vault`);

  console.log(`\n🎉 CONGRATULATIONS!`);
  console.log(
    `You've just generated activities for ${completed} GitHub achievements!`
  );
  console.log(`Check back in a few hours to see your new badges! 🏆✨`);

  console.log(`\n🏆🏆🏆 ACHIEVEMENT MASTER COMPLETED! 🏆🏆🏆`);
}

generateAllAchievements().catch(console.error);
