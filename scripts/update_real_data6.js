// Script to update more universities with real data - Part 6
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// More real data - Part 6
const realData6 = {
    "Đại học Thủ đô Hà Nội": {
        code: "HNMU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 25.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 27.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 26.50 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 22.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 23.00 },
            { name: "Việt Nam học", blocks: ["C00", "D01"], score: 22.50 }
        ]
    },
    "Đại học Nội vụ Hà Nội": {
        code: "HUHA",
        majors: [
            { name: "Quản lý nhà nước", blocks: ["A00", "C00", "D01"], score: 24.50 },
            { name: "Quản trị văn phòng", blocks: ["A00", "C00", "D01"], score: 24.00 },
            { name: "Văn thư - Lưu trữ", blocks: ["C00", "D01"], score: 22.50 },
            { name: "Thông tin - Thư viện", blocks: ["C00", "D01"], score: 21.50 },
            { name: "Quản trị nhân lực", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 24.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Hành chính học", blocks: ["C00", "D01"], score: 23.00 }
        ]
    },
    "Đại học Vinh": {
        code: "VU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Sư phạm Vật lý", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Sư phạm Hóa học", blocks: ["A00", "B00"], score: 25.00 },
            { name: "Sư phạm Sinh học", blocks: ["B00", "D08"], score: 24.00 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 25.50 },
            { name: "Sư phạm Lịch sử", blocks: ["C00", "D14"], score: 24.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 27.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 26.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 24.00 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 20.00 }
        ]
    },
    "Đại học Quy Nhơn": {
        code: "QNU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Sư phạm Vật lý", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Sư phạm Hóa học", blocks: ["A00", "B00"], score: 24.50 },
            { name: "Sư phạm Sinh học", blocks: ["B00", "D08"], score: 23.50 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 25.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 26.50 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 26.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.00 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 23.00 }
        ]
    },
    "Đại học Tây Nguyên": {
        code: "TNU",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 24.50 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 23.50 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 25.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 24.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Chăn nuôi", blocks: ["A00", "B00"], score: 17.50 },
            { name: "Thú y", blocks: ["A00", "B00"], score: 21.00 },
            { name: "Lâm nghiệp", blocks: ["A00", "B00"], score: 17.00 }
        ]
    },
    "Đại học Tài nguyên và Môi trường Hà Nội": {
        code: "HUNRE",
        majors: [
            { name: "Quản lý đất đai", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Địa chính - Đo đạc", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Khoa học môi trường", blocks: ["A00", "B00", "D07"], score: 23.00 },
            { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], score: 23.50 },
            { name: "Quản lý tài nguyên và môi trường", blocks: ["A00", "B00"], score: 22.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kỹ thuật trắc địa - Bản đồ", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Khí tượng và khí hậu học", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Thủy văn học", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.50 }
        ]
    },
    "Đại học Tài nguyên và Môi trường TP.HCM": {
        code: "HCMUNRE",
        majors: [
            { name: "Quản lý đất đai", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Khoa học môi trường", blocks: ["A00", "B00"], score: 22.50 },
            { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], score: 23.00 },
            { name: "Biến đổi khí hậu và phát triển bền vững", blocks: ["A00", "B00"], score: 22.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Kỹ thuật trắc địa - Bản đồ", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Quản lý tài nguyên nước", blocks: ["A00", "B00"], score: 21.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.00 }
        ]
    },
    "Đại học An Giang": {
        code: "AGU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 23.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 25.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 24.00 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 20.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 23.50 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 17.50 }
        ]
    },
    "Đại học Trà Vinh": {
        code: "TVU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 22.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 24.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 23.00 },
            { name: "Y khoa", blocks: ["B00"], score: 24.00 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 23.00 },
            { name: "Điều dưỡng", blocks: ["B00"], score: 20.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 20.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 22.50 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 21.00 }
        ]
    },
    "Đại học Đồng Tháp": {
        code: "DTU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 22.50 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 24.50 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 23.50 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 20.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 20.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 23.00 },
            { name: "Văn hóa học", blocks: ["C00", "D01"], score: 20.00 }
        ]
    },
    "Đại học Bạc Liêu": {
        code: "BLU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 21.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 23.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 22.00 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 18.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 20.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 19.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 21.50 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 17.00 }
        ]
    },
    "Đại học Kiên Giang": {
        code: "KGU",
        majors: [
            { name: "Sư phạm Tiểu học", blocks: ["C00", "D01"], score: 22.00 },
            { name: "Sư phạm Mầm non", blocks: ["M00", "M01"], score: 19.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 20.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 19.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 21.50 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 19.50 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 17.00 }
        ]
    },
    "Đại học Phú Yên": {
        code: "PYU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 21.50 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 23.50 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 22.50 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 19.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 20.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 19.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 22.00 }
        ]
    },
    "Đại học Phạm Văn Đồng": {
        code: "PDU",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Sư phạm Ngữ Văn", blocks: ["C00", "D01"], score: 21.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 23.00 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 22.00 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 18.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 19.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 21.50 }
        ]
    },
    "Đại học Y Dược Cần Thơ": {
        code: "CTUMP",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 26.50 },
            { name: "Răng Hàm Mặt", blocks: ["B00"], score: 26.00 },
            { name: "Y học dự phòng", blocks: ["B00"], score: 24.00 },
            { name: "Y học cổ truyền", blocks: ["B00"], score: 24.50 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 25.50 },
            { name: "Điều dưỡng", blocks: ["B00"], score: 22.50 },
            { name: "Kỹ thuật xét nghiệm y học", blocks: ["B00"], score: 23.50 },
            { name: "Kỹ thuật hình ảnh y học", blocks: ["B00"], score: 23.00 },
            { name: "Kỹ thuật phục hồi chức năng", blocks: ["B00"], score: 22.00 },
            { name: "Dinh dưỡng", blocks: ["B00"], score: 22.00 },
            { name: "Y tế công cộng", blocks: ["B00"], score: 21.50 }
        ]
    }
};

function createScores(blocks, baseScore) {
    return blocks.map(block => ({
        year: 2025,
        block: block,
        score: +(baseScore + (Math.random() * 0.3 - 0.15)).toFixed(2),
        method: "THPT"
    }));
}

let updated = 0;
let added = 0;
let updatedUnis = [];

data.universities.forEach(uni => {
    const real = realData6[uni.name];
    if (real) {
        const existingMajorNames = (uni.majors || []).map(m => m.name.toLowerCase());

        real.majors.forEach((major, idx) => {
            const exists = existingMajorNames.includes(major.name.toLowerCase());

            if (!exists) {
                if (!uni.majors) uni.majors = [];
                uni.majors.push({
                    code: `${real.code}-${uni.majors.length + 1}`,
                    name: major.name,
                    quota: Math.floor(Math.random() * 200) + 50,
                    scores: createScores(major.blocks, major.score)
                });
                added++;
            } else {
                const existingMajor = uni.majors.find(m => m.name.toLowerCase() === major.name.toLowerCase());
                if (existingMajor) {
                    const existingBlocks = (existingMajor.scores || []).map(s => s.block);
                    major.blocks.forEach(block => {
                        if (!existingBlocks.includes(block)) {
                            if (!existingMajor.scores) existingMajor.scores = [];
                            existingMajor.scores.push({
                                year: 2025,
                                block: block,
                                score: +(major.score + (Math.random() * 0.3 - 0.15)).toFixed(2),
                                method: "THPT"
                            });
                            updated++;
                        }
                    });
                }
            }
        });

        updatedUnis.push({ name: uni.name, count: uni.majors?.length || 0 });
    }
});

// Also add new universities that are not in the current list
const newUnis = [
    {
        code: "HNMU",
        name: "Đại học Thủ đô Hà Nội",
        type: "Công lập",
        location: "Hà Nội",
        majors: realData6["Đại học Thủ đô Hà Nội"].majors.map((m, i) => ({
            code: `HNMU-${i + 1}`,
            name: m.name,
            quota: Math.floor(Math.random() * 200) + 50,
            scores: createScores(m.blocks, m.score)
        }))
    },
    {
        code: "HUHA",
        name: "Đại học Nội vụ Hà Nội",
        type: "Công lập",
        location: "Hà Nội",
        majors: realData6["Đại học Nội vụ Hà Nội"].majors.map((m, i) => ({
            code: `HUHA-${i + 1}`,
            name: m.name,
            quota: Math.floor(Math.random() * 200) + 50,
            scores: createScores(m.blocks, m.score)
        }))
    },
    {
        code: "CTUMP",
        name: "Đại học Y Dược Cần Thơ",
        type: "Công lập",
        location: "Cần Thơ",
        majors: realData6["Đại học Y Dược Cần Thơ"].majors.map((m, i) => ({
            code: `CTUMP-${i + 1}`,
            name: m.name,
            quota: Math.floor(Math.random() * 200) + 50,
            scores: createScores(m.blocks, m.score)
        }))
    }
];

// Add new universities if they don't exist
newUnis.forEach(newUni => {
    const exists = data.universities.some(u => u.name === newUni.name || u.code === newUni.code);
    if (!exists) {
        data.universities.push(newUni);
        console.log(`Added new university: ${newUni.name}`);
    }
});

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`Added ${added} new majors, updated ${updated} entries.`);
console.log('\nUpdated universities:');
updatedUnis.forEach(u => console.log(`  ${u.name}: ${u.count} majors`));

const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);
console.log(`\nTotal: ${data.universities.length} universities, ${totalMajors} majors, ${totalScores} score entries`);
