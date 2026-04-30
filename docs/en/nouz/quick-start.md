# Quick Start

Get NOUZ running in 5 minutes.

## Installation

```bash
pip install nouz-mcp
```

## Setup

### 1. Create config.yaml (Optional)

Without `config.yaml`, the server starts in **LUCA** mode (pure graph). For PRIZMA/SLOI, create a local config:

```bash
cp config.template.yaml config.yaml
```

On Windows PowerShell:

```powershell
Copy-Item config.template.yaml config.yaml
```

If your MCP client starts the server outside the project directory, pass the path explicitly through `NOUZ_CONFIG`.

Minimal config:

```yaml
mode: prizma  # luca | prizma | sloi
```

For semantic classification, add domains (etalons) — full examples → [Configuration](/en/nouz/configuration).

### 2. Point to Your Vault

```bash
export OBSIDIAN_ROOT=/path/to/your/obsidian-vault
```

### 3. Connect an Embedding Provider (For PRIZMA/SLOI)

Any OpenAI-compatible API works: LM Studio, Ollama, or a cloud provider.

```bash
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
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
[INFO] NOUZ MCP Server v2.5.3 started
```

## First Steps

Once NOUZ is connected, your AI assistant uses the tools directly:

```python
# Note position in the graph
format_entity_compact("My Module.md")
# → (2E)[E]{E}

# Classify a new note
suggest_metadata("New Note.md")
# → {sign: "σE", artifact_sign: "σ", level: 4, bridges: [...]}

# Recalculate signs across the entire vault
recalc_signs()
recalc_core_mix()
```

## Simple Start

Begin with **LUCA mode** — no embeddings required:

```yaml
mode: luca
```

You get the full DAG: hierarchical connections, entity formulas, navigation. Add semantics later by switching to PRIZMA or SLOI.

## Requirements

- Python 3.10+
- Obsidian vault (any directory with `.md` files)
- No SQLite server required: Python includes `sqlite3`, and the package installs `aiosqlite`
- LM Studio, Ollama, or OpenAI-compatible API (optional, for PRIZMA/SLOI)
