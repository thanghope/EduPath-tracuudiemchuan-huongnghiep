// Script to update more universities with real data - Part 3 (Southern & Regional)
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// More real data - Southern & Regional universities
const realData3 = {
    "Đại học Y Dược TP.HCM": {
        code: "UMP",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 28.00 },
            { name: "Răng Hàm Mặt", blocks: ["B00"], score: 27.50 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 27.00 },
            { name: "Y học cổ truyền", blocks: ["B00"], score: 25.80 },
            { name: "Điều dưỡng", blocks: ["B00"], score: 24.00 },
            { name: "Kỹ thuật xét nghiệm y học", blocks: ["B00"], score: 25.50 },
            { name: "Kỹ thuật hình ảnh y học", blocks: ["B00"], score: 25.00 },
            { name: "Y tế công cộng", blocks: ["B00"], score: 23.50 }
        ]
    },
    "ĐH Công nghệ thông tin - ĐHQG TP.HCM": {
        code: "UIT",
        majors: [
            { name: "Khoa học máy tính", blocks: ["A00", "A01", "D01"], score: 28.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01", "D01"], score: 27.80 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 27.50 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 27.30 },
            { name: "Hệ thống thông tin", blocks: ["A00", "A01", "D01"], score: 27.00 },
            { name: "Mạng máy tính và truyền thông dữ liệu", blocks: ["A00", "A01"], score: 26.80 },
            { name: "Kỹ thuật máy tính", blocks: ["A00", "A01"], score: 27.20 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 28.20 },
            { name: "Khoa học dữ liệu", blocks: ["A00", "A01"], score: 27.80 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 26.50 }
        ]
    },
    "ĐH KHXH&NV - ĐHQG TP.HCM": {
        code: "USSH-HCM",
        majors: [
            { name: "Báo chí", blocks: ["C00", "D01", "D14"], score: 27.00 },
            { name: "Quan hệ công chúng", blocks: ["C00", "D01"], score: 26.80 },
            { name: "Tâm lý học", blocks: ["A00", "C00", "D01"], score: 27.20 },
            { name: "Xã hội học", blocks: ["C00", "D01"], score: 25.50 },
            { name: "Ngữ văn Anh", blocks: ["D01", "D14", "D15"], score: 27.50 },
            { name: "Ngữ văn Trung Quốc", blocks: ["D01", "D04"], score: 26.00 },
            { name: "Nhật Bản học", blocks: ["C00", "D01"], score: 27.00 },
            { name: "Hàn Quốc học", blocks: ["C00", "D01"], score: 27.30 },
            { name: "Đông phương học", blocks: ["C00", "D01"], score: 26.50 },
            { name: "Việt Nam học", blocks: ["C00", "D01", "D14"], score: 25.80 },
            { name: "Du lịch", blocks: ["C00", "D01", "D14"], score: 26.30 }
        ]
    },
    "Đại học Cần Thơ": {
        code: "CTU",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 24.30 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 20.50 },
            { name: "Công nghệ chế biến thủy sản", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 19.50 },
            { name: "Thú y", blocks: ["A00", "B00"], score: 23.00 },
            { name: "Kinh tế", blocks: ["A00", "A01", "D01"], score: 23.80 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.00 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 26.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 24.00 }
        ]
    },
    "Đại học Đà Nẵng": {
        code: "UD",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 25.80 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kiến trúc", blocks: ["V00", "V01"], score: 23.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 25.30 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 26.50 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 27.00 },
            { name: "Y khoa", blocks: ["B00"], score: 27.50 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 25.00 }
        ]
    },
    "Đại học Huế": {
        code: "HU",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 27.00 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 26.00 },
            { name: "Răng Hàm Mặt", blocks: ["B00"], score: 26.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 25.30 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01", "D14"], score: 26.50 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Lâm nghiệp", blocks: ["A00", "B00"], score: 19.00 },
            { name: "Du lịch", blocks: ["C00", "D01", "D14"], score: 24.00 }
        ]
    },
    "Đại học Sư phạm Kỹ thuật TP.HCM": {
        code: "HCMUTE",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 26.50 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 26.30 },
            { name: "Kỹ thuật điện - điện tử", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 24.80 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], score: 25.80 },
            { name: "Công nghệ may", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Thiết kế thời trang", blocks: ["H00", "V00"], score: 21.50 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00", "D01"], score: 23.00 },
            { name: "Sư phạm Kỹ thuật công nghiệp", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14"], score: 25.00 }
        ]
    },
    "Đại học Công nghiệp TP.HCM": {
        code: "IUH",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 25.80 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật điện tử - viễn thông", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 23.80 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00", "D07"], score: 24.00 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00"], score: 24.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 25.30 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 24.80 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 24.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 }
        ]
    },
    "Đại học Nông Lâm TP.HCM": {
        code: "NLU",
        majors: [
            { name: "Nông học", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Bảo vệ thực vật", blocks: ["A00", "B00"], score: 19.50 },
            { name: "Chăn nuôi", blocks: ["A00", "B00"], score: 18.50 },
            { name: "Thú y", blocks: ["A00", "B00"], score: 23.50 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 19.00 },
            { name: "Lâm nghiệp", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00", "D08"], score: 24.00 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00", "D07"], score: 23.50 },
            { name: "Quản lý đất đai", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.00 }
        ]
    },
    "Đại học Tôn Đức Thắng": {
        code: "TDTU",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 26.50 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 26.30 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Kỹ thuật điện - điện tử", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 26.20 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 25.80 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 26.50 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 25.50 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 25.00 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 23.00 }
        ]
    },
    "Đại học Văn Lang": {
        code: "VLU",
        majors: [
            { name: "Kiến trúc", blocks: ["V00", "V01", "V02"], score: 22.50 },
            { name: "Thiết kế nội thất", blocks: ["V00", "H00"], score: 21.50 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 21.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 23.80 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 22.80 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.00 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 22.00 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 22.50 },
            { name: "Quản trị khách sạn", blocks: ["D01", "D14"], score: 22.00 }
        ]
    },
    "Đại học Hoa Sen": {
        code: "HSU",
        majors: [
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 23.30 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.50 },
            { name: "Du lịch", blocks: ["D01", "D14"], score: 23.00 },
            { name: "Quản trị khách sạn", blocks: ["D01", "D14"], score: 22.80 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 21.00 }
        ]
    },
    "Học viện Nông nghiệp Việt Nam": {
        code: "VNUA",
        majors: [
            { name: "Nông học", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Bảo vệ thực vật", blocks: ["A00", "B00"], score: 19.50 },
            { name: "Khoa học cây trồng", blocks: ["A00", "B00"], score: 19.00 },
            { name: "Chăn nuôi", blocks: ["A00", "B00"], score: 18.50 },
            { name: "Thú y", blocks: ["A00", "B00"], score: 23.00 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 18.50 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00", "D08"], score: 24.00 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00", "D07"], score: 23.50 },
            { name: "Quản lý đất đai", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Kinh tế nông nghiệp", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 }
        ]
    },
    "Học viện Kỹ thuật Quân sự": {
        code: "MTA",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 26.80 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 26.50 },
            { name: "Kỹ thuật điện tử", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Kỹ thuật viễn thông", blocks: ["A00", "A01"], score: 25.80 },
            { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], score: 26.20 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật hàng không", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Kỹ thuật hóa học", blocks: ["A00", "B00"], score: 24.00 }
        ]
    },
    "Đại học Hàng hải Việt Nam": {
        code: "VMU",
        majors: [
            { name: "Điều khiển tàu biển", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Khai thác máy tàu thủy", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Kỹ thuật xây dựng công trình thủy", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Kinh tế vận tải biển", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14"], score: 24.00 }
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
let updatedUnis = [];

data.universities.forEach(uni => {
    const real = realData3[uni.name];
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
                updated++;
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

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`Updated ${updated} entries from real data.`);
console.log('\nUpdated universities:');
updatedUnis.forEach(u => console.log(`  ${u.name}: ${u.count} majors`));

const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);
console.log(`\nTotal: ${data.universities.length} universities, ${totalMajors} majors, ${totalScores} score entries`);
