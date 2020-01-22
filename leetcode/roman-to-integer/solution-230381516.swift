class Solution {
    

    func romanToInt(_ s: String) -> Int {
        var dict: [Character: Int] = ["I": 1,
                    "V":5,
                    "X":10,
                    "L":50,
                    "C":100,
                    "D":500,
                    "M":1000]
        var result = 0
        var input = Array(s)
        
        for i in 0..<input.count {
            if i == (input.count - 1) {
                result += dict[input[i]]!
            } else {
                if dict[input[i]]! >= dict[input[i+1]]! { 
                    result += dict[input[i]]!
                } else {
                    result -= dict[input[i]]!
                }
            }
        }
        return result

    }
}