const fs = require('fs');
const path = require('path');

const dirs = fs.readdirSync(path.resolve(__dirname));

dirs.forEach(dir => {
    if (!fs.statSync(path.resolve(__dirname, dir)).isDirectory() || dir === '.vuepress') {
        return;
    }
    const files = fs.readdirSync(path.resolve(__dirname, dir));
    files.forEach(file => {
        const ext = path.parse(file).ext;
        if (ext === '.md') {
            let data = fs.readFileSync(path.resolve(__dirname, dir, file), 'utf-8');
            
            data = data.replace(/<Disqus \/>/, '');
            fs.writeFileSync(path.resolve(__dirname, dir, file), data);
        }
    })
})

console.log("删除完毕！");