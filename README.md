# Development
- Duplicate `.env.example`, rename it to `.env` and set `PUBLIC_API_URL` to something like `http://localhost:3000` which is the default for `json-server`
- Run `$ pnpm api` to start up the REST API backend then `$ pnpm start` to start the Tagtree frontend.

# TODO
- [x] ui state logged in/out (see middleware)
- [x] logout
- [x] delete/edit tags
- [ ] username unique constraint
- [ ] public profile endpoint (view a user's tags by their username ie. "www.tagtree.link/@jonshin")
- [ ] forgot password
- [ ] created/updated at field for tags
- [ ] user bio
- [ ] recaptcha
- [ ] labels for tags (alt account, abandoned, main account)
- [ ] reorder tags (drag n drop?)
- [ ] sorting/searching of tags
- [ ] pub/unpublish profile (settings)
- [ ] email visible? (settings)
- [ ] other contact data and visibility (settings)
- [ ] email confirmation
- [ ] oauth to add tags
- [ ] handle API connection error
- [ ] icons
- [ ] transitions/animations
- [ ] organize types