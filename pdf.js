// pdf inicialization
const pdf = require("html-pdf");

// pdf parameters
const options = { format: 'a4' };
var html = `this is my pdf you fucker`;

/* async function createPdf () {
  await pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, res) => {
    if (err) throw err;
    console.log(res);
  });
}

module.exports = createPdf; */


module.exports = pdf.create(html, options).toFile("./tmp/OrdemDeServico.pdf", (err, res) => {
  if (err) throw err;
  console.log('criei pdf');
});

