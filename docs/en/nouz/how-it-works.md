# How NOUZ Works

You write notes. NOUZ reads the YAML frontmatter, builds a DAG, classifies content via embeddings, and finds bridges between branches.

## Entity Formula

Every node in the graph is described by a compact formula:

```
(children)[node]{parents}
```

**( )** — children. Signs are aggregated: a number prefix appears only when count > 1. A bush at the intersection of domains.

**[ ]** — the node itself, with its domain sign. A composite sign (`SE`) means a cross-domain idea.

**{ }** — parents. Signs are written concatenated.

**Examples:**

```
(S2E)[E]{E}          — 3 children (1×S + 2×E), self E, parent E
(2D)[SE]{SE}         — 2 children D, self SE, parents S and E
(SE)[SE]{SE}         — 1 child SE, self SE, parent SE
```

The formula compresses the entire topology of a node into one line: count and domains of children, own domain, domains of parents.

The `format_entity_compact` tool returns this formula for any note.

## Sign — Domain Classification

A sign shows which knowledge domain a note belongs to. Domains are defined by descriptive texts in `config.yaml` — NOUZ turns them into vector etalons and classifies each note by cosine similarity to those etalons.

| Level | Sign Source |
| ----- | ----------- |
| L1 Core | Manual — it is the domain itself |
| L2 Pattern | Manual + embedding validation |
| L3 Module | Inherited from L2 parent |
| L4 Quant | Computed from content embedding |
| L5 Artifact | Inherited from parent |

Priority: `manual > auto (confident) > weak_auto > inherited`

A note receives a composite sign (e.g. `ES`) when two domains both exceed the threshold simultaneously. This is a cross-domain idea — two projections of the same thought.

## Normalization via Spread

Classification does not work on absolute cosine. Instead, normalization is applied:

```
percent = (cosine - min) / (max - min) × 100
```

This solves the problem of low absolute proximity: if all texts in the vault share a similar style, absolute cosine values may be high for all domains. Spread highlights the relative dominance.

Default threshold: 30% for assigning a sign to a domain.

## Bidirectional Causality

Two flows work simultaneously:

<div class="drift-diagram">
<span class="arrow-down">↓ sign (Intent):</span>    L1 → L2 → L3 — set by human, flows top-down<br>
<span class="arrow-up">↑ core_mix (Reality):</span>  L4 → L3 → L2 — aggregated from content, flows bottom-up
</div>

**Intent** — which domain you expect from a module. **Reality** — what its content is actually about. When they diverge — that's **core_drift**.

**Drift example:**

```
Module "Machine Learning":
  sign: E (Engineering)   ← set manually at creation
  core_mix: {S: 61%, E: 39%}  ← reality from quants below

  → DRIFT WARNING
```

This is a signal. Recent notes have shifted toward systems thinking. Time to reconsider — or accept the evolution.

## Link Types

| Type | Who Creates | Meaning |
| ---- | ----------- | ------- |
| `hierarchy` | Human only | Structural decision. Sign propagates only along this link. |
| `temporary` | Human or AI | Temporary link. Artifact has not yet attached to the graph. |
| `semantic` | AI suggests, human confirms | Cross-domain semantic intersection. |
| `analogy` | AI suggests, human confirms | Structural isomorphism — same role in the graph, different domain. |
| `error` | Automatic | Skipped level in hierarchy. |

### Semantic Bridges

A note's embedding is compared against all notes from **other** domains. Cosine ≥ 0.55 → bridge proposed with `proposed: true`.

Connections within the same domain are already covered by hierarchy. A bridge is needed when two different domains speak about the same thing — in different words, different language, same meaning.

Examples of bridges NOUZ finds:
- Database deadlock ↔ Tragedy of the commons (structural trap)
- Entropy ↔ Technical debt (accumulation of chaos)
- Mycelium ↔ Internet (network pattern)

### Analogy Bridges

Structural isomorphism: two notes from different domains play a similar role in their subgraphs. Weighted formula:

```
score = 0.35 × core_mix_angle
      + 0.25 × level_match
      + 0.20 × degree_similarity
      + 0.20 × tag_overlap
```

Default threshold: 0.65.

## Automatic Parent Search

To prevent random attachment, the `parent_link_threshold` is used (default 0.55). A note becomes a child only if semantic proximity (cosine similarity) exceeds this threshold. If the system finds several suitable candidates with equal scores, it looks at their domain cores (Same-core). Priority is given to the parent belonging to the same domain as your new note.

## Pipeline

<div class="pipeline">
  <div class="step" data-n="1">
    <h4>Note</h4>
    <p>Markdown file with YAML frontmatter: parents, type, level. Without frontmatter — NOUZ indexes without semantics.</p>
  </div>
  <div class="step" data-n="2">
    <h4>Embedding + Classification</h4>
    <p>Content is turned into a vector. Cosine similarity with etalons after normalization → domain sign and percentage distribution.</p>
  </div>
  <div class="step" data-n="3">
    <h4>Placement in DAG</h4>
    <p>Parents from YAML place the node in the graph. Cycles are checked before writing — write_file returns an error if a cycle is detected.</p>
  </div>
  <div class="step" data-n="4">
    <h4>Bottom-Up Aggregation</h4>
    <p>core_mix rises from quants (L4) to modules (L3) and patterns (L2). Parent receives a weighted average of children's domain distribution.</p>
  </div>
  <div class="step" data-n="5">
    <h4>Bridge Discovery</h4>
    <p>Semantic and analogy bridges connect nodes across domains. All proposals are marked proposed: true — AI suggests, you decide.</p>
  </div>
</div>

## Etalons

Domains are defined in `config.yaml` as descriptive texts. Not a list of keywords — but a description of the domain's essence in your own words. The `calibrate_cores` command turns them into vector etalons and writes them to the database.

**Etalon example:**

```yaml
etalons:
  - sign: S
    name: Systems Thinking
    text: >
      Methodology for analysing complex objects: feedback loops,
      emergent properties, self-regulation, bifurcation points.
      Not data and not code — a way of thinking about how parts
      form a whole and why systems behave non-linearly.
  - sign: E
    name: Engineering
    text: >
      Software engineering and infrastructure: writing and debugging
      code, deployment, containerisation, neural networks, inference,
      microservices, CI/CD, refactoring, APIs. The practical discipline
      of building computational systems.
```

After `calibrate_cores`, the server outputs pairwise cosines between etalons — in two variants: raw and mean-centered (subtracting the mean vector, which removes anisotropy of transformer embeddings). A good result: mean-centered cosine between different domains is noticeably lower than between a domain and itself. If values between all pairs are roughly equal — the etalons semantically overlap, and you should strengthen the distinctions.

Etalons don't need to be recalculated on every run — only when `config.yaml` changes.

## Database

NOUZ stores its index in SQLite (`obsidian_kb.db` in the vault root). The database contains:
- Metadata of all files (type, level, sign, parents)
- Embeddings (if enabled)
- Domain reference vectors
- Connection graph for traversal

The database is fully local. Data stays on your machine. If you use a cloud embedding provider (OpenAI) — only the texts sent for embedding leave your machine.
