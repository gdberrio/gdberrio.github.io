---
title: "Fractional Attribution"
description: "Fractional attribution is a data driven attribution model that is based on the Shapley Value Method."
pubDatetime: 2026-03-15T12:00:00.000Z
modDatetime: 2026-03-15T12:00:00.000Z
tags:
  - Marketing Attribution
  - Data Driven Attribution
  - Fractional Attribution
  - Shapley Value Method
---

Marketing Attribution is the process of assigning credit to marketing channels for conversions. It is a way to understand the impact of marketing channels on the conversion process. Usually, one relies on out of the box attribution models provided by analytics platforms. However, these models are often not customizable and do not provide a clear understanding of the impact of each marketing channel, since they rely on heuristics and rules of thumb, instead of the underlying data.

The alternative is Data Driven Attribution, sometimes also called Algorithmic Attribution. One example of this is the Fractional attribution model. This model is based on the Shapley Value Method, which is a method used in cooperative game theory to determine the contribution of each player in a coalition game. In the context of marketing attribution, the players are the marketing channels and the coalition game is the conversion process.

## Table of contents

## Path transforms

Paths to conversion are often very similar but not exact. It is helpful to apply a path transform before running an attribution algorithm to reduce unnecessary permutations. For example, you may want to group all paths that contain the same channels, but in a different order.

There are five path transforms available:
1. Unique: Treat all events in a path as unique. It is best if you have a short lookback length and low volume, specific marketing (and don't do a lot of retargeting)

2. Exposure: Collapse repeat events that are immediately in sequence. It's a balance between first and unique and should be the default if you don't know.

3. First: take only the first occurence of any given event. Is the best for cases where attribution is on something new that is being marketed and/or brand awareness type marketing.

4. Frequency: count events from their first occurence. Is useful when there is retargeting, many follow ups, no frequency capping.

5. Recency: look at where the event occured in the timeline before conversion and i. treat the same events differently if they occur in different time buckets, ii. collapse events if they are in the same time bucket. Is useful if there are longer lookback periods (> 30 days) and a tiered marketing strategy.

## The Fractribution Algorithm

1. Start with a baseline path

2. Define it's leave one out counterfactuals

3. Calculate the conversion probability for each counterfactual

| path | total_conversions | total_non_conversions | conversion_probability |
| ---- | ----------------- | --------------------- | ---------------------- |
| Direct --> Paid_Search_generic | 19 | 549 | 0.0335 |
| Direct --> Paid_Search_brand | 17 | 250 | 0.0637 |
| Paid_Search_generic --> Paid_Search_brand | 7 | 357 | 0.0192 |
| Direct --> Paid_Search_generic --> Paid_Search_brand | 1 | 10 | 0.0.909 |

Where $\text{conversion probability} = \frac{\text{total conversions}}{(\text{total conversions} + \text{total non conversions})}$

4. The marginal contribution of each event is the conversion probability difference between baseline (full) path and the counterfactual path without the event in it

| path | total_conversions | total_non_conversions | conversion_probability |
| ---- | ----------------- | --------------------- | ---------------------- |
| Direct --> Paid_Search_generic | 19 | 549 | 0.0335 |
| Direct --> Paid_Search_brand | 17 | 250 | 0.0637 |
| Paid_Search_generic --> Paid_Search_brand | 7 | 357 | 0.0192 |
| Direct --> Paid_Search_generic --> Paid_Search_brand | 1 | 10 | 0.0.909 |

Marginal contribution of Direct = 0.0909 - 0.0192 = 0.0717
Marginal contribution of Paid_Search_brand = 0.0909 - 0.0335 = 0.0574
Marginal contribution of Paid_Search_generic= 0.0909 - 0.0637 = 0.0272

| Direct | Paid_Search_generic | Paid_Search_brand |
| ------ | ------------------- | ----------------- |
| 0.0717 | 0.0272 | 0.0574 |

5. Normalize the fractions so they add to 1

| Path | Direct | Paid_Search_generic | Paid_Search_brand |
| ---- | ------ | ------------------- | ----------------- |
| Direct > Paid_Search_generic > Paid_Search_brand | 0.459 | 0.174 | 0.467 |

Where the normalized fraction is calculated as follows:
$$
\text{normalized contribution}_i = \frac{\text{marginal contribution}_i}{\sum_{i=1}^{n} \text{marginal contribution}}
$$

6. Repeat for all paths

### Python implementation

Lets now take a look at a simple python implementation of the fractional attribution algorithm. The code below is a simplified version of the algorithm that only considers the baseline path and one counterfactual path at a time. It is meant to illustrate the steps of the algorithm and is not optimized for performance.


```python
# 1. Define paths and counterfactuals

# The baseline path
baseline_path = ['Direct', 'Paid_Search_generic', 'Paid_Search_brand']

# The counterfactual paths
counterfactuals = [
    ['Direct', 'Paid_Search_generic'],
    ['Direct', 'Paid_Search_brand'],
    ['Paid_Search_generic', 'Paid_Search_brand']
]

# The conversion data
conversion_data = {
    tuple(baseline_path): (1, 10, 0.0909),
    tuple(counterfactuals[0]): (19, 549, 0.0335),
    tuple(counterfactuals[1]): (17, 250, 0.0637),
    tuple(counterfactuals[2]): (7, 357, 0.0192)
}

# 2. Calculate the conversion probability
# This function will calculate the conversion probability using the provided formula
def calculate_conversion_probability(total_conversions, total_non_conversions):
    return total_conversions / (total_conversions + total_non_conversions)

# 3. Determine the marginal contribution of each event
def calculate_marginal_contributions(baseline_conversion_prob):
    marginal_contributions = {}
    for path, (_, _, conversion_prob) in conversion_data.items():
        for event in baseline_path:
            if event not in path:
                if event not in marginal_contributions:
                    marginal_contributions[event] = 0
                marginal_contributions[event] = abs(baseline_conversion_prob - conversion_prob)
    return marginal_contributions

marginal_contributions = calculate_marginal_contributions(conversion_data[tuple(baseline_path)][2])

# 4. Normalize the fractions
def normalize_contributions(marginal_contributions):
    total = sum(marginal_contributions.values())
    normalized = {event: value/total for event, value in marginal_contributions.items()}
    return normalized

normalized_contributions = normalize_contributions(marginal_contributions)

print(normalized_contributions)
```

Lets go over the code in further detail:

#### 1. Defining Paths and Counterfactuals:

- **Baseline Path**: The code sets a baseline path named `baseline_path` which is an ordered list of events leading to conversion. This path is: `Direct > Paid_Search_generic > Paid_Search_brand`.

  ```python
  baseline_path = ['Direct', 'Paid_Search_generic', 'Paid_Search_brand']
  ```

- **Counterfactual Paths**: `counterfactuals` is a list containing alternative paths by leaving one event out from the baseline path at a time.

  ```python
  counterfactuals = [
      ['Direct', 'Paid_Search_generic'],
      ['Direct', 'Paid_Search_brand'],
      ['Paid_Search_generic', 'Paid_Search_brand']
  ]
  ```

- **Conversion Data**: The `conversion_data` dictionary contains conversion data for each path. It uses the path as the key (converted to a tuple) and a tuple as the value. The tuple consists of total conversions, total non-conversions, and the calculated conversion probability for that path.

  ```python
  conversion_data = {
      tuple(baseline_path): (1, 10, 0.0909),
      tuple(counterfactuals[0]): (19, 549, 0.0335),
      ...
  }
  ```

#### 2. Calculating Conversion Probability:

A function named `calculate_conversion_probability` is defined to compute the conversion probability based on given total conversions and total non-conversions.

  ```python
  def calculate_conversion_probability(total_conversions, total_non_conversions):
      return total_conversions / (total_conversions + total_non_conversions)
  ```

#### 3. Determining the Marginal Contribution of Each Event:

The function `calculate_marginal_contributions` computes the marginal contributions of each event in the baseline path. It uses the difference between the baseline conversion probability and the conversion probability of each counterfactual path without the event in question.

  ```python
  def calculate_marginal_contributions(baseline_conversion_prob):
      marginal_contributions = {}
      for path, (_, _, conversion_prob) in conversion_data.items():
          for event in baseline_path:
              ...
  ```

#### 4. Normalizing the Fractions:

The function `normalize_contributions` is responsible for taking the marginal contributions of each event and normalizing them so that they sum up to 1.

  ```python
  def normalize_contributions(marginal_contributions):
      total = sum(marginal_contributions.values())
      normalized = {event: value/total for event, value in marginal_contributions.items()}
      return normalized
  ```

Finally, the code calls these functions in sequence and prints out the normalized contributions of each event.

This code is part of a methodology that aims to provide a distribution of the contribution of each event in a conversion path, allowing for a better understanding of which events are more influential in the conversion process.

