({
    // Sends out our event
    BroadcastSelection: function (component) {
        let string = component.get("v.string");
        let note = this.CalculateNote(component);
        let fretNum = component.get("v.fretNumber");

        component.set("v.chosen", true);

        // To send an application event, we must use $A.get() and specify the event we registered using e.c:EventName
        let broadcast = $A.get("e.c:FretClicked");

        // From there, we simply set the parameters and fire away
        broadcast.setParams({ fretNumber: fretNum, note: note, string: string });
        broadcast.fire();
    },

    // Handles the fret selection event
    ProcessFretEvent: function (component, event) {

        // Once we're back snug in our controller, we just need to do whatever processing necessary when we hear the event
        let params = event.getParams();
        let myString = component.get("v.string");
        let myFret = component.get("v.fretNumber");
        let sameFret = params["string"] == myString && params["fretNumber"] == myFret;

        if (sameFret) return;

        component.set("v.chosen", false);
    },

    // Helper methods below!
    CalculateNote: function (component) {
        let tuning = this.NoteToNumber(component.get("v.tuning"));
        let fretNum = Number(component.get("v.fretNumber"));
        return this.NumberToNote(tuning + fretNum);
    },

    NoteToNumber: function (note) {
        switch (note) {
            case 'Ab': return 1;
            case 'A': return 2;
            case 'Bb': return 3;
            case 'B': return 4;
            case 'C': return 5;
            case 'C#': return 6;
            case 'D': return 7;
            case 'Eb': return 8;
            case 'E': return 9;
            case 'F': return 10;
            case 'F#': return 11;
            case 'G': return 12;
            default: return 9;
        }
    },

    NumberToNote: function (number) {
        if (number > 12) number = (number % 12) + 1;

        switch (number) {
            case 1: return 'Ab';
            case 2: return 'A';
            case 3: return 'Bb';
            case 4: return 'B';
            case 5: return 'C';
            case 6: return 'C#';
            case 7: return 'D';
            case 8: return 'Eb';
            case 9: return 'E';
            case 10: return 'F';
            case 11: return 'F#';
            case 12: return 'G';
            default: return 'E';
        }

    }
})
