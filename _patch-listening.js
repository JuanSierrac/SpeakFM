const fs = require('fs');
const p = 'c:/Users/DELL/Desktop/files/listening.js';
let t = fs.readFileSync(p, 'utf8');

const oldProg = `function lsUpdateProgress() {
  const d = listeningState.completed.length, t = LABELS.length;
  document.getElementById('progressBadge').textContent = \`${d} / ${t} completadas\`;
  document.getElementById('mainBar').style.width = \`\${(d/t)*100}%\`;
}`;

// file uses template literals - read exact from file
const a = t.indexOf('function lsUpdateProgress()');
const b = t.indexOf('function lsShowToast(msg)');
if (a < 0 || b < 0) throw new Error('progress markers ' + a + ' ' + b);

t = t.slice(0, a) + `function lsUpdateProgress() {
  const d = listeningState.completed.length, tot = LABELS.length;
  const badge = document.getElementById('progressBadge');
  if (badge) badge.textContent = d + ' / ' + tot + ' completadas';
  const bar = document.getElementById('mainBar');
  if (bar) bar.style.width = ((d / tot) * 100) + '%';
}

` + t.slice(b);

const oldBar = `      <div class="progress-bar-wrap">
        <div class="progress-bar" id="mainBar" style="width:0%"></div>
      </div>`;
const newBar = `      <div class="ls-eyebrow" id="progressBadge">0 / 5 completadas</div>
      <div class="progress-bar-wrap">
        <div class="progress-bar" id="mainBar" style="width:0%"></div>
      </div>`;
if (!t.includes(oldBar)) throw new Error('bar html not found');
t = t.replace(oldBar, newBar);

fs.writeFileSync(p, t);
console.log('patched progress');
