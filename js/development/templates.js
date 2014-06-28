/*!
 * templates.js
 * This file contains the html templates for the assignment given by redbus.com.
 *
 * @project   THE BIG APPLE
 * @date      2014-06-25
 * @author    NISHEED JAGADISH <nisheed2016@gmail.com>
 * @licensor  REDBUS
 * @site      REDBUS
 *
 */
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
        '<form id="rb-form-edit" class="rb-form" action="" method="post">' +
        '<fieldset>' +
        '<div id="rb-edit-error-holder" class="rb-form-group"></div>' +
        '<div class="rb-form-group">' +
        '<label for="edit-comment-title"></label>' +
        '<input id="edit-comment-title" class="rb-edit-comment-title rb-form-input" name="title" type="text">' +
        '</div>' +
        '<div class="rb-form-group">' +
        '<label for="edit-comment-body"></label>' +
        '<textarea id="edit-comment-body" class="rb-edit-comment-body rb-form-textarea" name="comment"></textarea>' +
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

    RB.Templates.searchFormFields =
        '<div id="rb-search-form" class="rb-search-form">' +
        '<div class="rb-form-group">' +
        '<input class="rb-search-comment-title rb-form-input" name="title" type="text" placeholder="Please enter the title of the comment to search">' +
        '</div>' +
        '<div class="rb-form-group">' +
        '<input class="rb-search-comment-submit" type="submit" name="searchcomment">' +
        '</div>' +
        '</div>';

    RB.Templates.searchFormResult =
        '<div id="rb-search-results" class="rb-search-results hidden">' +
        '<div id="rb-search-info-holder" class="rb-form-group"></div>' +
        '<div class="rb-form-group">' +
        '<ul class="rb-search-results-list"></ul>' +
        '</div>' +
        '</div>';

    RB.Templates.searchModal =
        '<div class="rb-modal-shell">' +
        '<div class="rb-modal">' +
        '<div class="rb-modal-title"></div>' +
        '<div class="rb-modal-content">' +
        '<form id="rb-search-comment-form" class="rb-form" action="" method="post">' +
        '<fieldset></fieldset>' +
        '</form>' +
        '</div>' +
        '<div class="rb-modal-footer">' +
        '<a href="#" class="comment-search-close  btn btn-default"></a>' +
        '<a href="#" class="comment-search-search-again  btn btn-primary hidden"></a>' +
        '</div>' +
        '</div>' +
        '</div>';

})();