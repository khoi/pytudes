class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        if len(strs) == 0:
            return ""
        minLength = min(map(lambda s: len(s), strs))
        i = 0
        while i < minLength:
            c = strs[0][i]
            for j in range(1, len(strs)):
                if strs[j][i] != c:
                    return strs[0][0:i]
            i += 1
        return strs[0][0:i]