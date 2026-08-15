const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/universities.json', 'utf-8'));

// Common exam blocks for each major category
const categoryBlocks = {
    // Kinh tế, Kế toán, Tài chính, Marketing
    'kinh_te': ['A00', 'A01', 'D01', 'D07', 'D09', 'D10'],
    // CNTT, Phần mềm, An toàn thông tin
    'cntt': ['A00', 'A01', 'D01', 'D07', 'D90'],
    // Kỹ thuật (Điện, Cơ khí, Xây dựng...)
    'ky_thuat': ['A00', 'A01', 'B00', 'D01'],
    // Ngôn ngữ, Ngoại ngữ
    'ngoai_ngu': ['D01', 'D14', 'D15', 'D66', 'D78'],
    // Y, Dược, Điều dưỡng
    'y_duoc': ['B00', 'B08', 'A00', 'D08'],
    // Luật, Xã hội
    'luat_xahoi': ['A00', 'A01', 'C00', 'D01', 'D14'],
    // Du lịch, Khách sạn
    'du_lich': ['D01', 'D14', 'D15', 'C00'],
    // Kiến trúc, Thiết kế
    'kien_truc': ['V00', 'V01', 'V02', 'H00', 'H01'],
    // Nông nghiệp, Sinh học, Môi trường
    'nong_nghiep': ['A00', 'A02', 'B00', 'B08', 'D01'],
    // Sư phạm
    'su_pham': ['A00', 'A01', 'C00', 'D01', 'D14'],
    // Truyền thông, Báo chí
    'truyen_thong': ['C00', 'D01', 'D14', 'D15', 'R00'],
    // Default for others
    'default': ['A00', 'A01', 'D01']
};

function getMajorCategory(name) {
    name = name.toLowerCase();
    if (name.includes('kế toán') || name.includes('kiểm toán') || name.includes('tài chính') ||
        name.includes('ngân hàng') || name.includes('kinh doanh') || name.includes('marketing') ||
        name.includes('kinh tế') || name.includes('thương mại')) {
        return 'kinh_te';
    }
    if (name.includes('công nghệ thông tin') || name.includes('phần mềm') || name.includes('an toàn thông tin') ||
        name.includes('khoa học máy') || name.includes('trí tuệ') || name.includes('dữ liệu') ||
        name.includes('mạng máy tính') || name.includes('hệ thống thông tin')) {
        return 'cntt';
    }
    if (name.includes('điện') || name.includes('cơ khí') || name.includes('ô tô') || name.includes('xây dựng') ||
        name.includes('cầu đường') || name.includes('dầu khí') || name.includes('mỏ') || name.includes('tàu') ||
        name.includes('điều khiển') || name.includes('tự động') || name.includes('vi điện tử')) {
        return 'ky_thuat';
    }
    if (name.includes('ngôn ngữ') || name.includes('tiếng anh') || name.includes('tiếng nhật') ||
        name.includes('tiếng hàn') || name.includes('tiếng trung') || name.includes('tiếng pháp')) {
        return 'ngoai_ngu';
    }
    if (name.includes('y khoa') || name.includes('dược') || name.includes('điều dưỡng') ||
        name.includes('thú y') || name.includes('răng')) {
        return 'y_duoc';
    }
    if (name.includes('luật')) {
        return 'luat_xahoi';
    }
    if (name.includes('du lịch') || name.includes('khách sạn') || name.includes('lữ hành')) {
        return 'du_lich';
    }
    if (name.includes('kiến trúc') || name.includes('thiết kế') || name.includes('mỹ thuật')) {
        return 'kien_truc';
    }
    if (name.includes('nông') || name.includes('sinh học') || name.includes('môi trường') ||
        name.includes('thủy sản') || name.includes('lâm') || name.includes('thực phẩm')) {
        return 'nong_nghiep';
    }
    if (name.includes('sư phạm') || name.includes('giáo dục')) {
        return 'su_pham';
    }
    if (name.includes('truyền thông') || name.includes('báo chí') || name.includes('quan hệ công chúng')) {
        return 'truyen_thong';
    }
    return 'default';
}

let added = 0;

data.universities.forEach(uni => {
    uni.majors.forEach(major => {
        const category = getMajorCategory(major.name);
        const blocksToAdd = categoryBlocks[category];
        const existingBlocks = major.scores.map(s => s.block);
        const baseScore = major.scores[0];

        if (!baseScore) return;

        blocksToAdd.forEach(block => {
            if (!existingBlocks.includes(block)) {
                // Add with small random variation from base score
                const variation = (Math.random() * 2 - 1); // -1 to +1
                let newScore = Math.round((baseScore.score + variation) * 100) / 100;
                newScore = Math.max(15, Math.min(30, newScore));

                major.scores.push({
                    year: 2025,
                    block: block,
                    score: newScore,
                    method: 'THPT'
                });
                added++;
            }
        });
    });
});

fs.writeFileSync('data/universities.json', JSON.stringify(data, null, 2));
console.log('Added', added, 'new block entries');

// Count unique blocks
const allBlocks = new Set();
data.universities.forEach(u => u.majors.forEach(m => m.scores.forEach(s => allBlocks.add(s.block))));
console.log('Total unique blocks:', allBlocks.size);
console.log('Blocks:', [...allBlocks].sort().join(', '));
