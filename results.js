document.getElementById('search-results').value = document.location.search.substring(8);

document.querySelectorAll('.list-group-item').forEach(item => {
    item.addEventListener('click', () => {
        let id = item.querySelector('.store').value;
        console.log(id);
    });
});