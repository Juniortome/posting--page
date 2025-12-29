const form = document.querySelector('#form-post');
const titleInput = document.querySelector('#post-title');
const bodyInput = document.querySelector('#post-body');
const privacyInput = document.querySelector('#post-privacy');
const btnSubmit = document.querySelector('#btn-submit');

const renderTitle = document.querySelector('#renderizador-titulo');
const renderBody = document.querySelector('#renderizador-conteudo');
const renderPrivacy = document.querySelector('#renderizador-privacidade');
const feedContainer = document.querySelector('#feed-container');
const toast = document.querySelector('#toast');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    btnSubmit.innerText = "Enviando...";
    btnSubmit.disabled = true;

    const data = {
        title: titleInput.value,
        body: bodyInput.value,
        privacy: privacyInput.value,
        userId: 1
    };

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(res => res.json())
    .then(json => {
        renderTitle.innerText = json.title;
        renderBody.innerText = json.body;
        renderPrivacy.innerText = data.privacy;

        feedContainer.classList.add('active');
        showToast();

        titleInput.value = '';
        bodyInput.value = '';
        privacyInput.selectedIndex = 0;
        btnSubmit.innerText = "Publicar";
        btnSubmit.disabled = false;

        feedContainer.scrollIntoView({ behavior: 'smooth' });
    })
    .catch(() => {
        btnSubmit.innerText = "Tentar novamente";
        btnSubmit.disabled = false;
    });
});

function showToast() {
    toast.style.display = 'block';
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}
