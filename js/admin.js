// Admin Panel JavaScript - Firebase CRUD Operations

class AdminPanel {
    constructor() {
        this.db = null;
        this.universities = [];
        this.currentUniId = null;
        this.editingMajorIndex = null;

        this.init();
    }

    async init() {
        // Initialize Firebase
        if (initFirebase()) {
            this.db = window.getFirestore();
            this.updateSyncStatus(true);
            await this.loadUniversities();
        } else {
            this.updateSyncStatus(false);
            this.showToast('Không thể kết nối Firebase!', 'error');
        }

        this.setupEventListeners();
    }

    updateSyncStatus(connected) {
        const status = document.getElementById('sync-status');
        if (connected) {
            status.classList.add('connected');
            status.innerHTML = '<i class="fa-solid fa-cloud"></i><span>Đã kết nối Firebase</span>';
        } else {
            status.classList.remove('connected');
            status.innerHTML = '<i class="fa-solid fa-cloud-slash"></i><span>Chưa kết nối</span>';
        }
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const section = item.dataset.section;
                this.switchSection(section);
            });
        });

        // Search
        document.getElementById('search-uni').addEventListener('input', (e) => {
            this.filterUniversities(e.target.value);
        });

        // University Modal
        document.getElementById('add-uni-btn').addEventListener('click', () => this.openUniModal());
        document.getElementById('close-uni-modal').addEventListener('click', () => this.closeUniModal());
        document.getElementById('cancel-uni').addEventListener('click', () => this.closeUniModal());
        document.getElementById('uni-form').addEventListener('submit', (e) => this.saveUniversity(e));

        // Major Modal
        document.getElementById('add-major-btn').addEventListener('click', () => this.openMajorModal());
        document.getElementById('close-major-modal').addEventListener('click', () => this.closeMajorModal());
        document.getElementById('cancel-major').addEventListener('click', () => this.closeMajorModal());
        document.getElementById('major-form').addEventListener('submit', (e) => this.saveMajor(e));
        document.getElementById('add-score-btn').addEventListener('click', () => this.addScoreEntry());

        // Filter university for majors
        document.getElementById('filter-uni').addEventListener('change', (e) => {
            this.currentUniId = e.target.value;
            this.loadMajors();
            document.getElementById('add-major-btn').disabled = !this.currentUniId;
        });

        // Import/Export
        document.getElementById('import-json-btn').addEventListener('click', () => this.importFromJSON());
        document.getElementById('export-json-btn').addEventListener('click', () => this.exportToJSON());

        // Close modals on outside click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
    }

    switchSection(section) {
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });

        // Update sections
        document.querySelectorAll('.section').forEach(sec => {
            sec.classList.remove('active');
        });
        document.getElementById(`${section}-section`).classList.add('active');

        // Update title
        const titles = {
            universities: 'Quản lý Trường đại học',
            majors: 'Quản lý Ngành học',
            import: 'Import dữ liệu',
            export: 'Export dữ liệu'
        };
        document.getElementById('page-title').textContent = titles[section];

        // Load uni filter for majors section
        if (section === 'majors') {
            this.populateUniFilter();
        }
    }

    // ========== UNIVERSITIES ==========

    async loadUniversities() {
        try {
            const snapshot = await this.db.collection('universities').orderBy('name').get();
            this.universities = [];

            snapshot.forEach(doc => {
                this.universities.push({ id: doc.id, ...doc.data() });
            });

            this.renderUniversities();
        } catch (error) {
            console.error('Error loading universities:', error);
            this.showToast('Lỗi tải dữ liệu!', 'error');
        }
    }

    renderUniversities(filteredList = null) {
        const tbody = document.getElementById('universities-tbody');
        const list = filteredList || this.universities;

        if (list.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Chưa có dữ liệu. Click "Import dữ liệu" để bắt đầu.</td></tr>';
            return;
        }

        tbody.innerHTML = list.map(uni => `
            <tr>
                <td><strong>${uni.code || '-'}</strong></td>
                <td>${uni.name}</td>
                <td>${uni.type || '-'}</td>
                <td>${uni.location || '-'}</td>
                <td>${uni.majors?.length || 0}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="admin.editUniversity('${uni.id}')">
                        <i class="fa-solid fa-edit"></i>
                    </button>
                    <button class="delete-btn" onclick="admin.deleteUniversity('${uni.id}')">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
    }

    filterUniversities(query) {
        const filtered = this.universities.filter(uni =>
            uni.name.toLowerCase().includes(query.toLowerCase()) ||
            (uni.code && uni.code.toLowerCase().includes(query.toLowerCase()))
        );
        this.renderUniversities(filtered);
    }

    openUniModal(uni = null) {
        const modal = document.getElementById('uni-modal');
        const title = document.getElementById('uni-modal-title');
        const form = document.getElementById('uni-form');

        if (uni) {
            title.textContent = 'Chỉnh sửa trường';
            document.getElementById('uni-code').value = uni.code || '';
            document.getElementById('uni-name').value = uni.name || '';
            document.getElementById('uni-type').value = uni.type || 'Công lập';
            document.getElementById('uni-location').value = uni.location || '';
            form.dataset.editId = uni.id;
        } else {
            title.textContent = 'Thêm trường mới';
            form.reset();
            delete form.dataset.editId;
        }

        modal.classList.add('active');
    }

    closeUniModal() {
        document.getElementById('uni-modal').classList.remove('active');
    }

    async saveUniversity(e) {
        e.preventDefault();

        const form = e.target;
        const data = {
            code: document.getElementById('uni-code').value.trim(),
            name: document.getElementById('uni-name').value.trim(),
            type: document.getElementById('uni-type').value,
            location: document.getElementById('uni-location').value.trim()
        };

        try {
            if (form.dataset.editId) {
                // Update existing
                await this.db.collection('universities').doc(form.dataset.editId).update(data);
                this.showToast('Đã cập nhật trường thành công!');
            } else {
                // Add new
                data.majors = [];
                await this.db.collection('universities').add(data);
                this.showToast('Đã thêm trường mới!');
            }

            this.closeUniModal();
            await this.loadUniversities();
        } catch (error) {
            console.error('Error saving university:', error);
            this.showToast('Lỗi lưu dữ liệu!', 'error');
        }
    }

    editUniversity(id) {
        const uni = this.universities.find(u => u.id === id);
        if (uni) {
            this.openUniModal(uni);
        }
    }

    async deleteUniversity(id) {
        if (!confirm('Bạn có chắc muốn xóa trường này?')) return;

        try {
            await this.db.collection('universities').doc(id).delete();
            this.showToast('Đã xóa trường!');
            await this.loadUniversities();
        } catch (error) {
            console.error('Error deleting university:', error);
            this.showToast('Lỗi xóa dữ liệu!', 'error');
        }
    }

    // ========== MAJORS ==========

    populateUniFilter() {
        const select = document.getElementById('filter-uni');
        select.innerHTML = '<option value="">Chọn trường...</option>' +
            this.universities.map(uni =>
                `<option value="${uni.id}">${uni.name}</option>`
            ).join('');
    }

    loadMajors() {
        const uni = this.universities.find(u => u.id === this.currentUniId);
        const tbody = document.getElementById('majors-tbody');

        if (!uni || !uni.majors || uni.majors.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Trường này chưa có ngành nào</td></tr>';
            return;
        }

        tbody.innerHTML = uni.majors.map((major, index) => {
            const blocks = major.scores?.map(s => s.block).filter((v, i, a) => a.indexOf(v) === i) || [];
            const avgScore = major.scores?.length > 0
                ? (major.scores.reduce((sum, s) => sum + s.score, 0) / major.scores.length).toFixed(2)
                : '-';

            return `
                <tr>
                    <td><strong>${major.code || '-'}</strong></td>
                    <td>${major.name}</td>
                    <td>${major.quota || '-'}</td>
                    <td>
                        <div class="blocks-badges">
                            ${blocks.map(b => `<span class="block-badge">${b}</span>`).join('')}
                        </div>
                    </td>
                    <td>${avgScore}</td>
                    <td class="actions">
                        <button class="edit-btn" onclick="admin.editMajor(${index})">
                            <i class="fa-solid fa-edit"></i>
                        </button>
                        <button class="delete-btn" onclick="admin.deleteMajor(${index})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    openMajorModal(major = null, index = null) {
        const modal = document.getElementById('major-modal');
        const title = document.getElementById('major-modal-title');
        const form = document.getElementById('major-form');
        const scoresContainer = document.getElementById('scores-container');

        this.editingMajorIndex = index;

        if (major) {
            title.textContent = 'Chỉnh sửa ngành';
            document.getElementById('major-code').value = major.code || '';
            document.getElementById('major-name').value = major.name || '';
            document.getElementById('major-quota').value = major.quota || '';

            // Populate scores
            scoresContainer.innerHTML = '';
            (major.scores || []).forEach(score => {
                this.addScoreEntry(score);
            });
        } else {
            title.textContent = 'Thêm ngành mới';
            form.reset();
            scoresContainer.innerHTML = '';
            this.addScoreEntry(); // Add one empty entry
        }

        modal.classList.add('active');
    }

    closeMajorModal() {
        document.getElementById('major-modal').classList.remove('active');
        this.editingMajorIndex = null;
    }

    addScoreEntry(score = null) {
        const container = document.getElementById('scores-container');
        const entry = document.createElement('div');
        entry.className = 'score-entry';

        const blocks = ['A00', 'A01', 'B00', 'B08', 'C00', 'D01', 'D07', 'D14', 'D15', 'H00', 'V00', 'V01', 'M00', 'T00'];

        entry.innerHTML = `
            <div class="form-group">
                <label>Khối thi</label>
                <select class="score-block">
                    ${blocks.map(b => `<option value="${b}" ${score?.block === b ? 'selected' : ''}>${b}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label>Điểm chuẩn</label>
                <input type="number" step="0.01" class="score-value" value="${score?.score || ''}" placeholder="VD: 25.5">
            </div>
            <div class="form-group">
                <label>Năm</label>
                <input type="number" class="score-year" value="${score?.year || 2025}" placeholder="2025">
            </div>
            <button type="button" class="remove-score" onclick="this.parentElement.remove()">
                <i class="fa-solid fa-times"></i>
            </button>
        `;

        container.appendChild(entry);
    }

    async saveMajor(e) {
        e.preventDefault();

        const major = {
            code: document.getElementById('major-code').value.trim(),
            name: document.getElementById('major-name').value.trim(),
            quota: parseInt(document.getElementById('major-quota').value) || 0,
            scores: []
        };

        // Collect scores
        document.querySelectorAll('.score-entry').forEach(entry => {
            const block = entry.querySelector('.score-block').value;
            const score = parseFloat(entry.querySelector('.score-value').value);
            const year = parseInt(entry.querySelector('.score-year').value) || 2025;

            if (block && !isNaN(score)) {
                major.scores.push({ block, score, year, method: 'THPT' });
            }
        });

        try {
            const uni = this.universities.find(u => u.id === this.currentUniId);
            if (!uni.majors) uni.majors = [];

            if (this.editingMajorIndex !== null) {
                // Update existing
                uni.majors[this.editingMajorIndex] = major;
            } else {
                // Add new
                uni.majors.push(major);
            }

            await this.db.collection('universities').doc(this.currentUniId).update({
                majors: uni.majors
            });

            this.showToast('Đã lưu ngành thành công!');
            this.closeMajorModal();
            await this.loadUniversities();
            this.loadMajors();
        } catch (error) {
            console.error('Error saving major:', error);
            this.showToast('Lỗi lưu dữ liệu!', 'error');
        }
    }

    editMajor(index) {
        const uni = this.universities.find(u => u.id === this.currentUniId);
        if (uni && uni.majors && uni.majors[index]) {
            this.openMajorModal(uni.majors[index], index);
        }
    }

    async deleteMajor(index) {
        if (!confirm('Bạn có chắc muốn xóa ngành này?')) return;

        try {
            const uni = this.universities.find(u => u.id === this.currentUniId);
            uni.majors.splice(index, 1);

            await this.db.collection('universities').doc(this.currentUniId).update({
                majors: uni.majors
            });

            this.showToast('Đã xóa ngành!');
            await this.loadUniversities();
            this.loadMajors();
        } catch (error) {
            console.error('Error deleting major:', error);
            this.showToast('Lỗi xóa dữ liệu!', 'error');
        }
    }

    // ========== IMPORT/EXPORT ==========

    async importFromJSON() {
        const btn = document.getElementById('import-json-btn');
        const progress = document.getElementById('import-progress');
        const progressFill = document.getElementById('progress-fill');
        const progressText = document.getElementById('progress-text');

        try {
            // Fetch local JSON
            const response = await fetch('data/universities.json');
            const data = await response.json();
            const universities = data.universities;

            if (!universities || universities.length === 0) {
                this.showToast('Không có dữ liệu để import!', 'error');
                return;
            }

            btn.disabled = true;
            progress.style.display = 'block';

            // Import each university
            const batch = this.db.batch();
            const total = universities.length;

            for (let i = 0; i < total; i++) {
                const uni = universities[i];
                const docRef = this.db.collection('universities').doc();
                batch.set(docRef, uni);

                const percent = Math.round(((i + 1) / total) * 100);
                progressFill.style.width = `${percent}%`;
                progressText.textContent = `${percent}% (${i + 1}/${total})`;
            }

            await batch.commit();

            this.showToast(`Đã import ${total} trường thành công!`);
            await this.loadUniversities();
        } catch (error) {
            console.error('Error importing:', error);
            this.showToast('Lỗi import dữ liệu!', 'error');
        } finally {
            btn.disabled = false;
            progress.style.display = 'none';
        }
    }

    async exportToJSON() {
        try {
            const snapshot = await this.db.collection('universities').get();
            const universities = [];

            snapshot.forEach(doc => {
                const data = doc.data();
                delete data.id; // Remove Firestore ID
                universities.push(data);
            });

            const jsonData = JSON.stringify({ universities }, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'universities.json';
            a.click();

            URL.revokeObjectURL(url);
            this.showToast('Đã tải xuống universities.json!');
        } catch (error) {
            console.error('Error exporting:', error);
            this.showToast('Lỗi export dữ liệu!', 'error');
        }
    }

    // ========== UTILS ==========

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        const icon = toast.querySelector('i');
        const text = document.getElementById('toast-message');

        text.textContent = message;
        toast.classList.remove('error');

        if (type === 'error') {
            toast.classList.add('error');
            icon.className = 'fa-solid fa-exclamation-circle';
        } else {
            icon.className = 'fa-solid fa-check-circle';
        }

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// Initialize admin panel
let admin;
document.addEventListener('DOMContentLoaded', () => {
    admin = new AdminPanel();
});
