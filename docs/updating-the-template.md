# Updating the template safely

Client repositories are created from the master template. They don't share git history with it, so updates are applied by hand, picking what each client needs. This guide explains which files belong to the template and which belong to the client, and how to bring an improvement into a client site without breaking it.

## Which files belong to whom

| Area | Owner | Notes |
|---|---|---|
| `src/config/client.ts` | Client | Never copy over from the template. |
| `src/data/**` | Client | Content, always client-specific. |
| `public/clients/**` | Client | Images and logos. |
| `src/templates/**`, `src/components/**` | Template | Shared layouts and components. Update these. |
| `src/lib/**`, `src/types/**`, `src/config/theme.ts`, `src/config/sections.ts` | Template | Shared logic. Update these. |
| `src/config/examples/**` | Template | Reference only. |
| `scripts/`, `netlify.toml`, `package.json`, `docs/` | Template | Build and documentation. |

Changes to client-owned files should not be overwritten by a template update. Treat any conflict in those files as the client's version winning.

## Set up the upstream remote once

In each client repository, add the master template as a second remote:

```bash
git remote add template https://github.com/<you>/business-website-template.git
git fetch template
```

Check `git remote -v` to confirm the remotes. `origin` is the client repository and `template` is the master.

## Apply a template change

1. **Read the change.** On the master repository, open the commit or pull request. Note whether it touches template-owned files only, or client-owned ones too.
2. **Create a branch** in the client repository: `git checkout -b template-update-<short-name>`.
3. **Bring in the change.** Either cherry-pick the commit or copy the template-owned files:

   ```bash
   git cherry-pick <commit-sha>          # if the commit is self-contained
   # or, for a set of files:
   git checkout template/main -- src/components/common/Button.tsx
   ```

   Avoid `git merge template/main` on a client repository unless you have reviewed every file. Merging can overwrite client-owned files with template defaults.

4. **Resolve conflicts** in template-owned files by taking the template's version, unless the client has customised that file. If they have, merge the two by hand.
5. **Verify:**

   ```bash
   npm install          # only if package.json changed
   npm run typecheck
   npm run lint
   npm run build
   ```

6. **Check the site** locally at phone and desktop widths. Look at the sections the change affects, and the forms if the change touches them.
7. **Commit and deploy.** Netlify rebuilds on push. Check the new deploy before the client sees it.

## Changes to configuration types

If a template change adds a required field to the configuration types, the client's `client.ts` will stop compiling. The compiler error names the missing field. Add it with a sensible value, then check the reference configs in `src/config/examples/` for the new field's usage.

Optional fields don't require any change.

## Changes to the content types

If a content type changes shape (for example `MenuItem` gains a field), update the client's data files in `src/data/` to match. The compiler lists each place.

## Adding a new variant to the template

1. Create a folder under `src/templates/<business>/<variant>/` with the page component and its sections.
2. Add the page to the registry in `src/templates/registry.tsx`.
3. Add the variant name to `IMPLEMENTED_VARIANTS` in `src/types/client-config.ts`.
4. Add a reference config under `src/config/examples/` and check it builds with `npm run build`.

Only then is the variant selectable in client configs. Keeping the list in sync prevents a client from selecting a variant that doesn't render.

## Checklist before merging a template change into client sites

- [ ] `npm run typecheck`, `npm run lint` and `npm run build` pass
- [ ] Reference configs still build (switch `src/config/client.ts` to one temporarily)
- [ ] Forms still validate, and the WhatsApp and email links still open
- [ ] No client-specific names, colours, copy or images were added to shared components
- [ ] Change is noted in the client's commit message

## What not to do

- Don't edit the master template for one client's needs. Put client-specific values in config or data.
- Don't store client secrets or API keys in the repository. The template uses none, and `.env*` files are ignored by git.
- Don't rebase a client repository onto the template. The histories are independent by design.
