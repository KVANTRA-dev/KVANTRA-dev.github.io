# Быстрый старт

Запуск NOUZ за 5 минут.

## Установка

```bash
pip install nouz-mcp
```

## Настройка

### 1. Создайте config.yaml (опционально)

Без `config.yaml` сервер запустится в режиме **LUCA** (чистый граф). Для PRIZMA/SLOI создайте локальный конфиг:

```bash
cp config.template.yaml config.yaml
```

В Windows PowerShell:

```powershell
Copy-Item config.template.yaml config.yaml
```

Если MCP-клиент запускает сервер не из директории проекта, передайте путь явно через `NOUZ_CONFIG`.

Минимальный конфиг:

```yaml
mode: prizma  # luca | prizma | sloi
```

Для семантической классификации добавьте домены (`etalons`, эталонные тексты) — полные примеры → [Конфигурация](/nouz/configuration).

### 2. Укажите путь к папке базы

```bash
export OBSIDIAN_ROOT=/path/to/your/obsidian-vault
```

### 3. Подключите провайдер эмбеддингов (для PRIZMA/SLOI)

Любой OpenAI-совместимый API: LM Studio, Ollama, облачный провайдер.

```bash
export EMBED_API_URL=http://127.0.0.1:1234/v1
export EMBED_MODEL=nomic-embed-text
```

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
[INFO] NOUZ MCP Server v3.0.0 started
```

## Первые шаги

Когда NOUZ подключён, ИИ-ассистент использует инструменты напрямую:

```python
# Классификация новой заметки: знак домена, тип материала, мосты
suggest_metadata("Новая заметка.md")
# → {sign: "σE", artifact_sign: "σ", level: 4, bridges: [...]}

# Графовый контекст заметки
get_parents("Новая заметка.md")
get_children("Новая заметка.md")

# Пересчитать знаки по всему хранилищу
recalc_signs()
recalc_core_mix()
```

## Простой старт

Начните с режима **LUCA** — без эмбеддингов:

```yaml
mode: luca
```

Вы получаете полный DAG: иерархические связи, навигацию по графу и локальный индекс. Семантику можно добавить позже — переключением на PRIZMA или SLOI.

## Требования

- Python 3.10+
- Obsidian-база (`vault`) или любая папка с `.md` файлами
- SQLite-сервер не нужен: Python включает `sqlite3`, а пакет ставит `aiosqlite`
- LM Studio, Ollama или OpenAI-совместимый API (опционально, для PRIZMA/SLOI)
