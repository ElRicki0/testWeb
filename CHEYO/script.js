const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const cmd = input.value.trim();
  if (!cmd) return;

  chatBox.innerHTML += `<div class="user-msg">🧑‍💻 Tú: ${cmd}</div>`;
  input.value = '';

  try {
    const res = await fetch('chat.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: cmd })
    });
    if (!res.ok) {
      const text = await res.text();
      chatBox.innerHTML += `<div class="bot-msg text-danger">🤖 IA: Error ${res.status}: ${text}</div>`;
    } else {
      const data = await res.json();
      const reply = data.reply || data.error || '[sin respuesta]';
      chatBox.innerHTML += `<div class="bot-msg">🤖 IA: ${reply}</div>`;
    }
  } catch (err) {
    chatBox.innerHTML += `<div class="bot-msg text-danger">🤖 IA: Conexión fallida: ${err.message}</div>`;
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});