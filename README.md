# Arxiv → Claude Extension

A Chrome extension that makes it easy to ask Claude about arxiv papers.

## Installation

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `arxiv-claude-extension` folder

## Usage

1. Navigate to any arxiv paper (e.g., `https://arxiv.org/pdf/2301.12345` or `https://arxiv.org/abs/2301.12345`)
2. Click the extension icon in your toolbar
3. Click **Copy Prompt & Open Claude**
4. Paste (Ctrl+V / Cmd+V) into Claude and send!

## Customizing the Prompt

Click the **⚙️ Customize prompt template** link in the popup, or right-click the extension icon and select **Options**.

Use `{url}` in your template where you want the arxiv link to appear.

### Example prompts

**Default:**
```
Help me understand the article {url}.

Write me a summary of its main themes and arguments, and also help me understand the context - why is the problem it investigates relevant, and how it's connected to other topics?
```

**Technical deep-dive:**
```
I'm reading {url}. Please:
1. Summarize the key contributions
2. Explain the methodology in detail
3. What are the limitations mentioned?
4. How does this compare to prior work in the field?
```

**Quick summary:**
```
Give me a 3-sentence summary of {url}
```
