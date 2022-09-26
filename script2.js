const DEV = true;
// Functions
const log = (text) => {
    console.log(text);
};
const getID = (ID) => {
    return document.getElementById(ID);
}
const querySelectorAll = (SELECTOR) => {
    return document.querySelectorAll(SELECTOR);
}
const resetAll = (a) => {
    a.forEach(e => e.value = '')
};
const htmlToObj = (a, o) => {
    a.forEach(e => o[e.name] = parseFloat(e.value) || 0);
};

const calcoloMacros = (k) => {
    let i = 0;
    while (i < k.length) {
        let N = (k[i][0] === 'Grassi') ? 9 : 4;
        let peso = totale.input.peso;
        let qtyPro = totale.input.qtyPro;
        let qtyFat = totale.input.qtyFat;
        let qty = (N === 9) ? qtyFat : qtyPro;
        k[i][1].Kcal = (k[i][0] === 'Carboidrati') ? totale.input.totaleKcal - ((peso * qtyPro * 4) + (peso * qtyFat * 9)) : peso * qty * N;
        k[i][1].Grammi = k[i][1].Kcal / N;
        k[i][1].Percentuale = Number(parseFloat(totaleMacros[i][1].Kcal / totale.input.totaleKcal * 100).toFixed(1)) || 0;
        i++;
    }
    return console.log(totale.macros)
};

const printResults = (el, data) => {
  el.innerHTML = '';
  for (let k in data) {
    let outerDiv = document.createElement("div");
    outerDiv.classList = "results results-outerContainer"
    outerDiv.innerHTML = k;
    el.appendChild(outerDiv);
    for( x in data[k]) {
        let div = document.createElement("div");
        div.classList = "results results-innerContainer"
        let spanT = document.createElement("span"); 
        let spanR = document.createElement("span"); 
        spanT.innerHTML = x;
        spanR.innerHTML = data[k][x];
        div.appendChild(spanR);
        div.appendChild(spanT);
        outerDiv.appendChild(div);
        //log(totale.macros[k][x])
    }
    
}
  };

DEV ? log('Dev 🏗') : log('App Ready 👽');

// Var definitions
const salva = getID('salva');
const calcola = getID('calcola');
const risultati = getID('results');
const valoriInput = querySelectorAll('.valoriInput');
const Macros = ['Proteine', 'Grassi', 'Carboidrati'];
const totale = {
    input: {},
    macros: {}
};
for (const key of Macros) {
    totale.macros[key] = {
        'Kcal': 0,
        'Grammi': 0,
        'Percentuale': 0
    };
};


calcola.addEventListener('click', function () {
    htmlToObj(valoriInput, totale.input);
    totaleMacros = Object.entries(totale.macros);
    calcoloMacros(Object.entries(totale.macros));
    printResults(risultati, totale.macros);
});