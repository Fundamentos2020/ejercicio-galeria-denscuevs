let imas = [];
let divButtons = "";

document.getElementById('input-submit').addEventListener('click', function() {
    var quantity = document.getElementById('input-imas').value;
    showGallery(quantity);
});

function showGallery(quantity) {
    if(quantity !== null || quantity !== "") {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://picsum.photos/v2/list?page=2&limit=100', true);
        xhr.onload = function() {
            if(this.status === 200) {
                const listImas = JSON.parse(this.responseText);
                let quantityElems = 100/quantity;
                let buttons = "";
                let text = 1;
                let imagesElems = [];
                let j = 0;

                for(let i = 0; i < quantityElems; i++) {
                    buttons += `<button class="btn-gallery">${text}</button>`;
                    text++;
                    for(let x = 0; x < quantity; x++) {
                        imagesElems.push(listImas[j]);
                        j++;
                    }
                    imas.push(imagesElems);
                    imagesElems = [];
                }
                document.getElementById('pagination').innerHTML = buttons;
                showImages(1);
            }
        }
        xhr.send();
    }
}

function showImages(index) {
    let imagenes = "";
    
    imas[index].forEach(element => {
        console.log(element);
        imagenes += `<img src="${element.download_url}" class="img" width="${element.width/20}">`;
    });
    document.getElementById('content-gallery').innerHTML = imagenes;
    divButtons = document.getElementsByClassName('btn-gallery');
}

