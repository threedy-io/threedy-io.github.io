# instant3dhub examples portal

Created using [Vite](https://vitejs.dev) with `npm create vite@latest instant3dhub-examples-portal --template react-ts`

## Getting started

As usual, run `npm i` inside the repo and start the dev server with `npm run dev`
You'll need an API key from Gitlab for this to work. Add `VITE_GITLAB_TOKEN='your-bearer-token'` to a .env file in the project root

## Notes

Currently, the structure assumes that end user, dev and integration examples are uploaded into different groups. It is also possible to nest them in Subgroups.
When switching tabs, each group and its repositories are fetched again.
An alternative solution would be to either put all the fetch requests into `app.tsx` and pass data to the children, but this would make the code more difficult to read.
