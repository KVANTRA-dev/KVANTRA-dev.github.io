# MCP Tools

NOUZ provides 15 tools through the Model Context Protocol. Availability depends on the mode:

| # | Tool | Meaning | LUCA | PRIZMA | SLOI |
| - | ---- | ------- | ---- | ------ | ---- |
| 1 | `read_file` | read a file | ✓ | ✓ | ✓ |
| 2 | `write_file` | write a file | ✓ | ✓ | ✓ |
| 3 | `list_files` | list indexed files | ✓ | ✓ | ✓ |
| 4 | `get_children` | get children | ✓ | ✓ | ✓ |
| 5 | `get_parents` | get parents | ✓ | ✓ | ✓ |
| 6 | `format_entity_compact` | build node formula | ✓ | ✓ | ✓ |
| 7 | `index_all` | re-index the base | ✓ | ✓ | ✓ |
| 8 | `suggest_metadata` | suggest metadata | — | ✓ | ✓ |
| 9 | `suggest_parents` | suggest parents | — | ✓ | ✓ |
| 10 | `embed` | create embedding | — | ✓ | ✓ |
| 11 | `calibrate_cores` | calibrate etalons | — | ✓ | ✓ |
| 12 | `recalc_signs` | recalculate signs | — | ✓ | ✓ |
| 13 | `recalc_core_mix` | recalculate domain mix | — | ✓ | ✓ |
| 14 | `process_orphans` | process orphan notes | — | ✓ | ✓ |
| 15 | `add_entity` | create an entity | — | ✓ | ✓ |

---

## Reading and Writing

### `read_file`

Read a Markdown file and return YAML frontmatter together with content. The YAML fields include `type`, `level`, `sign`, `artifact_sign`, `parents`, and `tags`. Reading also re-indexes the file in the database.

### `write_file`

Create or update a note with YAML frontmatter. Checks the graph for cycles before writing and syncs simple parent links `parents` with detailed link metadata `parents_meta`.

### `list_files`

List indexed files with filters by `level`, `sign`, `subfolder`, or `no_metadata`.

---

## Graph Navigation

### `get_children`

Get descendants of a node from the DAG index: direct and transitive.

### `get_parents`

Get parent links for a file. Returns `entity` and `link_type` for each connection.

### `format_entity_compact`

Compact formula for a node's position: `(children)[node]{parents}`. The formula displays link types that help keep the structure readable: `hierarchy`, `semantic`, and `temporary`.

---

## Semantics <Badge type="tip" text="PRIZMA / SLOI" />

### `suggest_metadata`

Analyzes a file and suggests sign, `artifact_sign`, level, tags, bridges, and hierarchy errors. Suggestions return `proposed: true`: the decision stays with you.

### `suggest_parents`

Finds parent candidates for orphan notes by cosine similarity. Candidates below `parent_link_threshold` are discarded; candidates from the same domain win ties.

### `embed`

Generate an embedding for arbitrary text. Useful for debugging similarity and manual checks.

---

## Database Maintenance <Badge type="tip" text="PRIZMA / SLOI" />

### `index_all`

Re-index all markdown files. With `with_embeddings=true`, also recomputes embeddings.

### `calibrate_cores`

Recompute reference vectors from `config.yaml`. Returns raw and mean-centered pairwise cosine values to check domain separation.

### `recalc_signs`

Reclassify files against current etalons. Updates domain sign `sign`, automatic sign `sign_auto`, sign source `sign_source`, and material type `artifact_sign` in the database. YAML files are not changed. Use `dry_run=true` to preview.

### `recalc_core_mix`

Recalculate `core_mix` bottom-up: L4 gets a profile from text classification, while L3 and L2 aggregate child nodes. Updates the database only.

---

## Automation <Badge type="tip" text="PRIZMA / SLOI" />

### `process_orphans`

Finds files with missing signs or missing parents and suggests sign/artifact_sign, tags, and possible parents. Can run as `dry_run` or write YAML.

### `add_entity`

Creates an entity in one step: writes the file, determines sign/artifact_sign, tags, and with `auto_parents=true` adds the best parent above threshold.
