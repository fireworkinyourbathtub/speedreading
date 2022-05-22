const question_contents = document.getElementById("questioncontents");

function clear_display() {
    while (question_contents.firstChild) {
        question_contents.removeChild(question_contents.firstChild);
    }
}

function set_display_contents(el) {
    clear_display();
    question_contents.insertBefore(el, null);
}

function create_show_word_button() {
    let button = document.createElement("button");
    button.type = "button";
    button.innerHTML = "Show Word";
    button.onclick = choose_word;

    return button;
}

function choose_word() {
    let questions = document.getElementById(document.getElementById("questionset").value).children;
    let question = questions[Math.floor(Math.random() * questions.length)].cloneNode(true);

    clear_display()
    setTimeout(show_word(question), 200);
}

function show_word(question) {
    return function() {
        set_display_contents(question);

        let questiontime = document.getElementById("questiontime").value;

        setTimeout(ask_answer(question), questiontime);
    };
}

function ask_answer(question) {
    return function() {
        let button = document.createElement("button");
        button.type = "button"
        button.innerHTML = "Show Answer";
        button.onclick = function() {
            set_display_contents(question);
            question_contents.insertBefore(create_show_word_button(), null);
        };

        set_display_contents(button);
    };
}

set_display_contents(create_show_word_button());
