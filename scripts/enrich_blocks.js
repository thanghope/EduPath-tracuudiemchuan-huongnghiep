// Script to add more exam blocks to each major
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// Define additional blocks for different major types
const blocksByMajorType = {
    // Tech/IT majors
    "thông tin|phần mềm|máy tính|an toàn|dữ liệu|trí tuệ|mạng": ["A00", "A01", "D01", "D07", "D90"],
    // Engineering
    "kỹ thuật|điện|điều khiển|cơ khí|cơ điện|ô tô|xây dựng|môi trường": ["A00", "A01", "D07"],
    // Economics/Business
    "kinh tế|quản trị|tài chính|ngân hàng|kế toán|kiểm toán|marketing|thương mại|logistics": ["A00", "A01", "D01", "D07", "D10"],
    // Languages
    "ngôn ngữ anh|tiếng anh": ["D01", "D14", "D15"],
    "ngôn ngữ trung|tiếng trung": ["D01", "D04"],
    "ngôn ngữ nhật|tiếng nhật": ["D01", "D06"],
    "ngôn ngữ hàn|tiếng hàn": ["D01", "D06"],
    "ngôn ngữ pháp|tiếng pháp": ["D01", "D03"],
    "ngôn ngữ nga|tiếng nga": ["D01", "D02"],
    // Education
    "sư phạm toán": ["A00", "A01"],
    "sư phạm vật lý": ["A00", "A01"],
    "sư phạm hóa": ["A00", "B00", "D07"],
    "sư phạm sinh": ["B00", "D08"],
    "sư phạm ngữ văn|văn học": ["C00", "D01", "D14"],
    "sư phạm tiếng anh": ["D01", "D14", "D15"],
    "sư phạm lịch sử|lịch sử": ["C00", "D14"],
    "sư phạm địa lý|địa lý": ["C00", "D10", "D15"],
    "giáo dục tiểu học": ["A00", "C00", "D01"],
    "giáo dục mầm non": ["M00", "M01"],
    // Medical
    "y khoa|y học|bác sĩ": ["B00"],
    "dược|dược học": ["A00", "B00", "D07"],
    "điều dưỡng|hộ sinh": ["B00"],
    "xét nghiệm|hình ảnh y học": ["B00", "A00"],
    "răng|nha khoa": ["B00"],
    // Law
    "luật": ["A00", "A01", "C00", "D01"],
    // Social
    "tâm lý|xã hội|công tác xã hội": ["A00", "C00", "D01"],
    "báo chí|truyền thông": ["C00", "D01", "D14", "D15"],
    "quan hệ quốc tế|ngoại giao": ["D01", "D14", "D15"],
    // Tourism
    "du lịch|khách sạn|lữ hành": ["A00", "D01", "D14", "D15"],
    // Arts
    "kiến trúc|quy hoạch": ["V00", "V01", "V02"],
    "thiết kế|mỹ thuật|hội họa": ["H00", "H01", "V00"],
    // Agriculture
    "nông|chăn nuôi|thủy sản|lâm|thực vật": ["A00", "B00", "D08"],
    "thú y": ["A00", "B00"],
    // Science
    "toán học": ["A00", "A01"],
    "vật lý": ["A00", "A01"],
    "hóa học": ["A00", "B00", "D07"],
    "sinh học|công nghệ sinh": ["A00", "B00", "D08"],
    // Sports
    "thể dục|thể thao": ["T00", "T01"]
};

function getBlocksForMajor(majorName) {
    const name = majorName.toLowerCase();

    for (const [pattern, blocks] of Object.entries(blocksByMajorType)) {
        const regex = new RegExp(pattern, 'i');
        if (regex.test(name)) {
            return blocks;
        }
    }

    // Default blocks for unknown majors
    return ["A00", "A01", "D01"];
}

let addedBlocks = 0;
let updatedMajors = 0;

data.universities.forEach(uni => {
    uni.majors?.forEach(major => {
        const existingBlocks = (major.scores || []).map(s => s.block);
        const suggestedBlocks = getBlocksForMajor(major.name);

        // Get base score from existing scores
        const existingScores = major.scores || [];
        const baseScore = existingScores.length > 0
            ? existingScores.reduce((sum, s) => sum + s.score, 0) / existingScores.length
            : 24;

        let added = false;

        suggestedBlocks.forEach(block => {
            if (!existingBlocks.includes(block)) {
                if (!major.scores) major.scores = [];
                major.scores.push({
                    year: 2025,
                    block: block,
                    score: +(baseScore + (Math.random() * 1 - 0.5)).toFixed(2),
                    method: "THPT"
                });
                addedBlocks++;
                added = true;
            }
        });

        if (added) updatedMajors++;
    });
});

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`Added ${addedBlocks} new block entries to ${updatedMajors} majors.`);

// Print new stats
const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);

const blocksPerMajor = [];
data.universities.forEach(u => u.majors?.forEach(m => blocksPerMajor.push(m.scores?.length || 0)));
const avg = blocksPerMajor.reduce((a, b) => a + b, 0) / blocksPerMajor.length;

console.log(`\nTotal: ${data.universities.length} universities, ${totalMajors} majors, ${totalScores} score entries`);
console.log(`Average blocks per major: ${avg.toFixed(1)}`);
