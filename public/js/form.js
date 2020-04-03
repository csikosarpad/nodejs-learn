$( document ).ready(function() {
    
    $('#userForm').submit(function(ev){
        ev.preventDefault();
        const thisForm = $(this)[0];
        const thisFormAction = thisForm.action;
        const thisFormPost = $(this).serialize();
        $.post(thisFormAction, $(this).serialize())
            .done(function() {
                thisForm.reset();
                listUpdate();
            });
    });

    listUpdate = function(userlist, limit) {
        $.get( "/list_user", function( data ) {
            $('#userList').empty();
            listItem = '';
            data.forEach(element => {
                if (element.isDeleted) {
                    className = 'user-deleted';
                } else {
                    className = 'user-active';
                }
                listItem += `<li class="${className}"><strong>${element.login}</strong>
                <span class="user-age">${element.age}</span>
                <span class="delete" data-user="${element.id}"></span></li>`;
            });
            $('#userList').append( listItem);
            userDelete();
          });
    }

    userDelete = function() {
        $('.delete')
        .off('click')
        .on('click', function(ev){
            ev.preventDefault();
            $(this).attr('class','deleted');
            userID = $(this).attr('data-user');
            userLine = $(this).parents('li');
            $.get( `/del_user/${userID}`, function() {
                
            })
            .done(function(data) {
                $(userLine).attr('class','user-deleted');
            });
        });
    }

});
