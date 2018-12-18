/**
 *  Benchmark tests allow us to see how various code changes will
 *  actually effect how long it takes to run oue
 *
 *  Largely insipred by ESLint benchmark testing
 *  https://github.com/eslint/eslint/blob/master/tests/bench/bench.js
 */
const fs = require('fs');

const { Linter } = require('eslint');
const convertHrtime = require('convert-hrtime');
const chalk = require('chalk');

const { configs } = require('../index.js');


const ITERATIONS = 75000;
const SNAPSHOT_FILE_PATH = '__benchmark.snapshot__.json';

const getSnapshot = () => {
    let snapshot = '{}';
    try {
        snapshot = fs.readFileSync(`${__dirname}/${SNAPSHOT_FILE_PATH}`, 'utf8');
    } catch (e) {
        return JSON.parse(snapshot);
    }
    return JSON.parse(snapshot);
};
const snapshot = getSnapshot();


const sample = {
    small: fs.readFileSync(`${__dirname}/small.sample.js`, 'utf8'),
    large: fs.readFileSync(`${__dirname}/large.sample.js`, 'utf8'),
};
const linter = new Linter();
const shouldUpdate = process.argv[2] && /--update/.test(process.argv[2]);
const decimalFixer = num => +num.toFixed(2);


const runner = (content, iterations = 1) => {
    const timer = process.hrtime();
    while (iterations--) { // eslint-disable-line
        linter.verify(content, configs.on);
    }
    return convertHrtime(process.hrtime(timer));
};

const reportDiff = (stats, key) => {
    if (snapshot && snapshot[key]) {
        const diff = decimalFixer(snapshot[key].milliseconds - stats.milliseconds);
        const good = diff > 0;
        const color = good ? chalk.green : chalk.red;
        const emoji = good ? '👍' : '👎';
        const verb = good ? 'better' : 'worse';
        const percent = decimalFixer(diff / snapshot[key].milliseconds * 100);
        console.log(color(`${emoji} ${diff}ms ${verb} (${good ? '+' : ''}${percent}%)`));
    }
};

const benchmark = () => {
    if (!snapshot || (!snapshot.small || !snapshot.large)) {
        console.log('⚠️ No comparison snapshot found. Run `bench:update` command to generate one.');
    }
    console.log(`🏋️‍♀️ Running benchmark tests: ${ITERATIONS} iteration cycles`);
    const small = runner(sample.small, ITERATIONS);
    console.log(`✅ Small test completed in ${decimalFixer(small.seconds)} seconds!`);
    reportDiff(small, 'small');
    const large = runner(sample.large, ITERATIONS);
    console.log(`✅ Large test completed in ${decimalFixer(large.seconds)} seconds!`);
    reportDiff(large, 'large');

    if (shouldUpdate) {
        const contents = JSON.stringify({
            large,
            small,
        }, null, 4);
        fs.writeFileSync(`${__dirname}/${SNAPSHOT_FILE_PATH}`, contents, 'utf8');
        console.log(`📝 Wrote snapshot file`);
    }
};


benchmark();
