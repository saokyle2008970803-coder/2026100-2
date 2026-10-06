// ------------------------------
// p5.js 五題選擇題測驗系統
// ------------------------------

// 設定正確答案選項的背景顏色
const CORRECT_OPTION_COLOR = "#caf0f8";

// 建立題目資料
const questions = [
  {
    // 第一題題目
    question: "在 p5.js 中，哪一個函式只會在程式開始時執行一次？",

    // 第一題的四個選項
    options: ["draw()", "setup()", "loop()", "start()"],

    // 正確答案的索引值，從 0 開始計算
    answer: 1
  },

  {
    // 第二題題目
    question: "在 p5.js 中，哪一個函式會持續重複執行？",

    // 第二題的四個選項
    options: ["setup()", "draw()", "createCanvas()", "background()"],

    // 正確答案是第二個選項
    answer: 1
  },

  {
    // 第三題題目
    question: "下列哪一個指令可以建立畫布？",

    // 第三題的四個選項
    options: [
      "createCanvas()",
      "makeScreen()",
      "createWindow()",
      "canvasStart()"
    ],

    // 正確答案是第一個選項
    answer: 0
  },

  {
    // 第四題題目
    question: "下列哪一個指令可以設定背景顏色？",

    // 第四題的四個選項
    options: [
      "color()",
      "fill()",
      "background()",
      "setBackground()"
    ],

    // 正確答案是第三個選項
    answer: 2
  },

  {
    // 第五題題目
    question: "在 p5.js 中，哪一個指令可以繪製圓形？",

    // 第五題的四個選項
    options: [
      "circle()",
      "drawCircle()",
      "ellipse()",
      "round()"
    ],

    // 正確答案是第三個選項
    answer: 2
  }
];

// 設定目前題目的編號
let currentQuestion = 0;

// 設定答對的題數
let score = 0;

// 記錄使用者是否已經作答
let hasAnswered = false;

// 記錄使用者選擇的選項
let selectedOption = -1;

// 記錄是否答對
let isCorrect = false;

// 記錄是否已經完成全部題目
let quizFinished = false;

// 設定選項按鈕的位置與大小
let optionX;
let optionY;
let optionWidth;
let optionHeight;

// 設定下一題按鈕的位置與大小
let nextButtonX;
let nextButtonY;
let nextButtonWidth = 180;
let nextButtonHeight = 55;

// 設定重新開始按鈕的位置與大小
let restartButtonX;
let restartButtonY;
let restartButtonWidth = 220;
let restartButtonHeight = 60;

// ------------------------------
// p5.js 初始化函式
// ------------------------------
function setup() {
  // 建立符合視窗大小的畫布
  createCanvas(windowWidth, windowHeight);

  // 設定文字水平置中
  textAlign(CENTER, CENTER);

  // 設定文字使用平滑效果
  textFont("Arial");

  // 計算版面配置
  calculateLayout();
}

// ------------------------------
// p5.js 每一幀都會執行的函式
// ------------------------------
function draw() {
  // 設定整個畫面的背景顏色
  background("#f7fbfc");

  // 如果測驗已經結束，就顯示結果畫面
  if (quizFinished) {
    drawResultScreen();

    // 結束本次 draw 函式
    return;
  }

  // 顯示測驗畫面
  drawQuizScreen();
}

// ------------------------------
// 計算畫面元件位置
// ------------------------------
function calculateLayout() {
  // 設定選項區域的寬度
  optionWidth = min(width * 0.8, 700);

  // 設定每個選項的高度
  optionHeight = 60;

  // 設定選項的左側位置
  optionX = (width - optionWidth) / 2;

  // 設定第一個選項的上方位置
  optionY = height * 0.38;

  // 設定下一題按鈕的水平位置
  nextButtonX = width / 2 - nextButtonWidth / 2;

  // 設定下一題按鈕的垂直位置
  nextButtonY = height * 0.83;

  // 設定重新開始按鈕的水平位置
  restartButtonX = width / 2 - restartButtonWidth / 2;

  // 設定重新開始按鈕的垂直位置
  restartButtonY = height * 0.68;
}

// ------------------------------
// 繪製測驗畫面
// ------------------------------
function drawQuizScreen() {
  // 取得目前題目的資料
  const current = questions[currentQuestion];

  // 設定標題文字顏色
  fill("#144552");

  // 移除文字外框
  noStroke();

  // 設定標題文字大小
  textSize(30);

  // 顯示測驗標題
  text("p5.js 簡易指令測驗", width / 2, 45);

  // 設定題數文字大小
  textSize(18);

  // 顯示目前題數與總題數
  text(
    `第 ${currentQuestion + 1} 題 / 共 ${questions.length} 題`,
    width / 2,
    90
  );

  // 設定題目文字大小
  textSize(22);

  // 設定題目文字顏色
  fill("#1d3557");

  // 顯示目前題目
  text(current.question, width / 2, height * 0.22, width * 0.85, 80);

  // 逐一繪製四個選項
  for (let i = 0; i < current.options.length; i++) {
    // 設定選項的垂直位置
    let y = optionY + i * 75;

    // 設定選項上下跳動的距離
    let jumpOffset = 0;

    // 如果使用者答錯，讓正確選項上下跳動
    if (hasAnswered && !isCorrect && i === current.answer) {
      // 使用 sin 函式建立上下往返的動畫效果
      jumpOffset = sin(frameCount * 0.18) * 8;
    }

    // 繪製選項按鈕
    drawOption(
      i,
      current.options[i],
      optionX,
      y + jumpOffset,
      optionWidth,
      optionHeight
    );
  }

  // 如果使用者已經作答，就顯示提示文字
  if (hasAnswered) {
    // 設定提示文字大小
    textSize(20);

    // 如果答對，就顯示答對提示
    if (isCorrect) {
      // 設定答對提示的顏色
      fill("#2a9d8f");

      // 顯示答對文字
      text("答對了！", width / 2, height * 0.77);
    } else {
      // 設定答錯提示的顏色
      fill("#e76f51");

      // 顯示答錯文字
      text("答錯了！請注意會跳動的正確選項。", width / 2, height * 0.77);
    }

    // 顯示下一題按鈕
    drawNextButton();
  }
}

// ------------------------------
// 繪製單一選項
// ------------------------------
function drawOption(index, optionText, x, y, w, h) {
  // 設定選項按鈕的預設背景顏色
  let optionColor = "#ffffff";

  // 如果已經作答，將正確答案設定為指定背景色
  if (hasAnswered && index === questions[currentQuestion].answer) {
    // 設定正確答案的背景顏色
    optionColor = CORRECT_OPTION_COLOR;
  }

  // 如果使用者選擇了錯誤選項，將錯誤選項改成淡紅色
  if (hasAnswered && index === selectedOption && !isCorrect) {
    // 設定錯誤選項的背景顏色
    optionColor = "#ffd6d6";
  }

  // 設定選項按鈕填滿顏色
  fill(optionColor);

  // 設定選項按鈕外框顏色
  stroke("#457b9d");

  // 設定選項按鈕外框粗細
  strokeWeight(2);

  // 繪製圓角選項按鈕
  rect(x, y, w, h, 12);

  // 設定選項文字顏色
  fill("#1d3557");

  // 移除文字外框
  noStroke();

  // 設定選項文字大小
  textSize(19);

  // 顯示選項文字
  text(`${index + 1}. ${optionText}`, x + w / 2, y + h / 2);
}

// ------------------------------
// 繪製下一題按鈕
// ------------------------------
function drawNextButton() {
  // 設定按鈕背景顏色
  fill("#457b9d");

  // 設定按鈕外框顏色
  stroke("#1d3557");

  // 設定按鈕外框粗細
  strokeWeight(2);

  // 繪製下一題按鈕
  rect(
    nextButtonX,
    nextButtonY,
    nextButtonWidth,
    nextButtonHeight,
    12
  );

  // 設定按鈕文字顏色
  fill("#ffffff");

  // 移除文字外框
  noStroke();

  // 設定按鈕文字大小
  textSize(20);

  // 顯示下一題文字
  text("下一題", width / 2, nextButtonY + nextButtonHeight / 2);
}

// ------------------------------
// 繪製結果畫面
// ------------------------------
function drawResultScreen() {
  // 設定結果標題顏色
  fill("#144552");

  // 移除文字外框
  noStroke();

  // 設定結果標題文字大小
  textSize(36);

  // 顯示測驗完成文字
  text("測驗完成！", width / 2, height * 0.28);

  // 設定分數文字大小
  textSize(30);

  // 設定分數文字顏色
  fill("#2a9d8f");

  // 顯示答對題數
  text(
    `你答對了 ${score} / ${questions.length} 題`,
    width / 2,
    height * 0.45
  );

  // 設定結果鼓勵文字大小
  textSize(22);

  // 設定結果鼓勵文字顏色
  fill("#1d3557");

  // 根據分數顯示不同鼓勵文字
  if (score === questions.length) {
    // 顯示滿分鼓勵文字
    text("太厲害了，你全部答對！", width / 2, height * 0.55);
  } else if (score >= 3) {
    // 顯示高分鼓勵文字
    text("表現很好，繼續加油！", width / 2, height * 0.55);
  } else {
    // 顯示一般鼓勵文字
    text("再練習幾次，你一定會進步！", width / 2, height * 0.55);
  }

  // 繪製重新開始按鈕
  drawRestartButton();
}

// ------------------------------
// 繪製重新開始按鈕
// ------------------------------
function drawRestartButton() {
  // 設定按鈕背景顏色
  fill("#2a9d8f");

  // 設定按鈕外框顏色
  stroke("#1d3557");

  // 設定按鈕外框粗細
  strokeWeight(2);

  // 繪製重新開始按鈕
  rect(
    restartButtonX,
    restartButtonY,
    restartButtonWidth,
    restartButtonHeight,
    12
  );

  // 設定按鈕文字顏色
  fill("#ffffff");

  // 移除文字外框
  noStroke();

  // 設定按鈕文字大小
  textSize(22);

  // 顯示重新開始文字
  text(
    "重新開始",
    width / 2,
    restartButtonY + restartButtonHeight / 2
  );
}

// ------------------------------
// 滑鼠點擊事件
// ------------------------------
function mousePressed() {
  // 如果測驗已經完成
  if (quizFinished) {
    // 檢查是否點擊重新開始按鈕
    if (
      mouseX >= restartButtonX &&
      mouseX <= restartButtonX + restartButtonWidth &&
      mouseY >= restartButtonY &&
      mouseY <= restartButtonY + restartButtonHeight
    ) {
      // 重新開始測驗
      restartQuiz();
    }

    // 結束滑鼠事件
    return;
  }

  // 如果使用者已經作答，就不能再次選擇
  if (hasAnswered) {
    // 檢查是否點擊下一題按鈕
    if (
      mouseX >= nextButtonX &&
      mouseX <= nextButtonX + nextButtonWidth &&
      mouseY >= nextButtonY &&
      mouseY <= nextButtonY + nextButtonHeight
    ) {
      // 前往下一題
      goToNextQuestion();
    }

    // 結束滑鼠事件
    return;
  }

  // 逐一檢查使用者是否點擊某個選項
  for (let i = 0; i < questions[currentQuestion].options.length; i++) {
    // 計算目前選項的垂直位置
    let y = optionY + i * 75;

    // 檢查滑鼠是否位於選項範圍內
    if (
      mouseX >= optionX &&
      mouseX <= optionX + optionWidth &&
      mouseY >= y &&
      mouseY <= y + optionHeight
    ) {
      // 記錄使用者選擇的選項
      selectedOption = i;

      // 記錄使用者已經作答
      hasAnswered = true;

      // 判斷答案是否正確
      isCorrect = i === questions[currentQuestion].answer;

      // 如果答案正確，就增加答對題數
      if (isCorrect) {
        // 將分數加一分
        score++;
      }

      // 結束迴圈
      break;
    }
  }
}

// ------------------------------
// 前往下一題
// ------------------------------
function goToNextQuestion() {
  // 將目前題目編號加一
  currentQuestion++;

  // 如果已經超過最後一題
  if (currentQuestion >= questions.length) {
    // 設定測驗完成
    quizFinished = true;

    // 結束函式
    return;
  }

  // 清除作答狀態
  hasAnswered = false;

  // 清除選項選擇紀錄
  selectedOption = -1;

  // 清除答題正確狀態
  isCorrect = false;
}

// ------------------------------
// 重新開始測驗
// ------------------------------
function restartQuiz() {
  // 將題目重設為第一題
  currentQuestion = 0;

  // 將答對題數歸零
  score = 0;

  // 清除作答狀態
  hasAnswered = false;

  // 清除選項選擇紀錄
  selectedOption = -1;

  // 清除答題正確狀態
  isCorrect = false;

  // 設定測驗尚未完成
  quizFinished = false;
}

// ------------------------------
// 視窗大小改變時執行
// ------------------------------
function windowResized() {
  // 重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);

  // 重新計算畫面配置
  calculateLayout();
}
