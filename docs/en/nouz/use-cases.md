# Use Cases

Concrete tasks that NOUZ solves — and how exactly it works.

## PKM: Large Vault with Lost Connections

**Situation:** 400+ notes. Folders `/ml`, `/physics`, `/dev`. The idea that entropy and technical debt are the same phenomenon lives across several folders.

**What NOUZ does:**

```bash
# 1. Launch and index the vault
nouz-mcp
# → Indexed: 412 files

# 2. Reclassify all notes by content
recalc_signs()
# → 412 notes classified. sign_auto updated.

# 3. Search for semantic bridges
suggest_metadata("Technical Debt.md")
# → bridges:
#   - semantic: "Entropy.md" (cosine: 0.71)  ← different domains, same meaning
#   - semantic: "Tragedy of the Commons.md" (cosine: 0.63)
```

**Result:** The AI suggests connections you didn't make manually. You confirm the accurate ones. The knowledge base starts to understand itself.

---

## Research: Tracking Topic Drift

**Situation:** The "Machine Learning" module started as technical, but the last 20 notes are about AI philosophy and ethics. The structure no longer reflects the content.

**How NOUZ shows this:**

```python
# Get the node's formula
format_entity_compact("ML/Machine Learning.md")
# → sign: E (Engineering), core_mix: {S: 61%, E: 39%}
# → DRIFT WARNING: sign=E, but core_mix says S dominates
```

**core_drift** is a signal: the module has grown beyond what it was intended to be. You can rename it, split it, or accept the evolution. NOUZ simply makes it visible.

---

## AI Agent: Knowledge Layer from a Vault

**Situation:** Building an AI agent that needs structured context — "where is this in the hierarchy and what's connected to it" — on top of regular vector search.

**Configuration (Claude Desktop):**

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

**What the agent gets:**

```
User: "Tell me about our monitoring system architecture"

Agent uses NOUZ:
1. list_files(subfolder="infrastructure") → 12 files
2. get_children("Infrastructure/Monitoring.md") → [Prometheus.md, Grafana.md, Alerting.md]
3. format_entity_compact("Infrastructure/Monitoring.md") → (S2E)[E]{E}
4. read_file each child → full context

Agent responds with the real structure of your knowledge base,
not generic words from training data.
```

---

## Zettelkasten: Building a DAG from Scratch

**Situation:** A new knowledge base. You want to start structuring notes correctly from day one.

**Step 1 — Minimal YAML for a note:**

```yaml
---
type: quant
level: 4
parents:
  - "[[Module Name]]"
parents_meta:
  - entity: Module Name
    link_type: hierarchy
tags:
  - topic
---
```

**Step 2 — AI helps place it:**

```
Agent: "Analyze this new note and suggest where it belongs"

suggest_metadata("New Note.md")
→ {
    sign: "E",
    level: 4,
    suggested_parents: ["Architecture/Patterns.md"],
    bridges: [
      {type: "semantic", target: "Design/CQRS.md", cosine: 0.74, proposed: true}
    ]
  }
```

**Step 3 — Confirm or reject.** NOUZ writes to files only with your consent. `proposed: true` means it's waiting for a decision.

---

## Dev Notes: Living Project Documentation

**Situation:** Project notes — architecture, decisions, bugs, retrospectives. You want your AI assistant to understand the full project context.

**Vault structure:**

```
Project/
├── Architecture.md       # L3 module
├── Decisions/
│   ├── ADR-001.md        # L4 quant — specific decision
│   ├── ADR-002.md
├── Bugs/
│   ├── Bug-tracker.md    # L3 module
│   ├── Issue-42.md       # L4 quant
└── Retrospectives/
    └── 2026-Q1.md        # L5 artifact
```

**Benefits:** `get_children("Project/Architecture.md")` gives the agent the full hierarchy. `suggest_parents("New bug.md")` finds similar past incidents. `format_entity_compact` shows where any note sits in the project structure.

---

## Project Documentation: When Structure Diverges from Reality

**Situation:** You have a large knowledge base — a project, a team, a corporate vault. Organized by domains: architecture, APIs, business logic, requirements. Everything looks neat. But over time something starts to creak: architecture notes quietly accumulate business logic, and requirements drift into technical details.

You can't catch this manually. You can work with a vault for months that no longer reflects what it actually is.

**What NOUZ does about it:**

`core_drift` is not an error or a warning in the usual sense. It's a signal: the intent with which a module was created diverges from what its notes are actually about. NOUZ computes this automatically by comparing the domain sign (what the module should be) with `core_mix` (what it has become by content).

```
Module "Service Architecture":
  sign: E (Engineering)         ← set at creation
  core_mix: {S: 58%, E: 42%}   ← reality from recent notes

  → DRIFT WARNING
```

This means: recent notes in this module are about systems thinking and principles — not about code. The module has outgrown its boundaries. Or the boundaries have become too tight.

**What to do about it** — you decide. Rename. Split into two. Or simply accept that the module has evolved. NOUZ makes the invisible — visible.

---

## Start Simple

Hierarchy builds gradually:

1. **Start with LUCA** — add `parents` to YAML of notes you want to connect
2. **Then PRIZMA** — once you have 50+ notes, enable embeddings and see the classification
3. **SLOI if you want** — if you need a strict 5-level structure with validation
