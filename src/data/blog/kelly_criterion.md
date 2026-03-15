---
title: "The Kelly Criterion"
description: "Theory behind derivation of Kelly Criterion"
pubDatetime: 2026-03-14T12:00:00.000Z
modDatetime: 2026-03-14T12:00:00.000Z
tags:
  - Kelly Criterion
  - Probability
  - Finance
---

Theory behind derivation of Kelly Criterion

## Table of contents

## Definition

If was published by John Kelly in 1956.

The Kelly Criterion is the rule that says what proportion of your wealth f should you bet on a double-or-nothing bet:
$$
f = \frac{bp - (1-p)}{b}
$$

where $f$ is the fraction of your wealth to bet, $p$ is the probability of winning, and $b$ is the win-loss odds.
Essencialy $bp - (1-p)$ is the edge and $b$ is the odds. So what the formula is saying is bet edge over odds.

Essencially the formula provides for the optimal strategy for maximizing the long-term growth rate of your wealth in a game with favourable odds.

It builds upon the work of Daniel Bernoulli who worked out the St. Petersburg Paradox, a lottery with inifinite expected payout, by introducing a utility function that the player will maximize.

### St. Petersburg Paradox

In the St. Peterburg Paradox, a player is not willing to pay more than $10 to play the game.

### Basic idea

The basic concept behind the formula is that someone who wants to maximize the long-term growth rate of their wealth should bet a constant fraction of their wealth on each bet, defined by the function $2 * p - 1$ where p is the probability of winning. The formula assumes a log utility function.

If a player bets too high of a fraction, he risks ruin. If he bets too low, he won't maximize his long-term growth rate.

While is it true that the expected value of the game goes up with the bet size, the probability of ruin also goes up. The odds play a role, since the higher the odds the higher the fraction of wealth that should be allocated to a single bet.

## Example

Suppose you have a 60% chance of winning, and the odds are 1:1, and you have $1000 of initial wealth. 
1. Then the Kelly Criterion says you should bet 20% of your wealth.
2. Versus bet all at each stage. 

Why? How can we calculate probability of ruin?
Case 2 you have 99.9963% probability of ruin. 

### Big-O and little-o

Before we learn how to derive the formula, we need to learn about Big-O and little-o notation, since we will be dealing with approximations. Considering we start with an arbitrary complicated function $f(x)$, we want to write it as an approximation $a(n)$ plus an error $e(n)$. We want the approximation to be simple, and the error to be small. So we need a way to say the error is small without getting into the details of what the error is and how is it defined. This is where Big-O and little-o notation comes in.

Big-O informally means "up to the same general size as" amd little-o will mean "grows more slowly than". 
So, for a large enough $n$, $e(n)$ is bounded by a constant times $h(n)$, we write $e(n) = O(h(n))$.
If however, $|\frac{e(n)}{h(n)}|$ goes to zero as $n$ goes to infinity, we write $e(n) = o(h(n))$.

So for example $\sqrt{n} = o(n)$ and $o(1)$ vanishes as $n$ goes to infinity.

### Mean rate of return

You have found a bet where you have an edge and you can play repeatadly, and you have decided to bet a constant fixed fraction of your wealth on each bet. What is the mean rate of return of your wealth? 

So formally, it's simple:
if starting wealth is $W_0$, then the wealth after $n$ bets is $w_n = w_0X_1X_2...X_n$, where $X_i$ is the outcome of the $i$-th bet. Here $X_i$ is the random variable realization of the bet $i$.

Now we find an issue - repeated multiplication. Statistics is all about sums, not products. So we take the logarithm of both sides, turning the multiplication into addition, by using a trick that $y = e^{log(y)}$:

$$
\begin{align*}
w_n &= w_0X_1X_2...X_n \\
    &= e^{\log(w_0X_1X_2...X_n)} \\
    &= e^{\log(w_0) + \log(X_1) + \log(X_2) + ... + \log(X_n)}
\end{align*}
$$

We are not out of the woods yet, and it is still an ugly equation. On to our next trick in the toolbox - the Law of Large Numbers, that states that if $Y$ is a random variable then the num of $n$ independent samples $Y_1, .., Y_n$ boils down to $E(Y)n + o(n)$ where $E(Y)$ is the expected value or average of $Y$. So by applying this, we can write:

$$
\begin{align*}
w_n &= e^{\log(w_0) + \log(X_1) + \log(X_2) + ... + \log(X_n)} \\
    &= e^{\log(w_0) + nE(\log(X)) + o(n)} \\
    &= e^{\log(w_0)}e^{nE(\log(X))+o(1)n} \\
    &= w_0(e^{E(\log(X))+o(1)})^n \\
    & = w_0(e^{E(\log(X))}(1 + o(1)))^n
\end{align*}
$$

All the steps except the last rely on straightforward algebra manipulations, except the last step.
To understand why $ w_0(e^{E(\log(X))+o(1)})^n = w_0(e^{E(\log(X))}(1 + o(1)))^n $ holds, we need to delve into the properties of exponential functions and remember the concept of $ o(1) $ in asymptotic notation. Let's break it down:

1. **Exponential Function Expansion**: The term $ e^{E(\log(X)) + o(1)} $ can be interpreted as an exponential function with a sum in the exponent. We can use the property of exponentials where $ e^{a + b} = e^a \cdot e^b $ to rewrite this. Applying this to our equation gives:

   $e^{E(\log(X)) + o(1)} = e^{E(\log(X))} \cdot e^{o(1)}$

2. **Understanding $ o(1) $ in Exponential Terms**: The term $ o(1) $ represents a quantity that tends to 0 as $ n $ tends to infinity. In the context of exponential functions, $ e^{o(1)} $ approaches 1 as $ n $ becomes large. This is because $ e^0 = 1 $, and $ e^{o(1)} $ is essentially $ e $ raised to a power that is getting closer and closer to 0.

3. **Approximating $ e^{o(1)} $**: For sufficiently large $ n $, $ e^{o(1)} $ can be approximated as $ 1 + o(1) $. This is based on the fact that $ e^x $ can be expanded as a series $ 1 + x + x^2/2! + \ldots $, and for very small $ x $ (like $ o(1) $), the higher-order terms become negligible.

4. **Substituting Back into the Equation**: Replacing $ e^{o(1)} $ with $ 1 + o(1) $ in our original expression, we get:

   $$ e^{E(\log(X))} \cdot e^{o(1)} \approx e^{E(\log(X))} \cdot (1 + o(1)) $$

5. **Final Equation**: Substituting this back into the original equation gives us:

   $$ w_0(e^{E(\log(X))}(1 + o(1)))^n $$

The key step in this derivation is the approximation of $ e^{o(1)} $ as $ 1 + o(1) $, which is valid under the assumption that $ o(1) $ represents a quantity that becomes very small.
So given that in the long run $o(1)$ vanishes, our networth is multiplied by approximately $e^{E(\log(X))}$ on each bet. So the mean rate of return is $E(\log(X)) - 1$.

### The problem of Variance

The problem we now have to deal with now is variance. There can be large fluctuations on the way your path to the long term average. So we need to find a way to deal with variance.

Lets first define some terms:
- Expected Value: This is what people call the average or mean. Key fact to keep in mind is that the expected value of the sum of Random Variables is the equal to the sum of expected values. So $E(\sum_{i=1}^n X_i) = \sum_{i=1}^n E(X_i)$
- Deviation: This is basically the difference between the actual value and the expected value. So $X_i - E(X_i)$
- Variance: This is the expected value of the square of the deviation. So $E((X_i - E(X_i))^2)$. It has some nice properties, one of which is that the variance of the sum of independent random variables is the sum of the variances. So $Var(\sum_{i=1}^n X_i) = \sum_{i=1}^n Var(X_i)$
- Standard deviation: This is the square root of the variance. So $\sqrt{Var(X_i)}$

So, with that out of the, if we have a normal distribution with a measurable standard deviation we are in luck, since we know that 95% of the time the value will be within 2 standard deviations of the mean. Here we take advantage of another trick in our math toolbox, the Central Limit Theorem, which states that the sum - or average - of a large number of independent and identically distributed random variables will be approximately normally distributed, regardless of the original distribution of the original Random Variables. Note that the Central Limit Theorem applies to the sum or average of Random Variables, not to individual observations. Also note that the number of Random Variables needs to be sufficiently large, and that some distributions converge faster than others.

Going back to our average return equations, we saw that the log of our networth after many bets has the sum of many independent measurements of log(X). Hence, by the CLT, the log of our networth after many bets is approximately normally distributed. So we can use the normal distribution to estimate the probability of ruin.

In practice, lets estimate the log of our networth and take the exponential. We can see and measure $E(log(X))$. Lets name this expected value $irr$ for instantaneous rate of return. We can also measure the standard deviation of the log of our networth, by simply taking the variance and taking it's square root. Lets call this value $vol$ for volatility. The variance is $vol^2$. 

Taking that together with the fact that both expected values and variances sum, we find that the sum of $n$ realizations of $log(X)$ has an expected $n irr$ and a variance of $n vol^2$. So the standard deviation of the sum is $\sqrt{n} vol$. 

Taking a look at a z-table, we find for instance that the 10th percentile is 1.28 standard deviations out. So we can say that the probability of your networth being in the 10th percentile after $n$ bets is $1 - \Phi(\frac{-1.28 \sqrt{n} vol}{n irr})$ where $\Phi$ is the cumulative distribution function of the standard normal distribution.

### Formaly Deriving the Kelly Criterion

Lets use some calculus to derive the Kelly Criterion. We want to maximize the long-term growth rate of our wealth. So we want to maximize the expected value of the log of our networth. So we want to maximize $E(\log(X))$. 

now, if we are betting fraction $f$ of our networth, we have that:
$$
E(\log(X)) = p \log(1 + bf) + (1-p) \log(1 - f)
$$

where $p$ is the probability of winning, $b$ is the odds, and $f$ is the fraction of our networth we are betting. 

Now, we basically want to maximize this function. So we take the derivative with respect to $f$ and set it to zero. We get:

$$
\begin{align*}
\frac{d}{df} E(\log(X)) &= \frac{d}{df} p \log(1 + bf) + (1-p) \log(1 - f) \\
    &= pb \frac{1}{1 + bf} - (1-p) \frac{1}{1 - f} \\
    &= \frac{pb}{1 + bf} - \frac{1-p}{1 - f} \\
\end{align*}
$$

Setting the derivative to zero, we get:

$$
\begin{align*}
0 &= \frac{d}{df} E(\log(X)) \\
0 &= \frac{pb}{1 + bf} - \frac{1-p}{1 - f} \\
0 &= pb(1 - f) - (1-p)(1 + bf) \\
0 &= pb - pbf - 1 + p + pb - pbf \\
f &= \frac{pb - 1 + p}{b} \\
f &= \frac{pb - (1 - p)}{b}
\end{align*}
$$

And so, we have derived the Kelly Criterion.

## References

- [Lessons from Betting on a Biased Coin: Cool heads and cautionary tales](https://elmwealth.com/lessons-from-betting-on-a-biased-coin-cool-heads-and-cautionary-tales/)
- [Kelly Criterion](https://en.wikipedia.org/wiki/Kelly_criterion)
- [St. Petersburg Paradox](https://en.wikipedia.org/wiki/St._Petersburg_paradox)
- [Kelly Criterion in detail](https://www.elem.com/~btilly/kelly-criterion/)
