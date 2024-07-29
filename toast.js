// document.onreadystatechange = ()=>{
//     if(document.readyState == "complete"){
        var style_tag = document.createElement("style");
        style_tag.innerText = `.slxToast-container{
            height: 200px;
            width: 322px;
            display: flex;
            pointer-events: none;
            justify-content: center;
            position: relative;
        }
        
        .slxToastParent{
            height: 100%;
            width: 100%;
            display: flex;
            position: fixed;
            pointer-events: none;
            top: 0;
            left: 0;
            padding: 40px;
            z-index: 10000;
        }
        
        .slxToastPosition__bottom-right{justify-content: end; align-items: end;}
        .slxToastPosition__bottom-center{justify-content: center; align-items: end;}
        .slxToastPosition__bottom-left{justify-content: start; align-items: end;}
        .slxToastPosition__top-right{justify-content: end; align-items: start;}
        .slxToastPosition__top-center{justify-content: center; align-items: start;}
        .slxToastPosition__top-left{justify-content: start; align-items: start;}
        
        .slxToast{
            width: 322px;
            height: fit-content;
            padding: 16px;
            box-shadow: 0 4px 12px #00000033;
            position: absolute;
            background: rgb(255, 255, 255);
            transition: all ease 0.3s;
            border-radius: 10px;
            pointer-events: all;
            box-sizing: border-box;
            cursor: pointer;
        }
        
        
        .slxToast-btn--close {
            cursor: pointer;
            position: absolute;
            top: 0;
            right: 0;
            /* transform: translate(-50%, -50%); */
            transform: translateY(-25%) translateX(25%);
            font-size: 20px;
        }
        
        .slxToastType__default{border-left: 5px solid white;}
        .slxToastType__warning{border-left: 5px solid rgb(255, 188, 64);}
        .slxToastType__danger{border-left: 5px solid red;}
        .slxToastType__success{border-left: 5px solid rgb(21, 255, 21);}
        .slxToastType__neutral{border-left: 5px solid black;}
        .slxToastType__info{border-left: 5px solid rgb(40, 40, 255);}
        .slxToastType__prime{border-left: 5px solid rgb(179, 0, 255);}`;
        document.head.appendChild(style_tag);
//     }
// }
function slxToast(options){
    if (!options.message) {  
        throw new Error('slxToast - You need to set a message to display');  
        return;  
    }


    this.options = options;  
    this.options.type = "slxToastType__"+options.type || 'slxToastType__default';
    this.options.timeout = options.timeout || 5000; // Toast Timeout: 5s default
    this.options.position = options.position || "bottom-right"
    // allowed positions: top-left, top-center, top-right, bottom-left, bottom-center, bottom-right

    this.slxToastParent = document.querySelector('.slxToast-container');

    this._init();
}

slxToast.prototype._createElements = function () {  
    var toast = document.createElement('div');
    toast.classList.add('slxToast');
    
    toast.style.zIndex = this.slxToastParent.childNodes.length + 1; // Stack new toast over the old ones  
  
    this.slxToastParent.insertBefore(toast, this.slxToastParent.firstChild); // Insert new toast at the beginning  
    this.toast = toast;

    slxToast.zIndexArray = slxToast.zIndexArray || [];

    // Limit the number of toasts to 3  
    while (this.slxToastParent.childNodes.length > 3) {  
        this.slxToastParent.removeChild(this.slxToastParent.lastChild);
    }  
};

slxToast.prototype._init = function () {  
    if (!this.slxToastParent){
        this.slxToastContainer = document.createElement('div');
        this.slxToastContainer.classList.add("slxToastParent", `slxToastPosition__${this.options.position}`);
        document.body.append(this.slxToastContainer);
        this.slxToastParent = document.createElement('div');  
        this.slxToastParent.classList.add('slxToast-container');
        this.slxToastContainer.appendChild(this.slxToastParent);
    }

    var parent__ = document.getElementsByClassName("slxToastParent")[0]
    var classes___ = parent__.classList;
    for(var cl_ in classes___){
        var temp = classes___[cl_];
        if(String(temp).includes("slxToastPosition")){
            parent__.classList.remove(temp);
        }
    }

    parent__.classList.add(`slxToastPosition__${this.options.position}`);

    this._createElements();  
    this._open();  
    this._addEventListeners();
};




slxToast.prototype._addEventListeners = function () {  
    var tempx = this.toast.querySelector(".slxToast-btn--close");
    if(tempx != undefined && tempx != null){
    this.toast.querySelector('.slxToast-btn--close').addEventListener('click', () => {  
        this._close();
    });}

    if(this.options.position.includes("bottom")){
        this.toast.style.bottom = "-150px";}
    else{
        this.toast.style.top = "-150px";
    }
    // Adjust the position of the toasts  
    setTimeout(()=>{
        Array.from(this.slxToastParent.childNodes).forEach((toast, index) => {
            if(this.options.position.includes("bottom")){
                toast.style.bottom = `${(index * 10)}px`;} // Move up each toast by 3px
            else{
                toast.style.top = `${(index * 10)}px`;
            }
            toast.style.scale = String(1 - (0.1*index));
        });
    }, 10);
  
    // this.toastEl.addEventListener('mouseover', () => {  
    //     clearTimeout(this.timeoutId);  // Clear timeout on hover  
    // });
  
    if (this.options.customButtons) {  
        var customButtonsElArray = Array.prototype.slice.call(this.toast.querySelectorAll('.slxToast-btn--custom'));  
        customButtonsElArray.map(function (el, index) {  
            el.addEventListener('click', function (event) {  
                return _this2.options.customButtons[index].onClick(event);  
            });
        });
    }  
};  
  
slxToast.prototype._close = function () {  
    // this.toast.classList.remove('pop-up');  
    // this.toast.classList.add('pop-out');  
    if(this.options.position.includes("bottom")){
        this.toast.style.bottom = "-150px";}
    else{
        this.toast.style.top = "-150px";
    }
    setTimeout(() => {
        var zIndexToRemove = parseInt(this.toast.style.zIndex, 10);
        var index = slxToast.zIndexArray.indexOf(zIndexToRemove);
        if (index > -1) {
            slxToast.zIndexArray.splice(index, 1);
        }
        this.toast.remove();  // Remove toast element  
    }, 500); // Wait for fade-out animation to finish  
};  
  
slxToast.prototype._open = function () {
    var maxZIndex = slxToast.zIndexArray.length === 0 ? 10000 : Math.max.apply(null, slxToast.zIndexArray);
    var newZIndex = maxZIndex + 1;
    
    this.toast.style.zIndex = newZIndex.toString();
    slxToast.zIndexArray.push(newZIndex);

    this.toast.classList.add(this.options.type);  
    var customButtons = '';  
    var closeButton = ''; 
    var heading = ''; 
    if (this.options.customButtons) {  
        customButtons = this.options.customButtons.map(function (customButton, index) {  
            return '<button type="button" class="slxToast-btn slxToast-btn--custom">' + customButton.text + '</button>';  
        });  
        customButtons = customButtons.join('');  
    }  
    if (this.options.closeButton) {  
        closeButton = '<div class="slxToast-btn slxToast-btn--close"><i class="ph-fill ph-x-circle"></i></div>\n';  
    }if(this.options.heading){
        heading = `<h6 style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">${this.options.heading}</h6>`
    }
    this.toast.innerHTML = '\n'+heading+'        <p>' + this.options.message + '</p>\n' + closeButton + '\n' + customButtons + '\n    ';  
  
    this.timeoutId = setTimeout(this._close.bind(this), this.options.timeout);  // Start timeout  
}; 
