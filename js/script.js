$(document).ready(() => {
    let all_words = [
        [
            "always", "bed", "keyboard",
            "tomorrow", "pain", "sky",
            "apple", "fear", "life", "night"
        ],
        [
            "temperature", "source", "memory",
            "security", "scar", "war",
            "tree", "fight", "to wait", "under"
        ],
        [
            "voice", "bottle", "heaven",
            "hurricane", "to die", "mastepiece",
            "insanity", "curse", "paranoia", "to move"
        ]
    ]
 
    let all_translation = [
        [
            "завжди", "ліжко", "клавіатура",
            "завтра", "біль", "небо",
            "яблуко", "страх", "життя", "ніч"
        ],
        [
            "температура", "джерело", "пам'ять",
            "безпека", "шрам", "війна",
            "дерево", "битва", "чекати", "під"
        ],
        [
            "голос", "пляшка", "небеса",
            "ураган", "помирати", "шедевр",
            "божевілля", "прокляття", "параноя", "рухатися"
        ]
    ]
    let current = [1, 1, 1];
    let difficulty = 0;
    let words = [[],[],[]], translation = [[],[],[]];
    let answers = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    let correct = 0, wrong = 0;
    let index;
    for (let i = 0; i < 3; i++){
        for ( ; all_words[i].length > 0; ){
            index = Math.round(Math.random() * all_words[i].length);
            words[i].push(...all_words[i].splice(index, 1));
            translation[i].push(...all_translation[i].splice(index, 1));
        }
    };

    $("#card").text(words[0][0]);
    $(`input[name="difficulty"][value='${difficulty}']`).prop('checked', true);
    
    $("#card").click(() => {
        if (answers[difficulty][current[difficulty] - 1] != 0) return;
        if($("#answer").val().trim().length < 2)
            alert("Write your answer");
        else if ($("#answer").val().trim().toLowerCase() == translation[difficulty][current[difficulty] - 1]){
            $("#Correct").text(++correct);
            answers[difficulty][current[difficulty] - 1] = 1;
            $("#card").css("background-color", "#48ff48");
        }
        else {
            $("#Wrong").text(++wrong);
            answers[difficulty][current[difficulty] - 1] = -1;
            $("#card").css("background-color", "#ff6969");
        }  
        $("#answer").val("");
    })
 
    $("#previous").click(() => {
        if (current[difficulty] > 1){
            $("#navbarText").text(`${--current[difficulty]}/10`);
            $("#card").text(words[difficulty][current[difficulty] - 1]);
            changeColor();
        }
        else if (difficulty != 0) {
            $(`input[name="difficulty"][value='${difficulty-1}']`).prop('checked', true);
            changeDifficulty(difficulty-1);
        }
    })
 
    $("#next").click(() => {
        if (current[difficulty] < 10){
            $("#navbarText").text(`${++current[difficulty]}/10`);
            $("#card").text(words[difficulty][current[difficulty] - 1]);
            changeColor();
        }
        else if (difficulty != 2){
            $(`input[name="difficulty"][value='${difficulty+1}']`).prop('checked', true);
            changeDifficulty(difficulty+1);
        }

        else if (current[difficulty] == 10 && answers.every((difAns) => difAns.every( (item) => item != 0 )))
            alert(`You have ${correct} correct and ${wrong} wrong answers.`);
    })

    $("#difficulty").change(() => {
        switch ($("input[name='difficulty']:checked").val()){
            case "0": changeDifficulty(0); break;
            case "1": changeDifficulty(1); break;
            case "2": changeDifficulty(2); break;
        }
    });

    function changeColor(){
        if (answers[difficulty][current[difficulty] - 1] == -1) $("#card").css("background-color", "#ff6969");
        else if (answers[difficulty][current[difficulty] - 1] == 1) $("#card").css("background-color", "#48ff48");
        else $("#card").css("background-color", "white");
    }

    function changeDifficulty(dif){
        difficulty = dif;
        $("#navbarText").text(`${current[dif]}/10`);
        $("#card").text(words[dif][current[dif] - 1]);
        changeColor();
    }
}) 