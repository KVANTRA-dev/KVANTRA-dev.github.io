---
layout: home
hero:
  name: NOUZ
  text: Semantic Knowledge Graph for Obsidian
  tagline: An MCP server that builds structure from content. Classification, connections, domains — derived from your notes' text.
  actions:
    - theme: brand
      text: Quick Start
      link: /en/nouz/quick-start
    - theme: alt
      text: How It Works
      link: /en/nouz/how-it-works
---

<div class="install-block">
  <code>pip install nouz-mcp</code>
</div>

## What NOUZ Does

You write notes in Obsidian. NOUZ reads them, determines each note's domain, builds the hierarchy, and finds connections you didn't make manually. All of this is available to your AI assistant through MCP — as structured memory, not just text search.

<div class="feature-grid">
  <div class="feature-card">
    <h3>DAG from YAML</h3>
    <p>Each note declares its parents in frontmatter. NOUZ builds a directed acyclic graph and checks for cycles. A node's position in the graph is expressed as a formula: <code>(children)[node]{parents}</code></p>
  </div>
  <div class="feature-card">
    <h3>Content-Based Classification</h3>
    <p>Define 2–4 domains by text in your config. Embeddings classify each note automatically — by meaning, not by folder location.</p>
  </div>
  <div class="feature-card">
    <h3>Cross-Domain Bridges</h3>
    <p>A note on thermodynamics connects to information theory. A note on deadlocks links to the tragedy of the commons. The AI suggests connections, you decide.</p>
  </div>
  <div class="feature-card">
    <h3>Bidirectional Causality</h3>
    <p><strong>Intent</strong> flows top-down: domain sign inherits from cores to modules. <strong>Reality</strong> flows bottom-up: core_mix aggregates from content. Drift between them is a signal.</p>
  </div>
  <div class="feature-card">
    <h3>13 MCP Tools</h3>
    <p>From <code>suggest_metadata</code> to <code>recalc_core_mix</code> — everything for an agent to work with a knowledge graph: read, write, navigate, classify.</p>
  </div>
  <div class="feature-card">
    <h3>Local and Private</h3>
    <p>Notes, embeddings, and database — all on your machine. LM Studio, Ollama, any OpenAI-compatible API. Your data stays with you.</p>
  </div>
</div>

## Three Modes

Start simple. Add semantics when you're ready.

<div class="mode-grid">
  <div class="mode-card">
    <div class="mode-name">LUCA</div>
    <div class="mode-sub">Pure Graph</div>
    <p>YAML frontmatter, hierarchy, entity formulas. Works without embeddings and without config — just point to your vault.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">PRIZMA</div>
    <div class="mode-sub">Semantic Layer</div>
    <p>Full classification: domains by embeddings, sign inheritance, semantic and analogy bridges, drift detection.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">SLOI</div>
    <div class="mode-sub">Strict Hierarchy</div>
    <p>5 levels: Core → Pattern → Module → Quant → Artifact. Skipping a level triggers an error. Bottom-up aggregation validates structure.</p>
  </div>
</div>

## Who It's For

<div class="usecase-grid">
  <div class="usecase-card">
    <div class="uc-label">PKM / Zettelkasten</div>
    <h3>Many Notes — Few Connections</h3>
    <p>500+ notes and you know there's something valuable in there. But you only see what you linked manually. NOUZ finds the rest.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">Researchers</div>
    <h3>Ideas Across Disciplines</h3>
    <p>Notes on physics, on system architecture, on organizational theory. NOUZ notices when the same idea lives in different branches — just in different words.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">AI Developers</div>
    <h3>Structured Memory for Agents</h3>
    <p>Not just vector search — a graph with hierarchy, domains, and connections. The agent understands context, not just finds similar text.</p>
  </div>
</div>

## Hierarchy

The graph is built top-down. Each level has its role:

| Level | Type | What Goes Here | Sign Source |
| ----- | ---- | -------------- | ----------- |
| L1 | Core | Knowledge domain — a broad area | Manual in config |
| L2 | Pattern | Key theme within a core | Manual + embedding validation |
| L3 | Module | Functional group, project | Inherited from L2 |
| L4 | Quant | One idea — a guide, research, post | Computed from content |
| L5 | Artifact | Raw material: logs, chats, configs | Inherited from parent |

## Works With

<div class="compat-grid">
  <span class="compat-badge">Claude Desktop</span>
  <span class="compat-badge">Cursor</span>
  <span class="compat-badge">OpenCode</span>
  <span class="compat-badge">ChatGPT</span>
  <span class="compat-badge">VS Code Copilot</span>
  <span class="compat-badge">Any MCP Client</span>
</div>

## Try It Quickly

```bash
pip install nouz-mcp
export OBSIDIAN_ROOT=/path/to/vault
nouz-mcp
```

Add it to your MCP client config and ask your AI: `"show me the structure of my knowledge base"`.

**LUCA mode** works without embeddings — YAML and graph only. [→ Quick Start](/en/nouz/quick-start)
