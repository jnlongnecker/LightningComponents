({
    FretSelected: function (component, event, helper) {
        helper.BroadcastSelection(component);
    },
    OtherFretSelected: function (component, event, helper) {
        helper.ProcessFretEvent(component, event);
    }
})
