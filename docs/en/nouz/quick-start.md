# Quick Start

Get NOUZ running in 5 minutes.

## Installation

```bash
pip install nouz-mcp
```

## Setup

### 1. Point to Your Vault

```bash
export OBSIDIAN_ROOT=~/my-vault
```

### 2. Connect an Embedding Provider (Optional)

Required for PRIZMA and SLOI modes. Any OpenAI-compatible API works: LM Studio, Ollama, or a cloud provider.

```bash
export EMBED_API_URL=http://127.0.0.1:1234/v1
```

### 3. Create config.yaml

Place `config.yaml` in your vault root. Define your knowledge domains:

```yaml
prizma:
  mode: sloi  # luca | prizma | sloi

  cores:
    S:
      name: Systems Thinking
      etalon: >
        Methodology for analysing complex objects: feedback loops,
        emergent properties, self-regulation, bifurcation points.
        Not data and not code — a way of thinking about how parts
        form a whole and why systems behave non-linearly.
    D:
      name: Data & Science
      etalon: >
        Physics and cosmology: Lagrangians, tensors, quarks, fermions,
        plasma, vacuum fluctuations. Pure science about the nature of
        matter, energy and spacetime.
    E:
      name: Engineering
      etalon: >
        Software engineering, ML, infrastructure: writing and debugging
        code, deployment, containerisation, neural networks, inference,
        microservices, CI/CD, refactoring, APIs.

  thresholds:
    confident_cosine: 0.45
    core_percent: 30
    semantic_bridge: 0.55
    analogy_bridge: 0.55
```

### 4. Connect to Your AI Client

Add to your MCP configuration (Claude Desktop, Cursor, OpenCode, etc.):

```json
{
  "mcpServers": {
    "nouz": {
      "command": "python",
      "args": ["-m", "nouz_mcp"],
      "env": {
        "OBSIDIAN_ROOT": "/path/to/vault",
        "EMBED_API_URL": "http://127.0.0.1:1234/v1"
      }
    }
  }
}
```

## Launch

```bash
nouz-mcp
```

```
[INFO] Indexing database on startup...
[INFO] Indexed: 42 files, errors: 0
[INFO] Core etalons loaded from DB: ['S', 'D', 'E']
[INFO] NOUZ MCP Server v2.5.1 started
```

## First Steps

Once NOUZ is connected, your AI assistant uses the tools directly:

```python
# Note position in the graph
format_entity_compact("My Module.md")
# → (2E)[E]{E}

# Classify a new note
suggest_metadata("New Note.md")
# → {sign: "SE", level: 4, bridges: [...]}

# Recalculate signs across the entire vault
recalc_signs()
recalc_core_mix()
```

## Simple Start

Begin with **LUCA mode** — no embeddings required:

```yaml
prizma:
  mode: luca
```

You get the full DAG: hierarchical connections, entity formulas, navigation. Add semantics later by switching to PRIZMA or SLOI.

## Requirements

- Python 3.10+
- Obsidian vault (any directory with `.md` files)
- SQLite (built-in)
- LM Studio, Ollama, or OpenAI-compatible API (optional, for PRIZMA/SLOI)
