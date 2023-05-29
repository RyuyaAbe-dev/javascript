//47都道府県の配列
const prefectures = ["北海道","青森県","岩手県","宮城県","秋田県","山形県","福島県",
"茨城県","栃木県","群馬県","埼玉県","千葉県","東京都","神奈川県",
"新潟県","富山県","石川県","福井県","山梨県","長野県","岐阜県",
"静岡県","愛知県","三重県","滋賀県","京都府","大阪府","兵庫県",
"奈良県","和歌山県","鳥取県","島根県","岡山県","広島県","山口県",
"徳島県","香川県","愛媛県","高知県","福岡県","佐賀県","長崎県",
"熊本県","大分県","宮崎県","鹿児島県","沖縄県"
]

function sleep(waitMsec) {
    var startMsec = new Date();
   
    // 指定ミリ秒間だけループさせる（CPUは常にビジー状態）
    while (new Date() - startMsec < waitMsec);
}

async function requestApi(id,result,re) {
    response = await axios.get(`https://weather.tsukumijima.net/api/forecast?city=${id}`)
    result[prefecture][re.substr(7)] = response.data
};


function research(){
    var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
    req.open("get", "data/prefecture.csv", false); // アクセスするファイルを指定
    req.send(null); // HTTPリクエストの発行
    var result = {}	
    res = req.responseText.split(/\n/).filter(item => item); // 渡されるのは読み込んだCSVデータ
    prefecture = ""
    var place_id = {}
    res.forEach( function(re){
        if (prefectures.includes(re)){
            result[re] = [] // prefectureをkeyとして空の配列を追加する
            place_id = {}
            prefecture = re
        }else{
            id = re.substr( 0, 6 );
            place = re.substr(7);
            place_id[place] = id
            result[prefecture] = place_id
        }
    });
    return result
}

research()
window.onload = function() {
        // 実行したい処理
        var categorySelect1 = document.getElementById('category-select-1');
        prefectures.forEach(category => {
            const option = document.createElement('option');
            option.textContent = category;
          
            categorySelect1.appendChild(option);    
        });
        // 大分類が選択されたら小分類のプルダウンを生成
        categorySelect1.addEventListener('input', () => {
            const subCategories = research();
            var categorySelect1 = document.getElementById('category-select-1');
            // 小分類のプルダウンをリセット
            const options = document.querySelectorAll('#sub-category-select-1 > option');
            options.forEach(option => {
                option.remove();
            });
            const subCategorySelect1 = document.getElementById('sub-category-select-1');
            // 小分類のプルダウンに「選択してください」を加える
            const firstSelect = document.createElement('option');
            firstSelect.textContent = '選択してください';
            subCategorySelect1.appendChild(firstSelect);
            // 大分類で選択されたカテゴリーと同じ小分類のみを、プルダウンの選択肢に設定する
            for (let subcategory in subCategories) {
                if (categorySelect1.value == subcategory) {
                    console.log(subcategory)
                    for (let place in subCategories[subcategory]) {
                        console.log(place)
                        const option2 = document.createElement('option');
                        option2.textContent = place;
                        option2.value = subcategory[place];
                        subCategorySelect1.appendChild(option2);
                    };
                }
            }
        }); 
}

























// function getID(){
//     var req = new XMLHttpRequest(); // HTTPでファイルを読み込むためのXMLHttpRrequestオブジェクトを生成
//     req.open("get", "data/test.csv", false); // アクセスするファイルを指定
//     req.send(null); // HTTPリクエストの発行

//     var result = {}	
//     res = req.responseText.split(/\n/).filter(item => item); // 渡されるのは読み込んだCSVデータ
//     prefecture = ""
//     res.forEach( function(re){
//         if (prefectures.includes(re)){
//             result[re] = [] // prefectureをkeyとして空の配列を追加する
//             prefecture = re
//         }else{
//             id = re.substr( 0, 6 );
//             result[prefecture].push(re.substr(7))
//             requestApi(id,result,re)
//         }
//     });
//     return result

// }
 

// results = getID()
// console.log(results)
// results.forEach(function(element){
//     console.log(element);
// });