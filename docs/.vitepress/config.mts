import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'ru',
  title: 'KVANTRA',
  description: 'Семантические инструменты для графов знаний',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:url', content: 'https://kvantra.tech/' }],
    ['meta', { property: 'og:title', content: 'KVANTRA — Семантические инструменты для графов знаний' }],
    ['meta', { property: 'og:description', content: 'MCP-сервер, превращающий Obsidian в семантический граф знаний. Структура рождается из содержания.' }],
  ],

  themeConfig: {
    siteTitle: 'KVANTRA',

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

    socialLinks: [
      { icon: 'github', link: 'https://github.com/KVANTRA-dev/NOUZ-MCP' },
    ],

    footer: {
      message: '<a href="https://t.me/volnanya_sreda">Telegram</a> · <a href="mailto:belkinamariaigorevna@yandex.ru">Email</a>',
      copyright: 'KVANTRA · <span class="footer-ghost-inline">косинусы считаются, синтаксис меняется, семантика остаётся</span>',
    },

    search: false,
    docFooter: { prev: 'Назад', next: 'Далее' },
    outlineTitle: 'Содержание',
  },
})
