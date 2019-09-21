class UI{
    constructor(){
        this.controller = document.querySelector(".controller");
        this.panel = document.querySelector(".panel");
        this.demoView = document.querySelector(".demo-view");
        this.codeBox = document.querySelector(".codeBox");
        this.codeBox.style.display = 'none';
        this.copyCodeButton = document.querySelector(".copyCode");
        this.copyCodeButton.style.display = 'none';

        this.templateName = document.getElementById("templateName");
        this.templateURL = document.getElementById("templateURL");
        this.author = document.getElementById("author");

        this.rightside = document.querySelector(".rightside");
        this.layersList = document.querySelector(".layers-list");
        this.layersControl = document.querySelector(".layers-control");
        this.properties = document.querySelector(".properties");
        //this.properties.style.display = 'none';
        this.propertiesNotification = document.querySelector(".properties-notification");
        this.sectionId = document.getElementById("sectionId");
        this.sectionClass = document.getElementById("sectionClass");
        this.maxWidgetNumber = document.getElementById("maxWidgetNumber");
        this.selectBox = document.getElementById("select_box");
        this.sectionOption = document.querySelector(".sectionOption");
        this.line = document.createElement("hr");
        this.temp_msg;
        this.securityCode = randomCharacter(10);
        
        this.canvas = document.getElementById("preview");
        this.context = this.canvas.getContext("2d");
        this.image = new Image();
    }

    submitProperties(){
        const idValue = this.sectionId.value;
        const classValue = this.sectionClass.value;
        const maxWidgetNumberValue = this.maxWidgetNumber.value;
        const selectBoxValue = this.selectBox.options[this.selectBox.selectedIndex].value;
        const self = this;
        var message;

        if(idValue==='' || idValue < 0){
            message = "Actually, section id is necessary.";
        }else if(classValue==='' || classValue < 0){
            message = "Actually, section class is necessary.";
        }else if(maxWidgetNumberValue==='' || maxWidgetNumberValue < 0){
            message = "Don't Necessary";
        }else if(selectBoxValue==="0"){
            message = "Yes or No, choose one.";
        }else if(!uniqueIDcontrol(idValue)){
            message = "ID must be unique";
        }else{
            message = "All added.";
            var obj = new Section(idValue, classValue, maxWidgetNumberValue, selectBoxValue);
            sections.push(obj);
            this.addSection(self, sections);
            this.addOption(self, sections);
        }
        this.addNotification(self, message);
    }

    showAddProperties(){
        this.properties.style.display = 'block';
    }

    copyCode(){
        if(document.selection){
            var range = document.body.createTextRange();
            var codeBox = document.getElementById("codeB");
            range.moveToElementText(codeBox);
            range.select();
            document.execCommand("copy");
        }else if(window.getSelection){
            var sel = window.getSelection();
            sel.removeAllRanges();
            var range = document.createRange();
            range.selectNode(document.getElementById("codeB"));
            sel.addRange(range);
            document.execCommand("copy");
            sel.removeAllRanges(); // deactive selection :)
        }
    }

    addNotification(self, message){
        var notification = document.createElement('div');
        notification.className = "showNotification";
        if(self.propertiesNotification.children.length === 0 || this.temp_msg !== message)
            self.propertiesNotification.appendChild(notification);
        notification.innerHTML = message;
        this.temp_msg = message;
        setTimeout(function(){
            notification.remove("showNotification");
        },10000);
    }

    showSectionProperties(self, id, iconId){
        var index;
        var sectionOptionID = id;
        var sectionOption = document.getElementById(sectionOptionID);
        var iconState = document.getElementById(iconId);
        if(sectionOption.style.display === 'block'){
            sectionOption.style.display = 'none';
            iconState.style.backgroundImage = 'url(https://gurb.github.io/open-arrow.png)';
            iconState.style.opacity = 0.5;
        }else{
            for(var i=0;i<sections.length;i++){
                var tempId = sections[i].idName + this.securityCode + "-option";
                var tempIconId = sections[i].idName + this.securityCode + "-icon"; 
                if(id != tempId){
                    document.getElementById(tempId).style.display = 'none';
                    document.getElementById(tempIconId).style.backgroundImage = 'url(https://gurb.github.io/open-arrow.png)';
                    document.getElementById(tempIconId).style.opacity = 0.5;
                    continue;
                }
                iconState.style.backgroundImage = 'url(https://gurb.github.io/close-arrow.png)';
                iconState.style.opacity = 1;
                sectionOption.style.display = 'block';
                index = i;
            }
        }
        this.layersList.options[index].selected = 'selected';
    }
    
    addSection(self, sections){
        var sectionArea = document.createElement('div');
        var sectionOption = document.createElement('div');
        var sectionHeader = document.createElement('div');
        var iconImage = document.createElement('span');
        sectionArea.className = "sectionArea";
        sectionHeader.className = "sectionHeader";
        iconImage.className = "iconImage";
        sectionOption.className = "sectionOption";
        sectionArea.id = sections[sections.length - 1].idName + this.securityCode;
        sectionOption.id = sections[sections.length - 1].idName + this.securityCode + "-option";
        iconImage.id = sections[sections.length - 1].idName + this.securityCode + "-icon";
        var id = sections[sections.length - 1].idName + this.securityCode + "-option";
        var iconId = iconImage.id;
        sectionOption.style.display = 'none';
        sectionHeader.addEventListener("click", function(){
            self.showSectionProperties(self, id, iconId);
        });
        self.codeBox.style.display = 'none';
        self.copyCodeButton.style.display = 'none';
        self.demoView.appendChild(sectionArea);
        sectionArea.appendChild(sectionHeader);
        sectionHeader.appendChild(iconImage);
        iconImage.innerHTML += sections[sections.length - 1].idName;
        sectionArea.appendChild(sectionOption);
        this.addOptionFormSection(self, sectionOption, sectionHeader);
    }

    addOptionFormSection(self, sectionOption, sectionHeader){
        var formOptions = document.createElement('form');
        formOptions.setAttribute('class','formOptions');
        formOptions.setAttribute('method','post')
        
        var inputWidth = document.createElement('input');
        inputWidth.setAttribute('type','text');
        inputWidth.setAttribute('placeholder','Width');

        var inputHeight = document.createElement('input');
        inputHeight.setAttribute('type','text');
        inputHeight.setAttribute('placeholder','Height');

        var inputFontSize = document.createElement('input');
        inputFontSize.setAttribute('type','text');
        inputFontSize.setAttribute('placeholder','Font Size');

        var inputBGcolor = document.createElement('input');
        inputBGcolor.setAttribute('type','color');
        inputBGcolor.setAttribute('class','bgColorPicker');
        inputBGcolor.setAttribute('name','Color Picker');
        inputBGcolor.setAttribute('placeholder','Background Color');

        var inputBGcolorText = document.createElement('input');
        inputBGcolorText.setAttribute('type','text');
        inputBGcolorText.setAttribute('class','bgColorPickerText');
        inputBGcolorText.setAttribute('placeholder','Color code');
        inputBGcolorText.value = inputBGcolor.value;

        var submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Add Style');

        var formGroup = document.createElement('div');
        formGroup.className = "formGroup";
        var formGroup1 = document.createElement('div');
        formGroup1.className = "formGroup";
        var rightInput = document.createElement('div');
        rightInput.className = "rightInput";
        var rightInput1 = document.createElement('div');
        rightInput1.className = "rightInput";
        var leftInput = document.createElement('div');
        leftInput.className = "leftInput";
        var leftInput1 = document.createElement('div');
        leftInput1.className = "leftInput";
        
        sectionOption.appendChild(formOptions);
        formOptions.appendChild(formGroup).appendChild(leftInput).appendChild(inputWidth);
        formGroup.appendChild(rightInput).appendChild(inputHeight);
        formOptions.appendChild(formGroup1).appendChild(leftInput1).appendChild(inputBGcolorText);
        leftInput1.appendChild(inputBGcolor);
        formOptions.appendChild(submitButton);

        self.setOptionFormValues(self, formOptions, inputWidth, inputHeight, inputBGcolorText, sectionHeader);
        self.changeColor(self, inputBGcolor, inputBGcolorText);
    }

    setOptionFormValues(self, formOptions, inputWidth, inputHeight, inputBGcolorText, sectionHeader){
        formOptions.addEventListener("submit", function(event){
            event.preventDefault();
            var width_s = inputWidth.value;
            var height_s = inputHeight.value;
            var bgColor = inputBGcolorText.value;
            var objCss = new CSSattr(sectionHeader.textContent, width_s, height_s, bgColor);
            if(controlCSS(objCss))
                cssStyles.push(objCss); 
            self.drawOptionFormValues(self, width_s, height_s, bgColor);
        });
    }

    // draw section on preview panel
    drawOptionFormValues(self, w, h, bgColor){
        var ctx = self.context;
        ctx.font = "12px Roboto";
        ctx.color = "#ffffff";
        ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        console.log(bgColor);
        ctx.fillStyle = bgColor;
        ctx.fillRect(20, 10, 260, 20);
        ctx.fillStyle = "#ffffff";
        ctx.fillText("layer", 25, 20);
    }

    // if inputBGcolor change then change inputBGcolorText value 
    changeColor(self, inputBGcolor, inputBGcolorText){
        inputBGcolor.addEventListener("change", function(event){
            event.preventDefault();
            inputBGcolorText.value = inputBGcolor.value;
        });
    }

    // layer list element
    addOption(self, sections){
        var optionArea = document.createElement('option');
        self.layersList.appendChild(optionArea);
        optionArea.innerHTML = sections[sections.length - 1].idName;
    }

    // delete selected section
    deleteSection(){
        sections.splice(this.layersList.selectedIndex, 1);
        var selectedDivName = this.layersList.options[this.layersList.selectedIndex].text + this.securityCode;
        var sectionIDdiv = document.getElementById(selectedDivName);
        this.demoView.removeChild(sectionIDdiv);
        this.layersList.remove(this.layersList.selectedIndex);
    }

    upSection(){
        var tempOption = this.layersList.options[this.layersList.selectedIndex].text;
        this.layersList.options[this.layersList.selectedIndex].text = this.layersList.options[this.layersList.selectedIndex-1].text;
        this.layersList.options[this.layersList.selectedIndex-1].text = tempOption;

        var tempElement = sections[this.layersList.selectedIndex];
        sections[this.layersList.selectedIndex] = sections[this.layersList.selectedIndex-1];
        sections[this.layersList.selectedIndex-1] = tempElement;

        var beforeSelectedDivName = this.layersList.options[this.layersList.selectedIndex-1].text + this.securityCode;
        var selectedDivName = this.layersList.options[this.layersList.selectedIndex].text + this.securityCode;
        var beforeSectionIDdiv = document.getElementById(beforeSelectedDivName);
        var sectionIDdiv = document.getElementById(selectedDivName);
        var parentSectionDiv = sectionIDdiv.parentNode;
        parentSectionDiv.insertBefore(beforeSectionIDdiv, sectionIDdiv);

        this.layersList.options[this.layersList.selectedIndex-1].selected = 'selected';        
    }

    downSection(){
        var tempOption = this.layersList.options[this.layersList.selectedIndex].text;
        this.layersList.options[this.layersList.selectedIndex].text = this.layersList.options[this.layersList.selectedIndex+1].text;
        this.layersList.options[this.layersList.selectedIndex+1].text = tempOption;

        var tempElement = sections[this.layersList.selectedIndex];
        sections[this.layersList.selectedIndex] = sections[this.layersList.selectedIndex+1];
        sections[this.layersList.selectedIndex+1] = tempElement;

        var afterSelectedDivName = this.layersList.options[this.layersList.selectedIndex+1].text + this.securityCode;
        var selectedDivName = this.layersList.options[this.layersList.selectedIndex].text + this.securityCode;
        var afterSectionIDdiv = document.getElementById(afterSelectedDivName);
        var sectionIDdiv = document.getElementById(selectedDivName);
        var parentSectionDiv = sectionIDdiv.parentNode;
        parentSectionDiv.insertBefore(sectionIDdiv, afterSectionIDdiv);

        this.layersList.options[this.layersList.selectedIndex+1].selected = 'selected'; 
    }
    
    closeProperties(){
        this.properties.style.display = 'none';
    }

    generateCode(){
        const templateName = this.templateName.value + newLine + tab;
        const templateURL = this.templateURL.value + newLine + tab;
        const author = this.author.value;

        const self = this;
        self.codeBox.style.display = 'block';
        self.copyCodeButton.style.display = 'block';
        self.codeBox.innerHTML = firstPattern.toString() + titlePattern("Blog") + cssFirstTag;
        self.codeBox.innerHTML += commentFirst + templateName + templateURL + author + commentLast;
        
        for(var i=0;i<cssStyles.length;i++){
            self.codeBox.innerHTML += cssPattern(cssStyles[i].selectorName, cssStyles[i].width, cssStyles[i].height, cssStyles[i].bgColor);
        }

        self.codeBox.innerHTML += cssEndTag + headEndTag + bodyFirstTag;
        for(var i=0;i<sections.length;i++){
            self.codeBox.innerHTML += sectionPattern(sections[i].idName, sections[i].className, sections[i].max_widgets, sections[i].show_add_element);
        }
        self.codeBox.innerHTML += bodyEndTag + htmlEndTag;
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function eventListener(){
    const layers = document.querySelector(".layers");
    const properties = document.querySelector(".properties");
    const showAddLayer = document.getElementById("add-layer");
    const deleteLayer = document.getElementById("delete-layer");
    const upLayer = document.getElementById("up-layer");
    const downLayer = document.getElementById("down-layer");
    const closeProperties = document.querySelector(".exitButton");
    const copyButton = document.querySelector(".copyCode");

    const createButton = document.getElementById("create-button");

    const ui = new UI();

    layers.addEventListener("click", function(event){
        event.preventDefault();
        //ui.submit_layers();
    });

    properties.addEventListener("submit", function(event) {
        event.preventDefault();
        ui.submitProperties();
    });

    showAddLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.showAddProperties();
    });

    deleteLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.deleteSection();
    });

    upLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.upSection();
    });

    downLayer.addEventListener("click", function(event){
        event.preventDefault();
        ui.downSection();
    });

    closeProperties.addEventListener("click", function(event){
        event.preventDefault();
        ui.closeProperties();
    });

    createButton.addEventListener("click", function(event){
        event.preventDefault();
        ui.generateCode();
    });

    copyButton.addEventListener("click", function(event){
        event.preventDefault();
        ui.copyCode();
    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventListener();
});

var sections = [];
var cssStyles = [];

function Section(idName, className, max_widgets, show_add_element){
    this.idName = idName;
    this.className = className;
    this.max_widgets = max_widgets;
    this.show_add_element = show_add_element; 
}

function CSSattr(selectorName, width, height, bgColor){
    this.selectorName = selectorName;
    this.width = width;
    this.height = height;
    this.bgColor = bgColor;
}

function uniqueIDcontrol(idValue){
    if(sections.length === 0)
        return true;
    for(var i=0;i<sections.length;i++){
        if(sections[i].idName === idValue)
            return false;
    }
    return true;
}

function controlCSS(objCss){
    for(var i=0;i<cssStyles.length;i++){
        if(objCss.selectorName == cssStyles[i].selectorName){
            cssStyles[i] = objCss;
            return false;
        }
    }
    return true;
}

function randomCharacter(len){
    var randomCharacter = "";
    var characters = ['A','a','B','b','C','c',
                      'D','d','E','e','F','f',
                      'G','g','H','h','I','i',
                      'J','j','K','k','L','l',
                      'M','m','N','n','O','o',
                      'P','p','Q','q','R','r',
                      'S','s','T','t','U','u',
                      'V','v','W','w','X','x',
                      'Y','y','Z','z'];

    for(var i=0;i<len;i++){
        var r = Math.floor(Math.random() * characters.length);
        randomCharacter += characters[r];
    }
    return randomCharacter;
}

// pieces of template code
var newLine = "<br/>"
var tab = "&emsp;&emsp;&emsp;&emsp;";
var XMLpattern = "";
var firstPattern = "&lt;!DOCTYPE html&gt;" + "<br/>" + "&lt;html&gt;" + "<br/>&emsp;&emsp;" + "&lt;head&gt;" + "<br/>&emsp;&emsp;&emsp;&emsp;" + "&lt;meta charset='utf-8'/&gt;" + "<br/>&emsp;&emsp;&emsp;&emsp;";
function titlePattern(titleN){
    return "&lt;title&gt;" + titleN + "&lt;/title&gt;";
}
var cssFirstTag = "<br/>&emsp;&emsp;&emsp;&emsp;" + "&lt;b:skin&gt;&lt;![CDATA[" + "<br/><br/>&emsp;&emsp;&emsp;&emsp;";
var commentFirst = "*/ ---------------------------------" + "<br/>&emsp;&emsp;&emsp;&emsp;";
var commentLast = "<br/>&emsp;&emsp;&emsp;&emsp;" + "--------------------------------- */";
function cssPattern(selectorN, w, h, bgC){
    return "." + selectorN + "-area{width:" + w + ";height:" + h + ";background:" + bgC + ";}" + "<br/>&emsp;&emsp;&emsp;&emsp;"; 
}
var cssEndTag = "<br/>&emsp;&emsp;&emsp;&emsp;" + "]]&gt;&lt;/b:skin&gt;" + "<br/>&emsp;&emsp;";
var headEndTag = "&lt;/head&gt;" + "<br/>&emsp;&emsp;";
var bodyFirstTag = "&lt;body&gt;" + "<br/>&emsp;&emsp;&emsp;&emsp;";
function sectionPattern(idN, classN, maxWidgetN, showaddelementN){
    return "<br/>&emsp;&emsp;&emsp;&emsp;" + "&lt;div class='"+ classN +"-area'>" + "<br/>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;" + "&lt;b:section id='" + idN + "' class='" + classN + "' maxwidgets='" + maxWidgetN + "' showaddelement='" + showaddelementN + "'/>"+ "<br/>&emsp;&emsp;&emsp;&emsp;" + "&lt;/div&gt;";  
}
var bodyEndTag = "<br/>&emsp;&emsp;" + "&lt;/body&gt;";
var htmlEndTag = "<br/>" + "&lt;/html&gt;";