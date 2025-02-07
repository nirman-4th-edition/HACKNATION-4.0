# Contribution Guidelines

Thank you for your interest in contributing to this project! Please follow the guidelines outlined below to help us maintain a high standard of quality and collaboration.

## Forking and Branching

To contribute to this project, please follow these branching rules:

1. **Branch Off Only from the `development` Branch**: Always fork the repository and create a new branch from the `development` branch. Do not create branches from `main` or any other branches.
2. **Branch Naming Convention**: When creating a new branch, follow the naming convention:
   - `feature/<ticket-number>-<short-description>` for new features (e.g., `feature/ABC-123-add-login-functionality`)
   - `fix/<ticket-number>-<short-description>` for bug fixes (e.g., `fix/DEF-456-fix-crash-on-login`)
   - `refactor/<ticket-number>-<short-description>` for code refactoring (e.g., `refactor/ABC-789-optimize-authentication`)
   - `chore/<ticket-number>-<short-description>` for routine tasks or maintenance (e.g., `chore/update-dependencies`)
   - `hotfix/<ticket-number>-<short-description>` for urgent fixes or patches (e.g., `hotfix/XYZ-789-patch-payment-gateway`)
   - `wip/<short-description>` for work in progress branches (e.g., `wip/add-new-feature`)
   - `docs/<short-description>` for documentation updates (e.g., `docs/update-readme`)
   - `test/<short-description>` for test-related work (e.g., `test/fix-unit-tests`)
   - `staging/<short-description>` for branches meant for staging or pre-production (e.g., `staging/feature/new-dashboard`)
   - `prod/<short-description>` for production-related changes (e.g., `prod/fix/security-issue`)
   - `release/<version>` for release versions (e.g., `release/v1.0.0`)

By following this naming convention, you help maintain consistency and organization in the project, making it easier to understand the purpose of each branch.

### Conventional Commits

All commits should follow the [Conventional Commit](https://www.conventionalcommits.org/) specification. This ensures consistency in the commit history and makes it easier to understand the history of changes. Here are some examples of conventional commit messages:

- `feat: add new user authentication endpoint`
- `fix: resolve issue with login validation`
- `refactor: restructure authentication module`
- `chore: update dependencies`
- `docs: update installation guide`
- `test: fix failing unit tests`

By adhering to this standard, we ensure that our commit messages remain meaningful, consistent, and easy to follow for all contributors.

## Issue Reporting

If you find a bug or have an idea for a feature, please open an issue in the repository with a clear description of the problem or request. Use the appropriate labels for better categorization.

## Code Review Process

Once your branch is ready, submit a **Pull Request** (PR) against the `development` branch. All PRs will undergo code review, and any changes requested by the reviewer must be made before the PR can be merged.

## Licensing

By submitting code to this project, you are agreeing to license your contributions under the project's open-source license (e.g., Apache 2.0, MIT, etc.).

## Attribution

This guide is inspired by best practices from various open-source projects and contributions. We encourage you to refer to the project's license and related documentation for more information.

---

Thank you for your contributions! We appreciate your help in making this project better.
