({
    // When we get the event, we do some simple handling
    UpdateNote: function (component, event) {
        let newNote = event.getParam("note");
        component.set("v.currentNote", newNote);
    },

    UpdateTunings: function (component, event) {
        let newTuning = event.getParam("tuning");
        component.set("v.tuning", newTuning);
    }
})
