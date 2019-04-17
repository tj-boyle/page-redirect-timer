let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);

    changeColor.onclick = function(element) {
        console.log("HELLO");
        let color = element.target.value;
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
        });
    };
});


let form = document.getElementById('timer-form');
form.addEventListener("submit", submitFn, false);

function submitFn(e) {
    e.preventDefault();

    let time = $('#timer-timeout-time').val();
    let url = $('#timer-url').val();

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
        tabs[0].id,
        { code: 'setTimeout(function() { window.location.href = "' + url + '";}, 3000' });
    });

    console.log(time, url);
}


