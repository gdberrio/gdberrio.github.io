---
title: "Reverse Engineering basics"
description: "Reverse Engineering basics"
pubDatetime: 2026-03-16T11:30:00.000Z
modDatetime: 2026-03-16T11:30:00.000Z
tags:
  - Reverse Engineering
  - Basics
---

Reverse Engineering basics

## Table of contents

## Tools

- file, readelf, strings     - Binary identification
- dd                                      - Extracting the JS bundle
- grep, ripgrep                  - Pattern search through minified JS
- Claude Code                 - Analyzing its own source
- diff, meld                        - Version comparison

## Steps

If you want to try this

1. Install Claude Code

```bash
yay -S claude-code
```

2. Find the binary - which claude

3. Look for the Bun trailer: 

```bash
strings -t x $(which claude) | grep "Bun\!"
```

4. Extract the JS bundle from .rodata

How can we extract the JS bundle from .rodata?

According to the X Article, the trailer points to a table of contents - 15 embedded files. The one that matters is the JavaScript bundle at offset 0x62DA02B.

```bash
dd if=/opt/claude-code/bin/claude bs=1 skip=103700011 count=10357830 of=claude-code.js
```

9.88 MB of minified JavaScript. 7,493 lines. That's the whole application.

5. Start with string searches

## Prior work

Others have approached this differently:

- [Kir Shatrov](https://kirshatrov.com/posts/claude-code-internals)
  - intercepted API calls with mitmproxy - good for runtime behavior, misses the prompt architecture.
- [Reid Barber](https://reidbarber.com/blog/reverse-engineering-claude-code)
  - found source maps in an early release - clean code, but Anthropic removed them.
- [Vrungta](https://vrungta.substack.com/p/claude-code-architecture-reverse)
  - reconstructed architecture from runtime behavior - thorough but speculative.
- [claude-code-reverse](https://github.com/Yuyz0112/claude-code-reverse)
  - monkey-patched the SDK to log API calls.

## References

- [How I reversed Engineered Claude Code](https://x.com/jaywyawhare/status/2033488305191616875?t=IMMplVjSSe9MGdlj3Th4fA)