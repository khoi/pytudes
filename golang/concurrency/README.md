# Go Concurrency Patterns


## Pipeline

```
a pipeline is a series of stages connected by channels, where each stage is a group of goroutines running the same function. In each stage, the goroutines
 
 - receive values from upstream via inbound channels
 - perform some function on that data, usually producing new values
 - send values downstream via outbound channels

https://blog.golang.org/pipelines
```

See: [./pipeline/main.go](./pipeline/main.go)

## Fan-out, Fan-in

```
Multiple functions can read from the same channel until that channel is closed; this is called fan-out. This provides a way to distribute work amongst a group of workers to parallelize CPU use and I/O.

A function can read from multiple inputs and proceed until all are closed by multiplexing the input channels onto a single channel that's closed when all the inputs are closed. This is called fan-in.
```

See: [./fan/main.go](./fan/main.go)
