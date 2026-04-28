# Configuration

NOUZ reads `config.yaml` from the vault root. For LUCA mode the file is optional — the server starts with default settings.

## Minimal Config

```yaml
prizma:
  mode: luca  # luca | prizma | sloi
```

This is enough to run NOUZ in pure graph mode without embeddings.

## Full Config

```yaml
prizma:
  # Operating mode
  mode: sloi  # luca | prizma | sloi

  # Knowledge domains (cores) — define the semantic space
  # Only for prizma and sloi modes
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

  # Classification thresholds
  thresholds:
    confident_cosine: 0.45    # Below → "weak" sign, does not block bridges
    core_percent: 30          # Minimum % for assigning a sign to a domain
    semantic_bridge: 0.55     # Threshold for semantic bridges
    analogy_bridge: 0.55      # Threshold for analogy bridges (structural isomorphism)
```

## Parameters

### `mode`

| Value | Description |
| ----- | ----------- |
| `luca` | Pure graph. YAML frontmatter and connections only. No embeddings needed. |
| `prizma` | Semantics + graph. Embeddings classify notes by domain. Flexible hierarchy. |
| `sloi` | Strict 5-level hierarchy with validation. Requires embeddings. |

### `cores`

A dictionary of domains. The key is an arbitrary character or letter (A, B, C or T, M, P — your choice). Each domain contains:

- **`name`** — human-readable name
- **`etalon`** — descriptive text of 200–500 words. The basis of classification. Write in the subject language of your domain. Avoid words that appear across multiple domains simultaneously.

::: tip Etalon Quality
Run `calibrate_cores` and check two numbers in the output: raw pairwise cosine and mean-centered. Raw cosine for transformer models is usually high (0.6–0.75) — this is normal, it's anisotropy. Look at mean-centered: it should be noticeably lower than raw and differ significantly between domains. If mean-centered is roughly the same for all pairs — the etalons semantically overlap. Remove common words, strengthen the specificity of each domain.
:::

### `thresholds`

| Parameter | Default | Description |
| --------- | ------- | ----------- |
| `confident_cosine` | 0.45 | Absolute cosine similarity threshold to the nearest etalon. Below → `sign_source: weak_auto` |
| `core_percent` | 30 | Minimum percentage after spread normalization for sign assignment |
| `semantic_bridge` | 0.55 | Cosine ≥ this value → propose a semantic bridge |
| `analogy_bridge` | 0.55 | Threshold for analogy bridges (structural isomorphism) |

## Environment Variables

| Variable | Required | Description |
| -------- | -------- | ----------- |
| `OBSIDIAN_ROOT` | Yes | Absolute path to the vault |
| `EMBED_API_URL` | For prizma/sloi | URL of an OpenAI-compatible embedding API |
| `EMBED_MODEL` | No | Model name (default: `nomic-embed-text`) |
| `LLM_API_URL` | No | URL for LLM (if used) |

```bash
export OBSIDIAN_ROOT=/path/to/vault
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

## Compatible Embedding Providers

| Provider | URL | Note |
| -------- | --- | ---- |
| LM Studio | `http://127.0.0.1:1234/v1` | Recommended for local use |
| Ollama | `http://127.0.0.1:11434/v1` | Requires `ollama serve` |
| OpenAI | `https://api.openai.com/v1` | Add `OPENAI_API_KEY` |
| GigaChat Proxy | `http://127.0.0.1:PORT/v1` | Via gigachat_proxy |
| Any OpenAI-compatible | — | Standard `/v1/embeddings` endpoint |

## Example Configs

### Developer (code, architecture, ML)

```yaml
prizma:
  mode: prizma
  cores:
    A:
      name: Architecture
      etalon: >
        Software architecture, system design, microservices, distributed systems,
        API design, scalability patterns, database schemas, event-driven architecture.
        How components are structured and interact at the system level.
    M:
      name: Machine Learning
      etalon: >
        Neural networks, transformers, fine-tuning, embeddings, inference optimization,
        quantization, training pipelines, datasets, evaluation metrics. Applied ML engineering.
    D:
      name: DevOps
      etalon: >
        CI/CD, Docker, Kubernetes, deployment, monitoring, observability, SLOs,
        infrastructure as code, cloud providers, reliability engineering.
```

### Researcher (science + methodology + tools)

```yaml
prizma:
  mode: sloi
  cores:
    T:
      name: Theory
      etalon: >
        Scientific theories, hypotheses, formal models, mathematical frameworks.
        Physics, chemistry, biology at the conceptual and formal level.
    M:
      name: Methodology
      etalon: >
        Research methods, epistemology, logic, argumentation, systematic review,
        experimental design, statistical analysis, peer review process.
    P:
      name: Practice
      etalon: >
        Laboratory protocols, instruments, data pipelines, software tools for science,
        reproducibility, datasets, computational notebooks.
```
