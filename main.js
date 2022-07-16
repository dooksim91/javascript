// 랜덤번호 = 유저번호 -> "맞췄습니다!"
// 랜덤번호 < 유저번호 -> "Down"
// 랜덤번호 > 유저번호 -> "Up"
// [Reset] 버튼 클릭 시 게임 리셋
// 총 5번의 기회, 버튼 disable
// 유저가 1~100 범위 밖 숫자 입력 -> "숫자 범위를 벗어났습니다" + 기회 소멸 X
// 유저가 이미 입력한 숫자 입력 -> "이미 입력했습니다" + 기회 소멸 X

// 랜덤번호 지정
let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play); //play함수를 변수처럼 넘김; ()라고 하지 않기
resetButton.addEventListener("click", reset); //play함수를 변수처럼 넘김; ()라고 하지 않기
userInput.addEventListener("focus", function(){ // 함수를 다시 안불러와도 되서 바로 정의
    userInput.value="";
});

function pickRandomNum(){
    computerNum = Math.floor(Math.random()*100) + 1; //0<=Math.random<1
    console.log("정답", computerNum);
}

function play(){
    let userValue = userInput.value;

    if(userValue<1 || userValue>100){
        resultArea.textContent = "1과 100 사이 숫자를 입력하세요";
        return; // 여기서 함수가 종료되고 chances 깎아먹는 등 이후 쿼리 진행 X
    }

    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력하세요.";
        return;
    }
    chances -- ;
    chanceArea.textContent = `남은 기회: ${chances}번` //`: 문자+변수 같이 사용 가능
    console.log("chance",chances);

    if(userValue < computerNum){
        resultArea.textContent = "Up";
    }else if(userValue > computerNum){
        resultArea.textContent = "Down";
    }else{
        resultArea.textContent = "맞췄습니다!";
        gameOver = true;
    }

    history.push(userValue);
    console.log(history)

    if(chances < 1){
        gameOver = true;
    }

    if(gameOver == true){
        playButton.disabled = true;
    }
}

function reset(){
    // user input창 숫자 없애기
    userInput.value = "";
    // 새로운 정답 생성
    pickRandomNum();

    resultArea.textContent = "결과가 여기에 나온다";
}

pickRandomNum();

// 유저가 번호 입력 + [go] 버튼 클릭