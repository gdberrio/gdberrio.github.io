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

There also seems to be an issue with th KV-Cache. According to PyTorch's blog post, a naive implementation of speculative decoding would recreate the KV-Cache at all steps. Why?

The KV-Cache, from my understanding is the Attention (Key-Value) calculated values (?!). Basically the model doesn't need to recompute all the attention values among the words. 

Another thing I didn't know is that speculative decoding doesn't need to be just the next token. The small model, called draft model, with predict 5 to 10 tokens ahead.

### Self Speculative Decoding

As name indicates, this would probably mean that instead of using a small model in the same family, it's the model itself trying to predict what the next tokens might be.

Question for later: How does this work in practice under the hood?
Apparently the model can have a "draft mode", where it skips layers to generate the drafts. This is basically a "virtual smaller version of itself". The full model then verifies the tokens generated. 

1. How does the verification work? Both for normal and self speculative decoding?
2. Why does the model need to be from the same family?
3. What is the KV-Cache exactly, and how does it relate to this?


### Multi Token Prediction

So the next step, as seen in Composer 2 Tech Report, is to create an MLP layer that predicts Multi Token Sequences? How does that work?


## References

- [Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/pdf/2211.17192)
- [Hitchhiker's Guide to Speculative Decoding](https://pytorch.org/blog/hitchhikers-guide-speculative-decoding/)