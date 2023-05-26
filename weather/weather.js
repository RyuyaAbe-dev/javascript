//47都道府県の配列
prefectures = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
"茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
"新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
"静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
"奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
"徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
"熊本県","大分県","宮崎県","鹿児島県","沖縄県"
]


function getID(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "data/prefecture.csv", true); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
	
    // レスポンスが返ってきたらconvertCSVtoArray()を呼ぶ
    result = {}	
    req.onload = function(){
	    res = req.responseText.split(/\n/).filter(item => item); // 渡されるのは読み込んだCSVデータ
        prefecture = ""
        res.forEach(function(re){
            if (prefectures.includes(re)){
                result[re] = [] // prefectureをkeyとして空の配列を追加する
                prefecture = re
            }else{
                result[prefecture].push(re)
            }
        });
    console.log(result)
    return result
    }
}
 

getID(); //最初に実行される