---
published: true
title: Benchmarking Fib with Go
use_math: true
category: Go
layout: post
---


Go has a really nice testing suite built into it's compiler tool chains. It's as
simple as running `go test` in your package, and all files marked \*\_tests.go
will be executed. We can also run benchmarks with during testing, by adding the 
`-bench` flag to the `go test` command. I never really benchmarked anything 
before, so I decided to explore Go's benchmarking utilities, and flex some of my 
algorithm skills in the process. Naturally I decided implement the Fibonacci sequence many, many times over. 

The repository lies at <https://github.com/TerrenceHo/fib>, where you can 
use git to clone it.  You can also use `go get github.com/TerrenceHo/fib` 
if you have a go runtime, which you'll need to run tests.  The file 
`fib.go` holds various fibconacci implementations and some documentation.  
The associated tests and benchmarks lie in `fib_test.go`. To run the benchmarks,
use `go test -bench=.`. To just run the tests, use `go test .` My benchmarks are
at the bottom of the article, but we refer to these benchmarks multiple times in
our discussion. I encourage you to try these benchmarks for yourselves.

### FibRecursive: Exponential Recursive

``` 
func FibRecursive(n int) int {
    if n < 2 {
        return n
    } 
    return FibRecursive(n-1) + FibRecursive(n-2)
} 
``` 

The most basic Fib sequence algorithm known to man, `FibRecursive` boasts
a mighty exponential $O(2^n)$ run time, and is so slow I can't even run
`FibRecursive(64)` on my laptop without having to wait for an eternity.  
The reason being, for an input $n$, $n+1$ takes almost twice as long to 
computer, since the recursive tree makes two recursive calls each level 
and doubles the computation need for the next level.  

![fibtree5]({{ "/assets/fibtree5.png" | absolute_url }})

In our testing suite, we max our runtimecalls at $n$=32. Memory-wise, 
`FibRecursive` is also inefficient, since each function call
creates adds to the function call stack, and so runs the danger of 
actually running out of memory at high inputs.

`FibRecursive` is clearly unoptimal and so the next few examples of Fibonacci
show slightly more optimized versions.

### FibRecursiveCache: Exponential Recursive Cache 

``` 
func FibRecursiveCache(n int) int {
    cache := make([]int, n+1, n+1) 
    fibRecursiveCache(n, &cache) 
    return cache[n]
}

func fibRecursiveCache(n int, cache *[]int) {
    if n < 2 {
        (*cache)[0] = 0 
        (*cache)[1] = 1 
        return
    } 
    fibRecursiveCache(n-1, cache)

    (*cache)[n] = (*cache)[n-1] + (*cache)[n-2]
} 
```

We notice from the previous expanded `FibRecursive` tree that many values are
computed many times (i.e. `FibRecursive(2)` is computed thrice). What if 
we compute these values once, and then store it? We can optimize our previous 
algorithm by caching previous computed values in an array. In doing so, we 
lower our runtime from exponential to linear $O(n)$, since we cut off most of the
computation tree.

![fibtree5Linear]({{ "/assets/fibtree5Linear.png" | absolute_url }})

`FibRecursiveCache` recurses from $n$ to 1, and then builds the cache 
going backwards.  The left-most value in our array holds our final answer.
`FibRecursiveCache` ends up with both a linear runtime and linear memory 
usage, due to the array cache.  

So where can we improve from here? Let's set aside the runtime optimizations for
now, and tackle the memory issue first. If we can get rid of the entire cache,
we could save a lot of memeory, since memory is not infinite nor free even on
modern computers. The Fibonacci only requires the addition of the two previous
terms. So really, we don't need to save all previously calculated Fibonacci
values. We can make do with just the previous two, leading us to...

### FibIterative: Linear Iterative Implementation 

``` 
func FibIterative(n int) int {
    var temp int 
    first := 0 
    second := 1 
    for i := 0; i < n-1; i++ {
        temp = second 
        second = first + second 
        first = temp
    } 
    return second
} 
```

`FibIterative` takes the concept that we do not really need to keep every
previous computed value, only the previous number. Thus we get rid of the 
cache entirely and instead add the two previous numbers together in a 
loop. This eliminates the need to keep the entire cache in memory, while 
keeping the runtime linear, and making the memory required constant.

`FibIterative` and `FibRecursiveCache` both have a linear runtime, but
`FibIterative` performs better on benchmarks, largely due to practical computer
limitations. Performing function calls is slower than iterating through a loop,
since the program must deal with managing the function call stack compared to
simply incrementing a variable. Thus, on my computer anyway, the iterative
implementation is faster.

### FibTailRecursive: Tail Recursive Implementation

``` 
func FibTailRecursive(n int) int {
    return fibTailRecursive(n, 0, 1)
}

func fibTailRecursive(n, first, second int) int {
    if n == 0 {
        return first
    }
    return fibTailRecursive(n-1, second, first+second)
} 
``` 

This is another linear implementation of the Fibonacci sequence. 
`FibTailRecursive` does not build a cache, but is really a recursive
implementation of the iterative implementation. This is more akin to a
"functional" implementation, replacing the for loops, a construct that 
does not exist in most functional languages.

On benchmarks, `FibTailRecursive` performs better than `FibRecursiveCache`, but
still worse than `FibIterative`, once again due to having to deal with the
function call stack. Interestingly, due to this function call stack,
`FibTailRecursive` could be considered linear in memory usage, since one
function frame is added to the call stack every time `fibTailRecursive` is
called. If you consider recursive calls taking memory on the call stack, this 
is linear in both runtime and memory.

Let's see if we can still find a faster implementation for the Fibonacci
sequence.

### FibPowerMatrix: Linear Matrix Implementation 

``` 
func FibPowerMatrix(n int) int {
    F := [2][2]int{
        [2]int{1, 1}, 
        [2]int{1, 0},
    } 
    if n == 0 {
        return 0
    } 
    fibPower(&F, n-1) return F[0][0]
}

func fibPower(F *[2][2]int, n int) {
    M := [2][2]int{
        [2]int{1, 1}, 
        [2]int{1, 0},
    } 
    
    for i := 2; i <= n; i++ {
        fibMultiply(F, &M)
    }
}

func fibMultiply(F *[2][2]int, M *[2][2]int) {
    f := *F
    m := *M
    x := f[0][0]*m[0][0] + f[0][1]*m[1][0]
    y := f[0][0]*m[0][1] + f[0][1]*m[1][1]
    z := f[1][0]*m[0][0] + f[1][1]*m[1][0]
    w := f[1][0]*m[0][1] + f[1][1]*m[1][1]

    (*F)[0][0] = x
    (*F)[0][1] = y
    (*F)[1][0] = z
    (*F)[1][1] = w
}
```

For the unintiated, this algorithm looks a rather complicated. It utilizes 2x2
matrix multiplication, and it is not immediately obvious how matrix
multiplcation can help solve the Fibonacci sequence. We shall prove the
following theorem, where $$F_{n}$$ represents the Fibonacci sequence at step
$n$.

$$
M = 
\left( \begin{array}{ccc}
F_{n+1} & F_{n} \\
F_{n} & F_{n-1} \\
\end{array} \right)
=
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^n
$$

For $n=1$, 

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^1
= 
\left( \begin{array}{ccc}
F_{2} & F_{1} \\
F_{1} & F_{0} \\
\end{array} \right)
$$

Which is obvious, these are the first three values in the Fibonacci sequence,
\((1, 1, 0\)).

Assume that this step holds for $n=k$.

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^k
= 
\left( \begin{array}{ccc}
F_{k+1} & F_{k} \\
F_{k} & F_{k-1} \\
\end{array} \right)
$$

Now we attempt to prove that the statement still holds for $n=k+1$, and so the
statement would be solved. We multiple both sides by 
$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)
$$

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^k
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)
= 
\left( \begin{array}{ccc}
F_{k+1} & F_{k} \\
F_{k} & F_{k-1} \\
\end{array} \right)
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)
$$

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^{k+1}
= 
\left( \begin{array}{ccc}
F_{k+1} + F_{k} & F_{k+1} \\
F_{k} F_{k-1} & F_{k} \\
\end{array} \right)
$$

This implies that

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^{k+1}
= 
\left( \begin{array}{ccc}
F_{k+2} & F_{k+1} \\
F_{k+1} & F_{k} \\
\end{array} \right)
$$

Thus, by proof by induction, our assumption holds true for any $n=k+1$. This is
basically a simple way to increment the Fibonacci sequence once every matrix
multiplcation. We calculate the matrices in a loop, similiar to our tail
recursive implementation. Our final answer will be held in the $F_{k+2}$ after
$n$ iterations.

However, this is still a linear runtime implementation. Worse, since matrix
muliplication involves more operations, it is slower than most of our other
linear implementations. However, matrix multiplcation opens up a trick to gain a
massive speed boost.

### FibPowerMatrixRecursive: Log\((n\)) Matrix Implementation 

``` 
func FibPowerMatrixRecursive(n int) int {
    F := [2][2]int{
        [2]int{1, 1}, 
        [2]int{1, 0},
    }

    if n == 0 {
        return 0
    } 
    fibPowerRecursive(&F, n-1) return F[0][0]
}

func fibPowerRecursive(F *[2][2]int, n int) {
    if n == 0 || n == 1 {
    return
    }

    M := [2][2]int{
        [2]int{1, 1}, 
        [2]int{1, 0},
    } 
    fibPowerRecursive(F, n/2) 
    fibMultiply(F, F) 
    if n%2 != 0 {
        fibMultiply(F, &M)
    }
} 
``` 

`FibPowerMatrixRecursive` is pretty similiar to the previous implementation.
However, it uses exponentiation to calculate matrices, rather than simply
multipling the previous result to 
$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^{k}
$$

Ignoring matrices for now, consider calculating 2^8.  We can compute that as 
$2 * 2 * 2 * 2 * 2 * 2 * 2 * 2$, and multiple across, which would require 7 
multiplication operations. However, you can achieve the same result by using 
$4 * 4 * 4 * 4$, and $2 * 2 = 4$. So we can multiply $2 * 2$ once to get $4$, and
then use that result to finish the calculation. But we can do that previous step
multiple times, and so $4 * 4 = 16$, $16 * 16 = 256 = 2^8$. So rather than 7
multiplcation steps, we achieved the same result with 3 steps.

$2*2 = 4$

$4*4 = 16$

$16 * 16 = 256$

This formula is known as the fast exponentiation formula. It brings
exponentiation from a linear runtime to a logarithmic runtime, which halves the
amount of work every iteration. We can apply the same logic to matrices,
squaring the matrices every iteration rather than simply multiplying straight
across. In math notation, this would look something like:

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^n
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^n
=
\left( \begin{array}{ccc}
F_{k+1} & F_{k} \\
F_{k} & F_{k-1} \\
\end{array} \right)
\left( \begin{array}{ccc}
F_{k+1} & F_{k} \\
F_{k} & F_{k-1} \\
\end{array} \right)
$$

$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)^{2n}
=
\left( \begin{array}{ccc}
F^2_{k+1} + F^2_{k} & F_{k+1}F_{k} + F_{k}F_{k-1} \\
F_{k+1}F_{k} + F_{k}F_{k-1} & F^2_{k} + F^2_{k-1} \\
\end{array} \right)
$$

If $n$ was odd, then we would multiply once more by 
$$
\left( \begin{array}{ccc}
1 & 1 \\
1 & 0 \\
\end{array} \right)
$$

Because we half the work necessary each matrix multiplcation, this qualifies as
a $O(log_n)$ implementation. However, that does not mean it's automatically faster
than the linear implementations. Due to the overhead in matrix multiplcation, it
is actually slower for low values of $n$, which on my computer was $n<1024$.

### Benchmarks 

We test our benchmarks on values $Fib(n)$, where 
$n = {1,2,4,8,16,32,64,128,1024}$ (except for `FibTestRecursive`, we stop at 
$n=32$ because any higher values of $n$ simply takes too long to run).

Here are the benchmarks on for `fib` on my computer.

``` 
BenchmarkFibRecursive1-8                2000000000  1.93 ns/op
BenchmarkFibRecursive2-8                300000000   5.31 ns/op
BenchmarkFibRecursive4-8                100000000   16.9 ns/op
BenchmarkFibRecursive8-8                10000000    128  ns/op
BenchmarkFibRecursive16-8               200000      6196 ns/op
BenchmarkFibRecursive32-8               100     13737437 ns/op
BenchmarkFibIterative1-8                1000000000  2.09 ns/op
BenchmarkFibIterative2-8                500000000   3.03 ns/op
BenchmarkFibIterative4-8                300000000   4.36 ns/op
BenchmarkFibIterative8-8                200000000   6.68 ns/op
BenchmarkFibIterative16-8               100000000   11.4 ns/op
BenchmarkFibIterative32-8               50000000    26.5 ns/op
BenchmarkFibIterative64-8               50000000    40.7 ns/op
BenchmarkFibIterative128-8              20000000    84.1 ns/op
BenchmarkFibIterative1024-8             2000000     621  ns/op 
BenchmarkFibRecursiveCache1-8           50000000    25.2 ns/op
BenchmarkFibRecursiveCache2-8           50000000    30.6 ns/op
BenchmarkFibRecursiveCache4-8           50000000    38.9 ns/op
BenchmarkFibRecursiveCache8-8           30000000    57.1 ns/op
BenchmarkFibRecursiveCache16-8          20000000    93.2 ns/op
BenchmarkFibRecursiveCache32-8          10000000    170  ns/op
BenchmarkFibRecursiveCache64-8          5000000     328  ns/op
BenchmarkFibRecursiveCache128-8         2000000     633  ns/op
BenchmarkFibRecursiveCache1024-8        300000      4767 ns/op
BenchmarkFibTailRecursive1-8            200000000   6.18 ns/op
BenchmarkFibTailRecursive2-8            200000000   8.30 ns/op
BenchmarkFibTailRecursive4-8            100000000   12.7 ns/op
BenchmarkFibTailRecursive8-8            50000000    24.3 ns/op
BenchmarkFibTailRecursive16-8           30000000    47.0 ns/op
BenchmarkFibTailRecursive32-8           20000000    86.8 ns/op
BenchmarkFibTailRecursive64-8           10000000    183  ns/op
BenchmarkFibTailRecursive128-8          5000000     342  ns/op
BenchmarkFibTailRecursive1024-8         500000      2731 ns/op
BenchmarkFibPowerMatrix1-8              200000000   6.25 ns/op
BenchmarkFibPowerMatrix2-8              200000000   6.34 ns/op
BenchmarkFibPowerMatrix4-8              50000000    24.7 ns/op
BenchmarkFibPowerMatrix8-8              30000000    57.8 ns/op
BenchmarkFibPowerMatrix16-8             10000000    123  ns/op
BenchmarkFibPowerMatrix32-8             5000000     255  ns/op
BenchmarkFibPowerMatrix64-8             3000000     516  ns/op
BenchmarkFibPowerMatrix128-8            1000000     1034 ns/op
BenchmarkFibPowerMatrix1024-8           200000      8349 ns/op
BenchmarkFibPowerMatrixRecursive1-8     300000000   4.45 ns/op
BenchmarkFibPowerMatrixRecursive2-8     300000000   4.79 ns/op
BenchmarkFibPowerMatrixRecursive4-8     50000000    24.0 ns/op
BenchmarkFibPowerMatrixRecursive8-8     30000000    45.0 ns/op
BenchmarkFibPowerMatrixRecursive16-8    20000000    65.9 ns/op
BenchmarkFibPowerMatrixRecursive32-8    20000000    86.2 ns/op
BenchmarkFibPowerMatrixRecursive64-8    20000000    107  ns/op
BenchmarkFibPowerMatrixRecursive128-8   10000000    127  ns/op
BenchmarkFibPowerMatrixRecursive1024-8  10000000    187  ns/op 
```

The two noteworthy are `BenchmarkFibPowerMatrixRecursive1024-8` and
`BenchmarkFibIterative1024-8`, which clocked in at 187 ns/op and 621 ns/op,
showing that as ${n\to\infty}$, the $O(log_n)$ implementation does indeed scale
better. However, at lower values of $n$, the iterative implementation should
still be used.

### Conclusion
Well, we've learned to benchmark programs in Go, and tested out real world
implications of complexity analysis. Good algorithms do really matter after all.
