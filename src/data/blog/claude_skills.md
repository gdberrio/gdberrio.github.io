---
title: "Claude Skills"
description: "What are Claude Skills?"
pubDatetime: 2026-03-15T12:00:00.000Z
modDatetime: 2026-03-15T12:00:00.000Z
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

The file should be located in the .claude/skills directory, under a subdirectory with the name of the skill. The name of the skill should be in kebab-case, i.e., "my-skill", and it should match the name field in the frontmatter.

The file requires a frontmatter block with at least the following fields:
- name: The name of the skill (mandatory, max 64 characters)
- description: A short description of the skill (mandatory, max 1024 characters)
- allowed-tools: A list of restricted tools the skill is allowed to use (optional)
- model: The model to use for the skill (optional)

The description is what helps Claude trigger the skill. Skills are triggered by a specific prompt, and the description is what helps Claude understand when to trigger the skill. Skills are not fully loaded into the context window, instead they are loaded incrementally as needed, something known as progressive disclosure.

### Progressive disclosure

The context window is a limited resource. Given this, Claude does not load the entire skill into the context window at once. Instead, it loads it incrementally as needed, something known as progressive disclosure. This is why the description is so important, it helps Claude understand when to trigger the skill. This field should be concise and to the point. It should also be specific. 

## Multi-file skills

## Skills vs other features

### CLAUDE.md

### Slash Commands

### (Sub)Agents

### Plugins

## Skills in other Harnesses

### Opencode

### Codex

### Gemini

## References

- [The Complete Guide to Building Skill for Claude](https://resources.anthropic.com/hubfs/The-Complete-Guide-to-Building-Skill-for-Claude.pdf)
- [Anthropic Skill-Creator](https://github.com/anthropics/skills/tree/main/skills/skill-creator)