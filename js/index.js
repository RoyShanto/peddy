const uri_category = 'https://openapi.programming-hero.com/api/peddy/categories';
const uri_pets = 'https://openapi.programming-hero.com/api/peddy/pets';
let forSort;


const loadCategories = (uri) => {
    fetch(uri)
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch(error => console.log(error))
}
const loadCards = (uri) => {
    fetch(uri)
        .then(res => res.json())
        .then(data => {
            forSort = data.pets ? data.pets : data.data;
            displayCards(data.pets ? data.pets : data.data)

        })
        .catch(error => console.log(error))
}


const displayCategories = (categories) => {
    const category = document.getElementById('category')
    categories.forEach(element => {
        const div = document.createElement('div')
        const uri = 'https://openapi.programming-hero.com/api/peddy/category/' + element.category;
        div.onclick = () => {
            loadCards(uri);
            setActiveCategory(div);
        };
        div.classList.add('flex', 'justify-between', 'items-center', 'py-6', 'px-20', 'border-2', 'border-gray-200', 'rounded-lg', 'hover:shadow-lg')
        div.innerHTML = `
        <img src="${element.category_icon}" alt="">
        <h3 class="text-2xl font-bold pl-5">${element.category}</h3>
        `;
        category.appendChild(div)
    });
}

const displayCards = (data) => {
    if (data.length == 0) {
        document.getElementById('not-available').classList.remove('hidden')
        document.getElementById('display-cards').classList.add('hidden')
    }
    else {
        document.getElementById('not-available').classList.add('hidden')
        document.getElementById('display-cards').classList.remove('hidden')
    }

    const cards = document.getElementById('display-cards')
    cards.innerText = '';
    // document.getElementById('spinner').classList.remove('hidden');

    data.forEach(element => {
        // console.log(element)
        const card = document.createElement('div')
        card.classList.add('card', 'bg-base-100', 'border-2', 'border-gray-200')
        card.innerHTML = `
        <figure class="p-5">
            <img src="${element.image}" alt="Shoes" class="rounded-lg w-full" />
        </figure>
        <div class="card-body">
            <h2 class="card-title text-xl">${element.pet_name ? element.pet_name : 'Not Mentioned'}</h2>
            <p class="text-gray-500 text-base">Breed: ${element.breed ? element.breed : 'Not Mentioned'}</p>
            <p class="text-gray-500 text-base">Birth: ${element.date_of_birth ? element.date_of_birth : 'Not Mentioned'}</p>
            <p class="text-gray-500 text-base">Gender: ${element.gender ? element.gender : 'Not Mentioned'}</p>
            <p class="text-gray-500 text-base">Price : ${element.price ? element.price + '$' : 'Not Mentioned'}</p>
            <hr class="text-gray-200 my-4">

            <div class="card-actions justify-between">
                <div onclick="likedPaddy('${element.image}')" class="badge w-16 h-11 border-gray-200">
                    <img class="p-1" src="https://img.icons8.com/ios/50/facebook-like--v1.png" alt="" />
                </div>
                <div onclick="adoptPaddy()" class="badge text-lg px-5 py-5 border-gray-200 text-emerald-700 font-bold">Adopt</div>
                <div onclick="detailPaddy(${element.petId})"   class="badge text-lg px-5 py-5 border-gray-200 text-emerald-700 font-bold">Details</div>
            </div>
        </div>
        `;
        cards.appendChild(card)
    });
}

const likedPaddy = (data) => {
    console.log(data);
    const likedImg = document.getElementById('liked-img');
    const div = document.createElement('div');
    div.classList.add('rounded-lg', 'border-2', 'border-gray-100', 'p-2')
    div.innerHTML = `
    <img src="${data}" alt="" class="rounded-lg">
    `;
    likedImg.appendChild(div);
}

const adoptPaddy = () => {
    const modal = document.getElementById('my_modal_6');
    const countdownText = document.getElementById('countdown-text');

    modal.showModal();

    let count = 3;
    countdownText.innerText = count;

    const interval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownText.innerText = count;
        } else {
            clearInterval(interval);
            modal.close();
        }
    }, 1000);

}

const detailPaddy = (data) => {
    uri_pet = 'https://openapi.programming-hero.com/api/peddy/pet/' + data;
    fetch(uri_pet)
        .then(res => res.json())
        .then(data => {
            // console.log(data.petData);
            document.getElementById('img').src = data.petData.image
            document.getElementById('name').innerText = data.petData.pet_name ? data.petData.pet_name : 'Not Mentioned';
            document.getElementById('breed').innerText = data.petData.breed ? data.petData.breed : 'Not Mentioned';
            document.getElementById('gender').innerText = data.petData.gender ? data.petData.gender : 'Not Mentioned';
            document.getElementById('vaccin').innerText = data.petData.vaccinated_status ? data.petData.vaccinated_status : 'Not Mentioned';
            document.getElementById('birth').innerText = data.petData.date_of_birth ? data.petData.date_of_birth : 'Not Mentioned';
            document.getElementById('price').innerText = data.petData.price ? data.petData.price + '$' : 'Not Mentioned';
            document.getElementById('detail').innerText = data.petData.pet_details ? data.petData.pet_details : 'Not Mentioned';

        })
        .catch(error => console.log(error))
    document.getElementById('my_modal_5').showModal();
}

document.getElementById('btn-sort').addEventListener('click', function () {
    console.log(forSort)
    forSort.sort((a, b) => b.price - a.price);
    console.log('after sorting: ', forSort)
    displayCards(forSort);
})

function setActiveCategory(selectedDiv) {
    const all = selectedDiv.parentNode.querySelectorAll('div');
    all.forEach(div => div.classList.remove('bg-emerald-50', 'rounded-full'));
    selectedDiv.classList.remove('rounded-lg');
    selectedDiv.classList.add('bg-emerald-50', 'rounded-full');
}
document.querySelectorAll('.btn-user').forEach(button => {
    button.addEventListener('click', function () {
        document.getElementById('my_modal_2').showModal();
        document.getElementById('checkbox').addEventListener('click', function () {
            if (this.checked) {
                document.getElementById('re-pass-l').classList.remove('hidden')
                document.getElementById('re-pass-i').classList.remove('hidden')
                document.getElementById('btn-toggle').innerText = 'Sign Up'
            }
            else {
                document.getElementById('re-pass-l').classList.add('hidden')
                document.getElementById('re-pass-i').classList.add('hidden')
                document.getElementById('btn-toggle').innerText = 'Sign In'
            }
        });
    })

})

document.getElementById('btn-more').addEventListener('click', function () {
    document.getElementById('btn-more').classList.add('hidden')
    document.getElementById('extra-text').classList.remove('hidden')
    document.getElementById('btn-less').classList.remove('hidden')
})
document.getElementById('btn-less').addEventListener('click', function () {
    document.getElementById('btn-less').classList.add('hidden')
    document.getElementById('extra-text').classList.add('hidden')
    document.getElementById('btn-more').classList.remove('hidden')
})





loadCategories(uri_category);
loadCards(uri_pets);


