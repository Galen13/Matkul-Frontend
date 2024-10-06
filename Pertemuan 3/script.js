document.addEventListener('DOMContentLoaded', () => {
    // Task 1: Sorting Arrays
    const angka = [20, 10, 3, 30, 58, 42, 6, 9];
    const huruf = ['z', 'a', 'c', 'g', 'p'];

    document.getElementById('beforeAngka').innerText = 'Const Angka: ' + angka.join(', ');
    document.getElementById('beforeHuruf').innerText = 'Const Angka: ' + huruf.join(', ');

    angka.sort((a, b) => a - b);
    huruf.sort();

    document.getElementById('angka').innerText = 'Output: ' + angka.join(', ');
    document.getElementById('huruf').innerText = 'Output: ' + huruf.join(', ');

    // Task 2: Filtering Even Numbers
    const angka2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    document.getElementById('beforeEven').innerText = 'Const Angka: ' + angka2.join(', ');
    const evenNumbers = angka2.filter(num => num % 2 === 0);
    document.getElementById('even').innerText = 'Output: ' + evenNumbers.join(', ');

    // Task 3: Mapping to Boolean (Even or Odd)
    const angka3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    document.getElementById('beforeBoolean').innerText = 'Const Angka: ' + angka3.join(', ');
    const booleanArray = angka3.map(num => num % 2 === 0);
    document.getElementById('boolean').innerText = 'Output: ' + booleanArray.join(', ');
});