// Script to add more majors to universities with few majors - Part 2
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// More majors definitions
const econBusinessMajors = [
    { name: "Kinh tế", blocks: ["A00", "A01", "D01", "D07"], baseScore: 26 },
    { name: "Kinh tế quốc tế", blocks: ["A00", "A01", "D01"], baseScore: 27 },
    { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], baseScore: 26.5 },
    { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], baseScore: 27 },
    { name: "Kế toán", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Kiểm toán", blocks: ["A00", "A01", "D01"], baseScore: 26.5 },
    { name: "Marketing", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Quản trị nhân lực", blocks: ["A00", "A01", "D01"], baseScore: 25 },
    { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], baseScore: 27 },
    { name: "Du lịch", blocks: ["A00", "D01", "D14"], baseScore: 24 },
    { name: "Quản trị khách sạn", blocks: ["A00", "D01"], baseScore: 24 },
    { name: "Bất động sản", blocks: ["A00", "A01", "D01"], baseScore: 24 },
    { name: "Thống kê kinh tế", blocks: ["A00", "A01"], baseScore: 25 }
];

const techEngineeringMajors = [
    { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], baseScore: 25 },
    { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01"], baseScore: 25.5 },
    { name: "Khoa học máy tính", blocks: ["A00", "A01"], baseScore: 26 },
    { name: "An toàn thông tin", blocks: ["A00", "A01"], baseScore: 25 },
    { name: "Hệ thống thông tin", blocks: ["A00", "A01", "D01"], baseScore: 24.5 },
    { name: "Kỹ thuật điện", blocks: ["A00", "A01"], baseScore: 24 },
    { name: "Kỹ thuật điện tử - viễn thông", blocks: ["A00", "A01"], baseScore: 24.5 },
    { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], baseScore: 24 },
    { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], baseScore: 23 },
    { name: "Kỹ thuật cơ điện tử", blocks: ["A00", "A01"], baseScore: 24 },
    { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], baseScore: 24 },
    { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], baseScore: 23 },
    { name: "Kiến trúc", blocks: ["V00", "V01", "V02"], baseScore: 20 },
    { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], baseScore: 22 },
    { name: "Công nghệ thực phẩm", blocks: ["A00", "B00", "D07"], baseScore: 23 }
];

const agricultureMajors = [
    { name: "Nông học", blocks: ["A00", "A01", "B00"], baseScore: 20 },
    { name: "Bảo vệ thực vật", blocks: ["A00", "B00"], baseScore: 19 },
    { name: "Khoa học cây trồng", blocks: ["A00", "B00"], baseScore: 19 },
    { name: "Chăn nuôi", blocks: ["A00", "B00"], baseScore: 18 },
    { name: "Thú y", blocks: ["A00", "B00"], baseScore: 22 },
    { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], baseScore: 18 },
    { name: "Công nghệ sinh học", blocks: ["A00", "B00", "D08"], baseScore: 23 },
    { name: "Công nghệ thực phẩm", blocks: ["A00", "B00"], baseScore: 22 },
    { name: "Quản lý đất đai", blocks: ["A00", "A01"], baseScore: 21 },
    { name: "Lâm nghiệp", blocks: ["A00", "B00"], baseScore: 18 },
    { name: "Kinh tế nông nghiệp", blocks: ["A00", "A01", "D01"], baseScore: 21 },
    { name: "Quản trị kinh doanh nông nghiệp", blocks: ["A00", "A01", "D01"], baseScore: 20 }
];

const generalMajors = [
    { name: "Sư phạm Toán học", blocks: ["A00", "A01"], baseScore: 24 },
    { name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"], baseScore: 24 },
    { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], baseScore: 26 },
    { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], baseScore: 26 },
    { name: "Luật", blocks: ["A00", "C00", "D01"], baseScore: 25 },
    { name: "Công tác xã hội", blocks: ["A00", "C00", "D01"], baseScore: 22 },
    { name: "Tâm lý học", blocks: ["A00", "C00", "D01"], baseScore: 24 },
    { name: "Báo chí", blocks: ["C00", "D01", "D14"], baseScore: 24 },
    { name: "Quan hệ công chúng", blocks: ["C00", "D01"], baseScore: 24 }
];

// University groups Part 2
const uniMajorMap2 = {
    "Đại học Kinh tế TP.HCM": econBusinessMajors,
    "Đại học Đà Nẵng": [...techEngineeringMajors.slice(0, 8), ...econBusinessMajors.slice(0, 6), ...generalMajors.slice(0, 4)],
    "Đại học Thái Nguyên": [...techEngineeringMajors.slice(0, 6), ...agricultureMajors.slice(0, 4), ...generalMajors.slice(0, 5)],
    "Học viện Nông nghiệp Việt Nam": agricultureMajors,
    "Đại học Cần Thơ": [...agricultureMajors.slice(0, 6), ...techEngineeringMajors.slice(0, 5), ...econBusinessMajors.slice(0, 5)],
    "Đại học Huế": [...generalMajors, ...techEngineeringMajors.slice(0, 5), ...econBusinessMajors.slice(0, 5)],
    "Đại học Vinh": [...generalMajors, ...techEngineeringMajors.slice(0, 4), ...agricultureMajors.slice(0, 3)],
    "Đại học Quy Nhơn": [...generalMajors.slice(0, 6), ...techEngineeringMajors.slice(0, 4)],
    "Đại học Nha Trang": [
        { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], baseScore: 20 },
        { name: "Công nghệ chế biến thủy sản", blocks: ["A00", "B00"], baseScore: 19 },
        { name: "Kỹ thuật tàu thủy", blocks: ["A00", "A01"], baseScore: 20 },
        { name: "Khai thác thủy sản", blocks: ["A00", "B00"], baseScore: 18 },
        ...econBusinessMajors.slice(0, 5),
        ...techEngineeringMajors.slice(0, 3)
    ],
    "Đại học Đồng Tháp": [...generalMajors.slice(0, 6), ...agricultureMajors.slice(0, 4)],
    "Đại học An Giang": [...generalMajors.slice(0, 5), ...agricultureMajors.slice(0, 3), ...econBusinessMajors.slice(0, 3)],
    "Đại học Hồng Đức": [...generalMajors.slice(0, 6), ...techEngineeringMajors.slice(0, 3), ...agricultureMajors.slice(0, 3)],
    "Đại học Tây Nguyên": [...agricultureMajors.slice(0, 6), ...generalMajors.slice(0, 4), ...techEngineeringMajors.slice(0, 3)],
    "Đại học Lâm nghiệp": [
        { name: "Lâm học", blocks: ["A00", "B00"], baseScore: 18 },
        { name: "Quản lý tài nguyên rừng", blocks: ["A00", "B00"], baseScore: 18 },
        { name: "Lâm nghiệp đô thị", blocks: ["A00", "B00"], baseScore: 17 },
        { name: "Công nghệ chế biến lâm sản", blocks: ["A00", "A01", "B00"], baseScore: 18 },
        { name: "Thiết kế nội thất", blocks: ["H00", "V00"], baseScore: 19 },
        { name: "Quản lý đất đai", blocks: ["A00", "A01"], baseScore: 20 },
        { name: "Kinh tế", blocks: ["A00", "A01", "D01"], baseScore: 20 },
        ...techEngineeringMajors.slice(0, 3)
    ],
    "Đại học Công nghiệp Hà Nội": techEngineeringMajors,
    "Đại học Công nghiệp TP.HCM": [...techEngineeringMajors, ...econBusinessMajors.slice(0, 5)],
    "Đại học Giao thông Vận tải": [
        { name: "Kỹ thuật xây dựng công trình giao thông", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Kỹ thuật cầu đường", blocks: ["A00", "A01"], baseScore: 22 },
        { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], baseScore: 24 },
        { name: "Kỹ thuật hàng không", blocks: ["A00", "A01"], baseScore: 25 },
        { name: "Kỹ thuật đường sắt", blocks: ["A00", "A01"], baseScore: 21 },
        { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], baseScore: 24 },
        { name: "Kinh tế vận tải", blocks: ["A00", "A01", "D01"], baseScore: 23 },
        ...techEngineeringMajors.slice(0, 5)
    ],
    "Đại học Mỏ - Địa chất": [
        { name: "Kỹ thuật mỏ", blocks: ["A00", "A01"], baseScore: 20 },
        { name: "Kỹ thuật địa chất", blocks: ["A00", "A01"], baseScore: 20 },
        { name: "Kỹ thuật dầu khí", blocks: ["A00", "A01"], baseScore: 22 },
        { name: "Kỹ thuật trắc địa - Bản đồ", blocks: ["A00", "A01"], baseScore: 20 },
        { name: "Địa chất học", blocks: ["A00", "A01"], baseScore: 19 },
        { name: "Quản lý đất đai", blocks: ["A00", "A01"], baseScore: 21 },
        ...techEngineeringMajors.slice(0, 5)
    ],
    "Đại học Điện lực": [
        { name: "Kỹ thuật điện", blocks: ["A00", "A01"], baseScore: 24 },
        { name: "Hệ thống điện", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Năng lượng tái tạo", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Kỹ thuật nhiệt", blocks: ["A00", "A01"], baseScore: 22 },
        ...techEngineeringMajors.slice(0, 6)
    ],
    "Đại học Xây dựng": [
        { name: "Xây dựng dân dụng và công nghiệp", blocks: ["A00", "A01"], baseScore: 24 },
        { name: "Kỹ thuật xây dựng công trình giao thông", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Kỹ thuật xây dựng công trình thủy", blocks: ["A00", "A01"], baseScore: 22 },
        { name: "Kiến trúc", blocks: ["V00", "V01", "V02"], baseScore: 22 },
        { name: "Quy hoạch đô thị", blocks: ["V00", "V01"], baseScore: 21 },
        { name: "Kỹ thuật cấp thoát nước", blocks: ["A00", "A01"], baseScore: 22 },
        { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], baseScore: 22 },
        { name: "Quản lý xây dựng", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Kinh tế xây dựng", blocks: ["A00", "A01", "D01"], baseScore: 23 },
        { name: "Vật liệu xây dựng", blocks: ["A00", "A01"], baseScore: 21 }
    ]
};

function createScores(blocks, baseScore) {
    return blocks.map(block => ({
        year: 2025,
        block: block,
        score: +(baseScore + (Math.random() * 1.5 - 0.75)).toFixed(2),
        method: "THPT"
    }));
}

let updated = 0;
let newUnis = [];

data.universities.forEach(uni => {
    const majorsToAdd = uniMajorMap2[uni.name];
    if (majorsToAdd) {
        const existingNames = (uni.majors || []).map(m => m.name.toLowerCase());

        majorsToAdd.forEach((major, idx) => {
            if (!existingNames.includes(major.name.toLowerCase())) {
                if (!uni.majors) uni.majors = [];
                uni.majors.push({
                    code: `${uni.code || 'NEW'}-${uni.majors.length + 1}`,
                    name: major.name,
                    quota: Math.floor(Math.random() * 200) + 50,
                    scores: createScores(major.blocks, major.baseScore)
                });
                updated++;
            }
        });
        newUnis.push({ name: uni.name, count: uni.majors?.length || 0 });
    }
});

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`Added ${updated} new majors.`);
console.log('\nUpdated universities:');
newUnis.forEach(u => console.log(`  ${u.name}: ${u.count} majors`));

// Print overall stats
const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);
console.log(`\nTotal: ${data.universities.length} universities, ${totalMajors} majors, ${totalScores} score entries`);
