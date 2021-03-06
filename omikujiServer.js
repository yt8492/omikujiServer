// クライアントからのレスポンスを受け取り、適切なファイルに処理を依頼する

// 必要なファイルを読み込み
var http = require('http');
var url = require('url');
var fs = require('fs');
var server = http.createServer();


// http.createServerがrequestされたら、(イベントハンドラ)
server.on('request', function (req, res) {
    // Responseオブジェクトを作成し、その中に必要な処理を書いていき、条件によって対応させる
    var Response = {
        "renderHTML": function () {
            var template = fs.readFile('./index.html', 'utf-8', function (err, data) {
                // HTTPレスポンスヘッダを出力する
                res.writeHead(200, {
                    'content-Type': 'text/html'
                });

                // HTTPレスポンスボディを出力する
                res.write(data);
                res.end("");

            });

        },
        "js": function () {
            var template = fs.readFile('./js/main.js', 'utf-8', function (err, data){
                res.writeHead(200, {
                    'content-Type': 'text/javascript'
                });
                res.write(data);
                res.end("");
            });
        },
        "css": function () {
            var template = fs.readFile('./css/styles.css', 'utf-8', function(err, data){
                res.writeHead(200, {
                    'content-Type': 'text/css'
                });
                res.write(data);
                res.end("");
            })
        }
};
    // urlのpathをuriに代入
    var uri = url.parse(req.url).pathname;


    // URIで行う処理を分岐させる
    if (uri === "/") {
        // URLが「http://localhost:8080/」の場合、"renderHTML"の処理を行う
        Response["renderHTML"](); 

        return;
    }else if(uri === "/js/main.js"){
        Response["js"]();
        return;
    }else if(uri === "/css/styles.css"){
        Response["css"]();
        return;
    };
});

// 指定されたポート(8080)でコネクションの受け入れを開始する
server.listen(8080)
console.log('Server running at http://localhost:8080/');