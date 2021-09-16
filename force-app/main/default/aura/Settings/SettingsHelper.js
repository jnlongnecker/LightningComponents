({
    UpdateStringList: function (component) {
        let numStrings = Number(component.find("numStrings"));
        let stringArray = component.get("v.strings");
        if (!numStrings || !stringArray) return;

        while (numStrings != stringArray.length) {
            if (numStrings < stringArray.length) {
                stringArray.pop();
            }
            else {
                stringArray.push('E');
            }
        }

        component.set("v.strings", stringArray);
    },

    // Sends the event of changes being confirmed and submitted
    BroadcastChanges: function (component) {

        // Only difference here is we use component.getEvent() instead of $A.get()
        let changeEvent = component.getEvent("reset");
        let newTuning = component.get("v.strings");
        newTuning = this.UpdateTuning(component);
        changeEvent.setParams({ tuning: newTuning });
        changeEvent.fire();
    },

    UpdateTuning: function (component) {
        let tuningChoices = component.find("selection-option");
        let ret = [];
        for (let option of tuningChoices) {
            ret.push(option.get("v.value"));
        }
        return ret;
    }
})
