var UpdateBody = function () { };
var InitiateCharacterCreator = function () {
    var canvas = document.querySelector("#glcanvas");
    if (canvas === null) {
        return;
    }
    var bodyA = document.getElementById("BodyA");
    // Initialize the GL context
    var context = canvas.getContext("2d");
    var BodyA = new Image();
    BodyA.src = "../characterCreator/BodyA.png";
    BodyA.onload = function () {
        context.drawImage(BodyA, 0, 0);
    };
    // bodyA.addEventListener("load", () => {
    //   console.log("HERE");
    //   context.drawImage(bodyA, 50, 50, 50, 50);
    // });
};
InitiateCharacterCreator();
