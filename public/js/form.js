$( document ).ready(function() {
    
    $('#userForm').submit(function(ev){
        ev.preventDefault();
        const thisForm = $(this)[0];
        const thisFormAction = thisForm.action;
        const thisFormPost = $(this).serialize();
        $.post(thisFormAction, $(this).serialize())
            .done(function() {
                thisForm.reset();
            });
    });

});
