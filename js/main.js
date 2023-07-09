var ProductName = document.getElementById('ProductName') ;
var ProductPrice = document.getElementById('ProductPrice') ;
var ProductCategory = document.getElementById('ProductCategory') ;
var ProductDescription = document.getElementById('ProductDescription') ;


var allProducts = [] ;
var index ;

var getDataFromLocalStorage = JSON.parse(localStorage.getItem("allProducts")) ;

if( getDataFromLocalStorage != null ){

    allProducts = getDataFromLocalStorage ;

    displayAllProducts() ;
}

function displayAllProducts(){

    var lengthOfProducts = allProducts.length ;
    var container = "" ; 
    for (var i = 0 ; i < lengthOfProducts; i++) {
        container += `
        <tr>
        <td>${ i+1 }</td>
        <td>${allProducts[i].name}</td>
        <td>${allProducts[i].price}</td>
        <td>${allProducts[i].category}</td>
        <td>${allProducts[i].description}</td>
        <td><button onclick="updateElement(${i})" class="btn btn-warning">Edit</button></td>
        <td><button onclick="deleteElement(${i})" class="btn btn-danger">Delete</button></td>
    </tr>
        ` ;
    }


    document.getElementById('content').innerHTML = container ;

}

function clearForm(){
    ProductName.value = "";
    ProductPrice.value = "";
    ProductCategory.value = "";
    ProductDescription.value = "";
}

function addNewProduct(){
    var product = {
        name : ProductName.value.trim() ,
        price : Number(ProductPrice.value) ,
        category : ProductCategory.value.trim() ,
        description : ProductDescription.value.trim() ,
    } ;
    if(document.getElementById('button').innerHTML == "ADD"){
        allProducts.push(product);
        document.getElementById('button').innerHTML = "ADD" ;
    }else{
        allProducts[index] = product ;
    }
    localStorage.setItem( "allProducts" , JSON.stringify(allProducts) ) ;

    displayAllProducts() ;
    clearForm() ;

}

function deleteElement( id ){
    allProducts.splice(id,1);
    localStorage.setItem( "allProducts" , JSON.stringify(allProducts) ) ;
    displayAllProducts();
}

function updateElement( id ){
    document.getElementById('button').innerHTML = "Update" ;
    ProductName.value = allProducts[id].name;
    ProductPrice.value = allProducts[id].price;
    ProductCategory.value = allProducts[id].category;
    ProductDescription.value = allProducts[id].description;
    index = id ; 
}

function searchMethod(term){
    term = term.trim().toLocaleLowerCase() ;
    var container = "" ; 
    for(var i = 0 ; i < allProducts.length ; i++ ){
        if( allProducts[i].name.toLowerCase().includes(term) ){
            container += `
            <tr>
            <td>${ i+1 }</td>
            <td>${allProducts[i].name}</td>
            <td>${allProducts[i].price}</td>
            <td>${allProducts[i].category}</td>
            <td>${allProducts[i].description}</td>
            <td><button onclick="updateElement(${i})" class="btn btn-warning">Edit</button></td>
            <td><button onclick="deleteElement(${i})" class="btn btn-danger">Delete</button></td>
        </tr>
            ` ;
        }
    }
    document.getElementById('content').innerHTML = container ;
}
