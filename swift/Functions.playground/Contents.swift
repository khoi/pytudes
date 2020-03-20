import Cocoa

func incr(a: Int) -> Int {
  a + 1
}

func square(a: Int) -> Int {
  a * a
}

precedencegroup ForwardApplication {
  associativity: left
}

infix operator |> : ForwardApplication

func |> <A, B>(a: A, f: (A) -> B) -> B {
  f(a)
}

2 |> incr
2 |> incr |> square

precedencegroup ForwardComposition {
  associativity: left
  higherThan: ForwardApplication
}
 
infix operator >>> : ForwardComposition

func >>> <A, B, C>(f: @escaping (A) -> B, g: @escaping (B) -> C) -> (A) -> C {
  { a in
    g(f(a))
  }
}
 
2 |> incr >>> square
2 |> incr >>> square >>> String.init
