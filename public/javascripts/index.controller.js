var speak = function (text) {
    var msg = new SpeechSynthesisUtterance();
    msg.voiceURI = "native";
    msg.text = text;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
};

var showInfo = function(msg) {
    console.log(msg);
    speak(msg);
};

var final_transcript = '';
var recognizing = false;
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US';
recognition.maxAlternatives = 1;

recognition.onstart = function() {
    recognizing = true;
    rec.classList.toggle("off");
    // Marko says: How can i help you?
};

recognition.onnomatch = function(event) {
    showInfo("No match found.");
};

recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
        rec.classList.toggle("off");
        showInfo('info no speech');
        ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
        rec.classList.toggle("off");
        showInfo('info no microphone');
        ignore_onend = true;
    }
};

recognition.onend = function() {
    recognizing = false;
    rec.classList.toggle("off");
    showInfo("stop recognizing.")
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
        showInfo(final_transcript);

        // display final_transcript
        // translate to search
        // make search
        // display results
    }
};

rec.onclick = function(event) {
    if (recognizing) {
        recognition.stop();
    } else {
        recognition.start();
    }
};
