# Repository Rules & Constraints for Tech Go System

## Git & GitHub Push Rules
- **CRITICAL & MANDATORY**: ALWAYS commit and push code exclusively to the **`main`** branch (`origin/main`).
- NEVER push to `master` branch. GitHub Pages for this repository deploys exclusively from the `main` branch.
- When running git commands, ensure local branch is `main` and execute `git push origin main` (or `git push origin master:main` if on master).
- Always run `python force_cache_bump.py` before committing changes to update version timestamps and force Service Worker cache purge across all clients.
