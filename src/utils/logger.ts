import chalk from 'chalk';
import { config } from '../config';

class Logger {
  info(message: string, ...args: any[]): void {
    console.log(chalk.blue('ℹ'), message, ...args);
  }

  success(message: string, ...args: any[]): void {
    console.log(chalk.green('✅'), message, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.log(chalk.yellow('⚠️'), message, ...args);
  }

  error(message: string, ...args: any[]): void {
    console.log(chalk.red('❌'), message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (config.VERBOSE_LOGGING) {
      console.log(chalk.gray('🔍'), message, ...args);
    }
  }

  achievement(message: string, ...args: any[]): void {
    console.log(chalk.magenta('🏆'), message, ...args);
  }
}

export const logger = new Logger();