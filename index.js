let fs = require('fs');
let Client = require('ssh2-sftp-client');
let sftp = new Client();
const fileGuesser = require('guess-file-type')

    ; (async () => {
        try {
            const IN_DIR = `C:/ContaCam/CyberTrack H3/`
            // Get files only and return file names
            let fileNames = fs.readdirSync(IN_DIR, { withFileTypes: true }).filter((dirent) => {
                return dirent.isDirectory()
            }).map(dirent => dirent.name)
           
            // To full path
            fileNames = fileNames.map(fileName => {
                return `${IN_DIR}/${fileName}`
            })
            console.log(fileNames)
            throw 'aa'
            await sftp.connect({
                host: '175.41.158.66',
                port: '22',
                username: 'ubuntu',
                privateKey: fs.readFileSync('C:/Users/Acer Nitro/Desktop/portables/ssh/putty/keys/ssh-gsu-web.ppk')
            });
            let d = await sftp.cwd();
            console.log(`remote dir is ${d}`);
            // let list = await sftp.list('/home/ubuntu');
            // console.log(list)
            let remote = '/home/ubuntu/mis-portal/data/public/ss.mp4';
            await sftp.fastPut("C:/ContaCam/CyberTrack H3/2023/05/11/rec_2023_05_11_09_23_01.mp4", remote);
        } catch (e) {
            console.error(e);
        } finally {
            await sftp.end();
        }
    })()


