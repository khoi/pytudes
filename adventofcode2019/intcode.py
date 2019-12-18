HALT = 99
ADD = 1
MULT = 2
INPUT = 3
OUTPUT = 4
JUMP_TRUE = 5
JUMP_FALSE = 6
LESS_THAN = 7
EQUALS = 8
ADJUST_RELATIVE_BASE = 9

POSITION_MODE = 0
IMMEDIATE_MODE = 1
RELATIVE_MODE = 2


class IntCode:
    def __init__(self, programs, mem_capacity=0x1000):
        self.ram = programs + [0] * mem_capacity
        self.pointer = 0
        self.halt = False
        self.rel_base = 0

    def get_addr(self, mode, i):
        assert i >= 0, f"invalid address {i}"
        if mode == POSITION_MODE:
            return self.ram[i]
        elif mode == IMMEDIATE_MODE:
            return i
        elif mode == RELATIVE_MODE:
            return self.rel_base + self.ram[i]
        else:
            raise Exception(f"unsupported mode {mode}")

    def run(self, inputs):
        outputs = []
        input_pointer = 0
        while self.ram[self.pointer] != HALT:
            instruction = self.ram[self.pointer]
            op = instruction % 100

            def address_param_idx(i):
                return self.get_addr(
                    instruction // (100 * (10 ** i)) % 10, self.pointer + i + 1
                )

            if op == ADD or op == MULT:
                f = {ADD: int.__add__, MULT: int.__mul__}
                self.ram[address_param_idx(2)] = f[op](
                    self.ram[address_param_idx(0)], self.ram[address_param_idx(1)]
                )
                self.pointer += 4
            elif op == INPUT:
                if input_pointer > len(inputs) - 1:
                    return outputs  # waiting for input
                self.ram[address_param_idx(0)] = inputs[input_pointer]
                input_pointer += 1
                self.pointer += 2
            elif op == OUTPUT:
                outputs.append(self.ram[address_param_idx(0)])
                self.pointer += 2
            elif op == JUMP_TRUE:
                self.pointer = (
                    self.ram[address_param_idx(1)]
                    if self.ram[address_param_idx(0)] != 0
                    else (self.pointer + 3)
                )
            elif op == JUMP_FALSE:
                self.pointer = (
                    self.ram[address_param_idx(1)]
                    if self.ram[address_param_idx(0)] == 0
                    else self.pointer + 3
                )
            elif op == LESS_THAN:
                self.ram[address_param_idx(2)] = (
                    1
                    if self.ram[address_param_idx(0)] < self.ram[address_param_idx(1)]
                    else 0
                )
                self.pointer += 4
            elif op == EQUALS:
                self.ram[address_param_idx(2)] = (
                    1
                    if self.ram[address_param_idx(0)] == self.ram[address_param_idx(1)]
                    else 0
                )
                self.pointer += 4
            elif op == ADJUST_RELATIVE_BASE:
                self.rel_base += self.ram[address_param_idx(0)]
                self.pointer += 2
            else:
                raise Exception(f"unsupported op  {op}")
        self.halt = True
        return outputs


if __name__ == "__main__":
    # Some assertions to make sure Intcode works properly
    # https://adventofcode.com/2019/day/5
    test_prog = [
        3,
        21,
        1008,
        21,
        8,
        20,
        1005,
        20,
        22,
        107,
        8,
        21,
        20,
        1006,
        20,
        31,
        1106,
        0,
        36,
        98,
        0,
        0,
        1002,
        21,
        125,
        20,
        4,
        20,
        1105,
        1,
        46,
        104,
        999,
        1105,
        1,
        46,
        1101,
        1000,
        1,
        20,
        4,
        20,
        1105,
        1,
        46,
        98,
        99,
    ]
    assert IntCode(test_prog).run([7])[-1] == 999
    assert IntCode(test_prog).run([8])[-1] == 1000
    assert IntCode(test_prog).run([9])[-1] == 1001

    quine_prog = [
        109,
        1,
        204,
        -1,
        1001,
        100,
        1,
        100,
        1008,
        100,
        16,
        101,
        1006,
        101,
        0,
        99,
    ]
    assert IntCode(quine_prog).run([]) == quine_prog

    assert IntCode([1102, 34915192, 34915192, 7, 4, 7, 99, 0]).run([]) == [
        1219070632396864
    ]
    assert IntCode([104, 1125899906842624, 99]).run([]) == [1125899906842624]
    print("IntCode seems to be ok")
