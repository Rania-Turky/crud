let productContainer;
let currentIndex;


if (localStorage.getItem("productsData") == null) {
    productContainer = [];
}
else {
    productContainer = JSON.parse(localStorage.getItem("productsData"));
    displayProducts();
}


function validaeName(theName) {
    let nameRegExp = /^[A-Z][a-z]{3,10}$/;
    if (nameRegExp.test(theName) == false) {
      
      $("#alertName").css("display","block");
      return false;
    }
    else {
        
        $("#alertName").css("display","none");
        return true;
    }
}
function validatePrice(thePrice) {
    let priceRegExp = /^[1-7][0-6]{3,5}$/;
    if (priceRegExp.test(thePrice) == false) {
      
       $("#alertPrice").css("display","block");
       return false;
      
    }
    else {
        
        $("#alertPrice").css("display","none");
        return true;
    }
}
function validateCategory(theCategory){
    let categoryRegExp=/^[A-Z a-z]{2,15}$/;
    if(categoryRegExp.test(theCategory)==false){
       
       $("#alertCategory").css("display","block");
       return false;
    }
    else{
     
       $("#alertCategory").css("display","none");
       return true;
    }
}
function validateDesc(theDesc){
    let descRegExp=/^[A-Z a-z ]{3,30}$/;
    if(descRegExp.test(theDesc)==false){
        
       $("#alertDesc").css("display","block");
       return false;
    }
    else{
        
      
     $("#alertDesc").css("display","none");
     return true;
    }
}
function addProduct() {
    let productName = document.getElementById("productNameInp").value;
    let productPrice = document.getElementById("productPriceInp").value;
    let productCategory = document.getElementById("productCategoryInp").value;
    let productDesc = document.getElementById("productDescInp").value;
    if (validaeName(productName) == true&& validatePrice(productPrice )== true&&validateCategory(productCategory)==true&&validateDesc(productDesc)==true) {
      
        let product = {
            name: productName,
            price: productPrice,
            category: productCategory,
            desc: productDesc
        }
        productContainer.push(product);
        localStorage.setItem("productsData", JSON.stringify(productContainer));
        displayProducts();
    }
   

}
function displayProducts() {
    let temp = ``;
    for (let i = 0; i < productContainer.length; i++) {
        temp += `<div class="col-lg-3 col-md-4 col-sm-6">
        <div class="product mb-5">
            <img src="images/laptop .jpg" class="img-fluid">
            <h4>`+ productContainer[i].name + `<span class="ml-5  badge badge-dark">` + productContainer[i].category + `</span></h4>
            <p>`+ productContainer[i].desc + `</p>
            <div class="price">`+ productContainer[i].price + `</div>
            <button  onclick="updateProduct(`+ i + `)"  class="btn btn-outline-warning btn-sm mr-5">update</button>
            <button onclick="deleteProduct(`+ i + `)" class="btn btn-outline-danger btn-sm ml-5">delete</button>
            

        </div>

    </div>`;
    }
    document.getElementById("productsRow").innerHTML = temp;
}
function searchProducts(term) {
    let temp = ``
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            temp += `<div class="col-lg-3 col-md-4 col-sm-6">
            <div class="product">
                <img src="images/laptop .jpg" class="img-fluid">
                <h4>`+ productContainer[i].name + `<span class="ml-5  badge badge-dark">` + productContainer[i].category + `</span></h4>
                <p>`+ productContainer[i].desc + `</p>
                <div class="price">`+ productContainer[i].price + `</div>
                <button class="btn btn-outline-warning btn-sm mr-5">update</button>
                <button class="btn btn-outline-danger btn-sm ml-5">delete</button>
                
    
            </div>
    
        </div>`;

        }

    }
    document.getElementById("productsRow").innerHTML = temp;
}
function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem("productsData", JSON.stringify(productContainer));
    displayProducts();
}
function updateProduct(x) {
    currentIndex = x;
    document.getElementById("productNameInp").value = productContainer[x].name;

    document.getElementById("productPriceInp").value = productContainer[x].price;

    document.getElementById("productCategoryInp").value = productContainer[x].category;

    document.getElementById("productDescInp").value = productContainer[x].desc;
    $("#my-btn").css("display", "block")



}

document.getElementById("my-btn").onclick = function editProduct() {

    productContainer[currentIndex].name = document.getElementById("productNameInp").value;
    productContainer[currentIndex].price = document.getElementById("productPriceInp").value;
    productContainer[currentIndex].category = document.getElementById("productCategoryInp").value;

    localStorage.setItem("productsData", JSON.stringify(productContainer));
    displayProducts();
}
