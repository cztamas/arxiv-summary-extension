const DEFAULT_PROMPT = `Help me understand the article {url}.

Write me a summary of its main themes and arguments, and also help me understand the context - why is the problem it investigates relevant, and how it's connected to other topics?`;

// Extract arxiv ID from various URL formats
function getArxivId(url) {
  // Matches: /abs/2301.12345, /pdf/2301.12345, /pdf/2301.12345.pdf
  const patterns = [
    /arxiv\.org\/(?:abs|pdf)\/(\d+\.\d+)/,
    /arxiv\.org\/(?:abs|pdf)\/([a-z-]+\/\d+)/, // Old format like hep-th/9901001
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Get the abstract page URL (cleaner for sharing)
function getArxivPdfUrl(arxivId) {
  return `https://arxiv.org/pdf/${arxivId}`;
}

async function getCurrentTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getPromptTemplate() {
  const result = await chrome.storage.sync.get(['promptTemplate']);
  return result.promptTemplate || DEFAULT_PROMPT;
}

async function init() {
  const tab = await getCurrentTab();
  const statusEl = document.getElementById('status');
  const buttonEl = document.getElementById('askClaude');

  const arxivId = getArxivId(tab.url);

  if (arxivId) {
    statusEl.className = 'status valid';
    statusEl.innerHTML = `Paper detected: <span class="arxiv-id">${arxivId}</span>`;
    buttonEl.disabled = false;
  } else {
    statusEl.className = 'status invalid';
    statusEl.textContent = 'Not on an arxiv.org paper page';
    buttonEl.disabled = true;
  }

  buttonEl.addEventListener('click', async () => {
    if (!arxivId) return;

    const template = await getPromptTemplate();
    const arxivUrl = getArxivPdfUrl(arxivId);
    const prompt = template.replace('{url}', arxivUrl);

    // Copy to clipboard
    await navigator.clipboard.writeText(prompt);

    // Show success message
    document.getElementById('successMessage').style.display = 'block';

    // Open Claude in new tab
    chrome.tabs.create({ url: 'https://claude.ai/new' });
  });
}

init();
