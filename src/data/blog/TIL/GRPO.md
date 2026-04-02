---
title: "GRPO"
description: "GRPO"
pubDatetime: 2026-04-02T11:30:00.000Z
modDatetime: 2026-04-02T11:30:00.000Z
tags:
  - GRPO
draft: true
---

GRPO is a RL way to train Base Models to achieve Reasoning capabilities. Introduced by Deepseek, with Deepseek-R1, the aim is to be simpler than PPO.

Instead of, like in PPO, we have a critic model that evaluates the correctness of the answer, in GRPO the model evaluates it's own answers in groups.

So, for instance, it might generate 10 or 15 reasoning traces, average the result of that group, and RL against that. This is to reduce memory comsumption, since we don't need to load the critic model into Memory in the GPUs.

This is very useful is areas where the score can be calculated objectively, like code generation or math. You run the code or math operation, and have a clear answer and a clear Pass - fail score.

I guess the point of creating groups is similar to evals: get groups to reduce variance of scores and answer?

## Table of contents
