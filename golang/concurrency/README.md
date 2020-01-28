# Go Concurrency Patterns


## Pipeline

```
a pipeline is a series of stages connected by channels, where each stage is a group of goroutines running the same function. In each stage, the goroutines
 
 - receive values from upstream via inbound channels
 - perform some function on that data, usually producing new values
 - send values downstream via outbound channels

https://blog.golang.org/pipelines
```

Example: [./pipeline/main.go](./pipeline/main.go)

