document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        const searchModal = new bootstrap.Modal(document.getElementById('modalSearch'));
        searchModal.show();
        searchModal._element.addEventListener('shown.bs.modal', function () {
            const searchInput = document.getElementById('local-search-input');
            if (searchInput) {
                searchInput.value = searchQuery;
                const inputEvent = new Event('input', { bubbles: true });
                searchInput.dispatchEvent(inputEvent);
            }
        });
    }
});
