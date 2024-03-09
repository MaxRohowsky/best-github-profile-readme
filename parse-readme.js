const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'readme.md');
const dataFilePath = path.join(__dirname, 'data.json');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const regex = /\|\s*(\w+)\s*\|\s*(\w+)\s*\|\s*\[\w+\]\((https:\/\/github\.com\/[^\/]+)\)\s*\|\s*\[README\]\((https:\/\/github\.com\/[^\/]+\/[^\/]+)\)/g;
    let match;
    let users = [];
    while ((match = regex.exec(data)) !== null) {
        const profileName = match[3].split('/').pop();
        users.push({
            timestamp: new Date().toISOString(),
            firstName: match[1],
            lastName: match[2],
            githubProfile: match[3],
            githubReadme: match[4],
            screenshotPath: `screenshots/${profileName}.jpeg`
        });
    }

    const json = JSON.stringify(users, null, 2);
    console.log(json);


    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        let existingUsers = [];
        if (data) {
            existingUsers = JSON.parse(data); 
        }

        const newUsers = users.filter(user => !existingUsers.some(existingUser => existingUser.githubProfile === user.githubProfile));

        const allUsers = [...existingUsers, ...newUsers];
        const json = JSON.stringify(allUsers, null, 2);

        fs.writeFile(dataFilePath, `${json}`, 'utf8', err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('Data written to file');
        });
    });
});