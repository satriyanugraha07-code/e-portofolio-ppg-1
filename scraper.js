import https from 'https';
import fs from 'fs';
import path from 'path';

https.get('https://www.mediafire.com/file/psdikdjoemqj94d/Desain_tanpa_judul_%252827%2529.png/file', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const match = data.match(/href="(https:\/\/download[^"]+)"/);
    if (match) {
      const downloadUrl = match[1].replace(/&amp;/g, '&');
      console.log('Downloading from:', downloadUrl);
      
      const fileStream = fs.createWriteStream(path.join(process.cwd(), 'public', 'profile.png'));
      https.get(downloadUrl, (imageRes) => {
        imageRes.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Download completed');
        });
      }).on('error', (err) => {
        console.log('Error downloading image: ', err.message);
      });
    } else {
      console.log('Not found');
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
