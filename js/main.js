(function() {
    'use strict';

    var btn = document.getElementById('btn');

    btn.addEventListener('click', function() {
	var n = Math.random();
	var results = ['大吉', '中吉', '凶'];
	if(n < 0.05) {
	    var index = 0;
	}else if(n < 0.2) {
	    var index = 1;
	}else{
	    var index = 2;
	}
	this.textContent = results[index];

    });
    btn.addEventListener('mousedown', function() {
	this.className = 'pushed';
    });
    btn.addEventListener('mouseup', function() {
	this.className = '';
    });
    
})();
