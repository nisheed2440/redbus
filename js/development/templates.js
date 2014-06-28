(function() {
    RB.Templates = {};

    RB.Templates.comment =
        '<div class="rb-comment">' +
        '<div class="rb-comment-user">' +
        '<img alt="user" src="img/user.png">' +
        '</div>' +
        '<div class="rb-comment-content">' +
        '<h3 class="comment-title"></h3>' +
        '<p class="comment-desc"></p>' +
        '</div>' +
        '<div class="rb-comment-actions">' +
        '<a href="#" class="comment-edit"></a>' +
        '<a href="#" class="comment-delete"></a>' +
        '</div>' +
        '</div>';

    RB.Templates.deleteComment =
        '<div class="rb-modal-shell">' +
        '<div class="rb-modal">' +
        '<div class="rb-modal-title"></div>' +
        '<div class="rb-modal-content"></div>' +
        '<div class="rb-modal-footer">' +
        '<a href="#" class="comment-delete-no  btn btn-default"></a>' +
        '<a href="#" class="comment-delete-yes btn btn-primary"></a>' +
        '</div>' +
        '</div>' +
        '</div>';

    RB.Templates.editComment =
        '<div class="rb-modal-shell">' +
        '<div class="rb-modal">' +
        '<div class="rb-modal-title"></div>' +
        '<div class="rb-modal-content">' +
        '<form class="rb-form">' +
        '<fieldset>' +
        '<div id="rb-edit-error-holder" class="rb-form-group"></div>' +
        '<div class="rb-form-group">' +
        '<label for="edit-comment-title"></label>' +
        '<input id="edit-comment-title" class="rb-edit-comment-title" name="title" type="text">' +
        '</div>' +
        '<div class="rb-form-group">' +
        '<label for="edit-comment-body"></label>' +
        '<textarea id="edit-comment-body" class="rb-edit-comment-body" name="comment"></textarea>' +
        '</div>' +
        '</fieldset>' +
        '</form>' +
        '</div>' +
        '<div class="rb-modal-footer">' +
        '<a href="#" class="comment-edit-cancel  btn btn-default"></a>' +
        '<a href="#" class="comment-edit-update btn btn-primary"></a>' +
        '</div>' +
        '</div>' +
        '</div>';
})();