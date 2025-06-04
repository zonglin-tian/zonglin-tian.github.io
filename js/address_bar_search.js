// 检查当前 URL 是否包含 /search
if (window.location.pathname === '/search') {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        history.replaceState(null, null, '/'); // 重定向到首页
        const searchModal = new bootstrap.Modal(document.getElementById('modalSearch'));
        searchModal._config.backdrop = 'false';
        searchModal.show();
        searchModal._element.addEventListener('shown.bs.modal', function () {
            const searchInput = document.getElementById('local - search - input');
            if (searchInput) {
                searchInput.value = searchQuery;
                const inputEvent = new Event('input', { bubbles: true });
                searchInput.dispatchEvent(inputEvent);
            }
        });
        return; // 阻止后续代码执行（防止浏览器继续处理 /search 请求）
    }
}
