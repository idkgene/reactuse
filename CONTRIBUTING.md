# ReactUse Contributing Guide

Thank you for your interest in contributing to ReactUse. This guide will help you get started and ensure a smooth contribution process. Before you proceed, please review the following:

- [Code of Conduct](https://github.com/reactuse/reactuse/blob/main/CODE_OF_CONDUCT.md)
- [Contributing](#contributing)
  - [Becoming a collaborator](#becoming-a-collaborator)
- [Getting started](#getting-started)
  - [CLI Commands](#cli-commands)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Policy](#pull-request-policy)
- [Developer's Certificate of Origin 1.1](#developers-certificate-of-origin-11)

We welcome contributions from everyone, regardless of their experience level! In the ReactUse repository, contributors play a vital role in improving and extending the library.

- A **Contributor** is anyone who posts issues, comments on issues or PRs, or contributes code or documentation.
- A **Collaborator** is a contributor with write access to the repository. See [here](#becoming-a-collaborator) for details on how to become a collaborator.

For more detailed information on collaborating, check out our [Collaborator Guide](./COLLABORATOR_GUIDE.md).

Collaborators have direct access to the codebase and can merge pull requests. They are expected to help with the library's maintenance and improvement, ensuring ReactUse remains high-quality and up-to-date.

<details>
  <summary><b>Process for becoming a Collaborator</b></summary>

- Active contribution to the repository is a prerequisite.
- Contributions can include code submissions, code reviews, documentation, and participation in issue discussions.
- A current Collaborator must nominate a contributor by creating an Issue that outlines why they are a suitable candidate.
  - The nomination should highlight the nominee's contributions, such as:
    - Code submissions and reviews
    - Issue and PR discussions
    - Documentation improvements
- The nomination needs support from at least three other Collaborators.
  - Supporters can express this by commenting or using the :+1: reaction on the nomination issue.
- The nomination remains open for at least 72 hours, allowing for any objections or further endorsements from other Collaborators.
  - All objections must be resolved for the nomination to proceed.

</details>

## Getting started

Follow these steps to set up your environment and start contributing to ReactUse:

1. Fork the repository by clicking the fork button at the top right on the [ReactUse Repository](https://github.com/reactuse/reactuse/fork).

2. Clone your fork using your preferred method:

   ```bash
   git clone git@github.com:changeelog/reactuse.git # SSH
   git clone https://github.com/changeelog/reactuse.git # HTTPS
   gh repo clone changeelog/reactuse # GitHub CLI
   ```

3. Change into the reactuse directory:

   ```bash
   cd reactuse
   ```

4. Add an upstream remote to sync your fork:

   ```bash
   git remote add upstream git@github.com:reactuse/reactuse.git # SSH
   git remote add upstream https://github.com/reactuse/reactuse.git # HTTPS
   ```

5. Create a new branch for your changes:

   ```bash
   git checkout -b your-branch-name
   ```

6. Install dependencies and start the development server:

   ```bash
   npm install
   npm start
   ```

7. Make your changes. If you are new to the project, consider reading the [Collaborator Guide](./COLLABORATOR_GUIDE.md).

8. Keep your branch up to date by merging changes from upstream:

   ```bash
   git fetch upstream
   git merge upstream/main
   ```

9. Before committing, run linters and formatters to ensure your code follows the project's coding standards:

   ```bash
   npm run lint
   npm run format
   ```

10. Add and commit your changes, then push them to your fork:

    ```bash
    git add .
    git commit -m &quot;Describe your changes here&quot;
    git push origin your-branch-name
    ```

> [!IMPORTANT]\
> Before committing and opening a Pull Request, please go first through our [Commit](#commit-guidelines) and [Pull Request](#pull-request-policy) guidelines outlined below.

11. Create a Pull Request on GitHub from your fork.

> [!NOTE]\
> We ask for PR authors to avoid to rebase/update their PRs with the base branch (`main`) unnecessarily.

### CLI Commands

This project includes several npm scripts to help with development. Here are the most common ones:

> [!NOTE]\
> In development.
