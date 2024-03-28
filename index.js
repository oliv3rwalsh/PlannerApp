function buildbody(){
    var extcontentbox = document.querySelector("#content-box");
    // clear
    while (extcontentbox.hasChildNodes()) {
        extcontentbox.removeChild(extcontentbox.lastChild);
    }
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    i = 0;
    while(i < 7){
        // create elements
        var col = document.createElement("div");
        col.className = "content";
        col.id = "generated-col-" + days[i].toLowerCase();
        var head = document.createElement("div");
        head.className = "content-header";
        var type = document.createElement("p");
        type.innerHTML = days[i];
        // build column
        head.appendChild(type);
        col.appendChild(head);
        // send to container
        extcontentbox.appendChild(col);
        // iterate
        i++;
    }
    readin("http://localhost:8000/OneDrive/Documents/PlannerApp/assignments.csv");
}

function addassignment(c, d, dest){
    var assn = document.createElement("div");
    assn.className = "assignment";
    var bdy = document.createElement("p");
    bdy.innerHTML = "<span class =\"class-name\">" + c + "</span> " + d;
    assn.appendChild(bdy);
    document.querySelector(dest).appendChild(assn);

}

function parse(t){
    const assignments = t.split("\n")
    i = 0
    while(i < assignments.length-1){
        const comps = assignments[i].split(",")
        dest = "#generated-col-"+comps[2].toLowerCase();
        addassignment(comps[0].toUpperCase(), comps[1], dest);
        i++
    }
}

function readin(path){
    fetch(path)
  .then((res) => res.text())
  .then((text) => {
    parse(text);
   })
  .catch((e) => console.error(e));
}

window.onload=function(){
    buildbody();
}