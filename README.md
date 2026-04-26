# KVANTRA — Структура появляется из содержания

> Applied AI and agentic systems.

[![MIT License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://python.org)

---

## Проекты

### 🚀 NOUZ — Семантический движок знаний для Obsidian

> *Структура появляется из содержания.*

[![MCP](https://img.shields.io/badge/protocol-MCP_stdio-lightgrey.svg)](https://modelcontextprotocol.io)
[![PyPI](https://img.shields.io/badge/pypi-nouz--mcp-orange.svg)](https://pypi.org/project/nouz-mcp/)
[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.19595850.svg)](https://doi.org/10.5281/zenodo.19595850)

Когда база знаний растёт — размещение документов по папкам перестаёт работать. Агент видит файлы, но не понимает, как связаны ваши идеи.

NOUZ даёт агенту семантические координаты. Каждая заметка получает знак домена, уровень в иерархии и связи с другими заметками.

**Три режима:** LUCA (чистый граф) → PRIZMA (семантика) → SLOI (строгая иерархия)

[Сайт NOUZ](https://kvantra.tech) · [GitHub](https://github.com/KVANTRA-dev/NOUZ-MCP) · [PyPI](https://pypi.org/project/nouz-mcp/)

---

### 🔮 AXION — Семантический фреймворк (В разработке)

**Алгоритмический пайплайн для embedding DAG в неструктурированные базы знаний.**

- Иерархическая логика
- Семантическая классификация
- Обнаружение дрейфа

*Скоро.*

---

## Философия

```
structure emerges from content
```

Никакой принудительной структуры сверху. Инструменты, которые **извлекают** структуру из того, что вы уже написали.

Вы просто работаете. NOUZ управляет графом.

---

## Приватность и Local-First

| Компонент | Локально? |
|-----------|-----------|
| Эмбеддинги (LM Studio / Ollama) | ✅ Да |
| Ваши заметки | ✅ Да |
| Сервер NOUZ | ✅ Да |
| Контекст AI-агента (Claude, ChatGPT) | ❌ Уходит в облако |

Всё критичное остаётся на вашей машине.

---

## Быстрый старт

### NOUZ

```bash
pip install nouz-mcp
OBSIDIAN_ROOT=/path/to/vault nouz-mcp
```

Или из исходников:

```bash
git clone https://github.com/KVANTRA-dev/NOUZ-MCP
cd NOUZ-MCP
pip install -r requirements.txt
OBSIDIAN_ROOT=./vault python server.py
```

Подключение к Claude Desktop, Cursor, Opencode или любому MCP-клиенту.

---

## Сообщество

- 💬 [Telegram: Вольная Среда](https://t.me/volnaya_sreda)
- 🌐 [kvantra.tech](https://kvantra.tech)
- 🐙 [GitHub](https://github.com/KVANTRA-dev)

---

**MIT License © 2026 KVANTRA**

*Косинусы считаются. Синтаксис меняется. Семантика остаётся.*
