#!/usr/bin/env node

import runCommandSelectPrompt from "./prompts/commandSelect";

async function run() {
  await runCommandSelectPrompt();
}

run();
