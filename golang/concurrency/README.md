# Go Concurrency Patterns

Mostly stuff from:

- https://blog.golang.org/pipelines
- https://talks.golang.org/2012/concurrency.slide

## Generator

Functions that return channel

```go
func boring(msg string) <-chan string { // Returns receive-only channel of strings.
    c := make(chan string)
    go func() { // We launch the goroutine from inside the function.
        for i := 0; ; i++ {
            c <- fmt.Sprintf("%s %d", msg, i)
            time.Sleep(time.Duration(rand.Intn(1e3)) * time.Millisecond)
        }
    }()
    return c // Return the channel to the caller.
}
```

## Fan-in

```go
func fanIn(input1, input2 <-chan string) <-chan string {
    c := make(chan string)
    go func() {
      for {
        select {
        case s := <-input1:
          c <- s
        case s := <-input2:
          c <- s
        }
      }
    }()
    return c
}
func main() {
    c := fanIn(boring("Joe"), boring("Ann"))
    for i := 0; i < 10; i++ {
        fmt.Println(<-c)
    }
    fmt.Println("You're both boring; I'm leaving.")
}
```

## Pipeline

```
a pipeline is a series of stages connected by channels, where each stage is a group of goroutines running the same function. In each stage, the goroutines
 
 - receive values from upstream via inbound channels
 - perform some function on that data, usually producing new values
 - send values downstream via outbound channels

```

See: [./pipeline.go](./pipeline.go)

## Fan-out

```
Multiple functions can read from the same channel until that channel is closed; this is called fan-out. This provides a way to distribute work amongst a group of workers to parallelize CPU use and I/O.

A function can read from multiple inputs and proceed until all are closed by multiplexing the input channels onto a single channel that's closed when all the inputs are closed. This is called fan-in.
```

See: [./fanout.go](./fanout.go)

## Explicit Cancellation

```cgo
When main decides to exit without receiving all the values from out, it must tell the goroutines in the upstream stages to abandon the values they're trying to send. It does so by sending values on a channel called done. It sends two values since there are potentially two blocked senders:

Here are the guidelines for pipeline construction:

stages close their outbound channels when all the send operations are done.
stages keep receiving values from inbound channels until those channels are closed or the senders are unblocked.

Pipelines unblock senders either by ensuring there's enough buffer for all the values that are sent or by explicitly signalling senders when the receiver may abandon the channel.
```

See: [./cancellation.go](./cancellation.go)
