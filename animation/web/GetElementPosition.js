/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
$(function () {
    $("#gettersetter").draggable();
});

$(function () {
    $("#text1").draggable();
});

$(function () {
    $("#text2").draggable();
});

$(function () {
    $("#text3").draggable();
});

$(function () {
    $("#text4").draggable();
});

$(function () {
    $("#text5").draggable();
});

$(function () {
    $("#commandPrompt").draggable();
});

$(function () {
    $("#explanation").draggable();
});

$(function () {
    $("#highlight").draggable();
});

function pad(number, size) {
    if (number < 10) {
        return number + space(size - 1);
    }
    else if (number < 100) {
        return number + space(size - 2);
    }
    else if (number < 1000) {
        return number + space(size - 3);
    }
    else if (number < 10000) {
        return number + space(size - 4);
    }
    else {
        return number;
    }
}

function space(n) {
    result = "";
    for (var i = 0; i < n; i++) {
        result += " ";
    }
    return result;
}

function getElementPos(element) {
    var res = new Object();
    res.x = 0;
    res.y = 0;
    res.w = 0;
    res.h = 0;

    var box = element.getBoundingClientRect();

    res.x = box.left;
    res.y = box.top;
    res.w = box.right - box.left - 5;
    res.h = box.bottom - box.top - 5;

    return res;
}

function HighLight() {
    this.width = 318;
    this.height = 10;
    this.top = 77;
    this.left = 62;
}

function Explanation() {
    this.innerHTML = "";
    this.left = 448;
    this.width = 158;
    this.height = 40;
    this.top = 75;
}

function CommandPrompt() {
    this.innerHTML = "";
    this.left = 448;
    this.width = 158;
    this.height = 40;
    this.top = 65;
    this.isVisible = true;
}

function display(currentLine) {
//    commandPrompt[currentLine].innerHTML = currentPromptContent;
    $("#highlight").animate({top: pos.y, left: pos.x, width: pos.w, height: pos.h}, animationSpeed);
    document.getElementById('explanation').innerHTML = explanation[currentLine].innerHTML;

    if (commandPrompt[currentLine].isVisible) {
        document.getElementById('commandPrompt').style.visibility = 'visible';
//        $("#commandPrompt").animate({top: commandPrompt[currentLine].top, left: commandPrompt[currentLine].left}, animationSpeed);
        document.getElementById('commandPromptContent').innerHTML = commandPrompt[currentLine].innerHTML;
    }
    else {
        document.getElementById('commandPrompt').style.visibility = 'hidden';
    }
}
