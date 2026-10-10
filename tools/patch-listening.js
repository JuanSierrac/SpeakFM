'use strict';

const fs = require('fs');
const path = require('path');

const listeningPath = path.join(__dirname, '..', 'js', 'listening.js');
let source = fs.readFileSync(listeningPath, 'utf8');

const start = source.indexOf('function lsUpdateProgress()');
const end = source.indexOf('function lsShowToast(msg)');
if (start < 0 || end < 0) {
  throw new Error(`progress markers ${start} ${end}`);
}

source =
  source.slice(0, start) +
  `function lsUpdateProgress() {
  const d = listeningState.completed.length, tot = LABELS.length;
  const badge = document.getElementById('progressBadge');
  if (badge) badge.textContent = d + ' / ' + tot + ' completadas';
  const bar = document.getElementById('mainBar');
  if (bar) bar.style.width = ((d / tot) * 100) + '%';
}

` +
  source.slice(end);

const oldBar = `      <div class="progress-bar-wrap">
        <div class="progress-bar" id="mainBar" style="width:0%"></div>
      </div>`;
const newBar = `      <div class="ls-eyebrow" id="progressBadge">0 / 5 completadas</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" id="mainBar" style="width:0%"></div>
      </div>`;

if (!source.includes(oldBar)) {
  throw new Error('bar html not found');
}

source = source.replace(oldBar, newBar);
fs.writeFileSync(listeningPath, source);
console.log('patched progress');
