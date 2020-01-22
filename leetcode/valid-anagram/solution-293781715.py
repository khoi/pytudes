from collections import Counter
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        if len(s) != len(t):
            return False
        
        count = Counter()
        
        for i in range(0, len(s)):
            count[s[i]] += 1
            count[t[i]] -= 1
        
        for _, v in count.items():
            if v != 0:
                return False
        return True
