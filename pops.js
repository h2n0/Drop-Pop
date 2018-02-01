var Pop = function(header, content){

  header = header || "Testing";
  content = content || "Some dumby content";

  this.holder = document.createElement("div");
  this.elm = document.createElement("div");
  this.init = true;


  this.holder.style.width = "100%";
  this.holder.style.height = "100%";
  this.holder.style.position = "fixed";
  this.holder.style.left = "0%";
  this.holder.style.top = "0%";
  this.holder.style.backgroundColor = "#CCCCCCCC";


  this.elm.style.position = "relative";
  this.elm.style.textAlign = "center";
  this.elm.style.top = "40%";
  this.elm.style.background = "#FFF";
  this.elm.style.transition = "all 0.5s ease-out";
  this.elm.style.overflow = "hidden";
  this.elm.style.paddingTop = "2%";
  this.elm.style.paddingBottom = "2%";
  this.elm.style.width = "75%";

  this.holder.appendChild(this.elm);
  document.body.insertBefore(this.holder, document.body.children[0]);

  let head = document.createElement("h3");
  head.style.marginTop = "0";
  head.innerHTML = header;
  this.elm.appendChild(head);
  let ctx = document.createElement("div");
  ctx.innerHTML = content;
  ctx.style.overflow = "hidden";
  ctx.style.whiteSpace = "nowrap";
  ctx.style.textAlign = "center";
  this.elm.appendChild(ctx);

  let cross = document.createElement("div");
  cross.style.width = "16px";
  cross.style.height = "16px";
  cross.style.position = "absolute";
  cross.style.top = "2px";
  cross.style.right = "2px"
  cross.style.cursor = "pointer";
  cross.style.opacity = "0.2";
  cross.style.transition = "opacity 1s ease-in-out";
  this.elm.appendChild(cross);

  cross.onmouseover = () =>{
    cross.style.opacity = "1";
  }

  cross.addEventListener("mouseout", (e) =>{
    cross.style.opacity = "0.2";
  });

  cross.addEventListener("mousedown", (e) =>{
    if(e.buttons == 1)this.close();
  });

  let c1 = document.createElement("div");
  c1.style.width = "16px";
  c1.style.height = "2px";
  c1.style.transform = "rotate(45deg)";
  c1.style.position = "relative";
  c1.style.backgroundColor = "#000";
  c1.style.top = "8px";
  cross.appendChild(c1);


  let c2 = document.createElement("div");
  c2.style.width = "16px";
  c2.style.height = "2px";
  c2.style.transform = "rotate(-45deg)";
  c2.style.position = "relative";
  c2.style.backgroundColor = "#000";
  c2.style.top = "6px";
  cross.appendChild(c2);

  this.hide();
  this.close();

  this.canOpen = true;

  this.elm.addEventListener("transitionend", (e) => {
    if(e.propertyName == "width"){
      if(this.elm.style.width == "0%"){ // Closed
        this.toggleHolder();
        this.canOpen = true;
      }else{ // Opened
        this.canOpen = false;
      }
    }
  });
}


Pop.prototype.show = function(){
  if(!this.canOpen)return;
  this.toggleHolder();
  setTimeout(()=>{
    this.elm.style.width = "75%";
    this.elm.style.left = "12.5%";
  }, 50);
}

Pop.prototype.close = function(){
  if(!this.init && this.canOpen)return;
  this.elm.style.width = "0%";
  this.elm.style.left = "12.5%";
  if(!this.init) this.init = true;
}


Pop.prototype.hide = function(){
  this.holder.style.display = "none";
}

Pop.prototype.toggleHolder = function(){
  this.holder.style.display = this.canOpen?"block":"none";
}
