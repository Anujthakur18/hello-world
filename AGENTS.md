# AGENTS.md

Guidance for AI agents working in this repository.

## Repository overview

This is a **minimal GitHub Flow practice repository**. It contains only a `README.md` and standard Git metadata — there is no application source code, dependency manifests, build system, test suite, or CI configuration.

## Cursor Cloud specific instructions

### Services

| Service | Required? | Notes |
|---------|-----------|-------|
| Git | Yes | The only tool needed for this repo |
| Application server | No | No runnable application exists |
| Database | No | Not applicable |
| Docker | No | Not applicable |

### Development workflow

There is nothing to install, build, lint, or test beyond verifying Git works:

```bash
git status
git fetch origin
git log --oneline -5
```

### Running the "application"

There is no application to run. The repository's purpose is practicing Git and GitHub Flow (branching, commits, pull requests). Validate the environment by confirming Git commands succeed against the `origin` remote.

### Environment variables

None required.

### Gotchas

- Do not expect `package.json`, `requirements.txt`, `Makefile`, or `docker-compose.yml` — they do not exist in this repo.
- Any future application code added by the owner will require updating this file with new setup instructions.
