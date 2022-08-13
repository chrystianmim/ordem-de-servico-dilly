// pdf inicialization
const pdf = require("html-pdf");

// pdf parameters
const options = { format: 'a4' };
var html = `TA MALUCO MEUAHMIGO`;

/* async function createPdf () {
  await pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
}

module.exports = createPdf; */

var result = pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, res) => {
  if (err) throw err;
  console.log('criei pdf');
});

console.log(result)

module.exports = result;


/* module.exports = pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, res) => {
  if (err) throw err;
  console.log('criei pdf');
}); */

