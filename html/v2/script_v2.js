document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('table');
    const rows = table.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const rowsPerPage = 25;
    let currentPage = 1;
  
    function showPage(page) {
        for (let i = 0; i < rows.length; i++) {
            if (i < (page - 1) * rowsPerPage || i >= page * rowsPerPage) {
                rows[i].style.display = 'none';
            } else {
                rows[i].style.display = '';
            }
        }
    }
    
    document.getElementById('prevPage').addEventListener('click', function() {
        showPage(currentPage - 1);
    });
  
    document.getElementById('nextPage').addEventListener('click', function() {
        showPage(currentPage + 1);
    });
  
    showPage(currentPage);
});
  