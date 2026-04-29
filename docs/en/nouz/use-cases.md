# Use Cases

NOUZ is useful in two different situations: when a knowledge base is just beginning, and when it already exists, has history, and contains mixed conventions. These need different workflows.

## Who It Is For

NOUZ makes sense when a knowledge base has grown beyond a simple folder of notes: it has domains, levels, recurring topics, decisions, logs, research, or project documentation.

Good fit:

- researchers and writers working across several fields who want to see intersections;
- developers and teams who need MCP access to living project memory;
- Obsidian users whose vault already has some links, while many relationships still live only in their head;
- bases where it matters to distinguish structure from content: what a note was meant to be, and what it actually talks about.

Not the best fit:

- a small vault of 20–30 notes without stable themes;
- if all you need is full-text search;
- if you are not ready to define domains once and check etalon quality.

## New Knowledge Base

**Situation:** you are starting a vault from scratch or importing a small material set. The structure has not accumulated accidental links yet, so NOUZ can be introduced gently: the graph grows with the base.

**How to work:**

1. Start with LUCA: YAML, parents, graph, entity formula.
2. Add new notes normally.
3. For new notes, call `suggest_metadata` or `suggest_parents`.
4. When enough material has accumulated, enable PRIZMA: etalons, embeddings, bridges, `core_mix`.

Minimal note:

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

What the agent gets:

```text
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

**Idea:** the human shapes the structure as the base grows, while NOUZ proposes placement, domain, tags, and bridges. The decision stays with the human.

---

## Existing Knowledge Base

**Situation:** you already have a large vault: hundreds of notes, old folders, different writing styles, partially filled YAML. Here it is risky to turn on automation and trust it all at once. Settings depend heavily on the actual data.

**How to work:**

1. Index the base first, without mass rewrites.
2. Inspect real domains, note types, levels, and the gap between folders and content.
3. Write etalons for this base, not for an abstract example.
4. Run `calibrate_cores` and check raw / mean-centered cosines.
5. Tune thresholds: `sign_spread`, `pattern_second_sign_threshold`, `semantic_bridge_threshold`, `parent_link_threshold`.
6. Run `recalc_signs`, `suggest_metadata`, and `process_orphans` in batches, reviewing results.

Example:

```bash
index_all()
calibrate_cores()
recalc_signs()
suggest_metadata("Technical Debt.md")
```

```text
bridges:
  - semantic: "Entropy.md" (cosine: 0.71)
  - semantic: "Tragedy of the Commons.md" (cosine: 0.63)
```

**Idea:** NOUZ shows the state of an existing base: lost links, unmarked notes, weak parents, drift between `sign` and `core_mix`. New structure appears through your decisions, not over them.

---

## Drift: When Structure Diverges from Reality

**Situation:** the "Machine Learning" module started as technical, but recent notes are increasingly about AI philosophy, ethics, and system limits. The name and YAML say one thing; the content now says another.

```python
format_entity_compact("ML/Machine Learning.md")
# → sign: E (Engineering), core_mix: {S: 61%, E: 39%}
# → DRIFT WARNING: sign=E, core_mix says S dominates
```

`core_drift` is a signal: the module has moved away from its original intent. You can rename it, split it, move some notes, or accept the evolution.

---

## AI Agent: Structured Memory

**Situation:** an agent needs more than similar-text search. It needs to know where a note sits in the graph and what connects to it.

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

```text
User: "Tell me about the monitoring architecture"

Agent uses NOUZ:
1. list_files(subfolder="infrastructure") → 12 files
2. get_children("Infrastructure/Monitoring.md") → [Prometheus.md, Grafana.md, Alerting.md]
3. format_entity_compact("Infrastructure/Monitoring.md") → (S2E)[E]{E}
4. read_file each child → full context
```

The agent answers from the structure of your knowledge base: hierarchy, neighboring nodes, child materials, and close embedding matches.

---

## Living Project Documentation

**Situation:** a project has architecture notes, decisions, bugs, retrospectives, and research. These often live near each other, but not always connected.

```text
Project/
├── Architecture.md       # L3 module
├── Decisions/
│   ├── ADR-001.md        # L4 quant
│   ├── ADR-002.md
├── Bugs/
│   ├── Bug-tracker.md    # L3 module
│   ├── Issue-42.md       # L4 quant
└── Retrospectives/
    └── 2026-Q1.md        # L5 artifact
```

`get_children("Project/Architecture.md")` gives the agent the hierarchy. `suggest_parents("New bug.md")` finds similar past incidents. `format_entity_compact` shows where any note sits in the project structure.

## What Stays Yours

NOUZ computes, compares, and proposes, but the structure of the base remains your decision. This matters for living archives: the server makes levels, links, domains, and drift visible, while you choose what to accept, split, or keep as a bridge in the graph.

The usual next steps are simple: tune etalons for your base, check their quality with `calibrate_cores`, then connect an MCP client and give the agent graph context.
