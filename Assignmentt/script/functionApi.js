const AddToCartRow = document.getElementById('AddedCartRows');
let i = 0;

const SearchApi = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    if (data.meals && data.meals.length > 0) {
        loadedApi(data);
    } else {
        NotFoundResult();
    }
};

function NotFoundResult() {
    const Row = document.getElementById('RowMeal');
    Row.innerHTML = "<h5 class='text-center text-danger'>Not Found Result....</h5>";
}

async function loadedApi(data) {
    const meals = data.meals;
    const Row = document.getElementById('RowMeal');
    Row.innerHTML = "";

    //20 Ta sudhu dekhabo 
    meals.slice(0, 20).forEach((meal) => {
        const FoodId = meal.idMeal;
        const StringMeals = meal.strMeal;
        const FoodCategory = meal.strCategory;
        const Area = meal.strArea;
        const Instruction = meal.strInstructions.slice(0, 60);
        const ImageSrc = meal.strMealThumb;
        const Tags = meal.strTags;
        const Ingredient = [meal.strIngredient1,meal.strIngredient2,meal.strIngredient3,meal.strIngredient4];

        //এখন একটা ডিভ বানিয়েছি । 
        const Div = document.createElement('div');
        Div.classList = `col-lg-4 col-md-6 col-sm-12 col-12`;
        Div.innerHTML = `
            <div class="card" style="width: 100%;">
                <img src="${ImageSrc}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${StringMeals}</h5>
                    <p><b>Area: </b><small>${Area}</small></p>
                    <p><b>Category: </b><small>${FoodCategory}</small></p>
                    <p><b>Tags: </b><small>${Tags}</small></p>
                    <p><b>Ingredients : </b><small>${Ingredient.join(", ")}</small></p>
                    <p class="card-text"><b>Instruction: </b><small>${Instruction}</small></p>
                    <div class="d-flex flex-column justify-content-center align-items-center">
                        <button onclick="addToCartFunction(${FoodId})" class="btn btn-danger mb-2" id="AddToCart${FoodId}">Add To Cart</button>
                        <button onclick="DetailsFood(${FoodId})" id="DetailsBtn" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button>
                    </div>
                </div>
            </div>`;
        Row.appendChild(Div);
    });
}

async function DetailsFood(id) {
    const Division = document.getElementById('ModalDivElement');
    Division.textContent = "";

    const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const Response = await fetch(Url);
    const Data = await Response.json();

    const FoodDetails = Data.meals[0];
    const Titlee = FoodDetails.strMeal;
    const ImageSource = FoodDetails.strMealThumb;

    Division.innerHTML = `
        <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${Titlee}</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <img id="ModalImageSources" class="img-fluid" src="${ImageSource}" alt="...">
            <p><b>Area: </b><small id="modalArea">${FoodDetails.strArea}</small></p>
            <p><b>Category: </b><small id="modalCategory">${FoodDetails.strCategory}</small></p>
            <p><b>Tags: </b><small id="modalTags">${FoodDetails.strTags}</small></p>
            <p><b>Ingredients : </b><small id="modalIngredient">${[FoodDetails.strIngredient1, FoodDetails.strIngredient2, FoodDetails.strIngredient3, FoodDetails.strIngredient4].join(", ")}</small></p>
            <p><b>Instruction: </b><small id="modalInstructions">${FoodDetails.strInstructions}</small></p>
            <a id="YoutubeLink" href="${FoodDetails.strYoutube}" target="_blank">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="42" height="42" fill="rgba(216,21,21,1)"><path d="M12.2439 4C12.778 4.00294 14.1143 4.01586 15.5341 4.07273L16.0375 4.09468C17.467 4.16236 18.8953 4.27798 19.6037 4.4755C20.5486 4.74095 21.2913 5.5155 21.5423 6.49732C21.942 8.05641 21.992 11.0994 21.9982 11.8358L21.9991 11.9884L21.9991 11.9991C21.9991 11.9991 21.9991 12.0028 21.9991 12.0099L21.9982 12.1625C21.992 12.8989 21.942 15.9419 21.5423 17.501C21.2878 18.4864 20.5451 19.261 19.6037 19.5228C18.8953 19.7203 17.467 19.8359 16.0375 19.9036L15.5341 19.9255C14.1143 19.9824 12.778 19.9953 12.2439 19.9983L12.0095 19.9991L11.9991 19.9991C11.9991 19.9991 11.9956 19.9991 11.9887 19.9991L11.7545 19.9983C10.6241 19.9921 5.89772 19.941 4.39451 19.5228C3.4496 19.2573 2.70692 18.4828 2.45587 17.501C2.0562 15.9419 2.00624 12.8989 2 12.1625V11.8358C2.00624 11.0994 2.0562 8.05641 2.45587 6.49732C2.7104 5.51186 3.45308 4.73732 4.39451 4.4755C5.89772 4.05723 10.6241 4.00622 11.7545 4H12.2439ZM9.99911 8.49914V15.4991L15.9991 11.9991L9.99911 8.49914Z"></path></svg>
                </a>    
        </div>`;
}

async function addToCartFunction(id) {
    i++;

    if (i > 11) {
        document.getElementById('FullRslt').innerText = "You can't select more than 11 items.";
        alert("You can't select more than 11 items.");
        return;
    }

    document.getElementById(`AddToCart${id}`).innerText = "Already Added";
    document.getElementById(`AddToCart${id}`).disabled = true;
    document.getElementById('SelectedFood').innerText = i;

    const Url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const Response = await fetch(Url);
    const Data = await Response.json();

    const meals = Data.meals;
    const StringMeals = meals[0].strMeal;
    const FoodCategory = meals[0].strCategory;
    const Area = meals[0].strArea;
    const Instruction = meals[0].strInstructions.slice(0, 60);
    const ImageSrc = meals[0].strMealThumb;
    const Tags = meals[0].strTags;
    const Ingredient = [
        meals[0].strIngredient1,
        meals[0].strIngredient2,
        meals[0].strIngredient3,
        meals[0].strIngredient4
    ];

    const Div = document.createElement('div');
    Div.classList = `col-12 col-lg-12 col-md-12 col-sm-12 mb-3`;
    Div.innerHTML = `
        <div class="card" style="width: 100%;">
            <img src="${ImageSrc}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${StringMeals}</h5>
                <p><b>Area: </b><small>${Area}</small></p>
                <p><b>Category: </b><small>${FoodCategory}</small></p>
                <p><b>Tags: </b><small>${Tags}</small></p>
                <p><b>Ingredients : </b><small>${Ingredient.join(", ")}</small></p>
                <p class="card-text"><b>Instruction: </b><small>${Instruction}</small></p>
            </div>
        </div>`;
    AddToCartRow.appendChild(Div);
}

function SearchFood() {
    console.log('Hello Iam Search Function');
    const Row = document.getElementById('RowMeal');
    Row.innerHTML = "";

    const valuee = document.getElementById('inputSearch').value;
    SearchApi(`https://www.themealdb.com/api/json/v1/1/search.php?s=${valuee}`);
}

SearchApi('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
