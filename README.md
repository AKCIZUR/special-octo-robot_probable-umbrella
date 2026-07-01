# Nextra Docs Template

This is a template for creating documentation with [Nextra](https://nextra.site).

## GitHub Pages

The project is prepared for GitHub Pages deployment.

- Push changes to `main`
- GitHub Actions builds the site
- The result is published automatically to Pages

If the repository is a project page, the build automatically uses the repository name as the base path.  
If it is a user or organization page like `username.github.io`, the base path stays empty.

## Local Development

First, run `pnpm i` to install the dependencies.

Then, run `pnpm dev` to start the development server and visit localhost:3000.

## Build

- `pnpm build` generates the production build
- `pnpm export` creates the static `out/` folder for GitHub Pages

## License

This project is licensed under the MIT License.


## Custom styling

Global styling lives in `styles/custom-style.css`. Edit that file to change the full site theme in one place.
