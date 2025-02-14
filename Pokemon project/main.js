$(document).ready(function(){

    function getInput(navbar_search){
        if(navbar_search === 1){
            let input = $(".form-control").val();
            console.log(input);
            return input;
        } else{
            let input = $(".input-field").val();
            console.log(input);
            return input;
        }
        
    }

    function displayInfo(response){
        $(".poke-tab").css("visibility", "visible")
        $("#poke-img").attr("src", response.sprites.front_default);
        $("#back-sprite").attr("src", response.sprites.back_default);
        $("#shiny-sprite").attr("src", response.sprites.front_shiny);
        $(".name").text(`${response.name}`);
        $(".ID").text(`${response.id}`);
        $(".weight").text(`${response.weight}`);
        $(".height").text(`${response.height}`);
        $(".type").text(`${response.types[0].type.name}`);
    }

    async function getDataFrom(){
        let pokemon = getInput();
        try{
            let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            console.log(response);
            if(response.status === 200){
                displayInfo(response.data);
            }
        }
        catch(error){
            console.log("An error occurred: " + error); 
            if(error.response.status === 404) {
                alert("There is no pokemon called " + pokemon);
            } else {        
                alert("An error occurred. Please try again later.");
            }
        }
    }

    //Event Listeners
    $(".input-field").on("input", function(){
        getInput(0)
    })
    $(".form-control").on("input", function(){
        getInput(1)
    })

    $(".btn").click(getDataFrom);
    $(".btn-outline-success").click(getDataFrom);

    $(".input-field").keypress(function(event) {
        if (event.which === 13) {
            getDataFrom();
        }
    });
    $(".form-control").keypress(function(event) {
        if (event.which === 13) {
            getDataFrom();
        }
    })
    $(".close-button").click(function(){
        $(".poke-tab").css("visibility", "hidden");
    })
})