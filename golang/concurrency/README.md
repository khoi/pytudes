# Go Concurrency Patterns

Mostly stuff from https://blog.golang.org/pipelines

## Pipeline

```
a pipeline is a series of stages connected by channels, where each stage is a group of goroutines running the same function. In each stage, the goroutines
 
 - receive values from upstream via inbound channels
 - perform some function on that data, usually producing new values
 - send values downstream via outbound channels

```

See: [./pipeline/main.go](./pipeline/main.go)

## Fan-out, Fan-in

```
Multiple functions can read from the same channel until that channel is closed; this is called fan-out. This provides a way to distribute work amongst a group of workers to parallelize CPU use and I/O.

A function can read from multiple inputs and proceed until all are closed by multiplexing the input channels onto a single channel that's closed when all the inputs are closed. This is called fan-in.
```

See: [./fan/main.go](./fan/main.go)

## Explicit Cancellation

```cgo
When main decides to exit without receiving all the values from out, it must tell the goroutines in the upstream stages to abandon the values they're trying to send. It does so by sending values on a channel called done. It sends two values since there are potentially two blocked senders:

Here are the guidelines for pipeline construction:

stages close their outbound channels when all the send operations are done.
stages keep receiving values from inbound channels until those channels are closed or the senders are unblocked.

Pipelines unblock senders either by ensuring there's enough buffer for all the values that are sent or by explicitly signalling senders when the receiver may abandon the channel.
```

See: [./cancellation/main.go](./cancellation/main.go)
