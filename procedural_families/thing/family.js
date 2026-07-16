async function randomPerson() {
    const res = await fetch("https://randomuser.me/api/?gender=random");
    const data = await res.json();

    return data;
}

class Person {
    constructor(id) {
        this.id = id;
        this.name = "";
        this.gender = "";
        this.age = 0;

        this.parents = [];
        this.children = [];
        this.partner = null;

        this.birthYear = 0;
        this.deathYear = null;
    }
}

const people = new Map();

function addPerson(person) {
    people.set(person.id, person);
}

function haveChild(parent1, parent2) {
    const child = new Person(nextID++);

    child.parents.push(parent1.id, parent2.id);

    parent1.children.push(child.id);
    parent2.children.push(child.id);

    child.birthYear = Math.max(parent1.birthYear, parent2.birthYear) + Math.floor((Math.random() + 20) * 25); // 20 - 45
    if (Math.random < 0.1) {
        // adds a dash inbetween both last names
    } else {
        // fathers last name
    }
    addPerson(child);
    

    return child;
}