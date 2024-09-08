'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子要素をすべて削除する。
 * @param {HTMLElement} element HTML の要素
 */
function removeAllChildren(element) {
    while (element.firstChild) { // 子要素がある限り削除を繰り返す
        element.removeChild(element.firstChild);    
    }
}

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        // 名前が空欄の時は処理を終了する。
        return;
    }

    // 診断結果表示エリアの作成
    removeAllChildren(resultDivided);
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragragh = document.createElement('p');
    const result = assessment(userName);
    paragragh.innerText = result;
    resultDivided.appendChild(paragragh);
    
    // TODO ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-buotton'
    anchor.setAttribute('data-text', '診断結果の文章');
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);
};

const answers = [
    '{userName}の診断結果⇒あああ',
    '{userName}の診断結果⇒いいい',
    '{userName}の診断結果⇒ううう',
    '{userName}の診断結果⇒えええ',
    '{userName}の診断結果⇒おおお',
    '{userName}の診断結果⇒かかか',
    '{userName}の診断結果⇒ききき',
    '{userName}の診断結果⇒くくく',
    '{userName}の診断結果⇒けけけ',
    '{userName}の診断結果⇒こここ',
    '{userName}の診断結果⇒さささ',
    '{userName}の診断結果⇒ししし',
    '{userName}の診断結果⇒すすす',
    '{userName}の診断結果⇒せせせ',
    '{userName}の診断結果⇒そそそ',
    '{userName}の診断結果⇒たたた',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName) {
    // 全文字のコード番号を取得してそれを足し合わせる
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }

    // 文字のコード番号の合計を回答の数で割って添字の数値を求める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);

    // test consoleに出力
    console.log(sumOfCharCode);
    console.log(index);
    console.log(result);

    return result;
};

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
        // TODO ボタンのonclick()処理を呼び出す
        assessmentButton.onclick();
    }
};


// テストコード
// console.assert(
//     assessment ( '太郎' ) === '太郎のあああ', '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません'
// );
// console.assert(
//     assessment( '太郎' ) === assessment( '太郎' ),
//     '入力が同じ名前なら同じ診断結果を出力する処理が正しくありません'
// );


// console.log(assessment(' 太郎 '));
// console.log(assessment(' 次郎 '));
// console.log(assessment(' 航 '));
// console.log(assessment(' 太郎 '));
