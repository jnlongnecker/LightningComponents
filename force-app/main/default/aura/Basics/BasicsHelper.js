/*
    Here, we have our helper, which is not a controller, it's just a helper.
    A helper is only instantiated once per component type, meaning it is more performant to use the helper when
    you are reusing the same component multiple times in a document. By convention, most if not all business logic
    should be stored in the Helper of a component.
*/

({
    ShuffleGuitarists: function (component) {

        // Remember, if we want to use the component, we MUST pass it in as a parameter
        let size = component.get("v.numChildren");
        let allGuitarists = component.get("v.allGuitarists");
        let numGuitarists = allGuitarists.length;
        let displayGuitarists = [];
        let workingGuitarists = [...allGuitarists];

        // We're doing the same as in Initialize, only we don't have to declare the static list of guitarists
        for (let index = 0; index < size; index++) {

            // If we have more children than we have guitarists, allow some duplicates
            if (numGuitarists === 0) {
                workingGuitarists = [...allGuitarists];
                numGuitarists = allGuitarists.length;
            }

            // Make a selection, add it to the display list, and remove it from the working list
            let selection = Math.floor(Math.random() * numGuitarists);
            displayGuitarists.push(workingGuitarists[selection]);
            workingGuitarists.splice(selection, 1);
            numGuitarists--;
        }

        component.set("v.displayGuitarists", displayGuitarists);
    }
})
