# instant3dhub examples portal

Created using [Vite](https://vitejs.dev) with `npm create vite@latest instant3dhub-examples-portal --template react-ts`

## Getting started

As usual, run `npm i` inside the repo and start the dev server with `npm run dev`
You'll need an API key from Gitlab for this to work. Add your bearer token to `VITE_GITLAB_TOKEN`in the .env file.
You can also configure `API_BASEURL` and the ID of each group.

## Notes

Currently, the loader assumes that end user, dev and integration examples are uploaded into different groups. The API treats subgroups the same way, so they can also be nested.
