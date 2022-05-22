const question_contents = document.getElementById("questioncontents");
const question_generators = {
    "vietsyll": vietsyll,
};

function vietsyll() {
    let p = document.createElement("p");

    let rimes = ["a!", "e!", "ê!", "i!", "o!", "ô!", "ơ!", "u!", "ư!", "y!", "o!a", "o!e", "uê!", "u!ơ", "u!y", "i!a", "u!a", "ư!a", "uy!a", "o!i", "ô!i", "ơ!i", "u!i", "ư!i", "oa!i", "uô!i", "ươ!i", "a!o", "e!o", "oa!o", "oe!o", "a!u", "â!u", "ê!u", "i!u", "ư!u", "iê!u", "uy!u", "ươ!u", "yê!u", "a!y", "â!y", "oa!y", "uâ!y", "a!m", "ă!m", "â!m", "e!m", "ê!m", "i!m", "o!m", "ô!m", "u!m", "ư!m", "iê!m", "oa!m", "oă!m", "oe!m", "uô!m", "ươ!m", "yê!m", "a!n", "ă!n", "â!n", "e!n", "ê!n", "i!n", "o!n", "ô!n", "ơ!n", "u!n", "ư!n", "iê!n", "oa!n", "oă!n", "oe!n", "uâ!n", "uô!n", "uy!n", "ươ!n", "uyê!n", "yê!n", "an!g", "ăn!g", "ân!g", "en!g", "on!g", "ôn!g", "un!g", "ưn!g", "iê!ng", "oa!ng", "oă!ng", "oo!ng", "uâ!ng", "uô!ng", "ươ!ng", "yê!ng", "a!nh", "ê!nh", "i!nh", "o!anh", "uê!nh", "uy!nh", "a!ch", "ê!ch", "i!ch", "oa!ch", "uê!ch", "uy!ch", "a!c", "ă!c", "â!c", "e!c", "o!c", "ô!c", "u!c", "ư!c", "iê!c", "oa!c", "oă!c", "oo!c", "uô!c", "ươ!c", "a!t", "ă!t", "â!t", "e!t", "ê!t", "i!t", "o!t", "ô!t", "ơ!t", "u!t", "ư!t", "iê!t", "oa!t", "oă!t", "oe!t", "uâ!t", "uô!t", "uy!t", "ươ!t", "uyê!t", "yê!t", "a!p", "ă!p", "â!p", "e!p", "ê!p", "i!p", "o!p", "ô!p", "ơ!p", "u!p", "iê!p", "oa!p", "uô!p", "uy!p", "ươ!p"];
    let start_consonants = ["b", "d", "đ", "h", "l","m", "n", "p", "r", "s", "t", "v", "x", "tr", "th", "ch", "ph", "nh", "kh", "gi", "qu", "g", "ng", "c"];
    let nang = "\u0323";
    let sac = "\u0301";
    let tones = ["", sac, "\u0300", "\u0309", "\u0303", nang];

    let rime = rimes[Math.floor(Math.random() * rimes.length)];

    let start_consonant;
    if (rime[0] == "y") {
        start_consonant = "";
    } else {
        start_consonant = start_consonants[Math.floor(Math.random() * start_consonants.length)];

        if (start_consonant == "g" && (rime[0] == "i" || rime[0] == "e" || rime[0] == "ê")) {
            start_consonant = "gh";
        }

        if (start_consonant == "ng" && (rime[0] == "i" || rime[0] == "e" || rime[0] == "ê")) {
            start_consonant = "ngh";
        }

        if (start_consonant == "c" && (rime[0] == "i" || rime[0] == "e" || rime[0] == "ê")) {
            start_consonant = "k";
        }

        if (start_consonant == "gi" && rime[0] == "i") {
            start_consonant = "g";
        }

        if (start_consonant == "qu" && rime[0] == "u") {
            start_consonant = "q";
        }
    }

    let tone;
    if (rime.endsWith("p") || rime.endsWith("t") || rime.endsWith("c") || rime.endsWith("ch")) {
        tone = Math.random() > 0.5 ? nang : sac;
    } else {
        tone = tones[Math.floor(Math.random() * tones.length)];
    }

    p.innerHTML = start_consonant + rime.replace("!", tone);
    return p;
}

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
    let question = question_generators[document.getElementById("questionset").value]();
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
