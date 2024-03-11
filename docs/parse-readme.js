const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '..', 'README.md');
const dataFilePath = path.join(__dirname, 'data.json');

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Define a regular expression to match the user data
    //const regex = /\|\s*(\w+)\s*\|\s*(\w+)\s*\|\s*\[\w+\]\((https:\/\/github\.com\/[^\/]+)\)\s*\|\s*\[README\]\((https:\/\/github\.com\/[^\/]+\/[^\/]+)\)/g;
    const regex = /\|\s*([\w-]+)\s*\|\s*([\w-]+)\s*\|\s*\[[\w-]+\]\((https:\/\/github\.com\/[^\/]+)\)\s*\|\s*\[README\]\((https:\/\/github\.com\/[^\/]+\/[^\/]+)\)/g;
    let match;
    let users = [];

    console.log(regex);
    // Loop through the matches and push the user data to the users array
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

    // Read the file specified by dataFilePath
    fs.readFile(dataFilePath, 'utf8', (err, data) => {

        // If there's an error reading the file, log the error and exit
        if (err) {
            console.error(err);
            return;
        }

        // Initialize an array to hold the existing users
        let existingUsers = [];

        // If the file has data, parse it as JSON and assign it to existingUsers
        if (data) {
            existingUsers = JSON.parse(data); 
        }

        // Filter out the users that already exist in the data file
        const newUsers = users.filter(user => !existingUsers.some(existingUser => existingUser.githubProfile === user.githubProfile));

        // Combine the existing users and the new users
        const allUsers = [...existingUsers, ...newUsers];

        // Convert the allUsers array into a JSON string with a 2-space indentation
        const json = JSON.stringify(allUsers, null, 2);

        // Write the JSON string to the same file
        fs.writeFile(dataFilePath, `${json}`, 'utf8', err => {

            // If there's an error writing to the file, log the error and exit
            if (err) {
                console.error(err);
                return;
            }
            // Log a success message
            console.log('Data written to file');
        });
    });
});