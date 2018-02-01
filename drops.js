var Drop = function(parent, width, height, color, unit){
  unit = unit || "px";
  color = color || "#FFF";
  parent = parent || document.body;

  this.targetHeight = height || "auto";
  this.targetWidth = width;
  this.unit = unit;
  this.elm = document.createElement("div");
  this.setWidth(width);
  this.setHeight(0);

  this.elm.style.transition = "all 0.5s ease-in-out";
  this.elm.style.overflowY = "hidden";
  this.elm.style.position = "absolute";


  window.addEventListener("resize", (e) =>{
    this.calibrate(parent);
  });

  this.calibrate(parent);

  parent.style.borderBottom = "1px dashed black";
  parent.style.cursor = "pointer";

  this.box = document.createElement("div");
  this.box.style.background = color;
  this.box.style.display = "block";
  this.box.style.margin = "0 auto";
  this.box.style.border = "1px solid " + this.darken(color, 0.75);
  this.box.style.borderRadius = "10px";
  this.box.style.position = "relative";
  this.box.setAttribute("drops-id", 0);
  this.box.style.width = "95%";
  this.box.style.height = "80%";
  this.box.style.top = "10%";

  this.tip = document.createElement("div");
  this.tip.style.width = "25px";
  this.tip.style.height = "25px";
  this.tip.style.margin = "0 auto";
  this.tip.style.transition = "all 0.25s, ease-in-out";
  this.tip.style.transform = "rotate(45deg)";
  this.tip.style.backgroundColor = this.darken(color, 0.75);
  this.tip.style.border = "2px solid " + this.darken(color, 0.75);
  this.tip.style.zIndex = "-1";
  this.tip.style.top = "-70%";
  this.tip.style.position = "relative";

  this.elm.appendChild(this.box);
  this.elm.appendChild(this.tip);

  this.toggleVisibility();
  this.elm.addEventListener("transitionend", (e) => {
    if(e.propertyName == "height"){
      if(!this.isLowered()){ // Is back up

      }else{ // Has bee lowered

      }
    }
  });
  parent.appendChild(this.elm);
  this.inner = document.createElement("p");
  this.inner.style.padding = "1%";
  this.inner.style.textAlign = "center";
  this.box.appendChild(this.inner);
}

Drop.prototype.drop = function(callback){
if(this.isLowered())return;
  this.setWidth(this.targetWidth);
  this.setHeight(this.targetHeight);
}

Drop.prototype.rise = function(callback){
  if(!this.isLowered())return;
    //this.setWidth(0);
    this.setHeight(0);
}

Drop.prototype.toggleState = function () {
  if(this.isLowered()){
    this.rise();
  }else{
    this.drop();
  }
}

Drop.prototype.isLowered = function(){
  var text = this.elm.style.height;
  var un = this.unit.substring(0,1);
  var num = text.substring(0,text.indexOf(un));
  return parseInt(num) > 0;
}

Drop.prototype.toggleVisibility = function(){
  if(!this.isLowered()){
    this.elm.style.display = "block";
  }else{
    this.elm.style.display = "none";
  }
}

Drop.prototype.setWidth = function(nw){
  this.elm.style.width = nw + this.unit;
}

Drop.prototype.setHeight = function(nh){
  this.elm.style.height = nh + this.unit;
}

Drop.prototype.setContent = function(text){
  this.inner.innerHTML = text;
}

Drop.prototype.getOffset = function (dom){
  let rect = dom.getBoundingClientRect(),
  scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
  scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  //console.log(dom.offsetWidth);
  return { left: rect.x - (this.targetWidth/2) + scrollLeft + dom.offsetWidth/2, top: rect.bottom + scrollTop - 15};
}

Drop.prototype.calibrate = function(p){
  let o = this.getOffset(p);
  console.log(p)
  this.elm.style.top = o.bottom + "px";
  this.elm.style.left = o.left + "px";
}

Drop.prototype.darken = function(color, amt){
  let pound = false;
  let string = color;

  if(color.indexOf("#") == 0){
    string = color.substring(1);
    pound = true;
  }


  let r = 0;
  let g = 0;
  let b = 0;
  if(string.length == 6){
    r = parseInt(string.substring(0,2), 16);
    g = parseInt(string.substring(2,4), 16);
    b = parseInt(string.substring(4,6), 16);
  }else{
    r = parseInt(string.substring(0,1), 16);
    g = parseInt(string.substring(1,2), 16);
    b = parseInt(string.substring(2,3), 16);
  }

  r *= amt;
  g *= amt;
  b *= amt;

  r = Math.floor(Math.max(0, Math.min(r, 255)));
  g = Math.floor(Math.max(0, Math.min(g, 255)));
  b = Math.floor(Math.max(0, Math.min(b, 255)));

  if(!pound){
    if(r < 16)r = "0" + r.toString(16);
    if(g < 16)g = "0" + g.toString(16);
    if(b < 16)b = "0" + b.toString(16);
  }else{
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
  }

  let col = r + g + b;
  let res = pound?"#"+col:col;
  return res;
}
