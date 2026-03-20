---
title: "Claude Skills Best Practices"
description: "Best practices for using Claude Skills, from Anthropic"
pubDatetime: 2026-03-20T10:30:00.000Z
modDatetime: 2026-03-20T10:30:00.000Z
tags:
  - Claude
  - Skills
  - Best Practices
---

## Table of contents

## Types of skills

According to Anthropic, most skills fall into on of the following categories:
- Library & API Reference: internal libraries and APIs, SDKs
- Product Verification and testing: testing your own product or service.
- Data Analysis: analyzing data, performing calculations
- Business Automation: Multi-tool workflows, automation
- Scaffolding and templates: creating new files, projects
- Code Quality and Review: reviewing code, providing feedback
- CI/CD and deployment: deploying code, running tests
- Incident Runbooks: symptom -> investigation -> resolution
- Infrastructure Ops: cleanup and maintenance

### Library & API Reference

Explanation on how to run a specific library, API or SDK. Can be internal or external. The focus should be on things Claude sometimes gets wrong. For example, in my personal experience, how Claude uses the Meridian API to generate visuals and diagnostics. It tends to try and do it by itself, instead of using the API. Same with experiments and A/B testing. Seems these models prefer to do it by themselves, instead of using an API or SDK.

Another example seems to be frontend-dsign, i.e., making Claude better at your design system.

### Product Verification and testing

Testing your own product or service. For example, testing a new feature, or a new product. In my particular day to day, this could be an interesting use case for tracking debugging on a website: Given a URL, try to register through the funnel, and see what triggers successfully. 

### Data Analysis

Analyzing data, performing calculations. They cite as examples things like skills including libraries or dashboard ids, and common workflows for getting data.

Additionally, in my experience, this could be the usecase for causal inference analysis, i.e., analyzing the impact of a specific feature on a specific outcome. And having the actual scripts to run the methods correctly, like DiD or Augmented Synthetic Control.

Another use case is to have a skill that correctly analysis and selects controls and media variables for an MMM analysis. I've seen Claude, specially in a long session, make mistakes in the selection of controls and media variables, like putting all media variables as controls, or not correctly selecting the exposure metrics as media variables.

### Business Automation

Multi-tool workflows, automation. Anthropic gives as examples things like stand-up posts or weekly recap, that aggregate github activity, slack activity, etc. In my particular case, specially given I have ADHD, this is the use case for a "chief of staff" or "executive assistant" skill.

### Scaffolding and templates

Creating new files, projects. Things that are templated, like a weekly report or a new MMM analysis. Some of the code there is hightly templated, following a scaffold, so this is a good use case for a skill that can create the new files, projects, etc.

### Code Quality and Review

Reviewing code, providing feedback. Things like enforcing a certain code style, or providing feedback on a code review. Can be a good use case for an adversarial review, where the skill spawns a sub-agent with a clear context to review. Could be good as a quality checkpoint in analytical work.

### CI/CD and deployment

Deploying code, running tests. Things like pushing to a repository, running tests, deploying to a server. These skills can reference other skills to collect data.

### Incident Runbooks

Symptom -> investigation -> resolution. Here the skill is mapping symptoms to tools and common patterns to investigate and resolve. Like broken tracking (or lack of conversions in Google Ads).

### Infrastructure Ops

Cleanup and maintenance. Things like cleaning up a repository, deleting old files, etc. You can, and should, but it place guardrails, since this might have destructive potential.

## Making Skills

There are several things to consider when making skills, according to Anthropic. 

### Don't state the obvious

Give the amount of data and fine tunning Claude models went through, it already has base knowledge and default options.  We want to focus on unique use cases or things we know we need to push Claude towards. As an example, in Marketing Analytics, these models tend to default to "glorified pivot table analysis", instead of running causal inference analysis.

Another example is the [frontend design skill](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md), done to avoid classic patterns. This is an example of Claude Code having a "better visual taste" than Codex.

### Build a Gotchas Section

Common failure modes and issues is the highest signal content a skill can have. It helps Claude understand the nuances of the task at hand, and avoid common pitfalls. It also means skills are living documents, that need to be updated over time.

### Progressive Disclosure

Don't overpack skills with too much information. Progressive disclosure is key. For instance, describe the general problem, and then have a reference section with links to more detailed information. Don't skill of skills as just an MD file, but a file structure with assets, scripts and references.

For example, you may split detailed function signatures and usage examples into references/api.md.
Another example: if your end output is a markdown file, you might include a template file for it in assets/ to copy and use.

### Avoid Railroading

This is a similar advice as OpenAI, in [Inside Our In-House Data Agent](https://openai.com/index/inside-our-in-house-data-agent/), which boils down to "less is more". Don't over prescribe the rules, and allow for flexibility.

For example, instead of:

```markdown
Step 1: Run git log to find the commit.
Step 2: Run git cherry-pick <hash>.
Step 3: If there are conflicts, run git status to list them.
Step 4: Open each confliting file.
(... and so on ...)
```

You might want to instead:

```markdown
Cherry-pick the commit onto a clean branch. Resolve conflicts preserving intent. If it can't land cleanly, explain why.
```

It makes sense, but I wonder how much flexibility is too much flexibility. Something to investigate and benchmark.

### Think through the setup

This is a bit of a potential security risk, but given some skills might need to be setup with context from the user, you can use a setup step to do so. You can ask e.g. for a skack channel to post in and write it to a config file. And this is fine, but then you can call that config file with a '!' prefix, to make it run automatically:

```markdown
## Your config
!`cat ${CLAUDE_SKILL_DIR}/config.json 2>/dev/null || echo "NOT_CONFIGURED"`

## Instructions

If the config file above is NOT_CONFIGURED, ask the user:
(... and so on ...)
```

My concern with this is, according to the documentation:

> The !command“ syntax runs shell commands before the skill content is sent to Claude. The command output replaces the placeholder, so Claude receives actual data, not the command itself.

So we are creating a huge prompt injection vector risk here. It seems to be more powerful than just asking it to run a command. In all honesty, having scripts in the `scripts` folder presents a similar risk, but at least it's not as direct.

### The description field is for the model

The description is for the model, not the user. It is what Claude loads on startup, and helps it understand when to trigger the skill. It should be concise and to the point. It should also be specific. It should not be thought of as a summary. So instead of:

```markdown
---
name: babysit-pr
description: A comprehensive tool for monitoring pull request status across the development lifecycle.
---
```

We should do:

```markdown
---
name: babysit-pr
description: Monitors a PR until it merges. Trigger on 'babysit', 'watch CI', 'make sure this lands'.
---
```

### Memory

Skills can write logs to have memory. Be careful that, if you are writing in the skills directory, if you upgrade the skill, the logs will be lost. According to Anthropic, `${CLAUDE_PLUGIN_DATA}` is a stable folder per plugin to store data in. One might also consider a database.

### Store scripts and generate code

A powerful pattern is store scripts with basic functionality, like helper functions or common workflows. And then use them to generate code. This is a good way to avoid repetitive code, and to ensure consistency of operations in a skill.

### On demand hooks

Apparently you can include hooks that are only triggered when the skill is called. So hooks like /careful, to block `rm -rf` or `DROP TABLE IF EXISTS` or other destructive commands.
I need to investigate this further, to understand how to use them and configure them.

## Other notes

One can compose skills, i.e., have a skill that calls another skill. This is a good way to avoid repeating code, and to ensure consistency of operations in a skill.

Additionally, one can measure skills. We can use the `PreToolUse` hook to log skill usage. An example gist is 
[ThariqS/measure-skills.bash](https://gist.github.com/ThariqS/24defad423d701746e23dc19aace4de5).

## References

- [Lessons from Building Claude Code: How We Use Skills](https://x.com/trq212/article/2033949937936085378)
- [Claude Skills Documentation](https://code.claude.com/docs/en/skills)
- [Improving Skill Creator: Test, Measure, and Refine Agent Skills](https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills)