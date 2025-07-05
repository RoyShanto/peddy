const uri_category = 'https://openapi.programming-hero.com/api/peddy/categories'

const loadCategories = () => {
    fetch(uri_category)
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}

const displayCategories = (categories) => {
    const category = document.getElementById('category')
    categories.forEach(element => {
        console.log(element);
        const div = document.createElement('div')
        div.classList.add('flex', 'items-center', 'space-x-4', 'py-6', 'px-20', 'border-2', 'border-gray-200', 'rounded-lg', 'mx-auto')
        div.innerHTML = `
        <img src="${element.category_icon}" alt="">
        <h3 class="text-2xl font-bold">${element.category}</h3>
        `;
        category.appendChild(div)
    });
}
loadCategories();