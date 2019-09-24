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
        this.settingsNotification = document.querySelector(".settings-notification");

        this.blogWidth = document.getElementById("BlogWidth");

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
        this.selectWidgetType = document.getElementById("select_widget_type");
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
        const selectWidgetTypeValue = this.selectWidgetType.options[this.selectWidgetType.selectedIndex].value;
        const self = this;
        var message;

        if(idValue==='' || idValue < 0){
            message = "Actually, section id is necessary.";
        }else if(classValue==='' || classValue < 0){
            message = "Actually, section class is necessary.";
        }/*else if(maxWidgetNumberValue==='' || maxWidgetNumberValue < 0){
            message = "Don't Necessary";
        }*/else if(selectBoxValue==="0"){
            message = "Yes or No, choose one.";
        }else if(!uniqueIDcontrol(idValue)){
            message = "ID must be unique";
        }else{
            message = "All added.";
            var obj = new Section(idValue, classValue, maxWidgetNumberValue, selectBoxValue, selectWidgetTypeValue);
            sections.push(obj);
            this.addSection(self, sections);
            this.addOption(self, sections);
        }
        this.addNotification(self, message, self.propertiesNotification);
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

    addNotification(self, message, showDiv){
        var notification = document.createElement('div');
        notification.className = "showNotification";
        if(showDiv.children.length === 0 || this.temp_msg !== message)
            showDiv.appendChild(notification);
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
        inputWidth.setAttribute('class','form-control');
        inputWidth.setAttribute('placeholder','Width');

        var inputHeight = document.createElement('input');
        inputHeight.setAttribute('type','text');
        inputHeight.setAttribute('class','form-control');
        inputHeight.setAttribute('placeholder','Height');

        var inputFontSize = document.createElement('input');
        inputFontSize.setAttribute('type','text');
        inputFontSize.setAttribute('placeholder','Font Size');

        var inputBGcolor = document.createElement('input');
        inputBGcolor.setAttribute('type','color');
        inputBGcolor.setAttribute('class','bgColorPicker form-control');
        inputBGcolor.setAttribute('name','Color Picker');
        inputBGcolor.setAttribute('placeholder','Background Color');
        inputBGcolor.setAttribute('style', 'padding:0;')

        var inputBGcolorText = document.createElement('input');
        inputBGcolorText.setAttribute('type','text');
        inputBGcolorText.setAttribute('class','bgColorPickerText form-control');
        inputBGcolorText.setAttribute('placeholder','Color code');
        inputBGcolorText.value = inputBGcolor.value;

        var submitButton = document.createElement('input');
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Add Style');
        submitButton.setAttribute('class', 'btn btn-success');

        var formGroup = document.createElement('div');
        formGroup.className = "form-group";
        var formGroup1 = document.createElement('div');
        formGroup1.className = "form-group";
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
        const templateName = "Template Name: " + this.templateName.value + newLine + tab;
        const templateURL = "Template URL: " + this.templateURL.value + newLine + tab;
        const author = "Author: " + this.author.value;

        const blogWidth = this.blogWidth.value;

        const self = this;
        self.codeBox.style.display = 'block';
        self.copyCodeButton.style.display = 'block';
        self.codeBox.innerHTML = firstPattern.toString() + titlePattern("Blog") + cssFirstTag;
        self.codeBox.innerHTML += commentFirst + templateName + templateURL + author + commentLast;
        
        self.codeBox.innerHTML += blogPattern(blogWidth);

        for(var i=0;i<cssStyles.length;i++){
            self.codeBox.innerHTML += cssPattern(cssStyles[i].selectorName, cssStyles[i].width, cssStyles[i].height, cssStyles[i].bgColor);
        }

        self.codeBox.innerHTML += cssEndTag + headEndTag + bodyFirstTag;
        for(var i=0;i<sections.length;i++){
            self.codeBox.innerHTML += sectionPattern(sections[i].idName, sections[i].className, sections[i].max_widgets, sections[i].show_add_element, sections[i].widgetType);
        }
        self.codeBox.innerHTML += bodyEndTag + htmlEndTag;
    }

    controlTemplateSettings(){
        const templateName = this.templateName.value;
        const templateURL = this.templateURL.value;
        const author = this.author.value;
        var message;

        if(templateName === ""){
            message = "Give a name for template";
        }else if(templateURL === ""){
            message = "Give a template URL";
        }else if(author == ""){
            message = "Specify template developer's name";
        }else if(sections.length === 0){
            message = "You must add a section";
        }else{
            message = "Created Successfully Template Code";
            this.generateCode();
        }
        this.addNotification(self, message, this.settingsNotification);
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
        ui.controlTemplateSettings();
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

function Section(idName, className, max_widgets, show_add_element, widgetType){
    this.idName = idName;
    this.className = className;
    this.max_widgets = max_widgets;
    this.show_add_element = show_add_element;
    this.widgetType = widgetType; 
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
var tab = ""; 
var XMLpattern = "";
var firstPattern = "&lt;!DOCTYPE html&gt;" + "<br/>" + "&lt;html&gt;" + "<br/>" + "&lt;head&gt;" + "<br/>" + "&lt;meta charset='utf-8'/&gt;" + newLine + tab;

function titlePattern(titleN){
    return "&lt;title&gt;" + titleN + "&lt;/title&gt;";
}
var cssFirstTag = newLine + tab + "&lt;b:skin&gt;&lt;![CDATA[" + newLine + newLine + tab;
var commentFirst = "/* ---------------------------------" + newLine + tab;
var commentLast = newLine + tab + "--------------------------------- */" + newLine + tab;
function blogPattern(w){
    return ".container{width: " + w + ";}" + newLine + tab; 
}
function cssPattern(selectorN, w, h, bgC){
    return "." + selectorN + "-area{width:" + w + ";height:" + h + ";background:" + bgC + ";}" + newLine + tab;
}
var cssEndTag = newLine + tab + "]]&gt;&lt;/b:skin&gt;" + "<br/>";
var headEndTag = "&lt;/head&gt;" + "<br/>";
var bodyFirstTag = "&lt;body&gt;" + newLine + tab + "&lt;div class='container'>" + newLine + tab;
function sectionPattern(idN, classN, maxWidgetN, showaddelementN, widgetCode){
    if(widgetCode === "0" || widgetCode !== "1")
        return tab + "&lt;div class='"+ classN +"-area'>" + "<br/>" + "&lt;b:section id='" + idN + "' class='" + classN + "' showaddelement='" + showaddelementN + "'/>" + newLine + tab + "&lt;/div&gt;";  
    else if(widgetCode === "1")
        return newLine + tab + "&lt;div class='"+ classN +"-area'>" + "<br/>" + "&lt;b:section id='" + idN + "' class='" + classN + "' showaddelement='" + showaddelementN + "'>" + newLine + tab + tab + main_widget + newLine + tab + "&lt;/b:section&gt;" + newLine + tab + "&lt;/div&gt;";  
}
var bodyEndTag = "&lt;/div><br/>" + "&lt;/body&gt;";
var htmlEndTag = "<br/>" + "&lt;/html&gt;";

// widget codes
var main_widget = "&lt;b:widget id='Blog1' locked='true' title='Blog Posts' type='Blog'/&gt;"