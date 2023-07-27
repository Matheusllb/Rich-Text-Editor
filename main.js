
// Referências para os botões
let optionsButton = document.querySelectorAll(".option-button");
let advancedOptionButton = document.querySelectorAll(".adv-option-button");
let formatButton = document.querySelectorAll(".format");
let alignButton = document.querySelectorAll(".align");
let spacingButton = document.querySelectorAll(".spacing");
let scriptButton = document.querySelectorAll(".script");
let fontName = document.getElementById("fontName");
let fontSizeRef = document.getElementById("fontSize");
let linkButton = document.getElementById("createLink");
let writingArea = document.getElementById("text-input");
let generatePdfButton = document.getElementById("generate-pdf");

// Lista de fontes
let fontList = ["Arial", "Courier New", "Cursive", "Garamond", "Georgia", "Lato", " Roboto", "Verdana"];

// Configurações iniciais
const initializer = () => {
    highlighter(alignButton, true);
    highlighter(spacingButton, true);
    highlighter(formatButton, false);
    highlighter(scriptButton, true);

    fontList.map((value) => {
        let option = document.createElement('option');
        option.value = value;
        option.innerHTML = value;
        fontName.appendChild(option);
    });

    for (let i = 1; i <= 7; i++){
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        fontSizeRef.appendChild(option);
    }

    fontSizeRef.value = 3;
    
};

// Lógica principal
const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
};

// Para operações mais básicas (bold, italic, underline, strikethrough)
optionsButton.forEach((button) => {
    button.addEventListener('click', () => {
        modifyText(button.id, false, null);
    });
});

// Para operações avançadas (color, font, size)
advancedOptionButton.forEach((button) => {
    button.addEventListener('change', () => {
        modifyText(button.id, false, button.value);
    });
});

// Para gerar links
linkButton.addEventListener('click', () => {
    let userLink = prompt("Enter a URL");
    if(/http/i.test(userLink)){
        modifyText(linkButton.id, false, userLink);
    } else {
        userLink = "http://" + userLink;
        modifyText(linkButton.id, false, userLink);
    }
});

generatePdfButton.addEventListener('click', () => {
    let textInput = document.querySelector('#text-input');
    let options = {
        margin:       1,
        filename:     'myfile.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().set(options).from(textInput).save();
    
});

// Realce de botão clicado
const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
        button.addEventListener('click', () => {
            if(needsRemoval){
                let alreadyActive = false;
                
                if(button.classList.contains('active')){
                    alreadyActive = true;
                }
                
                highlighterRemover(className);
                if(!alreadyActive){
                    button.classList.add('active');
                }
            } else {
                button.classList.toggle('active');
            }
        });
    });
};

const highlighterRemover = (className) => {
    className.forEach((button) => {
        button.classList.remove('active');
    });
};

window.onload = initializer();



