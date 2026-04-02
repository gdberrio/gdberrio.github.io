---
title: "Speculative Decoding"
description: "Speculative Decoding"
pubDatetime: 2026-04-02T12:00:00.000Z
modDatetime: 2026-04-02T12:00:00.000Z
tags:
  - Speculative Decoding
  - LLMs
draft: true
---

Speculative Decoding

## Table of contents

## First attempt

Speculative decoding is a way increase the speed of token generation in an LLM. Form my current understanding, there is Speculative Decoding and Self Speculative Decoding.

### Speculative Decoding

In regular Speculative Decoding, there is a smaller model that attempts to predict the next token and generate it in advance. The smaller model needs to be in the same family. I assume this is because they need to share the same Vocab and Tokenizer?

### Self Speculative Decoding

As name indicates, this would probably mean that instead of using a small model in the same family, it's the model itself trying to predict what the next tokens might be.

Question for later: How does this work in practice under the hood?

### Multi Token Prediction

So the next step, as seen in Composer 2 Tech Report, is to create an MLP layer that predicts Multi Token Sequences? How does that work?