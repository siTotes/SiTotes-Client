const axios = require('axios');

async function axiosiUrlToBuffer(url) {
  let retryCount = 0;
  let response = null;

  while (retryCount < 3) {
      await axios.get(url, { responseType: 'arraybuffer' })
          .then(function(response) {
            const buffer = Buffer.from(response.data, 'binary');
            return buffer;
          })
          .catch(error =>{
            console.error(`Gagal pada percobaan ke-${retryCount + 1}: ${error.message}`);
            retryCount++;
          })
  }

  return response ? response.data : null;
}


const axiosUrlToBuffer = (url) => {
        let retryCount = 0;
        const maxRetries = 3;
        const retryDelay = 3000;

        function fetch() {
            return axios.get(url, {
                    responseType: 'arraybuffer'
                })
                .then(function(response) {
                    const buffer = Buffer.from(response.data, 'binary');
                    return buffer;
                })
                .catch(function(error) {
                    console.error(error);
                    if (retryCount < maxRetries) {
                        retryCount++;
                        console.log(`Retrying (${retryCount}/${maxRetries}) after ${retryDelay}ms...`);
                        return new Promise(resolve => setTimeout(resolve, retryDelay)).then(fetch);
                    } else {
                        throw error;
                    }
                });
        }

        return fetch();
    }

axiosUrlToBuffer('https://web.sitotes.7repul.co/')
  .then(data => {
    if (data) {
      console.log('Data berhasil diambil:', data);
    } else {
      console.log('Gagal mengambil data setelah 3 percobaan.');
    }
  })
  .catch(error => {
    console.error('Terjadi kesalahan:', error);
  });