({
    NewFretClicked: function (component, event, helper) {
        helper.UpdateNote(component, event);
    },

    SettingsUpdated: function (component, event, helper) {
        helper.UpdateTunings(component, event);
    }
})
