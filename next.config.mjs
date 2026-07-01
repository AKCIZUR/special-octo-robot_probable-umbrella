import nextra from 'nextra'

const withNextra = nextra()

const githubRepository = process.env.GITHUB_REPOSITORY || ''
const repositoryName = githubRepository.split('/')[1] || ''
const isUserOrOrgSite = repositoryName.endsWith('.github.io')

const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (githubRepository && !isUserOrOrgSite ? `/${repositoryName}` : '')

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  turbopack: {
    resolveAlias: {
      'next-mdx-import-source-file': './mdx-components.tsx',
    },
  },
}

export default withNextra(nextConfig)
