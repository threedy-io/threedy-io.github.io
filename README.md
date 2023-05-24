# instant3dhub examples portal

Created using [Vite](https://vitejs.dev) with `npm create vite@latest instant3dhub-examples-portal --template svelte-ts`

## Getting started

As usual, run `npm i` inside the repo and start the dev server with `npm run dev`
To deploy to GitHub Pages, run `npm run deploy`

## Notes
The values set in `.env` are all set up, but can be changed to access different repositories and topic tags.
Currently, no API authentication is needed, images are fetched without using the API. Only one API call is made per page load, and all filtering is done on the client.
