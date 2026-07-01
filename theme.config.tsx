import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const githubRepository =
  process.env.NEXT_PUBLIC_GITHUB_REPOSITORY || process.env.GITHUB_REPOSITORY || ''

const docsRepositoryBase = githubRepository
  ? `https://github.com/${githubRepository}`
  : 'https://github.com/shuding/nextra-docs-template'

const config: DocsThemeConfig = {
  logo: <span>Theme Studio</span>,
  project: {
    link: docsRepositoryBase,
  },
  chat: {
    link: 'https://discord.com',
  },
  docsRepositoryBase,
  footer: {
    text: 'Theme Studio template',
  },
  editLink: {
    text: 'Upravit tuto stránku',
  },
}

export default config
