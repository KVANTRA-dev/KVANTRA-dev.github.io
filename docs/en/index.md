---
layout: home
hero:
  name: NOUZ
  text: Structured Memory for Obsidian and AI Agents
  tagline: "A Semiotronika project: an MCP server for Markdown knowledge bases, exposing hierarchy, domains, links, and graph context to agents through tools."
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
  <p>Semiotronika builds semantic tools for people and AI agents working with complex knowledge. NOUZ turns a folder of Markdown notes into a managed knowledge graph: you define the semantic frame and make the decisions, while the server computes domains, checks links, aggregates node composition, and gives the agent structured context through MCP.</p>
</div>

<div class="formula-strip">
  <span class="formula-syntax">(children)[node]{parents}</span>
  <span>a short graph coordinate for a note: what it belongs to and what it contains</span>
</div>

<div class="feature-grid">
  <div class="feature-card">
    <h3>Graph from YAML</h3>
    <p>Each note declares its parents in YAML frontmatter. NOUZ builds a directed acyclic graph, checks cycles, and stores links in a local index.</p>
  </div>
  <div class="feature-card">
    <h3>Clean Classification</h3>
    <p>Domains are defined by etalon texts. NOUZ compares notes with etalons after mean subtraction: shared embedding bias fades, and the dominant meaning becomes easier to see.</p>
  </div>
  <div class="feature-card">
    <h3>Cross-Domain Bridges</h3>
    <p>The server proposes semantic, tag, and analogy bridges between graph branches. Proposals stay candidates until you decide to add the link.</p>
  </div>
  <div class="feature-card">
    <h3>Structural Drift</h3>
    <p><strong>Intent</strong> lives in structure and YAML. <strong>Actual composition</strong> flows bottom-up: <code>core_mix</code> aggregates the domain profile of content. Drift between them is a signal for analysis.</p>
  </div>
</div>

## Three Modes

Start simple. Add semantics when you're ready.

<div class="mode-grid">
  <div class="mode-card">
    <div class="mode-name">LUCA</div>
    <div class="mode-sub">Pure Graph</div>
    <p>YAML frontmatter, hierarchy, entity formulas. Point it to your notes directory: the default mode works without embeddings or config.</p>
  </div>
  <div class="mode-card">
    <div class="mode-name">PRIZMA</div>
    <div class="mode-sub">Semantic Layer</div>
    <p>Mean-subtracted classification, composite signs, semantic/tag/analogy bridges, <code>core_mix</code>, and drift signals.</p>
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
    <p>Your notes already have manual links, while some semantic intersections stay in your head. NOUZ surfaces candidates; the decision stays with you.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">Researchers</div>
    <h3>Ideas Across Disciplines</h3>
    <p>Notes on physics, system architecture, and organizational theory can describe the same pattern in different words. NOUZ helps make those intersections visible.</p>
  </div>
  <div class="usecase-card">
    <div class="uc-label">AI Developers</div>
    <h3>Structured Memory for Agents</h3>
    <p>The agent gets graph context: parents, children, level, domains, links, and note content. It can work with the base as a structure.</p>
  </div>
</div>

## Hierarchy

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

Create `config.yaml` from the template, or use LUCA mode by default:

```yaml
mode: prizma
```

Point to your vault and connect embeddings (for PRIZMA/SLOI):

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

**LUCA mode** works without embeddings — YAML and graph only. [→ Quick Start](/en/nouz/quick-start)

## Research Context

NOUZ is a practical MCP server; the theory is optional. For readers interested in the research frame behind the project: [Recursive Self-Organization as a Universal Principle](https://doi.org/10.5281/zenodo.19595850).
