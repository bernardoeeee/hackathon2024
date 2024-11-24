const fetch = require('node-fetch'); 
// const query = require('query'); 

// document.getElementById("#inputCaixa")
let idCaixa = '01'
// const qrcode = document.getElementsByClassName('QR')



fetch(`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Cx-${idCaixa}`)
  .then(response => {
    if (response.ok) {
      return response.buffer(); 
    } else {
      throw new Error('API request failed');
    }
  })
  .then(buffer => {
    console.log('QR code image generated successfully');
    
    const fs = require('fs');
    fs.writeFileSync('qr-code.png', buffer);  
  })
  .catch(error => {
    console.log('Error in API call', error);
  });

