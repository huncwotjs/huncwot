// Copyright Zaiste. All rights reserved.
// Licensed under the Apache License, Version 2.0

import __ from 'chalk';

import { run } from '../util';

const cwd = process.cwd();

const VERSION = require('../../package.json').version;

export async function handler() {
  console.log(`${__.bold.blue('Kretes'.padStart(10))} ` + __`{bold ${VERSION}}`);

  try {
    await run('npx', ['tsc', '-p', 'config/server/tsconfig.json'], { cwd });
  } catch (error) {
  }

  try {
    await run('npx', ['tsc', '-p', 'config/client/tsconfig.json'], { cwd });
  } catch (error) {
  }
}

export const builder = _ => _
