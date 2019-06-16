import boxen from 'boxen';
import chalk from 'chalk';

const { PORT = '9000', NODE_ENV = 'development' } = process.env;

export function displayStartupMessage() {
  const message =
    `App running in ${chalk.bold[
      NODE_ENV === 'development' ? 'blueBright' : 'greenBright'
    ](NODE_ENV)} mode` +
    '\n' +
    '\n' +
    `${chalk.bold.greenBright('Nuxt      ')} ${chalk.underline(
      `http://localhost:${PORT}`,
    )}` +
    '\n' +
    `${chalk.bold.magentaBright('Playground')} ${chalk.underline(
      `http://localhost:9000/graphql`,
    )}`;
  console.log(
    boxen(message, {
      padding: 1,
      margin: 1,
      borderColor: 'magenta',
      borderStyle: 'round' as any,
    }),
  );
}
