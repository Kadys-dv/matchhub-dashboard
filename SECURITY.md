# Security Policy

Security fixes target the current `main` branch.

Do not disclose exploitable vulnerabilities, credentials, session material or personal data in public issues. Report concerns privately to the repository owner with reproduction steps and expected impact.

Changes to authentication, HTTP-only session handling, the BFF boundary, authorization-sensitive UI or server-side environment variables must receive explicit security review and automated validation.

Never expose server-only secrets through `NEXT_PUBLIC_*` variables or client bundles.