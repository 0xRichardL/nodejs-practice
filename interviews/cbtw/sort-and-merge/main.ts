type Person = {
  name: string;
  age: number;
}

type GroupedPeople = Record<string, Set<string>>

function sortAndMerge(people: Person[]): GroupedPeople {
  people.sort((a, b) => a.name < b.name ? -1 : 1);
  const grouped: GroupedPeople = {
    '0-20': new Set(),
    '21-40': new Set(),
    '41-60': new Set(),
    '>60': new Set()
  }
  for (const {name, age} of people) {
    const entries = Object.values(grouped);
    const idx = Math.min(Math.floor(age / 20), 3);
    entries[idx].add(name)
  }
  return grouped
}

function main() {
  const tests = [
    [
      {name: 'Alice', age: 30},
      {name: 'Alice', age: 31},
      {name: 'Alice', age: 32},
      {name: 'Bob', age: 15},
      {name: 'Charlie', age: 25},
      {name: 'David', age: 45},
      {name: 'Eve', age: 65}
    ],
    [
      {name: 'Frank', age: 10},
      {name: 'Grace', age: 20},
      {name: 'Heidi', age: 35},
      {name: 'Ivan', age: 55},
      {name: 'Judy', age: 75}
    ]
  ];
  for (const people of tests) {
    console.log(sortAndMerge(people));
  }
}
main();