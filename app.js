
const auto_comp = new autoComplete({
    selector: '#search-home',
    minChars: 0,
    source: function(term, suggest){
        term = term.toLowerCase();
        let choices = ['ActionScript', 'AppleScript', 'Asp'];
        let matches = [];
        for (let i=0; i<choices.length; i++)
            if (~choices[i].toLowerCase().indexOf(term)) matches.push(choices[i]);
        suggest(matches);
    }
});





