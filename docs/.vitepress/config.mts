import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'NOUZ',
  description: 'Семантический MCP-сервер для Obsidian',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://kvantra.tech/' }],
    ['meta', { property: 'og:title', content: 'NOUZ — Семантический граф знаний для Obsidian' }],
    ['meta', { property: 'og:description', content: 'MCP-сервер, превращающий Obsidian в семантический граф знаний. Структура рождается из содержания.' }],
  ],

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
          message: '<span class="footer-brand"><span>{</span>КВАНТРА<span>}</span></span><br><a href="https://t.me/volnaya_sreda">Telegram</a> · <a href="https://t.me/volnaya_sreda">Вольная Среда</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
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
          message: '<span class="footer-brand"><span>{</span>KVANTRA<span>}</span></span><br><a href="https://t.me/volnaya_sreda">Telegram</a> · <a href="https://t.me/volnaya_sreda">Volnaya Sreda</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
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
      { icon: 'github', link: 'https://github.com/KVANTRA-dev/NOUZ-MCP' },
    ],

    search: false,
  },
})
