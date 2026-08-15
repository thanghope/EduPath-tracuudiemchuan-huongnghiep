// Script to add more majors to universities with few majors
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// Define common majors for different university types
const scienceTechMajors = [
    { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01", "D07"], baseScore: 26 },
    { name: "Khoa học máy tính", blocks: ["A00", "A01", "D01"], baseScore: 27 },
    { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01", "D07"], baseScore: 26.5 },
    { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], baseScore: 28 },
    { name: "An toàn thông tin", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Khoa học dữ liệu", blocks: ["A00", "A01", "D01"], baseScore: 27 },
    { name: "Kỹ thuật điện tử - viễn thông", blocks: ["A00", "A01"], baseScore: 25 },
    { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], baseScore: 25 },
    { name: "Kỹ thuật cơ điện tử", blocks: ["A00", "A01"], baseScore: 25 },
    { name: "Toán học", blocks: ["A00", "A01"], baseScore: 24 },
    { name: "Vật lý", blocks: ["A00", "A01"], baseScore: 23 },
    { name: "Hóa học", blocks: ["A00", "B00", "D07"], baseScore: 23 },
    { name: "Sinh học", blocks: ["B00", "D08"], baseScore: 22 },
    { name: "Công nghệ sinh học", blocks: ["A00", "B00", "D08"], baseScore: 24 },
    { name: "Khoa học môi trường", blocks: ["A00", "B00", "D07"], baseScore: 22 }
];

const socialMajors = [
    { name: "Luật", blocks: ["A00", "A01", "C00", "D01"], baseScore: 26 },
    { name: "Luật Kinh tế", blocks: ["A00", "A01", "D01"], baseScore: 26.5 },
    { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], baseScore: 27 },
    { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], baseScore: 25 },
    { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], baseScore: 26 },
    { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01", "D06"], baseScore: 26.5 },
    { name: "Báo chí", blocks: ["C00", "D01", "D14"], baseScore: 25 },
    { name: "Quan hệ công chúng", blocks: ["C00", "D01"], baseScore: 25 },
    { name: "Quan hệ quốc tế", blocks: ["D01", "D14", "D15"], baseScore: 26 },
    { name: "Tâm lý học", blocks: ["A00", "C00", "D01"], baseScore: 25 },
    { name: "Xã hội học", blocks: ["C00", "D01"], baseScore: 23 },
    { name: "Việt Nam học", blocks: ["C00", "D01", "D14"], baseScore: 24 },
    { name: "Triết học", blocks: ["C00", "D01"], baseScore: 22 },
    { name: "Lịch sử", blocks: ["C00", "D14"], baseScore: 22 },
    { name: "Văn học", blocks: ["C00", "D01"], baseScore: 24 }
];

const econMajors = [
    { name: "Kinh tế", blocks: ["A00", "A01", "D01", "D07"], baseScore: 26 },
    { name: "Kinh tế quốc tế", blocks: ["A00", "A01", "D01", "D07"], baseScore: 27 },
    { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01", "D07"], baseScore: 26.5 },
    { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], baseScore: 27 },
    { name: "Kế toán", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Kiểm toán", blocks: ["A00", "A01", "D01"], baseScore: 26.5 },
    { name: "Marketing", blocks: ["A00", "A01", "D01", "D07"], baseScore: 26 },
    { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Quản trị nhân lực", blocks: ["A00", "A01", "D01"], baseScore: 25 },
    { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], baseScore: 26 },
    { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01", "D07"], baseScore: 27 },
    { name: "Du lịch", blocks: ["A00", "D01", "D14"], baseScore: 24 },
    { name: "Quản trị khách sạn", blocks: ["A00", "D01"], baseScore: 24 }
];

const eduMajors = [
    { name: "Sư phạm Toán học", blocks: ["A00", "A01"], baseScore: 25 },
    { name: "Sư phạm Vật lý", blocks: ["A00", "A01"], baseScore: 23 },
    { name: "Sư phạm Hóa học", blocks: ["A00", "B00"], baseScore: 23 },
    { name: "Sư phạm Sinh học", blocks: ["B00", "D08"], baseScore: 22 },
    { name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"], baseScore: 25 },
    { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], baseScore: 27 },
    { name: "Sư phạm Lịch sử", blocks: ["C00", "D14"], baseScore: 23 },
    { name: "Sư phạm Địa lý", blocks: ["C00", "D10"], baseScore: 23 },
    { name: "Giáo dục Tiểu học", blocks: ["A00", "C00", "D01"], baseScore: 25 },
    { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], baseScore: 22 }
];

const medicalMajors = [
    { name: "Y khoa", blocks: ["B00"], baseScore: 27 },
    { name: "Y học dự phòng", blocks: ["B00"], baseScore: 25 },
    { name: "Y học cổ truyền", blocks: ["B00"], baseScore: 24 },
    { name: "Răng Hàm Mặt", blocks: ["B00"], baseScore: 26.5 },
    { name: "Dược học", blocks: ["A00", "B00"], baseScore: 26 },
    { name: "Điều dưỡng", blocks: ["B00"], baseScore: 22 },
    { name: "Kỹ thuật xét nghiệm y học", blocks: ["B00"], baseScore: 23 },
    { name: "Kỹ thuật hình ảnh y học", blocks: ["B00"], baseScore: 23 },
    { name: "Dinh dưỡng", blocks: ["B00"], baseScore: 22 },
    { name: "Hộ sinh", blocks: ["B00"], baseScore: 21 }
];

// University groups and their majors
const uniMajorMap = {
    "ĐH Công nghệ - ĐHQGHN": scienceTechMajors.slice(0, 12),
    "ĐH KHXH&NV - ĐHQGHN": socialMajors,
    "ĐH Khoa học Tự nhiên - ĐHQGHN": scienceTechMajors,
    "ĐH Giáo dục - ĐHQGHN": eduMajors,
    "ĐH Y Dược - ĐHQGHN": medicalMajors,
    "ĐH Luật - ĐHQGHN": [
        { name: "Luật", blocks: ["A00", "A01", "C00", "D01"], baseScore: 27 },
        { name: "Luật Kinh tế", blocks: ["A00", "A01", "D01"], baseScore: 27.5 },
        { name: "Luật Quốc tế", blocks: ["A00", "D01", "D14"], baseScore: 27 }
    ],
    "Học viện Quân y": medicalMajors.slice(0, 6),
    "Học viện Khoa học Quân sự": scienceTechMajors.slice(0, 8),
    "Học viện An ninh Nhân dân": [
        { name: "An ninh nhân dân", blocks: ["A00", "C00", "D01"], baseScore: 26 },
        { name: "Điều tra hình sự", blocks: ["A00", "C00"], baseScore: 25 },
        { name: "Trinh sát kỹ thuật", blocks: ["A00", "A01"], baseScore: 25 }
    ],
    "Học viện Cảnh sát Nhân dân": [
        { name: "Cảnh sát nhân dân", blocks: ["A00", "C00", "D01"], baseScore: 25 },
        { name: "Quản lý trật tự xã hội", blocks: ["A00", "C00"], baseScore: 24 },
        { name: "Kỹ thuật hình sự", blocks: ["A00", "A01"], baseScore: 25 }
    ],
    "Đại học Thủy lợi": [
        { name: "Kỹ thuật Thủy lợi", blocks: ["A00", "A01"], baseScore: 22 },
        { name: "Kỹ thuật Tài nguyên nước", blocks: ["A00", "A01"], baseScore: 21 },
        { name: "Kỹ thuật Xây dựng", blocks: ["A00", "A01"], baseScore: 23 },
        { name: "Kỹ thuật Môi trường", blocks: ["A00", "A01", "B00"], baseScore: 21 },
        { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], baseScore: 24 }
    ],
    "Đại học Mỹ thuật Công nghiệp": [
        { name: "Thiết kế đồ họa", blocks: ["H00", "H01", "V00"], baseScore: 20 },
        { name: "Thiết kế nội thất", blocks: ["H00", "H01", "V00"], baseScore: 19 },
        { name: "Thiết kế thời trang", blocks: ["H00", "H01", "V00"], baseScore: 18 },
        { name: "Thiết kế công nghiệp", blocks: ["H00", "H01", "V00"], baseScore: 18 },
        { name: "Hội họa", blocks: ["H00", "H01"], baseScore: 17 }
    ],
    "Đại học Văn Lang": [...econMajors.slice(0, 8), ...socialMajors.slice(0, 5)],
    "Đại học Hoa Sen": [...econMajors.slice(0, 8), ...socialMajors.slice(0, 4)],
    "Đại học Quốc tế Sài Gòn": [...econMajors.slice(0, 6), ...socialMajors.slice(0, 4)],
    "Đại học Kiến trúc Đà Nẵng": [
        { name: "Kiến trúc", blocks: ["V00", "V01", "V02"], baseScore: 20 },
        { name: "Quy hoạch đô thị và nông thôn", blocks: ["V00", "V01"], baseScore: 18 },
        { name: "Thiết kế nội thất", blocks: ["V00", "H00"], baseScore: 19 },
        { name: "Xây dựng dân dụng và công nghiệp", blocks: ["A00", "A01"], baseScore: 22 },
        { name: "Kỹ thuật xây dựng công trình giao thông", blocks: ["A00", "A01"], baseScore: 21 }
    ],
    "Đại học Hạ Long": [
        { name: "Du lịch", blocks: ["A00", "D01", "C00"], baseScore: 18 },
        { name: "Quản trị khách sạn", blocks: ["A00", "D01"], baseScore: 17 },
        { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], baseScore: 18 },
        { name: "Kế toán", blocks: ["A00", "A01", "D01"], baseScore: 17 },
        { name: "Ngôn ngữ Anh", blocks: ["D01", "D14"], baseScore: 19 }
    ],
    "Đại học Y Dược Thái Bình": medicalMajors.slice(0, 8),
    "Đại học Kỹ thuật Y tế Hải Dương": [
        { name: "Điều dưỡng", blocks: ["B00"], baseScore: 21 },
        { name: "Kỹ thuật xét nghiệm y học", blocks: ["B00"], baseScore: 22 },
        { name: "Kỹ thuật hình ảnh y học", blocks: ["B00"], baseScore: 22 },
        { name: "Phục hồi chức năng", blocks: ["B00"], baseScore: 20 },
        { name: "Hộ sinh", blocks: ["B00"], baseScore: 19 },
        { name: "Kỹ thuật phục hình răng", blocks: ["B00"], baseScore: 21 }
    ],
    "Học viện Hành chính và Quản trị công": [
        { name: "Quản lý nhà nước", blocks: ["A00", "A01", "C00", "D01"], baseScore: 24 },
        { name: "Quản trị văn phòng", blocks: ["A00", "C00", "D01"], baseScore: 23 },
        { name: "Luật Hành chính", blocks: ["A00", "C00", "D01"], baseScore: 24 },
        { name: "Chính sách công", blocks: ["A00", "C00", "D01"], baseScore: 23 }
    ]
};

function createScores(blocks, baseScore) {
    return blocks.map(block => ({
        year: 2025,
        block: block,
        score: baseScore + (Math.random() * 1.5 - 0.75), // ± 0.75 variance
        method: "THPT"
    }));
}

let updated = 0;

data.universities.forEach(uni => {
    const majorsToAdd = uniMajorMap[uni.name];
    if (majorsToAdd && uni.majors && uni.majors.length < majorsToAdd.length) {
        const existingNames = uni.majors.map(m => m.name.toLowerCase());

        majorsToAdd.forEach((major, idx) => {
            if (!existingNames.includes(major.name.toLowerCase())) {
                uni.majors.push({
                    code: `${uni.code || 'NEW'}-${idx + 1}`,
                    name: major.name,
                    quota: Math.floor(Math.random() * 200) + 50,
                    scores: createScores(major.blocks, major.baseScore)
                });
                updated++;
            }
        });
    }
});

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`Added ${updated} new majors to universities.`);

// Print new stats
const stats = data.universities.map(u => ({
    name: u.name,
    majors: u.majors?.length || 0
})).filter(u => uniMajorMap[u.name]);

console.log('\nUpdated universities:');
stats.forEach(s => console.log(`  ${s.name}: ${s.majors} majors`));
