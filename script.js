const calcola = document.getElementById('calcola');
const input = document.querySelectorAll(".valoriInput");

let valoriInput = {};
let risultati = new Array(3);

for (let i = 0; i < risultati.length; i++) {
  risultati[i] = {
    Kcal: 0,
    Grammi: 0,
    Percentuale: 0
  };
}
const table = document.querySelector("table");
let data = Object.keys(risultati[0]);

const generateTableHead = (table, data) => {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
};
const generateTable = (table, data) => {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
  
};

const calcolo = () => {
  let i = 0;
  while (i < risultati.length) {
    let n = i % 2 === 0 ? 4 : 9;
    let qty = i === 0 ? valoriInput.qtyPro : valoriInput.qtyFat;
    risultati[i].Kcal = i !== 2 ? Math.round(valoriInput.peso * qty * n * 1e2) / 1e2 : valoriInput.totaleKcal - (risultati[1].Kcal + risultati[0].Kcal);
    risultati[i].Grammi = Math.round(risultati[i].Kcal / n * 1e2) / 1e2;
    risultati[i].Percentuale = Math.round(risultati[i].Kcal / valoriInput.totaleKcal * 100) || 0;
    i++;
  };
  valoriInput.qtyCarb = Math.round(risultati[2].Grammi / valoriInput.peso * 1e2) / 1e2;
  document.getElementById('qtyCarb').value = Math.round(risultati[2].Grammi / valoriInput.peso * 1e2) / 1e2 || '';
}

const resetTable = () => {
  if (document.querySelector("thead")) {
    document.querySelector("thead").remove()
  }
}
calcola.addEventListener('click', function () {
  input.forEach(e => valoriInput[e.id] = Math.round(e.value * 1e2) / 1e2);
  resetTable();
  calcolo();
  generateTableHead(table, data);
  generateTable(table, risultati);
});