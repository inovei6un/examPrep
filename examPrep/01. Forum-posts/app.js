window.addEventListener("load", solve);

function solve() {
    let title = document.getElementById('post-title');
    let category = document.getElementById('post-category');
    let text = document.getElementById('post-content');
    let reviewList = document.getElementById('review-list');
    let approveSection = document.getElementById('published-list');

    let clearButton = document.getElementById('clear-btn');
    clearButton.addEventListener('click', clearPost);

    let publishButton = document.getElementById('publish-btn');
    
    publishButton.addEventListener('click', createPost);

    function createPost(event) {
        let titleValue = title.value;
        let categoryValue = category.value;
        let textValue = text.value;

        if (!titleValue || !categoryValue || !textValue) {
            return;
        }

        publishPost(titleValue, categoryValue, textValue);

        title.value = '';
        category.value = '';
        text.value = '';

    }

    function publishPost(titleValue, categoryValue, textValue) {
        let article = createArticle(titleValue, categoryValue, textValue);

        let li = document.createElement('li');
        li.classList.add('rpost');

        let editButton = document.createElement('button');
        editButton.classList.add('action-btn');
        editButton.classList.add('edit');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', editPost);

        let approveButton = document.createElement('button');
        approveButton.classList.add('action-btn');
        approveButton.classList.add('approve');
        approveButton.textContent = 'Approve';
        approveButton.addEventListener('click', approvePost);

        li.appendChild(article);
        li.appendChild(editButton);
        li.appendChild(approveButton);

        reviewList.appendChild(li);

    }

    function createArticle(titleValue, categoryValue, textValue){
        let article = document.createElement('article');

        let h = document.createElement('h4');
        h.textContent = titleValue;

        let categoryP = document.createElement('p');
        categoryP.textContent = `Category: ${categoryValue}`;

        let contentP = document.createElement('p');
        contentP.textContent = `Content: ${textValue}`;

        article.appendChild(h);
        article.appendChild(categoryP);
        article.appendChild(contentP);

        return article
    }

    function editPost(event) {
        let currentPost = event.target.parentElement;
        let articleContent = currentPost.getElementsByTagName('article')[0].children;
        
        let titleValue = articleContent[0].textContent;
        let categoryValue = articleContent[1].textContent;
        let textValue = articleContent[2].textContent;

        title.value = titleValue;
        category.value = categoryValue.split(': ')[1];
        text.value = textValue.split(': ')[1];

        currentPost.remove()

    }

    function approvePost(event) {
        let currentPost = event.target.parentElement;
        approveSection.appendChild(currentPost);
        

        approveSection.children[0].children[1].remove()
        approveSection.children[0].children[1].remove()
    }

    function clearPost(event) {
        console.log(Array.from(approveSection.children))
        Array.from(approveSection.children).forEach(li => li.remove())
    }
}