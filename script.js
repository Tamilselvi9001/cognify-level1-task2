/* =============================================
   COGNIFY TASK 2 — JavaScript
   =============================================
   Task 1: Color-changing button
   Task 2: Time-based greeting (alert + UI)
   Task 3: Addition calculator
   ============================================= */

/* ──────────────────────────────────────────
   TASK 1 · COLOR CHANGER
   ────────────────────────────────────────── */

const colorPalette = [
  { hex: '#e63946', name: 'Crimson'   },
  { hex: '#2a9d8f', name: 'Teal'      },
  { hex: '#e9c46a', name: 'Saffron'   },
  { hex: '#6a4c93', name: 'Violet'    },
  { hex: '#f4a261', name: 'Tangerine' },
  { hex: '#457b9d', name: 'Steel Blue'},
  { hex: '#b5179e', name: 'Magenta'   },
];

let colorIndex = 0;

function changeColor() {
  colorIndex = (colorIndex + 1) % colorPalette.length;
  const { hex, name } = colorPalette[colorIndex];

  const btn      = document.getElementById('colorBtn');
  const nameEl   = document.getElementById('colorName');

  btn.style.background = hex;
  btn.style.boxShadow  = `0 0 24px ${hex}55`;
  nameEl.textContent   = name;
  nameEl.style.color   = hex;
}

/* ──────────────────────────────────────────
   TASK 2 · TIME-BASED GREETING
   ────────────────────────────────────────── */

function getGreetingData() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return {
      message : 'Good Morning! Rise & shine ☀️',
      icon    : '🌅',
      alertMsg: 'Good Morning! Hope you have a wonderful day ahead ☀️',
    };
  } else if (hour >= 12 && hour < 17) {
    return {
      message : "Good Afternoon! Hope your day's going great 🌤️",
      icon    : '🌤️',
      alertMsg: 'Good Afternoon! Keep up the great work 🌤️',
    };
  } else if (hour >= 17 && hour < 21) {
    return {
      message : 'Good Evening! Time to relax 🌇',
      icon    : '🌇',
      alertMsg: 'Good Evening! You deserve a break 🌇',
    };
  } else {
    return {
      message : 'Good Night! Sweet dreams 🌙',
      icon    : '🌙',
      alertMsg: 'Good Night! Rest well 🌙',
    };
  }
}

function showGreeting() {
  const { message, icon, alertMsg } = getGreetingData();

  // Update UI
  document.getElementById('greetText').textContent = message;
  document.getElementById('greetIcon').textContent = icon;

  // Show alert as required by the task
  alert(alertMsg);
}

// Live clock — updates every second
function updateClock() {
  const now    = new Date();
  const hh     = String(now.getHours()).padStart(2, '0');
  const mm     = String(now.getMinutes()).padStart(2, '0');
  const ss     = String(now.getSeconds()).padStart(2, '0');
  const timeEl = document.getElementById('clockDisplay');
  if (timeEl) timeEl.textContent = `${hh}:${mm}:${ss}`;
}

updateClock();
setInterval(updateClock, 1000);

// Auto-load greeting on page open (without alert)
(function loadGreetingQuiet() {
  const { message, icon } = getGreetingData();
  const textEl = document.getElementById('greetText');
  const iconEl = document.getElementById('greetIcon');
  if (textEl) textEl.textContent = message;
  if (iconEl) iconEl.textContent = icon;
})();

/* ──────────────────────────────────────────
   TASK 3 · ADDITION CALCULATOR
   ────────────────────────────────────────── */

function addNumbers() {
  const rawA = document.getElementById('num1').value;
  const rawB = document.getElementById('num2').value;
  const resultEl = document.getElementById('resultVal');

  // Validation
  if (rawA === '' || rawB === '') {
    resultEl.textContent      = 'Enter both numbers';
    resultEl.style.color      = '#e9c46a';
    return;
  }

  const a = parseFloat(rawA);
  const b = parseFloat(rawB);

  if (isNaN(a) || isNaN(b)) {
    resultEl.textContent  = 'Invalid input!';
    resultEl.style.color  = '#e63946';
    return;
  }

  const sum = a + b;

  // Display — handle floats cleanly
  resultEl.textContent = Number.isInteger(sum)
    ? sum
    : parseFloat(sum.toFixed(10));

  resultEl.style.color = '#e63946';

  // Pulse animation
  resultEl.animate(
    [{ transform: 'scale(1.25)', opacity: 0.6 },
     { transform: 'scale(1)',    opacity: 1   }],
    { duration: 300, easing: 'ease-out' }
  );
}

// Allow pressing Enter in inputs
document.addEventListener('DOMContentLoaded', () => {
  ['num1', 'num2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter') addNumbers();
      });
    }
  });
});
