# Security

Sky Content API is an engineering-beta, single-process content primitive.

## Implemented controls

- Bounded JSON request bodies.
- Bounded title, content, tag, and query inputs.
- Unknown application functionality is not exposed through dynamic code execution.
- Express signature header is disabled.
- Runtime dependency audit runs in CI.
- Container runs as the unprivileged `node` user.

## Not implemented

Authentication, authorization, tenant isolation, durable audit logging, persistence encryption, malware/media scanning, moderation, rate limiting, TLS termination, WAF/DDoS controls, backups, HA, and production deployment are outside the current scope.

Do not expose this beta directly to untrusted internet traffic as a production publishing system without adding and validating those controls.
