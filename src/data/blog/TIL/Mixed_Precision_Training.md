---
title: "Mixed Precision Training"
description: "Mixed Precision Training"
pubDatetime: 2026-04-02T12:00:00.000Z
modDatetime: 2026-04-02T12:00:00.000Z
tags:
  - Mixed Precision Training
  - LLMs
draft: true
---

AI Models are trained via backpropagating to get the weight values. The weights are, essencially, floating point numbers. So Precision matters. Things like FP32. This controls the precision of the floats. The higher the precision, the better the model. But higher precision = more memory comsumption.

So, Mixed Precision Training is the attempt to change the precision of specific layers in the Network, for efficiency. 

How does it work?

## Table of contents