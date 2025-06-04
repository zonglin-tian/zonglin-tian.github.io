document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        // 使用 setTimeout 确保重定向后代码执行（因为重定向是异步的）
        setTimeout(function () {
            // 重定向到首页
            window.location.href = '/';
            const searchModal = new bootstrap.Modal(document.getElementById('modalSearch'));
            searchModal._config.backdrop = 'false'; // 防止背景点击关闭模态框（可选）
            searchModal.show();
            searchModal._element.addEventListener('shown.bs.modal', function () {
                const searchInput = document.getElementById('local-search-input');
                if (searchInput) {
                    searchInput.value = searchQuery;
                    const inputEvent = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(inputEvent);
                }
            });
        }, 1000); // 100 毫秒的延迟，可根据实际情况调整
    }
});
