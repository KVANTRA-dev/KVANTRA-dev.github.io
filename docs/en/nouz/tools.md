# MCP Tools

NOUZ provides 15 tools through the Model Context Protocol. Availability depends on the mode:

| # | Tool | LUCA | PRIZMA | SLOI |
| - | ---- | ---- | ------ | ---- |
| 1 | `obsidian_read_file` | yes | yes | yes |
| 2 | `obsidian_write_file` | yes | yes | yes |
| 3 | `obsidian_list_files` | yes | yes | yes |
| 4 | `obsidian_get_children` | yes | yes | yes |
| 5 | `obsidian_get_parents` | yes | yes | yes |
| 6 | `obsidian_format_entity_compact` | yes | yes | yes |
| 7 | `obsidian_index_all` | yes | yes | yes |
| 8 | `obsidian_suggest_metadata` | — | yes | yes |
| 9 | `obsidian_suggest_parents` | — | yes | yes |
| 10 | `obsidian_embed` | — | yes | yes |
| 11 | `obsidian_calibrate_cores` | — | yes | yes |
| 12 | `obsidian_recalc_signs` | — | yes | yes |
| 13 | `obsidian_recalc_core_mix` | — | yes | yes |
| 14 | `obsidian_process_orphans` | — | yes | yes |
| 15 | `obsidian_add_entity` | — | yes | yes |

---

## Reading and Writing

### `obsidian_read_file`

Read an Obsidian note with YAML frontmatter. Returns metadata (type, level, sign, parents, tags) and content body. Re-indexes the file in the database as a side effect.

### `obsidian_write_file`

Create or update a note with frontmatter. Checks the graph for cycles before writing. Automatically syncs `parents` and `parents_meta` fields.

### `obsidian_list_files`

List indexed files with optional filters: by `level`, `sign`, `subfolder`, or `no_metadata` (files without YAML frontmatter).

---

## Graph Navigation

### `obsidian_get_children`

Get all descendants of a node (direct and transitive) from the DAG index. Returns a flat list of relative paths.

### `obsidian_get_parents`

Get parent links for a file from the DAG index. Returns `{entity, link_type}` for each connection.

### `obsidian_format_entity_compact`

Compact structural formula of a node's position: `(children)[node]{parents}`. Quick way to see a note's graph neighborhood.

---

## Semantics <Badge type="tip" text="PRIZMA / SLOI" />

### `obsidian_suggest_metadata`

The main tool for AI agents. Analyzes a file's content and suggests: domain sign, hierarchy level, tags, semantic and analogy bridges, hierarchy errors. Returns `proposed: true` — the decision is human's.

### `obsidian_suggest_parents`

Finds semantically similar notes by vector cosine similarity. Suggests them as potential parent links for orphan notes. Returns top candidates ranked by similarity score, with same-core matches prioritized.

### `obsidian_embed`

Generate a vector embedding for arbitrary text. Useful for ad-hoc similarity checks.

---

## Database Maintenance <Badge type="tip" text="PRIZMA / SLOI" />

### `obsidian_index_all`

Re-index all markdown files in the vault. With `with_embeddings=true` — also recompute vectors (slower, requires an embedding provider). Idempotent — safe to re-run.

### `obsidian_calibrate_cores`

Recompute reference vector embeddings for all semantic cores defined in `config.yaml`. After running, check pairwise cosine in two variants: raw and mean-centered. Good result: mean-centered is significantly lower than raw. If mean-centered between different domains is roughly equal to within-domain values — etalons overlap, consider reformulating.

### `obsidian_recalc_signs`

Reclassify all files by embeddings. Updates `sign_auto` and `sign_source` in the database (does not touch YAML files). Use `dry_run=true` to preview changes without writing.

### `obsidian_recalc_core_mix`

Bottom-up aggregation: quants (L4) → modules (L3) → patterns (L2). Each parent receives a weighted average of its children's sign distributions. Writes updated core_mix to the database only.

---

## Automation <Badge type="tip" text="PRIZMA / SLOI" />

### `obsidian_process_orphans`

Find files with empty/missing sign OR missing parents (L2-L5) in YAML and auto-fill: sign (by content heuristic for L5, by embedding for L1-L4), tags (LLM-extracted), parents (embedding-suggested for orphan nodes). Writes updated YAML back to files. Use `dry_run=true` to preview without writing.

### `obsidian_add_entity`

Create a new entity in one step: auto-determines sign, tags, level; auto-suggests parents by embedding similarity. For L5 (artifact, default): sign by content heuristic, no embedding needed. For L4 (quant): composite sign = artifact_sign from children + core_sign from embedding. For L1-L3: core_sign from embedding. Set `auto_parents=true` to automatically link to the top suggested parent.
