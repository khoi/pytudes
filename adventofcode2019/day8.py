import numpy as np

input_file = open("day8.txt")
lines = input_file.read().splitlines()
rawInput = lines[0]


np.set_printoptions(linewidth=250)


arr = np.array([int(c) for c in lines[0]])

W = 25
H = 6

arr = arr.reshape(-1, W * H)
summary = []

for i in range(arr.shape[0]):
    zeros = len(arr[i][arr[i] == 0])
    ones = len(arr[i][arr[i] == 1])
    twos = len(arr[i][arr[i] == 2])
    summary.append([zeros, ones, twos])

summary.sort(key=lambda x: x[0])

print(summary[0][1] * summary[0][2])

# part 2
output_image = np.full(W * H, 2)


for j in range(0, W * H):
    for i in range(0, arr.shape[0]):  # walk through the image backward
        if arr[i, j] == 2:
            continue
        output_image[j] = arr[i, j]
        break


print(output_image.reshape(H, W))
