const DEFAULT_PROMPT = `Help me understand the article {url}.

Write me a summary of its main themes and arguments, and also help me understand the context - why is the problem it investigates relevant, and how it's connected to other topics?`;

const textarea = document.getElementById('promptTemplate');
const saveBtn = document.getElementById('save');
const resetBtn = document.getElementById('reset');
const savedMessage = document.getElementById('savedMessage');

// Load saved prompt on page load
async function loadSettings() {
  const result = await chrome.storage.sync.get(['promptTemplate']);
  textarea.value = result.promptTemplate || DEFAULT_PROMPT;
}

// Save prompt
saveBtn.addEventListener('click', async () => {
  await chrome.storage.sync.set({ promptTemplate: textarea.value });
  
  savedMessage.style.display = 'block';
  setTimeout(() => {
    savedMessage.style.display = 'none';
  }, 2000);
});

// Reset to default
resetBtn.addEventListener('click', () => {
  textarea.value = DEFAULT_PROMPT;
});

loadSettings();
