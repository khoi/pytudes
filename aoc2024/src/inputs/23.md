\--- Day 23: LAN Party ---
----------

As The Historians wander around a secure area at Easter Bunny HQ, you come across posters for a [LAN party](https://en.wikipedia.org/wiki/LAN_party) scheduled for today! Maybe you can find it; you connect to a nearby [datalink port](/2016/day/9) and download a map of the local network (your puzzle input).

The network map provides a list of every *connection between two computers*. For example:

```
kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn

```

Each line of text in the network map represents a single connection; the line `kh-tc` represents a connection between the computer named `kh` and the computer named `tc`. Connections aren't directional; `tc-kh` would mean exactly the same thing.

LAN parties typically involve multiplayer games, so maybe you can locate it by finding groups of connected computers. Start by looking for *sets of three computers* where each computer in the set is connected to the other two computers.

In this example, there are `12` such sets of three inter-connected computers:

```
aq,cg,yn
aq,vc,wq
co,de,ka
co,de,ta
co,ka,ta
de,ka,ta
kh,qp,ub
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn
ub,vc,wq

```

If the Chief Historian is here, *and* he's at the LAN party, it would be best to know that right away. You're pretty sure his computer's name starts with `t`, so consider only sets of three computers where at least one computer's name starts with `t`. That narrows the list down to `*7*` sets of three inter-connected computers:

```
co,de,ta
co,ka,ta
de,ka,ta
qp,td,wh
tb,vc,wq
tc,td,wh
td,wh,yn

```

Find all the sets of three inter-connected computers. *How many contain at least one computer with a name that starts with `t`?*

To begin, [get your puzzle input](23/input).

Answer:

You can also [Shareon [Bluesky](https://bsky.app/intent/compose?text=%22LAN+Party%22+%2D+Day+23+%2D+Advent+of+Code+2024+%23AdventOfCode+https%3A%2F%2Fadventofcode%2Ecom%2F2024%2Fday%2F23) [Twitter](https://twitter.com/intent/tweet?text=%22LAN+Party%22+%2D+Day+23+%2D+Advent+of+Code+2024&url=https%3A%2F%2Fadventofcode%2Ecom%2F2024%2Fday%2F23&related=ericwastl&hashtags=AdventOfCode) [Mastodon](javascript:void(0);)] this puzzle.