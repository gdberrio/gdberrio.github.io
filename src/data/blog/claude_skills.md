---
title: "Claude Skills"
description: "Claude Skills are a way to add capabilities to Claude. Essencially they are text files that contain a description and methods to execute a given task."
pubDatetime: 2026-03-18T12:00:00.000Z
modDatetime: 2026-03-18T12:00:00.000Z
tags:
  - Claude
  - Skills
  - LLMs
---

## Table of contents

## What are Claude Skills?

Claude Skills are a way to add capabilities to Claude. Essencially they are text files that contain a description and methods to execute a given task.
They can be simple skills, with just a single SKILL.md file, or more complex skills with resources, scripts and references in a folder structture. 
They can live at different locations, be it you central .claude directory or in your project .claude directory.

## Configuration

At its most basic, a skill is a simple SKILL.md file with a description and methods to execute a given task. The filename needs to be **exactly** SKILL.md, in caps. 

The file should be located in the `.claude/skills` directory, either in your project directory or in your home directory, under a subdirectory with the name of the skill. The name of the skill should be in kebab-case, i.e., "my-skill", and it should match the name field in the frontmatter.

Basic directory structure:
```
.claude/
  skills/
    my-skill/
      SKILL.md
    my-other-skill/
      SKILL.md
    my-third-skill/
      SKILL.md
```

The file requires a frontmatter block with at least the following fields:
- name: The name of the skill (mandatory, max 64 characters)
- description: A short description of the skill (mandatory, max 1024 characters)
- allowed-tools: A list of restricted tools the skill is allowed to use (optional)
- model: The model to use for the skill (optional)

The description is what helps Claude trigger the skill. Skills are triggered by a specific prompt, and the description is what helps Claude understand when to trigger the skill. Skills are not fully loaded into the context window, instead they are loaded incrementally as needed, something known as progressive disclosure.

### Progressive disclosure

The context window is a limited resource. Given this, Claude does not load the entire skill into the context window at once. Instead, it loads it incrementally as needed, something known as progressive disclosure. At startup, it will only load the skill names and descriptions. This is why the description is so important, it helps Claude understand when to trigger the skill. This field should be concise and to the point. It should also be specific. 

> Running /skills will show you the skills that are available. You can also ask Claude directly to list the skills that are available.

### Example Skill

```markdown
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---

When writing a PR description:

1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:

## What
One sentence explaining what this PR does.

## Why
Brief context on why this change is needed

## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
```

> Given that Skills load at startup, if you want to make changes to a skill, you need to restart Claude.

## Multi-file skills

Given that context window is limited, and the principle of progressive disclosure, the best practice is to keep skills small and focused. If a skill is too complex, it should be split into multiple files. Anthropic recommends that the main skill file not exceed 500 lines.

A pattern is then to create a more complex directory structure with a main SKILL.md file and subfolders for assets, scripts and references:

```
.claude/
  skills/
    my-skill/
      SKILL.md
      assets/
      scripts/
      references/
```

> Each of these folders is optional. If you don't need a specific type of asset, you can omit the folder. Same with scripts and references.

scripts are executable files, like python scripts for e.g., that Claude can run. A good practice is to say, in the skill file or the references, to actually run the script, not to read the script. This will make Claude actually run the code instead of loading it into the context window. This is a good way to ensure consistency of operations in a skill, like for instance a data transformation that one wants to always return the same result.

References are additional files and documentation for the skill. If at a specific point in the skill, you want Claude to use a reference, just provide a link to it in the main SKILL.md file. This helps to manage the context window and avoid loading too much information into it, only loading what is needed at that specific point in the skill.

Assets can be images, templates or other data that is needed for the skill. For e.g., you might want to generate an email report with always the same template.

### Skill Priority

If you have skills with the same name at different levels, Claude will choose based on a clear priority order:

1. Enterprise managed settings
2. Personal skills in your home directory `~/.claude/skills/`
3. Project skills in your project directory `.claude/skills/`
4. Skills in your installed plugins

## Skills vs other features

Sometimes there might be some confusion between skills and other features. Let's clear it up, starting with the CLAUDE.md file.

### CLAUDE.md

The CLAUDE.md file is a special file that is **always** loaded and appended to the context window after the system prompt. It is a way for you to set global settings for your Claude instance. For e.g, forcing Claude to always use uv for package management. Skills are additional capabilities that you can add to your Claude instance. If, on a given task, you find that you are always explaning the same thing to Claude repeatedly, like how to perform a DiD Regression Analysis, it might be a good idea to create a skill for that. Or, if at every PR, you are explaining how you want the feedback structured, this might be a good candidate for a skill. 

One might be tempted to put that into the CLAUDE.md file, but this will be loaded into the context window for every single task, and you might not want to do that. Also, you are consuming context window tokens to do so, and that's a valuable resource.

### Slash Commands

The difference between a slash command and a skill is a bit blurry. In fact, on a recent update, Claude Code now uses the same underlying mechanism to invoke both slash commands and skills. What is the difference then?

- Slash commands are typically used for quick, one-time actions, like opening a file or running a command.
- Skills are typically used for more complex, multi-step tasks, like writing a PR description or performing a data analysis.

Slash commands are made to be triggered by the user specifically, while skills are meant to be triggered by the system, when needed, given the match between a prompt and a skill description.

Another difference if that slash commands tend to be simpler, just one single .md file, while skills can be more complex, with a directory structure and multiple files.

### (Sub)Agents

Sub Agents are essencially a way to manage context windows. You want to break away from the main conversation or thread, and delegate a specific task to a sub agent. For instance, you might want to delegate the task of writing a PR description to a sub agent, while you focus on the main conversation. Or you want to enforce a certain behavior or constraints on the actions that can be taken. Skills on the other hand are meant to add or extend knowledge or capabilities to the main agent.

> Please be aware that sub agents do not have access or inherit the skills of the main agent. You need to **explicitly** add the skills to the sub agent.

### Plugins

Plugins are a way to bundle skills, slash commands, sub agents or other features into a single package. They can be installed and managed through the Claude Code CLI.

## Skills in other Harnesses

Agent Skills is a open standard, and most other Harnesses support it. Both OpenCode and Codex fully support the standard.

## References

- [The Complete Guide to Building Skill for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)
- [Anthropic Skill-Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)
- [Merged commands and skills in 2.1.3 update](https://www.reddit.com/r/ClaudeAI/comments/1q92wwv/merged_commands_and_skills_in_213_update/)
- [OpenAI Codex Skills](https://developers.openai.com/codex/skills)
- [OpenCode Skills](https://opencode.ai/docs/skills/)