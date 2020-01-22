from collections import Counter
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        count = Counter(s)
        
        for c in t:
            count[c] -= 1
        
        for _, v in count.items():
            if v != 0:
                return False
        return True
