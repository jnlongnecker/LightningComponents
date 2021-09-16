({
    StringsChanged: function (component, event, helper) {
        helper.UpdateStringList(component);
    },

    ChangesSubmitted: function (component, event, helper) {
        helper.BroadcastChanges(component);
    }
})
