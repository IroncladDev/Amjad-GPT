# Using the Git Pane

The Git pane allows you to seamlessly track and manage your code, switch between branches, and collaborate with others. Click on the **Git** tool in the sidebar to get started.

## Getting Started

Open the sidebar, navigate into the Tools section, and select **Git**. A pane will open prompting you to initialize a Git Repository. Press **Initialize Git Repository** to get started.

![Initialize your Repository](https://docimg.replit.com/gh/pane/00-init-repo.png)

### Connect to GitHub

Click the gear icon in the upper-right corner after the repository has been initialized.

![empty repo](https://docimg.replit.com/gh/pane/01-empty-repo.png)

You will see two commit authors, one pointing to a default generated profile and another pointing to your personal GitHub account. If you haven't given Replit access to your GitHub account, you will be prompted to connect it.

![settings](https://docimg.replit.com/gh/pane/02-settings.png)

When you connect your GitHub account, allow Replit access to all your repositories.

![Allowing access to all repositories](https://docimg.replit.com/gh/pane/03-all-repos.png)

After authenticating with GitHub, select your personal account as the commit author.

![Select your personal GitHub account](https://docimg.replit.com/gh/pane/04-select-personal-account.png)

Open the **Github** dropdown in settings. Fill out the repository metadata and hit **Create Repository on GitHub**.

![filling out repo metadata](https://docimg.replit.com/gh/pane/05-repo-meta.png)

Once the repository has been created, you will see the Remote update. The new repository you've created will be empty.

![remote update](https://docimg.replit.com/gh/pane/06-remote.png)

### Push your first commit

Change some files in your Repl. Shortly after, the changed files will appear in the Staging Area. If you don't see the changed files immediately, hit the **Refresh** icon in the upper-right corner of the Git pane.

![staging area](https://docimg.replit.com/gh/pane/07-change-files.png)

Create a commit message describing what you changed. Hit the **Enter** key if you would like to add a commit description (optional).  **CMD/CTRL + Enter** will automatically commit your changes.

![commit message](https://docimg.replit.com/gh/pane/08-commit-message.png)

After writing your commit message, hit **Stage and commit all changes**.

![commit everything](https://docimg.replit.com/gh/pane/09-hit-commit.png)

You will see your commit appear and a button prompting you to publish your branch. Hit **Publish branch as 'origin/main'** and your Repository will be populated with the files in your Repl.

![publish branch](https://docimg.replit.com/gh/pane/10-publish-branch.png)

## Staging Area

The Staging Area reflects all the changed files that are tracked by Git. You can manage what files you want to commit and even reset files you don't want to add to your commit.

If your changes don't immediately appear in the staging area, click the **Refetch** icon button in the top-right corner of the Git pane.

![staging area](https://docimg.replit.com/gh/pane/staging-area.png)

### Stage and commit all files

To add and commit **all** changed files to your commit, provide a commit message and click **Stage and commit all changes**.

### Stage files

To stage a single file, click the **"+"** icon on the right-hand-side of it. This does the equivalent of running `git add <file>`.

To stage all changed files, click **Stage All**. This does the equivalent of `git add .`

![stage a single file](https://docimg.replit.com/gh/pane/staging-add-single-file.png)

### Unstage files

To unstage a file, click the **"-"** icon on its right side. This does the equivalent of `git reset <file>`.

To unstage all files, click **Unstage All**. This does the equivalent of `git reset .`

![unstage a file](https://docimg.replit.com/gh/pane/staging-unstage-file.png)

### Reset a file

To reset a file, click the **Reset** icon on its right side. This does the equivalent of `git checkout <branch> <file>`.

![reset a file](https://docimg.replit.com/gh/pane/staging-reset-file.png)

**Note**: Be cautious with this action as it will reset the file to its value when last tracked by Git. If the file did not exist in the latest version of your branch, it will be deleted.

## Branches

The Git pane allows you to easily create and switch between branches.

### Create a branch

Click **Create Branch** to create a new branch.

![branches](https://docimg.replit.com/gh/pane/branch-homepage.png)

After creating the new branch, you will be prompted to publish it. Click **Publish branch as 'origin/`<branch>`'**.

![unpublished branch](https://docimg.replit.com/gh/pane/branch-new.png)

After having been published, your new branch is ready.

![published branch](https://docimg.replit.com/gh/pane/branch-published.png)

### Switch to a branch

From the branch homepage, click on the desired branch. Some metadata about the branch such as past commits will be shown. Hit **Switch to Branch**.

![switch to a branch](https://docimg.replit.com/gh/pane/branch-prompt-switch.png)

## Pulling Changes

To pull the latest changes from a repository, click **Pull <var>n</var> commits**. This will update your code to the latest version of the current branch.

If you have uncommitted changes, you can't pull the latest changes from the current branch. Stage and commit those changes first, and then you can pull.

![pull a change](https://docimg.replit.com/gh/pane/pull-ui.png)

## Merge Conflicts

A merge conflict happens when two different versions of code try to be combined, but they have changes in the same part of the code that need to be manually fixed.

Here is a common example of a merge conflict:

1. John changes line 1 of `script.js` to `console.log("Hi Developers!")` and pushes his changes to the `main` branch
2. Kevin changes line one of `script.js` to `console.log("Hello Programmers")` **after** John makes pushes his changes
3. Kevin tries to push his changes to the `main` branch
4. A merge conflict has been created, since Git is unsure what exact code it should keep

If you try to push your changes when a merge conflict is active, you will see a Git error.

![conflict message](https://docimg.replit.com/gh/pane/conflict-message.png)

On the other hand, if you try to pull changes when a merge conflict is active, you will see some notices in the Git UI.

![conflict pull message](https://docimg.replit.com/gh/pane/conflict-pull-message.png)

You are required to manually edit your code to combine the changes from multiple versions. This involves identifying the conflicting changes and deciding which changes to keep before pushing your changes.

### Resolving a Merge Conflict

When a merge conflict arises, the Git Pane will look something like this. Hit the **Pull** button on the upstream section.

![active merge conflict](https://docimg.replit.com/gh/pane/conflict-ui.png)

The UI will then indicate what conflicting files there are.

![conflict resolver UI](https://docimg.replit.com/gh/pane/conflict-merge-ui.png)

Navigate to each of the conflicting files. You will see some conflict markers. A typical conflict marker looks like this:

```
<<<<<<< HEAD
<Current change>
=======
<Incoming change>
>>>>>>> <Commit ID>
```

The **Current change** is your code and the **Incoming change** is the conflicting code. You can either:

1. Keep your change
2. Keep the incoming change
3. Manually edit the two changes to make the code behave in the desired way

![conflicted code](https://docimg.replit.com/gh/pane/conflict-code.png)

After resolving a conflicted file, remove the conflict markers.

![resolved code](https://docimg.replit.com/gh/pane/conflict-resolved-code.png)

After the conflict has been resolved, click **Complete pull**.

![complete pull](https://docimg.replit.com/gh/pane/conflict-resolved-ui.png)

After having completed the pull, your code is now ready to be pushed. Click **Synchronize** or **Push** to update the branch.

![push resolved changes](https://docimg.replit.com/gh/pane/conflict-resolved-push.png)
