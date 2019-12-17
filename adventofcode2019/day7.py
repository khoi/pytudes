from intcode import IntCode
import itertools

input_file = open("day7.txt")
lines = input_file.read().splitlines()
instruction = [int(i) for i in lines[0].split(",")]


def find_max_thrust(program, number_of_amps):
    phase_settings = itertools.permutations(range(number_of_amps))
    max_thrust = 0

    for p in phase_settings:
        amps = [IntCode(program) for i in range(number_of_amps)]
        output = 0
        for i in range(0, len(amps)):
            output = amps[i].run([p[i], output])[-1]
            max_thrust = max(output, max_thrust)

    return max_thrust


def find_max_thurst_feedback_loop(program, number_of_amps, phase_settings):
    max_thrust = 0

    for p in phase_settings:
        amps = [IntCode(program) for i in range(number_of_amps)]
        output = 0
        first_phase = True
        idx = 0

        while not amps[-1].halt:
            if first_phase:
                output = amps[idx].run([p[idx], output])[-1]
            else:
                output = amps[idx].run([output])[-1]
            idx += 1
            if idx == number_of_amps:
                first_phase = False
                idx = 0

        max_thrust = max(max_thrust, output)

    return max_thrust


print(find_max_thrust(instruction, 5))
print(
    find_max_thurst_feedback_loop(
        instruction, 5, list(itertools.permutations(range(5, 10)))
    )
)
