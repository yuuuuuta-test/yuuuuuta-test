let currentIndex = 0;
let filteredWords = []; // 指定範囲内の単語リスト
let unknownWords = []; // わからなかった単語リスト
let isReviewing = false; // 復習モードかどうか

// 要素の参照
const setupScreen = document.getElementById("setup-screen");
const appScreen = document.getElementById("app");
const congratsScreen = document.getElementById("congrats-screen");
const reviewBanner = document.getElementById("review-banner");

// 単語をフィルタリング
function filterWords(start, end) {
    return words.filter(word => word["番号"] >= start && word["番号"] <= end);
}

// 単語を表示
function displayWord(index) {
    const word = filteredWords[index];
    document.getElementById("word-number").textContent = `単語番号: ${word["番号"]}`;
    document.getElementById("word-english").textContent = word["英語"];
    const japaneseElement = document.getElementById("word-japanese");
    japaneseElement.textContent = word["日本語"];
    japaneseElement.style.display = "none";
}

// 次の単語に進む
document.getElementById("next-button").addEventListener("click", () => {
    currentIndex++;
    if (currentIndex >= filteredWords.length) {
        if (unknownWords.length > 0) {
            // まだ「わからない」単語がある場合、復習モードに入る
            filteredWords = [...unknownWords];
            unknownWords = [];
            currentIndex = 0;
            isReviewing = true;
            reviewBanner.style.display = "block"; // 青いバーを表示
            displayWord(currentIndex);
        } else {
            // 「わからない」単語がない場合、完了画面を表示
            congratsScreen.style.display = "block";
            appScreen.style.display = "none";
            reviewBanner.style.display = "none"; // 青いバーを非表示
        }
    } else {
        displayWord(currentIndex);
    }
});

// 初期設定画面の「開始」ボタン
document.getElementById("start-button").addEventListener("click", () => {
    const startNumber = parseInt(document.getElementById("start-number").value);
    const endNumber = parseInt(document.getElementById("end-number").value);

    if (startNumber > endNumber || startNumber < 161 || endNumber > 900) {
        alert("正しい範囲を入力してください！");
        return;
    }

    filteredWords = filterWords(startNumber, endNumber);
    if (filteredWords.length === 0) {
        alert("指定範囲に単語が見つかりません。");
        return;
    }

    setupScreen.style.display = "none";
    appScreen.style.display = "block";
    displayWord(currentIndex);
});

// 日本語を表示
document.getElementById("reveal-button").addEventListener("click", () => {
    document.getElementById("word-japanese").style.display = "block";
});

// わからないボタン
document.getElementById("unknown-button").addEventListener("click", () => {
    if (!unknownWords.includes(filteredWords[currentIndex])) {
        unknownWords.push(filteredWords[currentIndex]);
    }
    document.getElementById("next-button").click();
});

// 再スタートボタン
document.getElementById("restart-button").addEventListener("click", () => {
    location.reload();
});
