---
noteId: "101d35a0fdd011f08e3ddf5a25c44c1b"
tags: []

---

# KẾ HOẠCH PHÁT TRIỂN CHI TIẾT
## Tính năng: Phân tích Điểm Thi Thử & Dự đoán Khả năng Đậu

---

## 1. TỔNG QUAN DỰ ÁN

### 1.1 Mục tiêu
Xây dựng module cho phép học sinh:
- Nhập điểm thi thử
- So sánh với điểm chuẩn mục tiêu
- Nhận phân tích chi tiết từng môn cần cải thiện
- Xem gợi ý trường thay thế phù hợp với điểm hiện tại
- Nhận lộ trình ôn tập cá nhân hóa

### 1.2 User Story

```
Là một học sinh lớp 12,
Tôi muốn nhập điểm thi thử của mình,
Để biết mình còn thiếu bao nhiêu điểm so với mục tiêu,
Và biết cần tập trung ôn môn nào,
Cũng như có những lựa chọn trường nào phù hợp với điểm hiện tại.
```

### 1.3 Acceptance Criteria

- [ ] Người dùng có thể chọn trường và ngành mục tiêu từ database
- [ ] Người dùng có thể nhập điểm 3 môn theo khối thi
- [ ] Hệ thống tính tổng điểm + điểm ưu tiên
- [ ] Hệ thống hiển thị khoảng cách với điểm chuẩn
- [ ] Hệ thống chỉ ra từng môn cần cải thiện bao nhiêu
- [ ] Hệ thống tính xác suất đậu (%)
- [ ] Hệ thống gợi ý trường thay thế theo mức điểm
- [ ] Hệ thống tạo lộ trình ôn tập đề xuất
- [ ] Giao diện responsive, dễ sử dụng
- [ ] Có thể lưu kết quả và xem lại

---

## 2. PHÂN TÍCH YÊU CẦU CHI TIẾT

### 2.1 Functional Requirements (Yêu cầu chức năng)

#### FR-01: Chọn mục tiêu
| ID | Mô tả | Priority |
|----|-------|----------|
| FR-01.1 | Dropdown chọn trường từ database | Must |
| FR-01.2 | Dropdown chọn ngành (lọc theo trường) | Must |
| FR-01.3 | Auto-detect khối thi từ ngành đã chọn | Must |
| FR-01.4 | Hiển thị điểm chuẩn năm gần nhất | Must |
| FR-01.5 | Hiển thị điểm chuẩn 3 năm (nếu có) | Should |

#### FR-02: Nhập điểm thi thử
| ID | Mô tả | Priority |
|----|-------|----------|
| FR-02.1 | Input điểm từng môn (0-10, step 0.25) | Must |
| FR-02.2 | Validate điểm hợp lệ (0 ≤ x ≤ 10) | Must |
| FR-02.3 | Auto-calculate tổng điểm | Must |
| FR-02.4 | Chọn khu vực ưu tiên (KV1/KV2-NT/KV2/KV3) | Must |
| FR-02.5 | Chọn đối tượng ưu tiên (UT1/UT2/Không) | Must |
| FR-02.6 | Tính điểm ưu tiên tự động | Must |
| FR-02.7 | Hiển thị tổng điểm xét tuyển | Must |

#### FR-03: Phân tích Gap
| ID | Mô tả | Priority |
|----|-------|----------|
| FR-03.1 | Tính khoảng cách điểm (gap) | Must |
| FR-03.2 | Phân tích từng môn cần tăng bao nhiêu | Must |
| FR-03.3 | Đề xuất phân bổ điểm tối ưu | Should |
| FR-03.4 | Highlight môn yếu nhất | Must |
| FR-03.5 | Progress bar cho từng môn | Should |

#### FR-04: Dự đoán khả năng đậu
| ID | Mô tả | Priority |
|----|-------|----------|
| FR-04.1 | Tính xác suất đậu (%) | Must |
| FR-04.2 | Phân loại: An toàn/Vừa sức/Rủi ro/Khó đậu | Must |
| FR-04.3 | Hiển thị progress bar xác suất | Should |
| FR-04.4 | Giải thích cách tính (tooltip) | Could |

#### FR-05: Gợi ý trường thay thế
| ID | Mô tả | Priority |
|----|-------|----------|
| FR-05.1 | Lọc trường cùng ngành có điểm thấp hơn | Must |
| FR-05.2 | Sắp xếp theo điểm chuẩn (gần nhất → xa nhất) | Must |
| FR-05.3 | Hiển thị khả năng đậu từng trường | Must |
| FR-05.4 | Giới hạn 5-10 trường gợi ý | Must |
| FR-05.5 | Lọc theo khu vực địa lý (optional) | Could |

#### FR-06: Lộ trình ôn tập
| ID | Mô tả | Priority |
|----|-------|----------|
| FR-06.1 | Tính số ngày còn lại đến kỳ thi | Must |
| FR-06.2 | Đề xuất mức điểm mục tiêu từng môn | Must |
| FR-06.3 | Sắp xếp ưu tiên ôn tập | Must |
| FR-06.4 | Gợi ý phân bổ thời gian | Should |
| FR-06.5 | Milestone theo tuần/tháng | Could |

### 2.2 Non-Functional Requirements (Yêu cầu phi chức năng)

| ID | Mô tả | Target |
|----|-------|--------|
| NFR-01 | Thời gian load trang | < 2 giây |
| NFR-02 | Thời gian phân tích | < 1 giây |
| NFR-03 | Responsive | Mobile-first |
| NFR-04 | Browser support | Chrome, Firefox, Safari, Edge |
| NFR-05 | Accessibility | WCAG 2.1 AA |

---

## 3. THIẾT KẾ DATABASE / DATA STRUCTURE

### 3.1 Cấu trúc dữ liệu điểm chuẩn (đã có)

```javascript
// data/universities.json - Cấu trúc hiện tại
{
    "id": "BKA-CNTT",
    "school_code": "BKA",
    "school_name": "Đại học Bách khoa Hà Nội",
    "major_code": "7480101",
    "major_name": "Khoa học Máy tính",
    "exam_groups": ["A00", "A01"],
    "scores": {
        "2025": 28.50,
        "2024": 28.00,
        "2023": 27.75
    },
    "region": "Miền Bắc",
    "city": "Hà Nội"
}
```

### 3.2 Cấu trúc dữ liệu khối thi (cần thêm)

```javascript
// data/exam_groups.json
{
    "A00": {
        "name": "Khối A00",
        "subjects": ["Toán", "Vật lý", "Hóa học"],
        "subject_codes": ["toan", "ly", "hoa"]
    },
    "A01": {
        "name": "Khối A01", 
        "subjects": ["Toán", "Vật lý", "Tiếng Anh"],
        "subject_codes": ["toan", "ly", "anh"]
    },
    "B00": {
        "name": "Khối B00",
        "subjects": ["Toán", "Hóa học", "Sinh học"],
        "subject_codes": ["toan", "hoa", "sinh"]
    },
    "C00": {
        "name": "Khối C00",
        "subjects": ["Ngữ văn", "Lịch sử", "Địa lý"],
        "subject_codes": ["van", "su", "dia"]
    },
    "D01": {
        "name": "Khối D01",
        "subjects": ["Toán", "Ngữ văn", "Tiếng Anh"],
        "subject_codes": ["toan", "van", "anh"]
    }
    // ... thêm các khối khác
}
```

### 3.3 Cấu trúc dữ liệu điểm ưu tiên

```javascript
// data/priority_scores.json
{
    "regions": {
        "KV1": { "name": "Khu vực 1", "score": 0.75 },
        "KV2-NT": { "name": "Khu vực 2 nông thôn", "score": 0.50 },
        "KV2": { "name": "Khu vực 2", "score": 0.25 },
        "KV3": { "name": "Khu vực 3", "score": 0.00 }
    },
    "objects": {
        "UT1": { "name": "Ưu tiên 1", "score": 2.00 },
        "UT2": { "name": "Ưu tiên 2", "score": 1.00 },
        "NONE": { "name": "Không ưu tiên", "score": 0.00 }
    }
}
```

### 3.4 Cấu trúc dữ liệu input người dùng

```javascript
// UserAnalysisInput
{
    // Mục tiêu
    "target": {
        "school_code": "BKA",
        "major_code": "7480101",
        "exam_group": "A00",
        "target_score": 28.50  // Lấy từ database
    },
    
    // Điểm thi thử
    "scores": {
        "toan": 8.5,
        "ly": 7.0,
        "hoa": 7.5
    },
    
    // Ưu tiên
    "priority": {
        "region": "KV2-NT",  // +0.5
        "object": "NONE"     // +0.0
    },
    
    // Metadata
    "created_at": "2026-01-30T18:00:00Z"
}
```

### 3.5 Cấu trúc dữ liệu kết quả phân tích

```javascript
// AnalysisResult
{
    // Tổng hợp điểm
    "summary": {
        "raw_score": 23.0,           // Điểm gốc
        "priority_score": 0.5,       // Điểm ưu tiên
        "total_score": 23.5,         // Tổng điểm xét tuyển
        "target_score": 28.5,        // Điểm mục tiêu
        "gap": -5.0                   // Khoảng cách
    },
    
    // Phân tích từng môn
    "subject_analysis": [
        {
            "code": "toan",
            "name": "Toán",
            "current": 8.5,
            "suggested": 9.5,
            "gap": 1.0,
            "priority": 2,           // 1=cao nhất, 3=thấp nhất
            "status": "good"         // good/warning/critical
        },
        {
            "code": "ly",
            "name": "Vật lý",
            "current": 7.0,
            "suggested": 9.0,
            "gap": 2.0,
            "priority": 1,
            "status": "critical"
        },
        {
            "code": "hoa",
            "name": "Hóa học",
            "current": 7.5,
            "suggested": 9.5,
            "gap": 2.0,
            "priority": 1,
            "status": "critical"
        }
    ],
    
    // Dự đoán khả năng đậu
    "prediction": {
        "probability": 25,           // Phần trăm
        "level": "hard",             // safe/moderate/risky/hard
        "label": "Khó đậu",
        "description": "Bạn cần cải thiện thêm 5.0 điểm để có cơ hội cao"
    },
    
    // Gợi ý trường thay thế
    "alternatives": [
        {
            "school_name": "ĐH Công nghiệp HN",
            "major_name": "CNTT",
            "score": 22.5,
            "gap": 1.0,              // Điểm dư
            "probability": 85,
            "level": "safe"
        },
        // ... more alternatives
    ],
    
    // Lộ trình đề xuất
    "roadmap": {
        "days_remaining": 150,
        "exam_date": "2026-06-28",
        "phases": [
            {
                "name": "Giai đoạn 1: Tập trung môn yếu",
                "duration": "2 tháng",
                "focus": ["ly", "hoa"],
                "target": "Nâng Lý lên 8.0, Hóa lên 8.5"
            },
            {
                "name": "Giai đoạn 2: Ôn đều",
                "duration": "2 tháng", 
                "focus": ["toan", "ly", "hoa"],
                "target": "Duy trì và nâng cao đều"
            },
            {
                "name": "Giai đoạn 3: Luyện đề",
                "duration": "1 tháng",
                "focus": ["toan", "ly", "hoa"],
                "target": "Làm đề thi thử, rèn tốc độ"
            }
        ]
    }
}
```

---

## 4. THIẾT KẾ THUẬT TOÁN

### 4.1 Thuật toán tính xác suất đậu

```javascript
/**
 * Tính xác suất đậu dựa trên khoảng cách điểm
 * 
 * Logic:
 * - gap >= 2.0  → 95% (An toàn)
 * - gap >= 0.5  → 80% (Khá chắc)
 * - gap >= 0    → 65% (Vừa sức)
 * - gap >= -1.0 → 45% (Có rủi ro)
 * - gap >= -2.0 → 25% (Khó đậu)
 * - gap >= -3.0 → 10% (Rất khó)
 * - gap < -3.0  → 5%  (Gần như không thể)
 * 
 * Điều chỉnh thêm:
 * - +5% nếu điểm chuẩn năm nay thấp hơn năm trước
 * - -5% nếu điểm chuẩn năm nay cao hơn năm trước
 */
function calculateProbability(currentScore, targetScore, historicalScores) {
    const gap = currentScore - targetScore;
    
    let baseProbability;
    if (gap >= 2.0) baseProbability = 95;
    else if (gap >= 0.5) baseProbability = 80;
    else if (gap >= 0) baseProbability = 65;
    else if (gap >= -1.0) baseProbability = 45;
    else if (gap >= -2.0) baseProbability = 25;
    else if (gap >= -3.0) baseProbability = 10;
    else baseProbability = 5;
    
    // Điều chỉnh theo xu hướng
    const trend = calculateTrend(historicalScores);
    baseProbability += trend * 5; // +5 nếu giảm, -5 nếu tăng
    
    return Math.max(5, Math.min(95, baseProbability));
}

function getProbabilityLevel(probability) {
    if (probability >= 80) return { level: 'safe', label: 'An toàn', color: 'green' };
    if (probability >= 60) return { level: 'moderate', label: 'Vừa sức', color: 'blue' };
    if (probability >= 40) return { level: 'risky', label: 'Có rủi ro', color: 'orange' };
    return { level: 'hard', label: 'Khó đậu', color: 'red' };
}
```

### 4.2 Thuật toán phân bổ điểm cần tăng

```javascript
/**
 * Phân bổ điểm cần tăng cho từng môn một cách tối ưu
 * 
 * Nguyên tắc:
 * 1. Môn điểm thấp nhất có tiềm năng tăng nhiều nhất
 * 2. Môn gần 10 điểm khó tăng thêm
 * 3. Giới hạn mỗi môn tối đa 10 điểm
 * 4. Ưu tiên cân bằng (không để môn nào quá thấp)
 */
function allocateTargetScores(currentScores, totalGap) {
    const subjects = Object.entries(currentScores)
        .map(([code, score]) => ({ code, score }))
        .sort((a, b) => a.score - b.score); // Sắp xếp tăng dần
    
    let remainingGap = totalGap;
    const result = [];
    
    for (const subject of subjects) {
        // Tiềm năng tăng = 10 - điểm hiện tại
        const potential = 10 - subject.score;
        
        // Phân bổ: ưu tiên môn thấp, nhưng cân đối
        const allocation = Math.min(
            potential,
            remainingGap * 0.4, // Không quá 40% gap cho 1 môn
            2.5 // Tối đa tăng 2.5 điểm/môn (thực tế)
        );
        
        result.push({
            code: subject.code,
            current: subject.score,
            suggested: Math.min(10, subject.score + allocation),
            gap: allocation,
            priority: getPriority(allocation)
        });
        
        remainingGap -= allocation;
    }
    
    return result;
}

function getPriority(gap) {
    if (gap >= 1.5) return 1; // Cao
    if (gap >= 0.5) return 2; // Trung bình
    return 3; // Thấp
}
```

### 4.3 Thuật toán gợi ý trường thay thế

```javascript
/**
 * Tìm trường thay thế phù hợp
 * 
 * Tiêu chí:
 * 1. Cùng ngành hoặc ngành liên quan
 * 2. Điểm chuẩn <= điểm hiện tại + 2 (có cơ hội cải thiện)
 * 3. Sắp xếp theo điểm gần nhất với điểm hiện tại
 * 4. Đa dạng vùng miền (nếu user cho phép)
 */
function findAlternatives(currentScore, targetMajor, allUniversities, options = {}) {
    const { maxResults = 10, includeHigher = true, regionFilter = null } = options;
    
    // Lọc các trường cùng ngành hoặc liên quan
    const relatedMajors = getRelatedMajors(targetMajor);
    
    let candidates = allUniversities.filter(uni => {
        // Cùng ngành hoặc ngành liên quan
        const majorMatch = relatedMajors.includes(uni.major_code);
        
        // Lọc theo vùng (nếu có)
        const regionMatch = !regionFilter || uni.region === regionFilter;
        
        // Điểm phù hợp (không quá cao so với điểm hiện tại)
        const scoreMatch = includeHigher 
            ? uni.scores['2025'] <= currentScore + 2
            : uni.scores['2025'] <= currentScore;
        
        return majorMatch && regionMatch && scoreMatch;
    });
    
    // Tính xác suất đậu cho từng trường
    candidates = candidates.map(uni => ({
        ...uni,
        probability: calculateProbability(currentScore, uni.scores['2025']),
        gap: currentScore - uni.scores['2025']
    }));
    
    // Sắp xếp: ưu tiên trường có xác suất cao + điểm gần
    candidates.sort((a, b) => {
        // Ưu tiên trường đậu được (probability > 50)
        if (a.probability >= 50 && b.probability < 50) return -1;
        if (b.probability >= 50 && a.probability < 50) return 1;
        
        // Sau đó sắp theo điểm gần nhất
        return Math.abs(a.gap) - Math.abs(b.gap);
    });
    
    return candidates.slice(0, maxResults);
}

function getRelatedMajors(majorCode) {
    // Map các ngành liên quan
    const relatedMap = {
        '7480101': ['7480101', '7480102', '7480103', '7480104'], // CNTT
        '7480201': ['7480201', '7480101'], // Kỹ thuật phần mềm
        '7340101': ['7340101', '7340115', '7340120'], // Quản trị kinh doanh
        // ... thêm mapping
    };
    
    return relatedMap[majorCode] || [majorCode];
}
```

### 4.4 Thuật toán tạo lộ trình ôn tập

```javascript
/**
 * Tạo lộ trình ôn tập cá nhân hóa
 */
function generateRoadmap(subjectAnalysis, daysRemaining) {
    // Sắp xếp môn theo priority
    const sortedSubjects = [...subjectAnalysis].sort((a, b) => a.priority - b.priority);
    
    const phases = [];
    
    if (daysRemaining >= 90) {
        // Giai đoạn 1: Tập trung môn yếu (40% thời gian)
        const weakSubjects = sortedSubjects.filter(s => s.priority === 1);
        phases.push({
            name: 'Giai đoạn 1: Củng cố nền tảng',
            duration: Math.floor(daysRemaining * 0.4),
            focus: weakSubjects.map(s => s.code),
            description: `Tập trung vào ${weakSubjects.map(s => s.name).join(', ')}`,
            targets: weakSubjects.map(s => ({
                subject: s.name,
                from: s.current,
                to: s.current + (s.gap * 0.6) // 60% gap trong giai đoạn này
            }))
        });
        
        // Giai đoạn 2: Ôn đều (40% thời gian)
        phases.push({
            name: 'Giai đoạn 2: Nâng cao toàn diện',
            duration: Math.floor(daysRemaining * 0.4),
            focus: sortedSubjects.map(s => s.code),
            description: 'Ôn luyện đều cả 3 môn',
            targets: sortedSubjects.map(s => ({
                subject: s.name,
                to: s.suggested
            }))
        });
        
        // Giai đoạn 3: Luyện đề (20% thời gian)
        phases.push({
            name: 'Giai đoạn 3: Luyện đề & Rèn tốc độ',
            duration: Math.floor(daysRemaining * 0.2),
            focus: sortedSubjects.map(s => s.code),
            description: 'Làm đề thi thử, thi thử online',
            targets: [{ subject: 'Tổng', to: 'Đạt mục tiêu' }]
        });
    } else if (daysRemaining >= 30) {
        // Ít thời gian hơn: 2 giai đoạn
        phases.push({
            name: 'Giai đoạn 1: Ôn tập tập trung',
            duration: Math.floor(daysRemaining * 0.7),
            focus: sortedSubjects.filter(s => s.priority <= 2).map(s => s.code),
            description: 'Tập trung vào điểm yếu, duy trì điểm mạnh'
        });
        
        phases.push({
            name: 'Giai đoạn 2: Luyện đề',
            duration: Math.floor(daysRemaining * 0.3),
            focus: sortedSubjects.map(s => s.code),
            description: 'Làm đề thi thử'
        });
    } else {
        // Rất ít thời gian
        phases.push({
            name: 'Sprint cuối: Tổng ôn',
            duration: daysRemaining,
            focus: sortedSubjects.map(s => s.code),
            description: 'Ôn lại kiến thức trọng tâm, làm đề'
        });
    }
    
    return {
        days_remaining: daysRemaining,
        exam_date: getExamDate(),
        phases
    };
}
```

---

## 5. THIẾT KẾ UI/UX

### 5.1 Wireframe - Layout tổng thể

```
┌────────────────────────────────────────────────────────────┐
│  HEADER: EduPath - Phân tích Điểm Thi Thử                  │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  STEP 1: CHỌN MỤC TIÊU                              │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  │   │
│  │  │ Chọn trường │  │ Chọn ngành  │  │ Khối thi    │  │   │
│  │  └─────────────┘  └─────────────┘  └─────────────┘  │   │
│  │                                                     │   │
│  │  Điểm chuẩn 2025: 28.50 điểm (A00)                 │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  STEP 2: NHẬP ĐIỂM THI THỬ                          │   │
│  │  ┌───────────┐  ┌───────────┐  ┌───────────┐        │   │
│  │  │ Toán: 8.5 │  │ Lý: 7.0   │  │ Hóa: 7.5  │        │   │
│  │  └───────────┘  └───────────┘  └───────────┘        │   │
│  │                                                     │   │
│  │  Khu vực: [KV2-NT ▼]   Đối tượng: [Không ▼]        │   │
│  │                                                     │   │
│  │  Tổng: 23.0 + 0.5 = 23.5 điểm                      │   │
│  │                                                     │   │
│  │              [ 🔍 PHÂN TÍCH ]                       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ═══════════════════════════════════════════════════════   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📊 KẾT QUẢ PHÂN TÍCH                               │   │
│  │                                                     │   │
│  │  ┌─────────────────┐  ┌─────────────────────────┐   │   │
│  │  │ Khả năng đậu    │  │ Khoảng cách             │   │   │
│  │  │     25%         │  │ -5.0 điểm               │   │   │
│  │  │   [████░░░░░]   │  │ Cần cải thiện           │   │   │
│  │  │   Khó đậu       │  │                         │   │   │
│  │  └─────────────────┘  └─────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📈 PHÂN TÍCH TỪNG MÔN                              │   │
│  │                                                     │   │
│  │  Toán:  8.5 → 9.5  (+1.0)  [████████▓░] Tốt        │   │
│  │  Lý:    7.0 → 9.0  (+2.0)  [███████░░░] ⚠️ Yếu     │   │
│  │  Hóa:   7.5 → 9.5  (+2.0)  [███████▓░░] ⚠️ Yếu     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  🎯 TRƯỜNG THAY THẾ PHÙ HỢP                         │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │ ✅ ĐH Công nghiệp HN    22.5đ    85% đậu   │    │   │
│  │  │ ✅ ĐH Thủy lợi          21.0đ    95% đậu   │    │   │
│  │  │ ⚠️ ĐH Giao thông VT     24.0đ    60% đậu   │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  📅 LỘ TRÌNH ÔN TẬP ĐỀ XUẤT                         │   │
│  │                                                     │   │
│  │  Còn 150 ngày đến kỳ thi (28/06/2026)              │   │
│  │                                                     │   │
│  │  Phase 1 (60 ngày): Tập trung Lý, Hóa              │   │
│  │  Phase 2 (60 ngày): Ôn đều cả 3 môn                │   │
│  │  Phase 3 (30 ngày): Luyện đề thi thử               │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
│  [ 💾 Lưu kết quả ]  [ 📄 Xuất PDF ]  [ 🔄 Phân tích lại ] │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 5.2 Color Scheme cho các trạng thái

```css
/* Trạng thái khả năng đậu */
.status-safe     { color: #22c55e; } /* Xanh lá - An toàn */
.status-moderate { color: #3b82f6; } /* Xanh dương - Vừa sức */
.status-risky    { color: #f59e0b; } /* Cam - Rủi ro */
.status-hard     { color: #ef4444; } /* Đỏ - Khó đậu */

/* Trạng thái môn học */
.subject-good     { color: #22c55e; } /* Điểm tốt */
.subject-warning  { color: #f59e0b; } /* Cần cải thiện */
.subject-critical { color: #ef4444; } /* Cần tập trung */
```

### 5.3 Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) {
    .analysis-grid { grid-template-columns: 1fr 1fr; }
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
    .analysis-grid { grid-template-columns: 1fr; }
}

/* Mobile */
@media (max-width: 767px) {
    .score-inputs { flex-direction: column; }
    .analysis-grid { grid-template-columns: 1fr; }
}
```

---

## 6. CHIA NHỎ TASK & TIMELINE

### 6.1 Task Breakdown

#### Phase 1: Setup & Data (1-2 giờ)
| Task | Mô tả | Thời gian |
|------|-------|-----------|
| T1.1 | Tạo file `analysis.html` | 15 phút |
| T1.2 | Tạo file `css/analysis.css` | 15 phút |
| T1.3 | Tạo file `js/analysis.js` | 15 phút |
| T1.4 | Tạo file `data/exam_groups.json` | 15 phút |
| T1.5 | Tạo file `data/priority_scores.json` | 10 phút |
| T1.6 | Cập nhật navigation trong các trang | 10 phút |

#### Phase 2: UI Components (2-3 giờ)
| Task | Mô tả | Thời gian |
|------|-------|-----------|
| T2.1 | Form chọn mục tiêu (trường, ngành, khối) | 30 phút |
| T2.2 | Form nhập điểm thi thử | 30 phút |
| T2.3 | Form chọn ưu tiên (khu vực, đối tượng) | 20 phút |
| T2.4 | Card kết quả tổng hợp | 30 phút |
| T2.5 | Component phân tích từng môn | 30 phút |
| T2.6 | Component danh sách trường thay thế | 30 phút |
| T2.7 | Component lộ trình ôn tập | 30 phút |

#### Phase 3: Logic & Algorithms (2-3 giờ)
| Task | Mô tả | Thời gian |
|------|-------|-----------|
| T3.1 | Hàm load và filter dữ liệu trường/ngành | 30 phút |
| T3.2 | Hàm tính tổng điểm + điểm ưu tiên | 20 phút |
| T3.3 | Hàm tính xác suất đậu | 30 phút |
| T3.4 | Hàm phân bổ điểm cần tăng | 30 phút |
| T3.5 | Hàm tìm trường thay thế | 30 phút |
| T3.6 | Hàm tạo lộ trình ôn tập | 30 phút |

#### Phase 4: Integration & Polish (1-2 giờ)
| Task | Mô tả | Thời gian |
|------|-------|-----------|
| T4.1 | Kết nối UI với Logic | 30 phút |
| T4.2 | Xử lý edge cases và validation | 20 phút |
| T4.3 | Thêm animations và transitions | 20 phút |
| T4.4 | Responsive testing | 20 phút |
| T4.5 | Lưu kết quả vào localStorage | 15 phút |
| T4.6 | Testing và bug fixes | 30 phút |

### 6.2 Tổng thời gian ước tính

| Phase | Thời gian |
|-------|-----------|
| Phase 1: Setup | 1-2 giờ |
| Phase 2: UI | 2-3 giờ |
| Phase 3: Logic | 2-3 giờ |
| Phase 4: Polish | 1-2 giờ |
| **Tổng** | **6-10 giờ** |

### 6.3 Dependency Graph

```
T1.1 ─┬─► T2.1 ─┬─► T3.1 ─┬─► T4.1
T1.2 ─┤         │         │
T1.3 ─┘         │         │
                │         │
T1.4 ──────────►├─► T3.2 ─┤
T1.5 ──────────►│         │
                │         │
        T2.2 ───┤         │
        T2.3 ───┤         │
                │         │
        T2.4 ───┼─► T3.3 ─┤
        T2.5 ───┼─► T3.4 ─┼─► T4.2 ─► T4.3 ─► T4.4 ─► T4.6
        T2.6 ───┼─► T3.5 ─┤
        T2.7 ───┴─► T3.6 ─┘
                          │
T1.6 ────────────────────►┴─► T4.5
```

---

## 7. TEST CASES

### 7.1 Unit Tests

```javascript
// test/analysis.test.js

describe('calculateProbability', () => {
    test('should return 95% when score exceeds target by 2+', () => {
        expect(calculateProbability(30.5, 28.5)).toBe(95);
    });
    
    test('should return 25% when score is 2 below target', () => {
        expect(calculateProbability(26.5, 28.5)).toBeCloseTo(25, 5);
    });
    
    test('should return 65% when score equals target', () => {
        expect(calculateProbability(28.5, 28.5)).toBe(65);
    });
});

describe('allocateTargetScores', () => {
    test('should prioritize lowest scoring subject', () => {
        const scores = { toan: 8.5, ly: 7.0, hoa: 7.5 };
        const result = allocateTargetScores(scores, 5);
        
        // Lý (7.0) nên có priority cao nhất
        const lyResult = result.find(r => r.code === 'ly');
        expect(lyResult.priority).toBe(1);
    });
    
    test('should not exceed 10 for any subject', () => {
        const scores = { toan: 9.5, ly: 9.0, hoa: 9.0 };
        const result = allocateTargetScores(scores, 3);
        
        result.forEach(r => {
            expect(r.suggested).toBeLessThanOrEqual(10);
        });
    });
});

describe('findAlternatives', () => {
    test('should return schools with lower score first', () => {
        const result = findAlternatives(23.5, '7480101', mockUniversities);
        
        // Trường đầu tiên nên có điểm <= 23.5
        expect(result[0].scores['2025']).toBeLessThanOrEqual(23.5);
    });
    
    test('should limit results to maxResults', () => {
        const result = findAlternatives(23.5, '7480101', mockUniversities, { maxResults: 5 });
        expect(result.length).toBeLessThanOrEqual(5);
    });
});
```

### 7.2 Integration Tests

| Test Case | Input | Expected Output |
|-----------|-------|-----------------|
| TC-01 | Điểm = Điểm chuẩn | Xác suất ~65%, Gap = 0 |
| TC-02 | Điểm cao hơn 3 điểm | Xác suất ~95%, An toàn |
| TC-03 | Điểm thấp hơn 5 điểm | Xác suất <25%, Khó đậu |
| TC-04 | Tất cả môn = 10 | Tổng = 30, không cần cải thiện |
| TC-05 | Nhập điểm âm | Validation error |
| TC-06 | Nhập điểm > 10 | Validation error |
| TC-07 | Không chọn trường | Button disabled |
| TC-08 | Mobile view | Layout responsive đúng |

### 7.3 User Acceptance Tests

| Scenario | Steps | Expected |
|----------|-------|----------|
| Happy path | 1. Chọn trường BK HN<br>2. Chọn ngành CNTT<br>3. Nhập điểm 8/7/7<br>4. Click Phân tích | Hiện kết quả đầy đủ |
| Thay đổi mục tiêu | 1. Đã có kết quả<br>2. Đổi trường<br>3. Click Phân tích lại | Kết quả cập nhật |
| Lưu kết quả | 1. Có kết quả<br>2. Click Lưu<br>3. Refresh trang | Kết quả được giữ |

---

## 8. CHECKLIST HOÀN THÀNH

### 8.1 Development Checklist

- [ ] Phase 1: Setup
  - [ ] T1.1 Tạo analysis.html
  - [ ] T1.2 Tạo analysis.css
  - [ ] T1.3 Tạo analysis.js
  - [ ] T1.4 Tạo exam_groups.json
  - [ ] T1.5 Tạo priority_scores.json
  - [ ] T1.6 Cập nhật navigation

- [ ] Phase 2: UI Components
  - [ ] T2.1 Form chọn mục tiêu
  - [ ] T2.2 Form nhập điểm
  - [ ] T2.3 Form chọn ưu tiên
  - [ ] T2.4 Card kết quả
  - [ ] T2.5 Phân tích môn
  - [ ] T2.6 Trường thay thế
  - [ ] T2.7 Lộ trình ôn tập

- [ ] Phase 3: Logic
  - [ ] T3.1 Load/filter data
  - [ ] T3.2 Tính điểm
  - [ ] T3.3 Tính xác suất
  - [ ] T3.4 Phân bổ điểm
  - [ ] T3.5 Tìm trường thay thế
  - [ ] T3.6 Tạo lộ trình

- [ ] Phase 4: Polish
  - [ ] T4.1 Integration
  - [ ] T4.2 Validation
  - [ ] T4.3 Animations
  - [ ] T4.4 Responsive
  - [ ] T4.5 LocalStorage
  - [ ] T4.6 Testing

### 8.2 Quality Checklist

- [ ] Code clean, có comments
- [ ] Không có console errors
- [ ] Responsive trên mobile
- [ ] Loading states cho async operations
- [ ] Error handling đầy đủ
- [ ] Accessibility (labels, ARIA)

---

## 9. GHI CHÚ THÊM

### 9.1 Edge Cases cần xử lý

1. **Trường không có dữ liệu năm mới:** Hiển thị năm cũ nhất có sẵn
2. **Ngành chỉ có 1 khối thi:** Auto-select, không cần dropdown
3. **Điểm = 10 cả 3 môn:** Hiển thị "Xuất sắc! Bạn đủ điều kiện mọi trường"
4. **Không có trường thay thế:** Hiển thị "Hãy xem xét ngành khác"
5. **Thời gian < 30 ngày:** Hiển thị cảnh báo + lộ trình rút gọn

### 9.2 Future Enhancements

1. Lưu lịch sử nhiều lần phân tích để theo dõi tiến độ
2. So sánh kết quả giữa các lần thi thử
3. Biểu đồ tiến độ theo thời gian
4. Chia sẻ kết quả lên mạng xã hội
5. Gợi ý tài liệu ôn tập theo môn yếu
6. Tích hợp với AI để tư vấn chi tiết hơn

---

*Tài liệu được tạo: 30/01/2026*
*Phiên bản: 1.0*
