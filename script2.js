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

const setItem = (n, v) => {
  window.localStorage.setItem(n, v);
  log(`${n} saved in localStorage`);
};

const getItem = (n) => {
  log(`${n} retrieved from localStorage`);
  return window.localStorage.getItem(n);
};

const initializeObject  = (a, o) => {
  for (const key of a) {
  o[key] = {
    'Kcal': 0,
    'Grammi': 0,
    'Percentuale': 0
    };
  };
}

const calcoloMacros = (k) => {
  let i = 0;
  let peso = totale.input.peso;
  let qtyPro = totale.input.qtyPro;
  let qtyFat = totale.input.qtyFat;
  while (i < k.length) {
    let N = (k[i][0] === 'Grassi') ? 9 : 4;
    let qty = (N === 9) ? qtyFat : qtyPro;
    k[i][1].Kcal = (k[i][0] === 'Carboidrati') ? Number(parseFloat(totale.input.totaleKcal - ((peso * qtyPro * 4) + (peso * qtyFat * 9))).toFixed(1)) : Number(parseFloat(peso * qty * N).toFixed(1));
    k[i][1].Grammi = Number((k[i][1].Kcal / N).toFixed(1));
    k[i][1].Percentuale = Number(parseFloat(totaleMacros[i][1].Kcal / totale.input.totaleKcal * 100).toFixed(1)) || 0;
    i++;
  }
  getID('qtyCarb').value = Number(parseFloat(totale.macros.Carboidrati.Grammi / peso).toFixed(1)) || '';
};

const printResults = (el, data) => {
  el.innerHTML = '';
  for (let k in data) {
    let outerDiv = document.createElement("div");
    outerDiv.classList = "results results-outerContainer"
    outerDiv.innerHTML = k;
    el.appendChild(outerDiv);
    for (x in data[k]) {
      let div = document.createElement("div");
      div.classList = "results results-innerContainer"
      let spanT = document.createElement("span");
      let spanR = document.createElement("span");
      spanT.innerHTML = x;
      spanR.innerHTML = data[k][x];
      div.appendChild(spanR);
      div.appendChild(spanT);
      outerDiv.appendChild(div);
    }

  }
};


const salvaConfigurazione = (n, v) => {
  salva.addEventListener('click', function () {
    setItem(n, v);
  })
};


// Var definitions
const salva = getID('salva');
const calcola = getID('calcola');
const recupera = getID('recupera');
const risultati = getID('results');
const valoriInput = querySelectorAll('.valoriInput');
const Macros = ['Proteine', 'Grassi', 'Carboidrati'];
let totaleMacros
const totale = {
  input: {},
  macros: {}
};

onload = (event) => { 
  DEV ? log('Dev 🏗') : log('App Ready 👽');
  recupera.disabled = localStorage.length === 0
};


calcola.addEventListener('click', function () {
  htmlToObj(valoriInput, totale.input);
  initializeObject(Macros, totale.macros);
  totaleMacros = Object.entries(totale.macros);
  calcoloMacros(Object.entries(totale.macros));
  printResults(risultati, totale.macros);
  salva.disabled = !totale.macros.Proteine.Kcal;
  salvaConfigurazione(Date.now(), JSON.stringify(totale.macros));
});

