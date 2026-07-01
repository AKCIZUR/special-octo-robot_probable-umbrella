const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
})

const githubRepository = process.env.GITHUB_REPOSITORY || ''
const repositoryName = githubRepository.split('/')[1] || ''
const isUserOrOrgSite = repositoryName.endsWith('.github.io')

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (githubRepository && !isUserOrOrgSite ? `/${repositoryName}` : '')

module.exports = withNextra({
  basePath,
  assetPrefix: basePath,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
})
