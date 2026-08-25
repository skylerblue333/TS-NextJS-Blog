# Sky Content API

**Status: engineering beta.** This repository is a focused TypeScript/Express content-service primitive. The historical repository name is retained for GitHub continuity, but the active implementation is **not a Next.js SSR application**.

## Implemented

- Create bounded text posts with optional bounded tags.
- List recent posts with a 1–100 result limit.
- Retrieve posts by positive integer ID.
- 32 KiB JSON request limit.
- `/healthz` and `/readyz` operational endpoints.
- Disabled Express signature header.
- Deterministic integration tests for create/list/get and validation failures.
- Node.js 22 build/test/runtime dependency audit gates.
- Non-root container packaging and live health smoke test.

## Run

```bash
npm install
npm run build
npm test
PORT=3000 npm start
```

Example:

```bash
curl -sS http://127.0.0.1:3000/v1/posts \
  -H 'content-type: application/json' \
  --data '{"title":"Engineering Notes","content":"A bounded content entry for the API.","tags":["sky"]}'
```

## Scope limitations

State is process-local and resets on restart. This repository does **not** provide Next.js rendering, Markdown processing, authentication, authorization, durable storage, media uploads, moderation, search indexing, multi-tenant isolation, HA, or production deployment.

## SKYCOIN4444 integration

The bounded post contract can be consumed as a small content adapter or used as a reference implementation. Authoritative identity, persistence, moderation, and production infrastructure must remain external until those capabilities are explicitly implemented and verified.
