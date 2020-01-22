from collections import Counter
class Solution:
    def firstUniqChar(self, s: str) -> int:
        cnt = Counter(s)
        for i in range(0, len(s)):
            if cnt[s[i]] == 1:
                   return i
        return -1