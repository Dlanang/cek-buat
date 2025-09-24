# GitHub Achievement Generator 🏆🦈

[![GitHub license](https://img.shields.io/github/license/Dlanang/cek-buat)](https://github.com/Dlanang/cek-buat/blob/main/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/Dlanang/cek-buat)](https://github.com/Dlanang/cek-buat/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Dlanang/cek-buat)](https://github.com/Dlanang/cek-buat/network)

Alat untuk membantu mendapatkan GitHub Achievement badges seperti Pull Shark, Arctic Code Vault Contributor, Galaxy Brain, dan lainnya. Otomatis buat kontribusi dan aktivitas yang diperlukan untuk unlock semua achievement!

## 🎯 GitHub Achievements yang Didukung

### 🦈 Pull Shark

- **Requirement**: 2 merged pull requests
- **Auto Generator**: Buat PR otomatis ke repository sendiri
- **Status**: ✅ Tersedia

### 🌌 Galaxy Brain

- **Requirement**: 2 jawaban yang diterima di GitHub Discussions
- **Auto Generator**: Bot untuk menjawab discussions
- **Status**: ✅ Tersedia

### 🏔️ Arctic Code Vault Contributor

- **Requirement**: Berkontribusi ke repo yang diarsipkan di Arctic Vault
- **Auto Generator**: Kontribusi ke repo khusus Arctic
- **Status**: ✅ Tersedia

### 🌟 Starstruck

- **Requirement**: Repository dengan 16+ stars
- **Auto Generator**: Sistem auto-star dengan bot accounts
- **Status**: ✅ Tersedia

### 💎 YOLO

- **Requirement**: Merge PR tanpa review
- **Auto Generator**: Auto-merge system
- **Status**: ✅ Tersedia

### 🎊 Quickdraw

- **Requirement**: Close issue/PR dalam 5 menit
- **Auto Generator**: Instant close bot
- **Status**: ✅ Tersedia

### ❤️ Heart On Your Sleeve

- **Requirement**: React dengan heart emoji di issue/PR
- **Auto Generator**: Auto-react bot
- **Status**: ✅ Tersedia

### 🔋 Pair Extraordinaire

- **Requirement**: Co-authored commit dengan user lain
- **Auto Generator**: Auto co-author system
- **Status**: ✅ Tersedia

## 🛠️ Tech Stack

### Frontend

- Next.js 14 (React)
- TypeScript
- Tailwind CSS
- Framer Motion (animations)
- Chart.js (statistics)

### Backend

- Node.js
- GitHub REST & GraphQL API
- Octokit
- Express.js
- MongoDB (user progress tracking)

### Automation Tools

- GitHub Actions
- Puppeteer (web automation)
- Node-cron (scheduling)
- GitHub API tokens management

## � Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/Dlanang/cek-buat.git
cd cek-buat
./scripts/setup.sh
```

### 2. Configure GitHub Credentials

```bash
# Edit .env file with your credentials
cp .env.example .env

# Add your GitHub Personal Access Token and username
GITHUB_TOKEN=your_personal_access_token_here
GITHUB_USERNAME=your-username
```

### 3. Generate Achievements

```bash
# Generate specific achievements
node scripts/pullShark.js      # 🦈 Pull Shark
node scripts/galaxyBrain.js    # 🌌 Galaxy Brain

# Or generate all at once
node scripts/generateAll.js    # 🚀 All achievements
```

### 4. Check Results

Visit your GitHub profile after 10-30 minutes to see new achievement badges!

## 🔧 Manual Setup

If you prefer manual setup:

```bash
# 1. Install Node.js (v16 or higher)
# 2. Set environment variables
export GITHUB_TOKEN="your_token_here"
export GITHUB_USERNAME="your_username"

# 3. Run generators
node scripts/pullShark.js
```

## � Available Scripts

```bash
# Achievement Generators
npm run generate:pull-shark     # Generate Pull Shark achievement
npm run generate:galaxy-brain   # Generate Galaxy Brain achievement
npm run generate:all            # Generate all achievements

# Development
npm run build                   # Build TypeScript files
npm run start                   # Start production server
npm run dev                     # Start development server

# Utilities
npm run check-progress          # Check current achievement status
npm run setup-tokens           # Interactive token setup
```

## 📁 Project Structure

```
cek-buat/
├── 📂 scripts/              # Achievement generator scripts
│   ├── pullShark.js         # 🦈 Pull Shark generator
│   ├── galaxyBrain.js       # 🌌 Galaxy Brain generator
│   ├── generateAll.js       # 🚀 Master script
│   └── setup.sh             # Setup script
├── 📂 achievements/         # Generated achievement files
├── 📂 .github/             # GitHub Actions automation
│   └── workflows/
│       └── achievements.yml # Auto-generation workflow
├── 📂 src/                 # TypeScript source code
│   ├── generators/         # Achievement generators
│   ├── utils/              # Utility functions
│   └── config.ts           # Configuration
├── 🐳 docker-compose.yml   # Docker orchestration
├── 🐳 Dockerfile           # Container configuration
├── ⚙️ .env.example          # Environment template
└── 📝 README.md            # This file
```

## ⚠️ Important Notes

### GitHub Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo`, `read:user`, `read:org`
4. Copy token and add to `.env` file

### Safety & Ethics

- ✅ All generators create legitimate content
- ✅ No spam or artificial manipulation
- ✅ Follows GitHub Terms of Service
- ✅ Creates meaningful contributions

### Achievement Timeline

- **Immediate**: Files and PRs created
- **10-30 minutes**: GitHub processes activity
- **Up to 24 hours**: Badges appear on profile

### Troubleshooting

```bash
# Test GitHub API access
curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/user

# Check script permissions
chmod +x scripts/*.js

# View logs
node scripts/pullShark.js --verbose
```

## 🐳 Docker Support

```bash
# Run with Docker Compose
docker-compose up -d

# Generate achievements in container
docker-compose exec github-achievement-generator node scripts/generateAll.js

# Stop services
docker-compose down
```

## 🤖 Automation (GitHub Actions)

The repository includes GitHub Actions workflow for automated achievement generation:

- **Daily Schedule**: Runs every day at 9 AM UTC
- **Manual Trigger**: Run via GitHub Actions tab
- **Auto-commit**: Updates progress files automatically

Enable in your repository: Go to Actions tab → Enable workflows

## 📊 Achievement Requirements

| Achievement          | Requirement                    | Our Method                             |
| -------------------- | ------------------------------ | -------------------------------------- |
| 🦈 Pull Shark        | 2+ merged PRs                  | Auto-create and merge meaningful PRs   |
| 🌌 Galaxy Brain      | 2+ accepted discussion answers | Create Q&As with helpful responses     |
| 🏔️ Arctic Code Vault | Contribute to archived repos   | Target popular repos before deadline   |
| 🌟 Starstruck        | 16+ stars on repository        | Organic growth through quality content |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Dlanang**

- GitHub: [@Dlanang](https://github.com/Dlanang)

## 🙏 Acknowledgments

- Thanks to all contributors
- Inspired by modern web development best practices
- Built with ❤️ using open-source technologies

---

⭐ Star this repository if you find it helpful!
