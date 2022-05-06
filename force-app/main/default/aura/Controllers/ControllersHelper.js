({
    RetrieveNoSecurityAccount: function (component) {

        // First, we must retrieve the method that we want to call
        let apexMethod = component.get("c.GetAccount");

        // Next, we populate any parameters using this object notation
        apexMethod.setParams({ securityEnforced: false });

        // Finally, we set the callback function.
        apexMethod.setCallback(this, function (response) {
            if (response.getState() == 'SUCCESS') {
                component.set("v.acc", response.getReturnValue());
            }
        });

        // Before we finish, we use the A (for Aura) namespace to enqueue the action and send it to the server
        $A.enqueueAction(apexMethod);
    }
})
