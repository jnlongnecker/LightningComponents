({
    DoInit: function (component) {
        let getContact = component.get("c.GetContact");
        // getContact.setParams({ name: 'Bad Name' });

        getContact.setParams({ name: 'Arthur' });
        getContact.setCallback(this, function (response) {
            if (response.getState() == 'SUCCESS') {
                component.set("v.myContact", response.getReturnValue());
            }
            else if (response.getState() == 'ERROR') {
                console.error(response.getError()[0].message);
            }
        });
        $A.enqueueAction(getContact);
    }
})
