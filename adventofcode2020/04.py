import re


def validate_field_exists(passport, fields):
    valid_count = 0
    for entry in passport.split(" "):
        field, value = entry.split(":")
        if field in fields and entry:
            valid_count += 1
    return valid_count == len(fields)


def height_validator(s):
    is_cm = s.endswith("cm")
    is_inch = s.endswith("in")
    if not is_cm and not is_inch:
        return False
    height_value = int(s[:-2])
    if is_cm:
        return 150 <= height_value <= 193
    return 59 <= height_value <= 76


def validate_field_with_validator(passport, fields_with_validator):
    valid_count = 0
    for entry in passport.split(" "):
        field, value = entry.split(":")
        if field in fields_with_validator and fields_with_validator[field](value):
            valid_count += 1
    return valid_count == len(fields_with_validator)


if __name__ == "__main__":
    with open("inputs/04.txt") as f:
        lines = [l.strip().replace("\n", " ") for l in f.read().split("\n\n")]

    required_fields = {"byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"}

    print(sum([1 for l in lines if validate_field_exists(l, required_fields)]))

    required_fields_with_validators = {
        "byr": lambda s: 1920 <= int(s) <= 2002,
        "iyr": lambda s: 2010 <= int(s) <= 2020,
        "eyr": lambda s: 2020 <= int(s) <= 2030,
        "hgt": height_validator,
        "hcl": lambda s: re.match("^#[0-9a-fA-F]{6}$", s),
        "ecl": lambda s: s in {"amb", "blu", "brn", "gry", "grn", "hzl", "oth"},
        "pid": lambda s: re.match("^\d{9}$", s),
    }

    print(
        sum(
            [
                1
                for l in lines
                if validate_field_with_validator(l, required_fields_with_validators)
            ]
        )
    )
