function createButton( userid ) {
    var btn = document.createElement('button');
    btn.textContent = 'Block';
    btn.className = 'lite-editor__toolbar__btn btn--text';

    btn.onclick = function(event) {
        var request = new XMLHttpRequest();

        request.open("POST", "https://xueqiu.com/blocks/create.json", true);
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        request.send("user_id=" + userid );

        btn.textContent = 'Blocked!';
    };
    return btn;
}

// The xueqiu page is loaded dynamically, need to monitor all the new contents
var obs = new MutationObserver(function (mutations, observer) {
    for (var k=0; k<mutations.length; k++) {
        for (var i = 0; i < mutations[k].addedNodes.length; i++) {

            if (mutations[k].addedNodes[i].nodeType == 1) {
                users = mutations[k].addedNodes[i].getElementsByClassName('user-name')

                for (var j = 0; j< users.length; j++) {
                  //console.error(users[j].getAttribute('data-tooltip'));
                  var btn = createButton( users[j].getAttribute('data-tooltip') );
                  users[j].parentElement.insertBefore(btn, users[j].nextElementSibling);
                  //users[j].text = users[j].text + ' - hello';
                }
            }
        }
    }
});
obs.observe(document.body, { childList: true, subtree: true, attributes: false, characterData: false });
