/*!
 * main.js
 * This file contains the initiailizations for the add form and search form
 *  for the assignment given by redbus.com.
 *
 * @project   THE BIG APPLE
 * @date      2014-06-25
 * @author    NISHEED JAGADISH <nisheed2016@gmail.com>
 * @licensor  REDBUS
 * @site      REDBUS
 *
 */

(function() {

    RB.Form = {};
    RB.Form.errorHolder = document.getElementById('rb-form-error-holder');
    RB.Form.commentTitleInput = document.getElementsByClassName('rb-form-comment-title')[0];
    RB.Form.commentBodyInput = document.getElementsByClassName('rb-form-comment-body')[0];

    //Remove the no-js class if javascript is enabled
    document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace('no-js', '');

    //Binding for add comment form submit
    document.getElementsByClassName('rb-form-comment-submit')[0].addEventListener('click', function(e) {
        e.preventDefault();
        var commentTitle = RB.Form.commentTitleInput.value;
        var commentBody = RB.Form.commentBodyInput.value;

        if (RB.Utils.trimWhiteSpaces(commentTitle) !== '' && RB.Utils.trimWhiteSpaces(commentBody) !== '') {
            if (RB.Utils.getCommentByTitle(commentTitle).length) {
                RB.Utils.showErrorMessage(RB.Form.errorHolder, RB.GlobalStrings.errorHeading, RB.GlobalStrings.errorTitleExists);
                RB.Form.commentTitleInput.value = '';
            } else {
                RB.Utils.showErrorMessage(RB.Form.errorHolder);
                RB.Utils.addComment(commentTitle, commentBody);
                RB.Form.commentTitleInput.value = '';
                RB.Form.commentBodyInput.value = '';
            }
        } else {
            RB.Utils.showErrorMessage(RB.Form.errorHolder, RB.GlobalStrings.errorHeading, RB.GlobalStrings.errorEmptyFields);
        }
    });

    //Bindings for search comment
    document.getElementsByClassName('rb-search')[0].addEventListener('click', function(e) {
        e.preventDefault();
        RB.Utils.createSearchModal();
    });

})();