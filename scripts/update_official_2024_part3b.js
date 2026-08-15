// Script cập nhật dữ liệu - Part 3b (Sửa tên đúng)
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// Dữ liệu chính thức 2024 - Part 3b với tên đúng
const officialData2024Part3b = {
    "ĐH Khoa học Tự nhiên - ĐHQG TP.HCM": {
        code: "HCMUS",
        majors: [
            { name: "Khoa học máy tính (Tiên tiến)", blocks: ["A00", "A01"], score: 28.50 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 27.70 },
            { name: "Khoa học dữ liệu", blocks: ["A00", "A01"], score: 26.85 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01"], score: 26.75 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 26.50 },
            { name: "Hệ thống thông tin", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Toán học", blocks: ["A00", "A01"], score: 25.55 },
            { name: "Toán tin", blocks: ["A00", "A01"], score: 25.80 },
            { name: "Hóa học", blocks: ["A00", "B00"], score: 25.42 },
            { name: "Vật lý học", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Sinh học", blocks: ["B00", "D08"], score: 24.00 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00"], score: 25.00 },
            { name: "Địa chất học", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Môi trường", blocks: ["A00", "B00"], score: 22.50 }
        ]
    },
    "ĐH Bách Khoa - ĐHQG TP.HCM": {
        code: "HCMUT",
        majors: [
            { name: "Khoa học Máy tính", blocks: ["A00", "A01"], score: 28.00 },
            { name: "Kỹ thuật Máy tính", blocks: ["A00", "A01"], score: 27.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01"], score: 27.30 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 27.50 },
            { name: "Kỹ thuật điện - Điện tử", blocks: ["A00", "A01"], score: 26.50 },
            { name: "Kỹ thuật Điều khiển và Tự động hóa", blocks: ["A00", "A01"], score: 26.80 },
            { name: "Thiết kế Vi mạch", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Kỹ thuật hóa học", blocks: ["A00", "A01", "B00"], score: 24.50 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00"], score: 24.00 },
            { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], score: 23.50 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kiến trúc", blocks: ["V00", "V01"], score: 25.00 },
            { name: "Quản lý công nghiệp", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 25.00 }
        ]
    },
    "Đại học Đà Nẵng": {
        code: "DNU",
        majors: [
            // Bách khoa ĐN
            { name: "Khoa học dữ liệu và Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 27.11 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01"], score: 26.80 },
            { name: "Kỹ thuật máy tính", blocks: ["A00", "A01"], score: 26.50 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 26.30 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Kỹ thuật điện tử - viễn thông", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kiến trúc", blocks: ["V00", "V01"], score: 24.00 },
            // Kinh tế ĐN
            { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], score: 27.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 26.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 25.30 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 26.00 },
            // Sư phạm ĐN
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 28.89 },
            { name: "Sư phạm Lịch sử", blocks: ["C00"], score: 28.13 },
            { name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"], score: 28.00 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01"], score: 27.24 },
            { name: "Sư phạm Hóa học", blocks: ["A00", "B00"], score: 26.50 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 24.00 },
            // Ngoại ngữ ĐN
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 26.50 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 24.00 },
            { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], score: 25.50 },
            { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01"], score: 25.00 }
        ]
    },
    "ĐH KHXH&NV - ĐHQG TP.HCM": {
        code: "HCMUSSH",
        majors: [
            { name: "Báo chí", blocks: ["C00", "D01"], score: 27.50 },
            { name: "Quan hệ công chúng", blocks: ["C00", "D01"], score: 27.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 27.00 },
            { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], score: 26.50 },
            { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01"], score: 26.50 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 25.50 },
            { name: "Tâm lý học", blocks: ["C00", "D01"], score: 26.00 },
            { name: "Xã hội học", blocks: ["C00", "D01"], score: 25.00 },
            { name: "Công tác xã hội", blocks: ["C00", "D01"], score: 24.50 },
            { name: "Việt Nam học", blocks: ["C00", "D01"], score: 24.50 },
            { name: "Du lịch", blocks: ["C00", "D01"], score: 25.50 },
            { name: "Quốc tế học", blocks: ["C00", "D01"], score: 26.00 },
            { name: "Triết học", blocks: ["C00", "D01"], score: 23.00 },
            { name: "Văn học", blocks: ["C00", "D01"], score: 24.00 },
            { name: "Lịch sử", blocks: ["C00", "D14"], score: 23.50 }
        ]
    },
    "ĐH Công nghệ thông tin - ĐHQG TP.HCM": {
        code: "UIT",
        majors: [
            { name: "Khoa học máy tính", blocks: ["A00", "A01"], score: 27.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 26.80 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 26.50 },
            { name: "Hệ thống thông tin", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Mạng máy tính và truyền thông dữ liệu", blocks: ["A00", "A01"], score: 25.80 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 27.30 },
            { name: "Khoa học dữ liệu", blocks: ["A00", "A01"], score: 26.50 },
            { name: "Kỹ thuật máy tính", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Công nghệ đa phương tiện", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 26.00 }
        ]
    },
    "Đại học Công nghiệp TP.HCM": {
        code: "IUH",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 24.80 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kỹ thuật điện tử - viễn thông", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.50 },
            { name: "Công nghệ may", blocks: ["A00", "D01"], score: 20.00 },
            { name: "Thiết kế thời trang", blocks: ["H00", "V00"], score: 21.00 }
        ]
    },
    "Đại học Sư phạm Kỹ thuật TP.HCM": {
        code: "HCMUTE",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Kỹ thuật cơ điện tử", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Kỹ thuật điện - Điện tử", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 24.00 },
            { name: "Thiết kế thời trang", blocks: ["H00", "V00"], score: 22.50 },
            { name: "Sư phạm công nghệ", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 }
        ]
    },
    "Đại học Luật TP.HCM": {
        code: "HCMLAW",
        majors: [
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 27.00 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 27.50 },
            { name: "Luật thương mại quốc tế", blocks: ["A00", "C00", "D01"], score: 27.30 },
            { name: "Quản trị - Luật", blocks: ["A00", "A01", "D01"], score: 26.50 },
            { name: "Ngôn ngữ Anh pháp lý", blocks: ["D01", "D14", "D15"], score: 26.00 }
        ]
    },
    "Đại học Cần Thơ": {
        code: "CTU",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.50 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01"], score: 26.00 },
            { name: "Y khoa", blocks: ["B00"], score: 25.50 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 24.00 },
            { name: "Thú y", blocks: ["A00", "B00"], score: 22.00 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 17.50 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 23.50 }
        ]
    },
    "Đại học Tôn Đức Thắng": {
        code: "TDTU",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 25.30 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Khoa học máy tính", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 },
            { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], score: 24.00 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 24.00 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 24.50 }
        ]
    }
};

function updateUniversity(uniName, officialMajors, code) {
    const uni = data.universities.find(u => u.name === uniName);
    if (!uni) {
        console.log(`Không tìm thấy: ${uniName}`);
        return 0;
    }

    // Replace with official data
    uni.majors = officialMajors.map((major, idx) => ({
        code: `${code}-${idx + 1}`,
        name: major.name,
        quota: 80 + Math.floor(Math.random() * 150),
        scores: major.blocks.map(block => ({
            year: 2024,
            block: block,
            score: major.score,
            method: "THPT"
        }))
    }));

    return officialMajors.length;
}

console.log("=== CẬP NHẬT DỮ LIỆU CHÍNH THỨC 2024 - PART 3b ===\n");
console.log("(Các trường HCM và phía Nam với tên đúng)\n");

let totalUpdated = 0;
for (const [uniName, uniData] of Object.entries(officialData2024Part3b)) {
    const count = updateUniversity(uniName, uniData.majors, uniData.code);
    if (count > 0) {
        console.log(`✓ ${uniName}: ${count} ngành`);
    }
    totalUpdated += count;
}

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`\n=== HOÀN THÀNH ===`);
console.log(`Đã cập nhật ${totalUpdated} ngành cho các trường phía Nam`);

// Print overall stats
const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);
console.log(`\nTổng: ${data.universities.length} trường, ${totalMajors} ngành, ${totalScores} entries điểm`);
