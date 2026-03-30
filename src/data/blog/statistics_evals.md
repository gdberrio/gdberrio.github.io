---
title: "Statistics of LLM Evals"
description: "Since LLMs are stochastic, evals are a statistical process, and as such, they have a lot of statistical properties. This blog post will explore the statistics of LLM evals."
pubDatetime: 2026-03-30T12:00:00.000Z
modDatetime: 2026-03-30T12:00:00.000Z
tags:
  - LLMs
  - Evals
  - Statistics
---

LLM evals are a way to evaluate the performance of a language model. They are typically used to measure the accuracy of a model's responses to a given prompt. What people don't realize is that since LLMs are stochastic, evals are a statistical process, and as such, they have a lot of statistical properties. This blog post will explore the statistics of LLM evals, and how to use them to get a better understanding of the performance of a model.

> **Note**: This post is a work in progress, while I read through some reference materials on evals. I will update it as I go along.

## Table of contents

## The statistics of LLM evals

According to the paper [Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations](https://arxiv.org/abs/2411.00640), we can't just take the mean of the evals to get the performance of a model. We need to take into account the statistical properties of the evals:

> “Fundamentally, evaluations are experiments; but the literature on evaluations has largely ignored the literature from other sciences on experiment analysis and planning. This article shows researchers with some training in statistics how to think about and analyze data from language model evaluations.”

My initial thinking was that the idea is simple: since LLMs are stochastic in nature, we can think of evals as experiments. A question and answer pair is a realization of a random variable. Hence we need to sample from the population of possible answers to a given question to get the performance of a model, on that question. 

My intuition is that, this is essentially the same problem as A/B testing and experimentation, but for LLMs.

Cameron Wolfe, in a substack post [Statistics of LLM Evals](https://cameronrwolfe.substack.com/p/stats-llm-evals), references the following framing:

>  In theory, when evaluating an LLM, there exists a super-population of questions (illustrated below) that exhaustively covers all the ways in which the LLM can be evaluated. Practically speaking, any evaluation dataset represents only a finite subset of questions from this super-population (...).

This frames the problem a little bit differently. Here, his framing is not that the LLM response is a random variable, but that there is a "super-population" of questions that covers all ways you can benchmark the LLM. However, according to this, a specific benchmark dataset is only a finite subset of questions from this super-population.

This framing, according to what I can tell, allows us to consider the problem of evaluation the skill of a model to perform a given task, instead of just attempting to maximize the benchmark score. The difference is subtle, but here it's the benchmark that is stochastic, and not (just) the model itself.

But, if this is the case, then each evaluation question is the dataset is the realization of the random variable that is the skill of the model to perform a given task. So we can "look through the looking glass", to quote the paper, and get a better understanding at the score and uncertainty of the model's skill.

### Key recommendations from the paper

The paper provides the following key recommendations:
1. When questions are i.i.d., LLM evals should have standard errors computed via CLT.
2. If the questions are not i.i.d., meaning they are drawn from clusters or groups, CLT is not applicable. One should use a clustered standard error.
3. To reduce the variance, we can resample the outputs from the model multiple times. This, from my viewpoint, is a way to average out the stochasticity of the model's responses.
4. When comparing or evaluating 2 models, one should use paired difference tests. And, one might add, if more than 2 models are being compared, one should use ANOVA tests, or similar approaches.

### Details on the dataset used in the paper

There are some details regarding the dataset used in the paper, we should keep in mind. In the first place, the eval dataset has $n$ questions, and each question will receive an evaluation score $s_i$. This score can either be a binary correctness score or an LLM-as-a-Judge score.

A score can be thought of as:
$$
s_i = x_i + \epsilon_i
$$

where $x_i$ is the expected score, and $\epsilon_i$ is the error term. The error term is assumed to be normally distributed with mean 0 and variance $\sigma^2$.

## References

1. [Statistics of LLM Evals](https://cameronrwolfe.substack.com/p/stats-llm-evals)
2. [evals-skills](https://github.com/hamelsmu/evals-skills)
3. [promptstats](https://github.com/ianarawjo/promptstats)
4. [LLM Evaluation Metrics: Everything You Need for LLM Evaluation](https://www.confident-ai.com/blog/llm-evaluation-metrics-everything-you-need-for-llm-evaluation)
5. [Eval Skills](https://developers.openai.com/blog/eval-skills)
6. [Adding Error Bars to Evals: A Statistical Approach to Language Model Evaluations](https://arxiv.org/abs/2411.00640)