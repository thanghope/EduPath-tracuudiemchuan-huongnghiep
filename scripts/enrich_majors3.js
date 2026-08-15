// Script to add more majors - Part 3 (remaining universities)
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// Generic majors that most universities have
const commonMajors = {
    "tech": [
        { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], baseScore: 24 },
        { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], baseScore: 24 },
        { name: "Hệ thống thông tin quản lý", blocks: ["A00", "A01", "D01"], baseScore: 23 },
        { name: "Khoa học máy tính", blocks: ["A00", "A01"], baseScore: 24 },
        { name: "Mạng máy tính và truyền thông dữ liệu", blocks: ["A00", "A01"], baseScore: 23 }
    ],
    "econ": [
        { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], baseScore: 24 },
        { name: "Kế toán", blocks: ["A00", "A01", "D01"], baseScore: 23 },
        { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], baseScore: 24 },
        { name: "Marketing", blocks: ["A00", "A01", "D01"], baseScore: 23 },
        { name: "Kinh tế", blocks: ["A00", "A01", "D01"], baseScore: 23 }
    ],
    "edu": [
        { name: "Sư phạm Toán học", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"], baseScore: 23 },
        { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], baseScore: 25 },
        { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], baseScore: 23 },
        { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], baseScore: 20 }
    ],
    "lang": [
        { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], baseScore: 25 },
        { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], baseScore: 23 },
        { name: "Ngôn ngữ Nhật", blocks: ["D01"], baseScore: 24 },
        { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01"], baseScore: 24 }
    ],
    "social": [
        { name: "Luật", blocks: ["A00", "C00", "D01"], baseScore: 24 },
        { name: "Tâm lý học", blocks: ["C00", "D01"], baseScore: 23 },
        { name: "Công tác xã hội", blocks: ["C00", "D01"], baseScore: 21 },
        { name: "Xã hội học", blocks: ["C00", "D01"], baseScore: 21 }
    ],
    "tourism": [
        { name: "Du lịch", blocks: ["A00", "D01", "D14"], baseScore: 22 },
        { name: "Quản trị khách sạn", blocks: ["A00", "D01"], baseScore: 22 },
        { name: "Quản trị dịch vụ du lịch và lữ hành", blocks: ["A00", "D01"], baseScore: 22 }
    ]
};

// Map remaining universities
const uniMajorMap3 = {};

// Get universities with <= 5 majors
const smallUnis = data.universities.filter(u => (u.majors?.length || 0) <= 5);
console.log(`Found ${smallUnis.length} universities with <= 5 majors`);

smallUnis.forEach(uni => {
    const name = uni.name.toLowerCase();
    let majorsToAdd = [];

    // Determine university type and add appropriate majors
    if (name.includes('sư phạm') || name.includes('giáo dục')) {
        majorsToAdd = [...commonMajors.edu, ...commonMajors.lang.slice(0, 2), ...commonMajors.social.slice(0, 2)];
    } else if (name.includes('kinh tế') || name.includes('thương mại') || name.includes('ngân hàng')) {
        majorsToAdd = [...commonMajors.econ, ...commonMajors.tech.slice(0, 2), ...commonMajors.lang.slice(0, 2)];
    } else if (name.includes('công nghệ') || name.includes('kỹ thuật') || name.includes('bách khoa')) {
        majorsToAdd = [...commonMajors.tech, ...commonMajors.econ.slice(0, 3)];
    } else if (name.includes('y') && !name.includes('ký') && !name.includes('quy')) {
        majorsToAdd = [
            { name: "Y khoa", blocks: ["B00"], baseScore: 26 },
            { name: "Dược học", blocks: ["A00", "B00"], baseScore: 25 },
            { name: "Điều dưỡng", blocks: ["B00"], baseScore: 21 },
            { name: "Y học dự phòng", blocks: ["B00"], baseScore: 24 },
            { name: "Y học cổ truyền", blocks: ["B00"], baseScore: 23 },
            { name: "Răng Hàm Mặt", blocks: ["B00"], baseScore: 25 }
        ];
    } else if (name.includes('ngoại ngữ') || name.includes('ngoại thương')) {
        majorsToAdd = [...commonMajors.lang, ...commonMajors.econ.slice(0, 3), ...commonMajors.tourism];
    } else if (name.includes('luật')) {
        majorsToAdd = [
            { name: "Luật", blocks: ["A00", "C00", "D01"], baseScore: 25 },
            { name: "Luật Kinh tế", blocks: ["A00", "D01"], baseScore: 25 },
            { name: "Luật Quốc tế", blocks: ["D01", "D14"], baseScore: 25 },
            ...commonMajors.social.slice(1, 3)
        ];
    } else if (name.includes('nông') || name.includes('lâm') || name.includes('thủy sản')) {
        majorsToAdd = [
            { name: "Nông học", blocks: ["A00", "B00"], baseScore: 18 },
            { name: "Chăn nuôi", blocks: ["A00", "B00"], baseScore: 17 },
            { name: "Thú y", blocks: ["B00"], baseScore: 21 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00"], baseScore: 21 },
            ...commonMajors.tech.slice(0, 2),
            ...commonMajors.econ.slice(0, 2)
        ];
    } else if (name.includes('văn hóa') || name.includes('nghệ thuật') || name.includes('mỹ thuật')) {
        majorsToAdd = [
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], baseScore: 19 },
            { name: "Thiết kế nội thất", blocks: ["H00", "V00"], baseScore: 18 },
            { name: "Mỹ thuật", blocks: ["H00"], baseScore: 17 },
            { name: "Văn hóa học", blocks: ["C00", "D01"], baseScore: 20 },
            { name: "Quản lý văn hóa", blocks: ["C00", "D01"], baseScore: 20 }
        ];
    } else if (name.includes('thể dục') || name.includes('thể thao')) {
        majorsToAdd = [
            { name: "Giáo dục thể chất", blocks: ["T00"], baseScore: 18 },
            { name: "Huấn luyện thể thao", blocks: ["T00"], baseScore: 18 },
            { name: "Quản lý thể dục thể thao", blocks: ["T00"], baseScore: 17 }
        ];
    } else {
        // Default: general university
        majorsToAdd = [...commonMajors.tech.slice(0, 3), ...commonMajors.econ.slice(0, 3), ...commonMajors.lang.slice(0, 2)];
    }

    uniMajorMap3[uni.name] = majorsToAdd;
});

function createScores(blocks, baseScore) {
    return blocks.map(block => ({
        year: 2025,
        block: block,
        score: +(baseScore + (Math.random() * 2 - 1)).toFixed(2),
        method: "THPT"
    }));
}

let updated = 0;
let updatedUnis = [];

data.universities.forEach(uni => {
    const majorsToAdd = uniMajorMap3[uni.name];
    if (majorsToAdd && majorsToAdd.length > 0) {
        const existingNames = (uni.majors || []).map(m => m.name.toLowerCase());

        majorsToAdd.forEach((major, idx) => {
            if (!existingNames.includes(major.name.toLowerCase())) {
                if (!uni.majors) uni.majors = [];
                uni.majors.push({
                    code: `${uni.code || 'NEW'}-${uni.majors.length + 1}`,
                    name: major.name,
                    quota: Math.floor(Math.random() * 150) + 30,
                    scores: createScores(major.blocks, major.baseScore)
                });
                updated++;
            }
        });
        updatedUnis.push({ name: uni.name, count: uni.majors?.length || 0 });
    }
});

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`\nAdded ${updated} new majors.`);
console.log('\nUpdated universities:');
updatedUnis.forEach(u => console.log(`  ${u.name}: ${u.count} majors`));

// Print overall stats
const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);
console.log(`\nTotal: ${data.universities.length} universities, ${totalMajors} majors, ${totalScores} score entries`);
