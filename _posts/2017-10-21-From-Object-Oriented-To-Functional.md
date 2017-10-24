
Many coders have heard of the term "functional programming", but have often never really used it or it's properties.  Especially if they came from Java, where there are no real functions, only methods (each function has to be attached to an object, and cannot stand by itself).  However, if you were to think of functions as data, limitations like having to attach a method to an object to define behavior goes away.  

To give an example of this, we will implement a calculator.  We will start with a more object oriented version, and then progressively replace functionality of the calculator with functional parts, while maintaining the same overall goal of having a calculator.



We want it to be able to Add, Subtract, and Multiply.  Let's define a _Calculator_ object to hold our accumulated value during calculations.  We'll also define a _Do_ method to compute an action.


```python
import math

class Calculator(object):
    def __init__(self):
        self.acc = 0.0
    
    def Do(self, opt, v):
        if opt == 'Add':
            self.acc += v
        elif opt == 'Sub':
            self.acc -= v
        elif opt == 'Mul':
            self.acc *= v
        else:
            print("Undefined Operation")
        
        return self.acc
```

The _Do_ method takes in a string _opt_ to determine which operation to conduct, and a value  _v_ (float or int).  It currently has three actions, and returns the accumulated value once it is done computing the value. 


```python
c = Calculator()
print(c.Do("Add", 100))
print(c.Do("Sub", 50))
print(c.Do("Mul", 2))
```

    100.0
    50.0
    100.0


Our _Calculator_ is quite limited as of right now.  It can't really do much.  If we wanted to add some other functionality to the calculator, such as calculating the square root of the accumulated value, it would require adding another ```elif``` to the _Do_ method.

We would have to add another conditional for _every_ operation we wanted to do.  This is not maintainable in the long run, and not user friendly.  If the user wanted to define his or her own operation to use with the calculator, they would have to edit the source code itself.  Let's see if we can move functionality outside of the Do method.  Let's rewrite our calculator a little bit.


```python
class Calculator(object):
    def __init__(self):
        self.acc = 0.0
    
    def Do(self, opfunc, v):
        
        self.acc = opfunc(self.acc, v)
        return self.acc
```

What this calculator does is to take in an operation function, as well as the previous value _v_.  Whenever Do is called, it calls the operation we pass in, using the accumulated value the Calculator object holds and and value _v_ passed in.  Now we can redefine our previous _Add_, _Sub_, and _Mul_ functions.

New operation functions can be defined with the schema
```
def Opt(value_a, value_b):
    return operation
```


```python
def Add(a, b):
    return a + b

def Sub(a, b):
    return a - b

def Mul(a, b):
    return a * b
```

To use this calculator, all we have to do is pass in the function to the _Do_ method.  This makes it very simple to define new operation functions and utilize them.


```python
c = Calculator()
print(c.Do(Add, 5))
print(c.Do(Sub, 3))
print(c.Do(Mul, 8))
```

    5.0
    2.0
    16.0


# Extending the Calculator

Now let's add some harder functions.  We want to write a _Sqrt_ function now.  


```python
def Sqrt(a, _):
    return math.sqrt(a)
```

Here is where our code got a little ugly.  _Sqrt_ doesn't need an extra value _v_ because it only acts on the accumulated value.  Which is why we have an underscore variable _ in place of v for the second parameter, because we ignore the input value _v_ anyway.  


```python
print(c.Do(Sqrt, 0)) # Last operand ignored
```

    4.0


'This occurs because our defined schema for the _Do_ method is rather restricting.  What if an operation only needs one parameter?  How about 3 parameters?  With the _Sqrt_ we could just ignore a parameter, but that's more of a hack than a real solution.  And notice that our _Sqrt_ function was really just a wrapper for the ```math.sqrt(a)``` from the standard library.  It would be more efficient and better if we could just pass in the ```math.sqrt(a)``` function to the _Do_ method instead.

Let's rewrite our operation functions from a function that takes two parameters and returns a value to a function that returns a function.  This returned function will take a value and return a value.


```python
def Add(v):
    def operation(acc):
        return acc + v
    return operation
```

We also need to update our _Do_ method.  _Do_ now takes in a function that takes in one value and returns a value.


```python
class Calculator(object):
    def __init__(self):
        self.acc = 0.0
    
    def Do(self, opfunc): 
        self.acc = opfunc(self.acc)
        return self.acc
```


```python
c = Calculator()
print(c.Do(Add(10)))
print(c.Do(Add(20)))
# print(c.Do(Mul, 8))
```

    10.0
    30.0


When calling _Do_, we don't call it with the _Add_ function itself, but the result of evaluating _Add(10)_.  The type of evaluating _Add(10)_ is a function that takes in a value and returning a value.  

What specifically is returned when we call _Add(10)_?  The result of the function looks like this

```
def operation(acc):
    return acc + 10
```

It returns a function that will only add ten to the variable _acc_.  If you did _Add(20)_ instead it would return a function that adds 20 to _acc_.

```
def operation(acc):
    return acc + 20
```

Thus we can easily define other functions like this as well.


```python
def Sub(v):
    def operation(acc):
        return acc - v
    return operation

def Mul(v):
    def operation(acc):
        return acc * v
    return operation
```


```python
c = Calculator()
print(c.Do(Add(5)))
print(c.Do(Sub(3)))
print(c.Do(Mul(8)))
```

    5.0
    2.0
    16.0


Now how would we implement _Sqrt_?  It's quite simple now.


```python
def Sqrt():
    def operation(acc):
        return math.sqrt(acc)
    return operation

c = Calculator()
print(c.Do(Add(5)))
print(c.Do(Sub(3)))
print(c.Do(Mul(8)))
print(c.Do(Sqrt()))
```

    5.0
    2.0
    16.0
    4.0


Our implementation avoids the awkardness of having to ignore an input variable.  But again _Sqrt_ is just a wrapper of ```math.sqrt(acc)```, so we can simply put that into the calculator instead.  We can also implement different operations with any number of inputs.


```python
def Crazy(a, b, c, d, e):
    def operation(acc):
        return (((a + b) * d) ** e) + (c * acc )
    return operation

c = Calculator()
print(c.Do(Add(5)))
print(c.Do(Sub(3)))
print(c.Do(Mul(8)))
print(c.Do(math.sqrt))
print(c.Do(math.cos))
print(c.Do(Crazy(1,2,3,4,5)))
```

    5.0
    2.0
    16.0
    4.0
    -0.6536436208636119
    248830.03906913742


Lastly, if we wanted to, we could get rid of the object _Calculator_ and simply have a closure function instead.  This makes our implementation nearly entirely purely functional.  We need the ```nonlocal``` statement to indicate that ```acc``` is not within the score of the inner function.

Note that because Calculator actually makes sense as an object (it's a noun), it would be better to leave it as an object.  However, this is just to show that closures can take the place of objects and can even be better.


```python
def Calculate():
    acc = 0.0
    def Do(opfunc): 
        nonlocal acc
        acc = opfunc(acc)
        return acc
    return Do
    
c = Calculate()
print(c(Add(5)))
print(c(Sub(3)))
print(c(Mul(8)))
print(c(math.cos))
print(c(Crazy(1,2,3,4,5)))
```

    5.0
    2.0
    16.0
    -0.9576594803233847
    248829.12702155902


# Conclusion

We went from a hard coded layered if statement to a function model, wherein we can pass in any function with any number of parameters to computer an accumulated value.  This kind of abstraction is the kind that can only be offered by functional programming.   
