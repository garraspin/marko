var speak = function (text) {
    var msg = new SpeechSynthesisUtterance();
    msg.voiceURI = "native";
    msg.text = text;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
};

var marko = function(msg, quiet = false) {
    spokenResponse.style.display="block";
    spokenResponse.firstChild.firstChild.textContent = msg;
    if (!quiet) speak(msg);
};

var final_transcript = '';
var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = false;
recognition.interimResults = false;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;

recognition.onstart = function() {
    recognizing = true;
    rec.classList.remove("off");
    console.log("recognizing...");
};

recognition.onend = function() {
    recognizing = false;
    rec.classList.add("off");
    console.log("not recognizing...");
};

recognition.onnomatch = function(event) {
    marko("No match found.");
};

recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
        rec.classList.toggle("off");
        marko('info no speech');
    }
    if (event.error == 'audio-capture') {
        rec.classList.toggle("off");
        marko('info no microphone');
    }
};

recognition.onresult = function(event) {
    var intern_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            intern_transcript += event.results[i][0].transcript;
        }
    }

    if (intern_transcript != final_transcript) {
        final_transcript = intern_transcript;
        console.log("final:" + final_transcript);

        $.ajax({
            url: 'http://localhost:3000/api/search/',
            type: 'GET',
            data: 'q=' + encodeURI(final_transcript),
        }).done(function(data, status, resp) {
            console.log(data);

            if (status == "success" && !data.ignore) {
                speech.value = final_transcript;
                results.style.display="none";
                resultsTable.firstChild.textContent = "";

                marko(data.response);

                if (data.searchResults) {
                    results.style.display="block";
                    resultsTable.firstChild.textContent =
                        data.searchResults.map(s => JSON.stringify(s) + '\n');
                }
            }
        }).fail(function(data, status, error) {
            console.log(error);
        });
    }
};

rec.onclick = function(event) {
    if (recognizing) {
        recognition.stop();
        marko("Bye bye!");
    } else {
        marko("Hello, how can I help you?", true);
        recognition.start();
    }
};
