# Конфигурация

NOUZ читает `config.yaml` из корня vault. Для режима LUCA файл необязателен — сервер стартует с базовыми настройками.

## Минимальный конфиг

```yaml
prizma:
  mode: luca  # luca | prizma | sloi
```

Этого достаточно, чтобы запустить NOUZ в режиме чистого графа без эмбеддингов.

## Полный конфиг

```yaml
prizma:
  # Режим работы
  mode: sloi  # luca | prizma | sloi

  # Домены знаний (ядра) — определяют семантическое пространство
  # Только для режимов prizma и sloi
  cores:
    S:
      name: Systems Thinking
      etalon: >
        Methodology for analysing complex objects: feedback loops,
        emergent properties, self-regulation, bifurcation points.
        Not data and not code — a way of thinking about how parts
        form a whole and why systems behave non-linearly.
    D:
      name: Data
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

  # Пороги классификации
  thresholds:
    confident_cosine: 0.45    # Ниже → знак «слабый», не блокирует мосты
    core_percent: 30          # Минимум % для присвоения знака домену
    semantic_bridge: 0.55     # Порог для семантических мостов
    analogy_bridge: 0.55      # Порог для аналогических мостов (структурный изоморфизм)
```

## Параметры

### `mode`

| Значение | Описание |
|----------|----------|
| `luca` | Чистый граф. Только YAML frontmatter и связи. Эмбеддинги не нужны. |
| `prizma` | Семантика + граф. Эмбеддинги классифицируют заметки по доменам. Гибкая иерархия. |
| `sloi` | Строгая 5-уровневая иерархия с валидацией. Требует эмбеддинги. |

### `cores`

Словарь доменов. Ключ — произвольный символ или буква (A, B, C или T, M, P — на ваш выбор). Каждый домен содержит:

- **`name`** — человекочитаемое название
- **`etalon`** — описательный текст 200–500 слов. Основа классификации. Пишите предметным языком вашего домена. Избегайте слов которые встречаются в нескольких доменах одновременно.

::: tip Качество эталонов
Запустите `calibrate_cores` и проверьте два числа в выводе: сырой pairwise cosine и mean-centered. Сырой у трансформерных моделей обычно высокий (0.6–0.75) — это нормально, это анизотропия. Смотрите на mean-centered: он должен быть заметно ниже сырого и заметно отличаться между доменами. Если mean-centered у всех пар примерно одинаковый — эталоны семантически перекрываются. Уберите общие слова, усильте специфику каждого домена.
:::

### `thresholds`

| Параметр | По умолчанию | Описание |
|----------|-------------|----------|
| `confident_cosine` | 0.45 | Абсолютный порог cosine similarity к ближайшему эталону. Ниже → `sign_source: weak_auto` |
| `core_percent` | 30 | Минимальный процент после нормализации spread для присвоения знака |
| `semantic_bridge` | 0.55 | Cosine ≥ этого значения → предложить семантический мост |
| `analogy_bridge` | 0.55 | Порог для аналогических мостов (структурный изоморфизм) |

## Переменные окружения

| Переменная | Обязательна | Описание |
|------------|-------------|----------|
| `OBSIDIAN_ROOT` | Да | Абсолютный путь к vault |
| `EMBED_API_URL` | Для prizma/sloi | URL OpenAI-совместимого API эмбеддингов |
| `EMBED_MODEL` | Нет | Имя модели (по умолчанию: `nomic-embed-text`) |
| `LLM_API_URL` | Нет | URL для LLM (если используется) |

```bash
export OBSIDIAN_ROOT=/path/to/vault
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

## Совместимые провайдеры эмбеддингов

| Провайдер | URL | Примечание |
|-----------|-----|------------|
| LM Studio | `http://127.0.0.1:1234/v1` | Рекомендуется для локального запуска |
| Ollama | `http://127.0.0.1:11434/v1` | Требует `ollama serve` |
| OpenAI | `https://api.openai.com/v1` | Добавьте `OPENAI_API_KEY` |
| GigaChat Proxy | `http://127.0.0.1:PORT/v1` | Через gigachat_proxy |
| Любой OpenAI-compatible | — | Стандартный `/v1/embeddings` endpoint |

## Примеры конфигов

### Разработчик (код, архитектура, ML)

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

### Исследователь (наука + методология + инструменты)

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


