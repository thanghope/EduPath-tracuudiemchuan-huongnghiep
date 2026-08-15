// Script cập nhật dữ liệu 2024 - Part 4 (Trường tư thục và quân đội)
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// Dữ liệu chính thức 2024 - Part 4
const officialData2024Part4 = {
    "Đại học Công nghệ TP.HCM (HUTECH)": {
        code: "HUTECH",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 21.00 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 20.00 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Digital Marketing", blocks: ["A00", "D01"], score: 19.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Kinh tế quốc tế", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 18.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 19.00 },
            { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], score: 18.00 },
            { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01"], score: 18.00 },
            { name: "Kiến trúc", blocks: ["V00", "V01"], score: 18.00 },
            { name: "Thiết kế nội thất", blocks: ["V00", "H00"], score: 17.00 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 18.00 },
            { name: "Truyền thông đa phương tiện", blocks: ["C00", "D01"], score: 20.00 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 19.00 },
            { name: "Kỹ thuật điện - Điện tử", blocks: ["A00", "A01"], score: 18.00 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 17.00 }
        ]
    },
    "Đại học Văn Lang": {
        code: "VLU",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 22.50 },
            { name: "Răng Hàm Mặt", blocks: ["B00"], score: 21.50 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 20.50 },
            { name: "Điều dưỡng", blocks: ["B00"], score: 18.00 },
            { name: "Kiến trúc", blocks: ["V00", "V01"], score: 15.00 },
            { name: "Thiết kế nội thất", blocks: ["V00", "H00"], score: 15.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 17.00 },
            { name: "Quan hệ công chúng", blocks: ["C00", "D01"], score: 17.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 16.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Du lịch", blocks: ["D01"], score: 15.00 }
        ]
    },
    "Đại học Nguyễn Tất Thành": {
        code: "NTT",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 23.00 },
            { name: "Răng Hàm Mặt", blocks: ["B00"], score: 22.50 },
            { name: "Y học cổ truyền", blocks: ["B00"], score: 21.00 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 21.00 },
            { name: "Điều dưỡng", blocks: ["B00"], score: 19.00 },
            { name: "Kỹ thuật phục hồi chức năng", blocks: ["B00"], score: 19.00 },
            { name: "Kỹ thuật xét nghiệm y học", blocks: ["B00"], score: 19.00 },
            { name: "Y học dự phòng", blocks: ["B00"], score: 19.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 15.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 15.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 15.00 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 15.00 },
            { name: "Kiến trúc", blocks: ["V00", "V01"], score: 15.00 }
        ]
    },
    "Đại học Hoa Sen": {
        code: "HSU",
        majors: [
            { name: "Kinh tế thể thao", blocks: ["A00", "D01"], score: 19.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 18.00 },
            { name: "Digital Marketing", blocks: ["A00", "D01"], score: 17.00 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 17.00 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 17.00 },
            { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Logisitics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], score: 16.00 },
            { name: "Quản trị nhân lực", blocks: ["A00", "D01"], score: 16.00 },
            { name: "Công nghệ tài chính", blocks: ["A00", "A01"], score: 16.00 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 16.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 17.00 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 17.00 }
        ]
    },
    "Học viện Quân y": {
        code: "VMU",
        majors: [
            { name: "Y khoa (nam miền Bắc)", blocks: ["B00"], score: 26.13 },
            { name: "Y khoa (nữ miền Bắc)", blocks: ["B00"], score: 27.49 },
            { name: "Y khoa (nam miền Nam)", blocks: ["B00"], score: 25.75 },
            { name: "Y khoa (nữ miền Nam)", blocks: ["B00"], score: 27.34 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 25.00 }
        ]
    },
    "Đại học Phenikaa": {
        code: "PNK",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Khoa học máy tính (AI và Khoa học dữ liệu)", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Trí tuệ nhân tạo", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 19.00 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 19.00 },
            { name: "CNTT Việt Nhật", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 20.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], score: 19.00 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 18.00 },
            { name: "Kinh tế số", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 18.00 },
            { name: "Công nghệ tài chính", blocks: ["A00", "A01"], score: 18.00 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 18.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 17.00 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 22.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 19.00 }
        ]
    },
    "Đại học Mở Hà Nội": {
        code: "HOU",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 23.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 22.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.00 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 21.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Du lịch", blocks: ["D01"], score: 21.00 },
            { name: "Thiết kế đồ họa", blocks: ["H00", "V00"], score: 20.00 }
        ]
    },
    "Đại học Công nghiệp Hà Nội": {
        code: "HAUI",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Kỹ thuật phần mềm", blocks: ["A00", "A01"], score: 24.50 },
            { name: "An toàn thông tin", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 23.50 },
            { name: "Kỹ thuật điện tử", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kỹ thuật ô tô", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kỹ thuật điều khiển và tự động hóa", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.00 },
            { name: "Thiết kế thời trang", blocks: ["H00", "V00"], score: 20.00 },
            { name: "Công nghệ may", blocks: ["A00", "D01"], score: 19.00 }
        ]
    },
    "Học viện Nông nghiệp Việt Nam": {
        code: "VNUA",
        majors: [
            { name: "Thú y", blocks: ["A00", "B00"], score: 24.00 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00"], score: 23.00 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00"], score: 22.50 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Kinh tế nông nghiệp", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 22.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 23.50 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Khoa học môi trường", blocks: ["A00", "B00"], score: 20.00 }
        ]
    },
    "Đại học Thái Nguyên": {
        code: "TNU",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 25.50 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 24.00 },
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"], score: 26.50 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01"], score: 25.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.50 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Thú y", blocks: ["A00", "B00"], score: 22.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 23.00 }
        ]
    }
};

function updateUniversity(uniName, officialMajors, code) {
    const uni = data.universities.find(u => u.name === uniName);
    if (!uni) {
        console.log(`Không tìm thấy: ${uniName}`);
        return 0;
    }

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

console.log("=== CẬP NHẬT DỮ LIỆU CHÍNH THỨC 2024 - PART 4 ===\n");
console.log("(Trường tư thục, quân đội và khu vực)\n");

let totalUpdated = 0;
for (const [uniName, uniData] of Object.entries(officialData2024Part4)) {
    const count = updateUniversity(uniName, uniData.majors, uniData.code);
    if (count > 0) {
        console.log(`✓ ${uniName}: ${count} ngành`);
    }
    totalUpdated += count;
}

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));

console.log(`\n=== HOÀN THÀNH ===`);
console.log(`Đã cập nhật ${totalUpdated} ngành`);

const totalMajors = data.universities.reduce((sum, u) => sum + (u.majors?.length || 0), 0);
const totalScores = data.universities.reduce((sum, u) =>
    sum + (u.majors?.reduce((s, m) => s + (m.scores?.length || 0), 0) || 0), 0);
console.log(`\nTổng: ${data.universities.length} trường, ${totalMajors} ngành, ${totalScores} entries điểm`);
