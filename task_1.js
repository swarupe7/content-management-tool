
const jsPDF = window.jspdf.jsPDF;

function generatePdf() {
    
    const doc = new jsPDF();

   
    const contentCards = document.querySelectorAll('.content-card');
    contentCards.forEach((contentCard, index) => {
       
        const title = contentCard.querySelector('h3').textContent;
        const content = contentCard.querySelector('p').textContent;

        
        doc.text(title, 10, 10 + index * 80);
        doc.text(content, 10, 20 + index * 80);

        
        const images = contentCard.querySelectorAll('img');
        images.forEach((image, i) => {
            const imgData = getImageData(image);
            if (imgData) {
                const width = 80;
                const height = (imgData.height * width) / imgData.width;
                doc.addImage(imgData.data, 'JPEG', 10, 30 + index * 80 + i * 60, width, height);
            }
        });

      
    });

    
    doc.save('content.pdf');
}


function getImageData(imageElement) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    context.drawImage(imageElement, 0, 0);
    return {
        data: canvas.toDataURL('image/jpeg'),
        width: imageElement.width,
        height: imageElement.height,
    };
}


function submitForm() {
    console.log("Function is called"); 

    const titleElem = document.getElementById('title');
    const contentElem = document.getElementById('content');
    const imageElem = document.getElementById('image');
    
    const dataSection = document.getElementById('dataSection');

    console.log(titleElem, contentElem, imageElem,  dataSection); 

    const contentCard = document.createElement('div');
    contentCard.className = 'content-card';

    const h3 = document.createElement('h3');
    h3.textContent = titleElem.value;
    contentCard.appendChild(h3);

    const p = document.createElement('p');
    p.textContent = contentElem.value;
    contentCard.appendChild(p);

    if (imageElem.files[0]) {
        const imagePreview = URL.createObjectURL(imageElem.files[0]);
        const img = document.createElement('img');
        img.src = imagePreview;
        img.alt = 'Uploaded Image';
        img.className = 'uploaded-content';
        contentCard.appendChild(img);
    }

  

    dataSection.appendChild(contentCard);

    
    titleElem.value = '';
    contentElem.value = '';
    imageElem.value = '';
    
}
