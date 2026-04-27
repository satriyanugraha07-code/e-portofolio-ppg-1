import https from 'https';
import fs from 'fs';

https.get("https://www.mediafire.com/file/psdikdjoemqj94d/Desain_tanpa_judul_%2827%29.png/file", (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        let downloadUrl = null;
        
        let urlIndex = data.indexOf('href="https://download');
        if (urlIndex !== -1) {
            let endQuoteIndex = data.indexOf('"', urlIndex + 6);
            if (endQuoteIndex !== -1) {
                 downloadUrl = data.substring(urlIndex + 6, endQuoteIndex);
            }
        }
        
        if (downloadUrl) {
            console.log("Found direct URL:", downloadUrl);
            https.get(downloadUrl, (downloadRes) => {
                 const file = fs.createWriteStream("public/profile.png");
                 downloadRes.pipe(file);
                 file.on("finish", () => {
                     file.close();
                     console.log("Downloaded successfully");
                 });
            });
        } else {
            console.log("Could not find direct download link.");
        }
    });
});
