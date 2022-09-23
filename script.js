const calcola = document.getElementById('calcola');
const input = document.querySelectorAll(".valoriInput");
let valoriInput = {};
let risultati = new Array(3);


for (let i = 0; i < risultati.length; i++) {
  risultati[i] = {Kcal: 0, Grammi: 0, Percentuale: 0}
  //risultati.push({});
};

let totalePro, totaleFat, totaleCarb;
let totaleGrPro, totaleGrFat, totaleGrCarb;

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

let table = document.querySelector("table");
let data = Object.keys(risultati[0]);

let p = document.createElement('p');
let div = document.createElement('div');



calcola.addEventListener('click', function () {
  if (input[0].value == '') {
    p.innerText = 'Riempi il form';
    p.classList.add('errore');
    document.body.appendChild(p);
  } else {
    input.forEach(e => valoriInput[e.id] = Math.round(e.value * 1e2) / 1e2);

    let i = 0;
    while (i < risultati.length) {
      let n = i % 2 === 0 ? 4 : 9;
      let qty = i === 0 ? valoriInput.qtyPro : valoriInput.qtyFat;
      risultati[i]['Kcal'] = i !== 2 ? Math.round(valoriInput.peso * qty * n * 1e2) / 1e2 : valoriInput.totaleKcal - (risultati[1]['Kcal'] + risultati[0]['Kcal']);
      risultati[i]['Grammi'] = Math.round(risultati[i]['Kcal'] / n * 1e2) / 1e2;
      risultati[i]['Percentuale'] = Math.round(risultati[i]['Kcal'] / valoriInput.totaleKcal * 100);
      i++
    }
 
    // Add qtyCarb to the valoriInput obj
    valoriInput.qtyCarb = Math.round(risultati[2]['Grammi'] / valoriInput.peso * 1e2) / 1e2;
    // qtyCarb in the form
    document.getElementById('qtyCarb').value = valoriInput.qtyCarb;


    generateTableHead(table, data);
    generateTable(table, risultati);
    
  }
  console.log(valoriInput, risultati);
});


