# Быстрый старт

Запуск NOUZ за 5 минут.

## Установка

```bash
pip install nouz-mcp
```

## Настройка

### 1. Укажите путь к vault

```bash
export OBSIDIAN_ROOT=~/my-vault
```

### 2. Подключите провайдер эмбеддингов (опционально)

Нужно для режимов PRIZMA и SLOI. Любой OpenAI-совместимый API: LM Studio, Ollama, облачный провайдер.

```bash
export EMBED_API_URL=http://127.0.0.1:1234/v1
```

### 3. Создайте config.yaml

Положите `config.yaml` в корень vault. Минимальный конфиг:

```yaml
mode: prizma  # luca | prizma | sloi
```

Для семантической классификации добавьте домены (ядра) — полные примеры текстов эталонов → [Конфигурация](/nouz/configuration).

### 4. Подключите к ИИ-клиенту

Добавьте в MCP-конфигурацию (Claude Desktop, Cursor, OpenCode и др.):

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

## Запуск

```bash
nouz-mcp
```

```
[INFO] Indexing database on startup...
[INFO] Indexed: 42 files, errors: 0
[INFO] Core etalons loaded from DB: ['S', 'D', 'E']
[INFO] NOUZ MCP Server v2.5.1 started
```

## Первые шаги

Когда NOUZ подключён, ИИ-ассистент использует инструменты напрямую:

```python
# Позиция заметки в графе
format_entity_compact("Мой модуль.md")
# → (2E)[E]{E}

# Классификация новой заметки
suggest_metadata("Новая заметка.md")
# → {sign: "SE", level: 4, bridges: [...]}

# Пересчитать знаки по всему хранилищу
recalc_signs()
recalc_core_mix()
```

## Простой старт

Начните с режима **LUCA** — без эмбеддингов:

```yaml
mode: luca
```

Вы получаете полный DAG: иерархические связи, формулы сущностей, навигацию. Семантику можно добавить позже — переключением на PRIZMA или SLOI.

## Требования

- Python 3.10+
- Obsidian vault (любая папка с `.md` файлами)
- SQLite (встроен)
- LM Studio, Ollama или OpenAI-совместимый API (опционально, для PRIZMA/SLOI)
