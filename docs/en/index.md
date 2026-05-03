---
layout: home
hero:
  name: NOUZ
  text: Structured Memory for Obsidian and AI Agents
  tagline: "NOUZ helps agents find the right notes, links, and context in an Obsidian vault."
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

<div class="lead-panel">
  <p>NOUZ turns an Obsidian vault into a local map of knowledge. Instead of a folder of files, the agent gets notes, links, levels, and nearby context. The structure stays under your control, while NOUZ helps keep the base organized and ready for precise agent work.</p>
</div>

## Why It Matters

As a knowledge base grows, agents have a harder time choosing the right context: they read too many files, miss important links, mix drafts with conclusions, and rebuild material from scratch. NOUZ gives the agent precise actions over the base: read a note, inspect its place in the graph, follow links, suggest metadata, and find related material.

It does not replace thinking. It removes blind file wandering and leaves decisions where they belong: with you.

<div class="feature-grid">
  <div class="feature-card">
    <h3>Less Wasted Context</h3>
    <p>The agent can request a specific part of the base: one note, its parents, children, nearby links, or candidate connections. Work shifts from repeated blind reading to a reusable local index.</p>
  </div>
  <div class="feature-card">
    <h3>No Auto-Rewrites</h3>
    <p>NOUZ surfaces possible metadata, links, duplicates, and drift signals. Nothing becomes part of the vault unless it is confirmed.</p>
  </div>
  <div class="feature-card">
    <h3>Hidden Connections</h3>
    <p>The semantic layer helps reveal intersections between notes, even when they use different words or live in different branches.</p>
  </div>
  <div class="feature-card">
    <h3>Memory for Agents</h3>
    <p>Through MCP, the agent gets practical tools: read a note, inspect its position, find neighbors, and suggest structure.</p>
  </div>
</div>

## Three Modes

Start simple: Obsidian, YAML, and graph structure. Add semantics later, when the vault grows beyond manual links.

<div class="mode-grid">
  <div class="mode-card">
    <div class="mode-name">LUCA</div>
    <div class="mode-sub">Basic Graph</div>
    <p>Obsidian vault structure: YAML metadata, parents, children, and graph navigation. Works without embeddings or a complex config.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">PRIZMA</div>
    <div class="mode-sub">Semantic Layer</div>
    <p>Adds classification, related ideas, bridges between themes, <code>core_mix</code>, and drift signals. Useful when the vault outgrows manual linking.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">SLOI</div>
    <div class="mode-sub">Level Discipline</div>
    <p>A strict five-level structure: Core → Pattern → Module → Quant → Artifact. Useful for large knowledge bases and team memory where order matters.</p>
  </div>
</div>

## Who It's For

<div class="usecase-grid">
  <div class="usecase-card">
    <div class="uc-label">Obsidian power users</div>
    <h3>The vault grew, the links live in your head</h3>
    <p>NOUZ helps expose structure, find disconnected notes, spot weak areas, and give the agent context without manually opening dozens of files.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">Knowledge base owners</div>
    <h3>The material grew, order is still manual</h3>
    <p>NOUZ helps surface recurring topics, outdated notes, weak links, and areas where an agent needs more structure to work confidently.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">AI Developers</div>
    <h3>Working memory for agents</h3>
    <p>The agent gets more than file access: it can see where a note sits, what it connects to, which material is nearby, and what to inspect next.</p>
  </div>
</div>

## For Teams

The easiest way to try NOUZ is with Obsidian. If your knowledge base already lives in Notion, Confluence, Google Docs, or GitHub, you do not have to migrate it: the same approach can be connected through MCP connectors or custom adapters.

Semiotronika can help audit and set up agent-ready knowledge bases: duplicates, outdated pages, weak links, and disconnected sections. The workflow is explicit: the agent reads the base and suggests changes; you review and apply only what fits your system.

<div class="feature-grid">
  <div class="feature-card">
    <h3>Knowledge Base Audit</h3>
    <p>A map of the current base: where structure has weakened, which topics are outdated, what duplicates exist, and where agents lack links.</p>
  </div>
  <div class="feature-card">
    <h3>Agent-ready setup</h3>
    <p>Obsidian, NOUZ, metadata rules, a local index, and a workflow where you confirm important changes before they land.</p>
  </div>
  <div class="feature-card">
    <h3>Connectors and adapters</h3>
    <p>For team systems, NOUZ can act as a semantic layer beside the existing base without breaking Notion, Confluence, or another familiar tool.</p>
  </div>
</div>

## Technical Foundation

The graph is built top-down. Each level has its role, and larger bases can add `meta_root`: a level-0 anchor that gathers domains into one system and stays out of semantic calculations.

| Level | Type | What Goes Here | Sign Source |
| ----- | ---- | -------------- | ----------- |
| L1 | Core | Knowledge domain — a broad area | Manual or etalon-based |
| L2 | Pattern | Thematic frame for child modules and notes | Manual or etalon-based |
| L3 | Module | Functional group, project | Manual or etalon-based |
| L4 | Quant | One complete thought: a guide, decision, note, or process description | Optional artifact type + content domain |
| L5 | Artifact | Raw material: logs, chats, configs | Content-structure heuristic |

## Works With

<div class="compat-grid">
  <span class="compat-badge">Claude Desktop</span>
  <span class="compat-badge">Cursor</span>
  <span class="compat-badge">OpenCode</span>
  <span class="compat-badge">Claude Code</span>
  <span class="compat-badge">Cline</span>
  <span class="compat-badge">Continue</span>
  <span class="compat-badge">VS Code MCP</span>
  <span class="compat-badge">Any stdio MCP client</span>
</div>

## Try It Quickly

```bash
pip install nouz-mcp
```

Start with Obsidian: point NOUZ to your vault and connect it to an MCP client. **LUCA** works without embeddings; PRIZMA and SLOI need `config.yaml` and an embedding endpoint.

Example semantic mode:

```yaml
mode: prizma
```

Environment variables:

```bash
export OBSIDIAN_ROOT=/path/to/vault
export EMBED_API_URL=http://127.0.0.1:1234/v1
```

Run via MCP client:

```json
{
  "mcpServers": {
    "nouz": {
      "command": "python",
      "args": ["-m", "nouz_mcp"],
      "env": {
        "OBSIDIAN_ROOT": "/path/to/vault"
      }
    }
  }
}
```

[→ Quick Start](/en/nouz/quick-start)
