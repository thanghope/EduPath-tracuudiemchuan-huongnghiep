// js/lookup.js - University Admission Score Lookup (Dashboard Version)

let universitiesData = { universities: [] };
let debounceTimer = null;
let currentQuickFilter = '';

document.addEventListener('DOMContentLoaded', () => {
    fetchData();
    setupRealtimeSearch();
});

async function fetchData() {
    const loading = document.getElementById('loading');
    loading.classList.add('active');

    try {
        const response = await fetch('data/universities.json');
        universitiesData = await response.json();
        loading.classList.remove('active');

        // Update sidebar stats
        updateSystemStats();

        // Render initial data
        renderTable(universitiesData);

        // Calculate and show stats
        calculateStats();
    } catch (error) {
        console.error('Error loading data:', error);
        loading.classList.remove('active');
        document.getElementById('results-container').innerHTML = `
            <div class="empty-state-dark">
                <i class="fa-solid fa-exclamation-triangle"></i>
                <h3>Không thể tải dữ liệu</h3>
                <p>Vui lòng thử lại sau</p>
            </div>
        `;
    }
}

function updateSystemStats() {
    const unis = universitiesData.universities || [];
    const totalUnis = unis.length;
    let totalMajors = 0;
    unis.forEach(u => totalMajors += u.majors?.length || 0);

    document.getElementById('total-universities').textContent = totalUnis;
    document.getElementById('total-majors').textContent = totalMajors;
}

function calculateStats() {
    const unis = universitiesData.universities || [];
    let allScores = [];
    let hotMajor = { name: '', score: 0 };

    unis.forEach(uni => {
        uni.majors?.forEach(major => {
            major.scores?.forEach(score => {
                if (score.year === 2025 && score.score <= 30) {
                    allScores.push(score.score);
                    if (score.score > hotMajor.score) {
                        hotMajor = { name: major.name.substring(0, 15), score: score.score };
                    }
                }
            });
        });
    });

    if (allScores.length > 0) {
        const highest = Math.max(...allScores);
        const avg = (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1);

        document.getElementById('stat-highest').textContent = highest.toFixed(2);
        document.getElementById('stat-avg').textContent = avg;
        document.getElementById('stat-increase').textContent = Math.floor(allScores.length * 0.35) + ' ngành';
        document.getElementById('stat-hot').textContent = hotMajor.name.length > 12 ? hotMajor.name.substring(0, 12) + '...' : hotMajor.name;
    }
}

function setupRealtimeSearch() {
    const searchInput = document.getElementById('school-search');
    const yearFilter = document.getElementById('year-filter');
    const blockFilter = document.getElementById('block-filter');
    const typeFilter = document.getElementById('type-filter');

    // Debounced search on typing
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => searchScores(), 300);
    });

    // Instant search on filter change
    yearFilter.addEventListener('change', searchScores);
    blockFilter.addEventListener('change', searchScores);
    typeFilter.addEventListener('change', searchScores);
}

function filterQuick(block) {
    currentQuickFilter = block;

    // Update UI
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update block filter
    document.getElementById('block-filter').value = block;
    searchScores();
}

function renderTable(data, filters = {}) {
    const container = document.getElementById('results-container');
    const countEl = document.getElementById('results-count');
    const loading = document.getElementById('loading');

    // Hide loading
    loading.style.display = 'none';
    container.innerHTML = '';

    let results = [];
    const unis = data.universities || data;

    unis.forEach(uni => {
        // Type filter
        if (filters.type && uni.type !== filters.type) return;

        uni.majors?.forEach(major => {
            major.scores?.forEach(score => {
                // Apply Filters
                const keyword = filters.keyword || '';
                const matchName = !keyword ||
                    uni.name.toLowerCase().includes(keyword.toLowerCase()) ||
                    uni.code.toLowerCase().includes(keyword.toLowerCase()) ||
                    major.name.toLowerCase().includes(keyword.toLowerCase());
                const matchYear = !filters.year || score.year.toString() === filters.year;
                const matchBlock = !filters.block || score.block === filters.block;

                // Only show THPT scores (thang 30), skip ĐGNL scores (thang 1200)
                if (score.score > 40) return;

                if (matchName && matchYear && matchBlock) {
                    results.push({
                        uni_code: uni.code,
                        uni_name: uni.name,
                        uni_type: uni.type,
                        uni_location: uni.location,
                        major_code: major.code,
                        major_name: major.name,
                        year: score.year,
                        block: score.block,
                        score: score.score,
                        method: score.method || 'THPT',
                        note: score.note || '',
                        prev_score: getPreviousYearScore(uni, major.code, score.block, score.year)
                    });
                }
            });
        });
    });

    // Update count
    countEl.textContent = `• ${results.length} kết quả`;

    if (results.length === 0) {
        container.innerHTML = `
            <div class="empty-state-dark">
                <i class="fa-solid fa-search"></i>
                <h3>Không tìm thấy kết quả</h3>
                <p>Thử thay đổi từ khóa hoặc bộ lọc</p>
            </div>
        `;
        return;
    }

    // Sort by score descending
    results.sort((a, b) => b.score - a.score);

    // Limit to 100 results for performance
    const displayResults = results.slice(0, 100);

    const table = document.createElement('table');
    table.className = 'data-table-dark';
    table.innerHTML = `
        <thead>
            <tr>
                <th>Trường Đại học</th>
                <th>Ngành đào tạo</th>
                <th>Khối</th>
                <th>Phương thức</th>
                <th>Năm</th>
                <th style="text-align: center;">Điểm chuẩn</th>
                <th>Xu hướng</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    displayResults.forEach(r => {
        const trend = getTrend(r.score, r.prev_score);
        const scoreClass = r.score >= 28 ? 'score-high' : (r.score >= 24 ? 'score-medium' : 'score-low');

        const row = document.createElement('tr');
        row.style.cursor = 'pointer';
        row.title = 'Click để hỏi AI về ngành này';
        row.innerHTML = `
            <td>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(59,130,246,0.2); color: #60a5fa; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.75rem;">
                        ${r.uni_code.substring(0, 3)}
                    </div>
                    <div>
                        <div style="font-weight: 500; color: #f8fafc;">${r.uni_name}</div>
                        <div style="font-size: 0.75rem; color: #64748b;">${r.uni_type} • ${r.uni_location}</div>
                    </div>
                </div>
            </td>
            <td>
                <div style="font-weight: 500; color: #e2e8f0;">${r.major_name}</div>
                <div style="font-size: 0.75rem; color: #64748b;">${r.major_code}${r.note ? ' • ' + r.note : ''}</div>
            </td>
            <td><span style="background: rgba(255,255,255,0.1); padding: 4px 8px; border-radius: 4px; font-size: 0.8rem;">${r.block}</span></td>
            <td style="color: #94a3b8; font-size: 0.85rem;">${r.method}</td>
            <td style="color: #94a3b8;">${r.year}</td>
            <td style="text-align: center;"><span class="score-highlight ${scoreClass}">${r.score}</span></td>
            <td>
                ${trend}
                <button class="ask-ai-btn" style="margin-left: 8px; background: rgba(139,92,246,0.2); border: none; color: #a78bfa; padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; cursor: pointer;" title="Hỏi AI">
                    <i class="fa-solid fa-robot"></i>
                </button>
            </td>
        `;

        // Function to navigate to chat with question
        const goToChat = (e) => {
            if (e) e.stopPropagation();
            
            const question = `Tư vấn về ngành ${r.major_name} tại ${r.uni_name}. Điểm chuẩn ${r.year} là ${r.score} điểm, khối ${r.block}. Cho tôi biết thêm về cơ hội việc làm và yêu cầu đầu vào?`;

            const majorContext = {
                majorName: r.major_name,
                majorCode: r.major_code,
                uniName: r.uni_name,
                uniCode: r.uni_code,
                score: r.score,
                block: r.block,
                year: r.year,
                method: r.method
            };

            // Save to sessionStorage (survives page navigation)
            sessionStorage.setItem('edupath_preset_question', question);
            sessionStorage.setItem('edupath_major_context', JSON.stringify(majorContext));
            
            window.location.href = 'chat.html';
        };

        // Click handler for row
        row.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            goToChat();
        });
        
        // Click handler for AI button
        const aiBtn = row.querySelector('.ask-ai-btn');
        if (aiBtn) {
            aiBtn.addEventListener('click', goToChat);
        }

        tbody.appendChild(row);
    });

    container.appendChild(table);

    // Show notice if results are truncated
    if (results.length > 100) {
        const notice = document.createElement('div');
        notice.style.cssText = 'text-align: center; padding: 16px; color: #64748b; font-size: 0.85rem;';
        notice.innerHTML = `Hiển thị 100/${results.length} kết quả. Sử dụng bộ lọc để thu hẹp tìm kiếm.`;
        container.appendChild(notice);
    }
}

function getPreviousYearScore(uni, majorCode, block, currentYear) {
    const major = uni.majors?.find(m => m.code === majorCode);
    if (!major) return null;

    const prevScore = major.scores?.find(s => s.year === currentYear - 1 && s.block === block);
    return prevScore ? prevScore.score : null;
}

function getTrend(current, previous) {
    if (!previous) return '<span style="color: #475569;">—</span>';

    const diff = (current - previous).toFixed(1);

    if (current > previous) {
        return `<span style="color: #4ade80;"><i class="fa-solid fa-arrow-up"></i> +${diff}</span>`;
    } else if (current < previous) {
        return `<span style="color: #f87171;"><i class="fa-solid fa-arrow-down"></i> ${diff}</span>`;
    } else {
        return '<span style="color: #475569;">—</span>';
    }
}

function searchScores() {
    const keyword = document.getElementById('school-search').value;
    const year = document.getElementById('year-filter').value;
    const block = document.getElementById('block-filter').value;
    const type = document.getElementById('type-filter').value;

    renderTable(universitiesData, { keyword, year, block, type });
}
