const url = 'http://localhost:8000';
document.addEventListener('DOMContentLoaded', function () {
    const urlDom = document.getElementById('backend-url');
    urlDom.innerHTML = url;
    const statusDom = document.getElementById('status');
    const loadingDom = document.getElementById('loading');
    document.getElementById('connect-to-backend-btn').addEventListener('click', function () {
        loadingDom.hidden = false;
        fetch(url)
            .then((response) => {
                statusDom.classList.remove('waiting');
                statusDom.classList.remove('error');
                statusDom.classList.add('success');
                statusDom.innerHTML = response.statusText;
            })
            .catch((error) => {
                statusDom.classList.remove('waiting');
                statusDom.classList.remove('success');
                statusDom.classList.add('error');
                statusDom.innerHTML = error;
            })
            .finally(() => {
                loadingDom.hidden = true;
            });
    });
});
