class Solution {
   func reverse(_ a: Int) -> Int {
  var result = 0
  var isNegative = a < 0
  var num = abs(a)
  
  while num > 0 {
    result = result * 10 + num % 10;
    num /= 10
    if result < Int32.min || result > Int32.max {
      return 0
    }
  }
  
  return isNegative ? -result : result
}
}