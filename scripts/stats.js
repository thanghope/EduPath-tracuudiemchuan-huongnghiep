const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf-8'));

const blocks = new Set();
let totalMajors = 0;
let totalScores = 0;

data.universities.forEach(u => {
    u.majors.forEach(m => {
        totalMajors++;
        m.scores.forEach(s => {
            blocks.add(s.block);
            totalScores++;
        });
    });
});

console.log('=== Data Statistics ===');
console.log('Total Universities:', data.universities.length);
console.log('Total Majors:', totalMajors);
console.log('Total Score Entries:', totalScores);
console.log('Exam Blocks:', [...blocks].sort().join(', '));
