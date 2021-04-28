// Copyright Zaiste. All rights reserved.
// Licensed under the Apache License, Version 2.0

const fs = require('fs');

const { run } = require('../util');

export async function handler(_) {
  console.log('Setup...');

  const config = require('config');
  const { database, username } = config.get('db');
  const stdout = fs.openSync('./log/database.log', 'a');

  try {
    await run('/usr/bin/env', ['nix-shell', '--run', 'initdb -A trust'], { stdout });
    await run('/usr/bin/env', ['nix-shell', '--run', 'pg_ctl start -l ./log/postgresql.log'], { stdout });
    await run('/usr/bin/env', ['nix-shell', '--run', `createdb ${database}`]);
    await run('/usr/bin/env', ['nix-shell', '--run', 'pg_ctl stop -l ./log/postgresql.log'], { stdout });
  } catch (error) {
    console.log("Already done", error)
  }

  // const psql = `psql ${database} ${username} < db/setup.sql`;
  // const { stdout, stderr } = exec(psql, { cwd });

  // stdout.pipe(process.stdout);
  // stderr.pipe(process.stderr);
}

export const builder = _ => {};