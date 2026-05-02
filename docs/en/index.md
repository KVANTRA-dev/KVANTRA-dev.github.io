---
layout: home
hero:
  name: NOUZ
  text: Structured Memory for Obsidian and AI Agents
  tagline: "NOUZ helps agents find the right notes, links, and context in an Obsidian vault without reading everything blindly."
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

<div class="formula-strip">
  <span class="formula-syntax">(children)[node]{parents}</span>
  <span>a short coordinate for a note: what it contains and where it belongs</span>
</div>

## Why It Matters

As a knowledge base grows, agents start wasting context: reading too many files, missing important links, mixing drafts with conclusions, and rebuilding context from scratch. NOUZ gives the agent precise actions over the base: read a note, inspect its place in the graph, follow links, suggest metadata, and find related material.

It does not replace thinking. It removes blind file wandering and leaves decisions where they belong: with the person using the system.

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
    <p>Obsidian vault structure: YAML metadata, parents, children, and note formulas. Works without embeddings or a complex config.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">PRIZMA</div>
    <div class="mode-sub">Semantic Layer</div>
    <p>Adds classification, related ideas, bridges between themes, <code>core_mix</code>, and drift signals. Useful when the vault outgrows manual linking.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">SLOI</div>
    <div class="mode-sub">Level Discipline</div>
    <p>A strict five-level structure: Core → Pattern → Module → Quant → Artifact. Useful for research bases and team knowledge where order matters.</p>
  </div>
</div>

## Who It's For

<div class="usecase-grid">
  <div class="usecase-card">
    <div class="uc-label">Obsidian power users</div>
    <h3>The vault grew, the links live in your head</h3>
    <p>NOUZ helps expose structure, find orphan notes, spot weak areas, and give the agent context without manually opening dozens of files.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">Researchers and writers</div>
    <h3>Sources, hypotheses, and conclusions</h3>
    <p>Material from different domains can point to the same pattern in different language. NOUZ helps turn those intersections into a working research system.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">AI Developers</div>
    <h3>Working memory for agents</h3>
    <p>The agent gets more than file access: it can see where a note sits, what it connects to, which material is nearby, and what to inspect next.</p>
  </div>
</div>

## For Teams

The easiest way to try NOUZ is with Obsidian. If your knowledge base already lives in Notion, Confluence, Google Docs, or GitHub, you do not have to migrate it: the same approach can be connected through MCP connectors or custom adapters.

Semiotronika can help audit and set up agent-ready knowledge bases: duplicates, outdated pages, weak links, orphan sections, and a safer workflow: `Read → Analyze → Draft → Review → Apply`.

<div class="feature-grid">
  <div class="feature-card">
    <h3>Knowledge Base Audit</h3>
    <p>A map of the current base: where knowledge is messy, which topics have drifted, what is outdated, what duplicates exist, and where agents lack structure.</p>
  </div>
  <div class="feature-card">
    <h3>Agent-ready setup</h3>
    <p>Obsidian, NOUZ, metadata rules, a local index, and a workflow where humans confirm important changes before they land.</p>
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
| L2 | Pattern | Thematic frame for child modules and quants | Manual or etalon-based |
| L3 | Module | Functional group, project | Manual or etalon-based |
| L4 | Quant | One idea — a guide, research, post | Child artifact type + content domain |
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

## Research Context

NOUZ is a practical MCP server; the theory is optional. For readers interested in the research frame behind the project: [Recursive Self-Organization as a Universal Principle](https://doi.org/10.5281/zenodo.19595850).
