import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NOUZ — семантический MCP-сервер для Obsidian и Markdown',
  description: 'NOUZ превращает Obsidian и Markdown-базы в локальный семантический граф знаний для AI-агентов: иерархия, домены, связи, drift и MCP-инструменты.',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://semiotronika.ru',
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { name: 'keywords', content: 'NOUZ, MCP server, Obsidian MCP, semantic knowledge graph, Markdown knowledge base, AI agents, semantic memory, knowledge graph, embeddings, локальный граф знаний, семантическая память' }],
    ['meta', { name: 'author', content: 'Semiotronika' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'NOUZ' }],
    ['meta', { property: 'og:image', content: 'https://semiotronika.ru/favicon.png' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    ['meta', { name: 'twitter:image', content: 'https://semiotronika.ru/favicon.png' }],
  ],

  transformHead({ pageData }) {
    const relativePath = pageData.relativePath
    const isEnglish = relativePath.startsWith('en/')
    const routePath = relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const normalizedPath = routePath ? `/${routePath}` : '/'
    const canonical = new URL(normalizedPath, 'https://semiotronika.ru').toString()
    const title = isEnglish
      ? 'NOUZ — semantic MCP server for Obsidian and Markdown'
      : 'NOUZ — семантический MCP-сервер для Obsidian и Markdown'
    const description = isEnglish
      ? 'Local MCP server that turns Obsidian and Markdown files into a semantic knowledge graph: hierarchy, domains, links, drift, and tools for AI agents.'
      : 'Локальный MCP-сервер, превращающий Obsidian и Markdown-файлы в граф знаний: домены, иерархия, связи, drift и инструменты для AI-агентов.'
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'NOUZ',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Windows, macOS, Linux',
      description,
      url: canonical,
      codeRepository: 'https://github.com/Semiotronika/NOUZ-MCP',
      programmingLanguage: 'Python',
      license: 'https://github.com/Semiotronika/NOUZ-MCP/blob/main/LICENSE',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      author: {
        '@type': 'Organization',
        name: 'Semiotronika',
        url: 'https://semiotronika.ru/',
      },
    }

    return [
      ['link', { rel: 'canonical', href: canonical }],
      ['meta', { name: 'description', content: description }],
      ['meta', { property: 'og:url', content: canonical }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { name: 'twitter:title', content: title }],
      ['meta', { name: 'twitter:description', content: description }],
      ['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd)],
    ]
  },

  locales: {
    root: {
      label: 'Русский',
      lang: 'ru',
      themeConfig: {
        nav: [
          { text: 'Быстрый старт', link: '/nouz/quick-start' },
          { text: 'Документация', link: '/nouz/how-it-works' },
          { text: 'Примеры', link: '/nouz/use-cases' },
        ],
        sidebar: {
          '/nouz/': [
            {
              text: 'Начало работы',
              items: [
                { text: 'Быстрый старт', link: '/nouz/quick-start' },
                { text: 'Конфигурация', link: '/nouz/configuration' },
              ],
            },
            {
              text: 'Устройство',
              items: [
                { text: 'Как работает', link: '/nouz/how-it-works' },
                { text: 'Инструменты MCP', link: '/nouz/tools' },
                { text: 'Качество эталонов', link: '/nouz/etalon-quality' },
              ],
            },
            {
              text: 'Практика',
              items: [
                { text: 'Примеры и сценарии', link: '/nouz/use-cases' },
              ],
            },
          ],
        },
        footer: {
          message: '<span class="footer-brand"><span>{</span>Семиотроника<span>}</span></span><br><a href="https://t.me/volnaya_sreda">Telegram</a> · <a href="https://t.me/volnaya_sreda">Вольная Среда</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
          copyright: '<span class="footer-ghost-inline">косинусы считаются, синтаксис меняется, семантика остаётся</span>',
        },
        docFooter: { prev: 'Назад', next: 'Далее' },
        outlineTitle: 'Содержание',
      },
    },
    en: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Quick Start', link: '/en/nouz/quick-start' },
          { text: 'Documentation', link: '/en/nouz/how-it-works' },
          { text: 'Use Cases', link: '/en/nouz/use-cases' },
        ],
        sidebar: {
          '/en/nouz/': [
            {
              text: 'Getting Started',
              items: [
                { text: 'Quick Start', link: '/en/nouz/quick-start' },
                { text: 'Configuration', link: '/en/nouz/configuration' },
              ],
            },
            {
              text: 'How It Works',
              items: [
                { text: 'How NOUZ Works', link: '/en/nouz/how-it-works' },
                { text: 'MCP Tools', link: '/en/nouz/tools' },
                { text: 'Etalon Quality', link: '/en/nouz/etalon-quality' },
              ],
            },
            {
              text: 'Practice',
              items: [
                { text: 'Use Cases', link: '/en/nouz/use-cases' },
              ],
            },
          ],
        },
        footer: {
          message: '<span class="footer-brand"><span>{</span>Semiotronika<span>}</span></span><br><a href="https://t.me/volnaya_sreda">Telegram</a> · <a href="https://t.me/volnaya_sreda">Volnaya Sreda</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
          copyright: '<span class="footer-ghost-inline">косинусы считаются, синтаксис меняется, семантика остаётся</span>',
        },
        docFooter: { prev: 'Previous', next: 'Next' },
        outlineTitle: 'On this page',
      },
    },
  },

  themeConfig: {
    siteTitle: 'Σ',

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Semiotronika/NOUZ-MCP' },
    ],

    search: false,
  },
})
