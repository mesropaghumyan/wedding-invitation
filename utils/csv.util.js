const fs = require('fs');
const path = require('path');

const csvFilePath = path.join(__dirname, '../data/contact_response.csv');

function addToCSV(formData) {
    let csvData = fs.readFileSync(csvFilePath, 'utf8').trim();
    let lines = csvData.split('\n');
    let headers = lines[0].split(',');

    let newLine = Object.values(formData).join(',');

    if (headers[0] !== 'prénom') {
        headers = Object.keys(formData);
        lines.unshift(headers.join(','));
    }

    lines.push(newLine);

    fs.writeFileSync(csvFilePath, lines.join('\n'));

    console.log('Données ajoutées au fichier CSV avec succès');
}

module.exports = addToCSV;
