input_file = open("day6.txt")
lines = input_file.read().splitlines()


class Star:
    def __init__(self, name):
        self.name = name
        self.orbits = set()
        self.parent = None

    def __eq__(self, other):
        return isinstance(other, Star) and self.name == other.name

    def __hash__(self):
        return hash(self.name)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

    def add_orbitter(self, o):
        self.orbits.add(o)
        o.parent = self


def fetch_or_create_star(star_name, universe):
    if star_name in universe:
        return universe[star_name]
    universe[star_name] = Star(star_name)
    return universe[star_name]


universe = {}

for l in lines:
    station_name, orbit_name = l.split(")")
    station_star = fetch_or_create_star(station_name, universe)
    orbit_star = fetch_or_create_star(orbit_name, universe)
    station_star.add_orbitter(orbit_star)


def count_orbits(s):
    if len(s.orbits) == 0:
        return 0
    return len(s.orbits) + sum([count_orbits(o) for o in s.orbits])


print("part 1 - total orbits: ")
print(sum([count_orbits(s) for s in universe.values()]))

# part 2
def path_to_root(star):
    path = []
    p = star.parent
    while p != None:
        path.append(p)
        p = p.parent
    return path


print("part 2, path SAN to YOU: ")
print(len(set(path_to_root(universe["YOU"])) ^ set(path_to_root(universe["SAN"]))))
