Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

1. Use `gh issue view` to get the issue details
2. Create a new branch from main before starting implementation
   - Use `git checkout main` to switch to main branch
   - Use `git pull origin main` to get latest changes
   - Create a new feature branch with a name based on the issue (e.g., `feature/issue-{number}-{short-description}` or `fix/issue-{number}-{short-description}`)
   - Use `git checkout -b <branch-name>` to create the branch
3. Understand the problem described in the issue
4. Search the codebase for relevant files
5. Implement the necessary changes to fix the issue
6. Write and run tests to verify the fix
7. Ensure code passes linting and type checking
8. Create a descriptive commit message

Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.