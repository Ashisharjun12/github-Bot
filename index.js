const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const FILE_PATH = './data.json';
const git = simpleGit();

const makecommit = async (n) => {
    if (n === 0) {
        await git.push();
        return;
    }

    // Dynamically import the 'random' module
    const { default: random } = await import('random');

    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'w').format();
    const data = {
        date: DATE
    };

    jsonfile.writeFile(FILE_PATH, data, { spaces: 2 }, async (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Data written successfully');

            try {
                await git.add([FILE_PATH]);
                await git.commit(DATE, { '--date': DATE });
                console.log(DATE);
                console.log('Changes committed successfully');
                makecommit(n - 1);
            } catch (err) {
                console.error('Failed to commit changes:', err);
            }
        }
    });
};

makecommit(5000);
