// Script cập nhật dữ liệu 2024 - Part 5 (Trường VNU và chuyên ngành)
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf8'));

// Dữ liệu 2024 - Part 5
const officialData2024Part5 = {
    "ĐH Giáo dục - ĐHQGHN": {
        code: "UNED",
        majors: [
            { name: "Sư phạm Toán học", blocks: ["A00", "A01"], score: 27.00 },
            { name: "Sư phạm Ngữ văn", blocks: ["C00", "D01"], score: 27.50 },
            { name: "Sư phạm Tiếng Anh", blocks: ["D01"], score: 26.50 },
            { name: "Sư phạm Vật lý", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Sư phạm Hóa học", blocks: ["A00", "B00"], score: 25.00 },
            { name: "Sư phạm Sinh học", blocks: ["B00"], score: 24.50 },
            { name: "Giáo dục Tiểu học", blocks: ["C00", "D01"], score: 27.00 },
            { name: "Giáo dục Mầm non", blocks: ["M00", "M01"], score: 24.00 },
            { name: "Quản lý giáo dục", blocks: ["C00", "D01"], score: 25.00 },
            { name: "Tâm lý học giáo dục", blocks: ["C00", "D01"], score: 25.50 }
        ]
    },
    "ĐH Y Dược - ĐHQGHN": {
        code: "VNUSM",
        majors: [
            { name: "Y khoa", blocks: ["B00"], score: 27.00 },
            { name: "Dược học", blocks: ["A00", "B00"], score: 25.50 },
            { name: "Điều dưỡng", blocks: ["B00"], score: 23.00 },
            { name: "Y học cổ truyền", blocks: ["B00"], score: 24.50 },
            { name: "Kỹ thuật xét nghiệm y học", blocks: ["B00"], score: 23.50 },
            { name: "Y tế công cộng", blocks: ["B00"], score: 22.00 }
        ]
    },
    "ĐH Luật - ĐHQGHN": {
        code: "VNULAW",
        majors: [
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 27.00 },
            { name: "Luật kinh tế", blocks: ["A00", "C00", "D01"], score: 27.50 },
            { name: "Luật quốc tế", blocks: ["A00", "C00", "D01"], score: 27.00 }
        ]
    },
    "ĐH Ngoại ngữ - ĐHQGHN": {
        code: "ULIS",
        majors: [
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 27.50 },
            { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], score: 27.00 },
            { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01"], score: 27.20 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 26.00 },
            { name: "Ngôn ngữ Pháp", blocks: ["D01", "D03"], score: 24.50 },
            { name: "Ngôn ngữ Đức", blocks: ["D01"], score: 25.00 },
            { name: "Ngôn ngữ Nga", blocks: ["D01"], score: 24.00 },
            { name: "Sư phạm tiếng Anh", blocks: ["D01"], score: 27.00 },
            { name: "Biên-Phiên dịch tiếng Anh", blocks: ["D01", "D14"], score: 27.30 }
        ]
    },
    "ĐH Việt Nhật - ĐHQGHN": {
        code: "VJU",
        majors: [
            { name: "Công nghệ nano", blocks: ["A00", "A01"], score: 24.00 },
            { name: "Kỹ thuật hạ tầng", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01"], score: 24.50 },
            { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], score: 22.00 },
            { name: "Chính sách công", blocks: ["C00", "D01"], score: 23.00 }
        ]
    },
    "Học viện Ngoại giao": {
        code: "DAV",
        majors: [
            { name: "Quan hệ quốc tế", blocks: ["C00", "D01", "D78"], score: 28.00 },
            { name: "Kinh tế quốc tế", blocks: ["A00", "A01", "D01"], score: 27.50 },
            { name: "Luật quốc tế", blocks: ["A00", "C00", "D01"], score: 27.00 },
            { name: "Truyền thông quốc tế", blocks: ["C00", "D01"], score: 27.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 27.00 },
            { name: "Ngôn ngữ Pháp", blocks: ["D01", "D03"], score: 26.00 }
        ]
    },
    "Đại học Hà Nội": {
        code: "HANU",
        majors: [
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 28.00 },
            { name: "Ngôn ngữ Nhật", blocks: ["D01", "D06"], score: 27.50 },
            { name: "Ngôn ngữ Hàn Quốc", blocks: ["D01"], score: 27.30 },
            { name: "Ngôn ngữ Trung Quốc", blocks: ["D01", "D04"], score: 26.50 },
            { name: "Ngôn ngữ Pháp", blocks: ["D01", "D03"], score: 25.00 },
            { name: "Ngôn ngữ Đức", blocks: ["D01"], score: 25.50 },
            { name: "Ngôn ngữ Tây Ban Nha", blocks: ["D01"], score: 24.50 },
            { name: "Kinh doanh quốc tế", blocks: ["A00", "A01", "D01"], score: 26.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Du lịch", blocks: ["D01"], score: 25.50 }
        ]
    },
    "Đại học Mỏ - Địa chất": {
        code: "HUMG",
        majors: [
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kỹ thuật địa chất", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Kỹ thuật mỏ", blocks: ["A00", "A01"], score: 20.50 },
            { name: "Kỹ thuật trắc địa - Bản đồ", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Kinh tế", blocks: ["A00", "A01", "D01"], score: 22.00 }
        ]
    },
    "Đại học Thủy lợi": {
        code: "TLU",
        majors: [
            { name: "Kỹ thuật tài nguyên nước", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Kỹ thuật xây dựng công trình thủy", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Kỹ thuật xây dựng", blocks: ["A00", "A01"], score: 23.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Kỹ thuật điện", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], score: 21.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Luật", blocks: ["A00", "C00", "D01"], score: 22.50 }
        ]
    },
    "Đại học Hàng hải Việt Nam": {
        code: "VMU-MM",
        majors: [
            { name: "Điều khiển tàu biển", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Khai thác máy tàu biển", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Kỹ thuật xây dựng công trình biển", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kinh tế vận tải", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 22.00 },
            { name: "Kỹ thuật điện - Điện tử", blocks: ["A00", "A01"], score: 22.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 24.00 }
        ]
    },
    "Đại học Tài chính - Marketing": {
        code: "UFM",
        majors: [
            { name: "Marketing", blocks: ["A00", "A01", "D01"], score: 26.00 },
            { name: "Tài chính - Ngân hàng", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Kiểm toán", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Kinh doanh thương mại", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Truyền thông Marketing", blocks: ["A00", "D01"], score: 26.00 },
            { name: "Bất động sản", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Thương mại điện tử", blocks: ["A00", "A01", "D01"], score: 25.50 },
            { name: "Du lịch", blocks: ["D01"], score: 24.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 25.00 }
        ]
    },
    "Đại học Nông Lâm TP.HCM": {
        code: "NLU",
        majors: [
            { name: "Thú y", blocks: ["A00", "B00"], score: 24.00 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00"], score: 23.50 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00"], score: 23.00 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Lâm học", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 18.50 },
            { name: "Quản lý đất đai", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 21.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Kinh tế nông nghiệp", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 23.00 }
        ]
    },
    "Đại học Nha Trang": {
        code: "NTU",
        majors: [
            { name: "Nuôi trồng thủy sản", blocks: ["A00", "B00"], score: 20.00 },
            { name: "Công nghệ thực phẩm", blocks: ["A00", "B00"], score: 22.00 },
            { name: "Công nghệ sinh học", blocks: ["A00", "B00"], score: 21.50 },
            { name: "Khai thác thủy sản", blocks: ["A00", "A01"], score: 18.00 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 23.00 },
            { name: "Kỹ thuật cơ khí", blocks: ["A00", "A01"], score: 21.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 22.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 21.50 },
            { name: "Du lịch", blocks: ["D01"], score: 22.50 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 23.00 }
        ]
    },
    "Học viện Hàng không Việt Nam": {
        code: "VAA",
        majors: [
            { name: "Khai thác hàng không", blocks: ["A00", "A01"], score: 25.00 },
            { name: "Quản lý hoạt động bay", blocks: ["A00", "A01"], score: 26.00 },
            { name: "Kỹ thuật hàng không", blocks: ["A00", "A01"], score: 25.50 },
            { name: "Logistics và Quản lý chuỗi cung ứng", blocks: ["A00", "A01", "D01"], score: 25.00 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 24.50 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 24.00 },
            { name: "Ngôn ngữ Anh", blocks: ["D01", "D14", "D15"], score: 25.50 }
        ]
    },
    "Đại học Lâm nghiệp": {
        code: "VFU",
        majors: [
            { name: "Lâm học", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Quản lý tài nguyên rừng", blocks: ["A00", "B00"], score: 18.50 },
            { name: "Công nghệ chế biến lâm sản", blocks: ["A00", "A01"], score: 19.00 },
            { name: "Nông học", blocks: ["A00", "B00"], score: 18.00 },
            { name: "Thiết kế nội thất", blocks: ["V00", "H00"], score: 20.00 },
            { name: "Kiến trúc cảnh quan", blocks: ["V00", "V01"], score: 20.50 },
            { name: "Kỹ thuật môi trường", blocks: ["A00", "A01", "B00"], score: 19.50 },
            { name: "Quản trị kinh doanh", blocks: ["A00", "A01", "D01"], score: 21.00 },
            { name: "Kế toán", blocks: ["A00", "A01", "D01"], score: 20.50 },
            { name: "Công nghệ thông tin", blocks: ["A00", "A01", "D01"], score: 22.00 }
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

console.log("=== CẬP NHẬT DỮ LIỆU 2024 - PART 5 ===\n");
console.log("(VNU và các trường chuyên ngành)\n");

let totalUpdated = 0;
for (const [uniName, uniData] of Object.entries(officialData2024Part5)) {
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
