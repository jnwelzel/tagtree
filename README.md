# Development
- Duplicate `.env.example`, rename it to `.env` and set `PUBLIC_API_URL` to something like `http://localhost:3000` which is the default for `json-server`
- Run `$ pnpm start` then `$ pnpm api` to start the `json-server` REST backend API.

# TODO
- [x] ui state logged in/out (see middleware)
- [x] logout
- [ ] delete/edit tags
- [ ] user bio
- [ ] labels for tags (alt account, abandoned, main account)
- [ ] public profile endpoint (view a user's tags by their username ie. "www.tagtree.link/@jonshin")
- [ ] reorder tags (drag n drop)
- [ ] sorting/searching of tags
- [ ] pub/unpublish profile (settings)
- [ ] email visible? (settings)
- [ ] other contact data and visibility (settings)
- [ ] email confirmation
- [ ] icons
- [ ] transitions/animations