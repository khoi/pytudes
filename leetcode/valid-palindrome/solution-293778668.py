class Solution:
    def isPalindrome(self, s: str) -> bool:
        i, j = 0, len(s) - 1
        while i <= j:
            if not s[i].isalpha() and not s[i].isdigit(): 
                i += 1
            elif not s[j].isalpha() and not s[j].isdigit():
                j -= 1
            elif s[i].lower() == s[j].lower():  
                i += 1
                j -= 1
            else:
                return False
        return True