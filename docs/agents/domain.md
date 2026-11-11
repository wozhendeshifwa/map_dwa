# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Layout: single-context

This repo is **single-context**: one repo, one shared vocabulary. There is one `CONTEXT.md` at the repo root, and architecture decisions live in `docs/adr/`. There is no `CONTEXT-MAP.md` and no per-context `CONTEXT.md` — those belong to multi-context repos and are created only if this repo ever splits into separate contexts.

(Naming note: the bundled skill docs sometimes call this same file `GLOSSARY.md`. In this repo the file is `CONTEXT.md`; if both ever appear, `CONTEXT.md` is the one to keep.)

## Before exploring, read these

- **`CONTEXT.md`** at the repo root — the domain vocabulary: what each term means and which synonyms to avoid.
- **`docs/adr/`**: read ADRs that touch the area you're about to work in.

If any of these files don't exist, **proceed silently**. Don't flag their absence; don't suggest creating them upfront. The `/domain-modeling` skill (reached via `/grill-with-docs` and `/improve-codebase-architecture`) creates them lazily when terms or decisions actually get resolved.

## File structure

```
/
├── CONTEXT.md
├── docs/adr/
│   ├── 0001-example-decision.md
│   └── 0002-another-decision.md
└── src/
```

## Use the glossary's vocabulary

When your output names a domain concept (in an issue title, a refactor proposal, a hypothesis, a test name), use the term as defined in `CONTEXT.md`. Don't drift to synonyms the glossary explicitly avoids.

If the concept you need isn't in the glossary yet, that's a signal: either you're inventing language the project doesn't use (reconsider) or there's a real gap (note it for `/domain-modeling`).

## Flag ADR conflicts

If your output contradicts an existing ADR, surface it explicitly rather than silently overriding:

> _Contradicts ADR-0007 (event-sourced orders), but worth reopening because…_
