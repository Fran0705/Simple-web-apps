$(document).ready(function(){
    let ingArr = []
    async function callApi(){
        let ingredients = ingArr.join(",")
        if(ingArr.length < 3){
            alert("You must at least have 3 ingredientes on the list");
        }else{
            try{
                let response = await axios.get("https://api.spoonacular.com/recipes/findByIngredients?ingredients="+ingredients+"&number=4&apiKey=7669d33eeb6b45f8af3f09c59fb3ed79");
                console.log(response);
                displayRecipies(response);
            }
            catch(error){
                console.log(error);
            }
        }
    }

    function getInput(){
        let input = $("#ingredient-input").val();
        console.log(input);
        return input;
    }

    function addIngredient(){
        let ingredient = getInput();
        if(/^[a-zA-Z][a-zA-Z]*$/ig.test(ingredient)){
            $(".ingredients-added").append(`<div class="ingredient"><span>${ingredient}</span><button class="remove-ingredient">X</button></div>`);
            ingArr.push(ingredient);
            console.log(ingArr);
            $("#ingredient-input").val("")
        }else{
            alert("Please enter only letters. Special characters, numbers, and spaces are not allowed in this field.")
        }
    }

    function removeIngredient(){
        $(this).closest(".ingredient").fadeOut(200, function(){
            $(this).remove();
        })
        let ingredient = $(this).siblings("span").text();
        let index = ingArr.indexOf(ingredient);
        if (index !== -1) {
            ingArr.splice(index, 1);
            console.log(ingArr);
        }
    }

    function displayRecipies(response){
        $(".recipies-container").empty();
        $(".recipies-heading").css("visibility", "visible")
        for(let i= 0; i<4; i++){
            $(".recipies-container").append(`<div class="recipe"><img src="${response.data[i].image}" height="90%"  alt="recipe.png"><p class="name-of-recipe">${response.data[i].title}</p></div>`)
        }
    }


    //Event Listeners
    $(document).on("input", "#ingredient-input", getInput);
    $(document).on("click", ".add-to-list", addIngredient);
    $(document).on("click", ".remove-ingredient", removeIngredient);
    $(document).on("click", ".find-recipies", callApi);
    $(document).on("keypress", "#ingredient-input", function(event) {
        if(event.which === 13){
            addIngredient();
        }
    })
})
