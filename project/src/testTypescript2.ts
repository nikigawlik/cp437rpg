function fucker(person) {
    return "Fuck " + person + " in the ass.";
}

class Fucker {
    public fullName: string;
    constructor(private name : string, private object : string) {
        this.fullName = name + ' the ' + object + ' fucker';
    }

    greet() {
        console.log('You greet ' + this.fullName + '.');
    }
}

var fucktwat = new Fucker('Tim', 'pillow');

var twet : Fucker;

console.log(fucktwat.fullName);
console.log(fucktwat);

main();