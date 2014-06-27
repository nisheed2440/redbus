/*!
 * main.js
 * This file contains the code for the assignment given by redbus.com.
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

    document.getElementsByClassName('rb-form-comment-submit')[0].addEventListener('click', function(e) {
        e.preventDefault();
        var commentTitle = RB.Form.commentTitleInput.value;
        var commentBody = RB.Form.commentBodyInput.value;

        if (RB.Utils.trimWhiteSpaces(commentTitle) !== '' && RB.Utils.trimWhiteSpaces(commentBody) !== '') {
            if (RB.Utils.getCommentByTitle(commentTitle).length) {
                if (RB.Form.errorHolder.childNodes.length) {
                    RB.Form.errorHolder.removeChild(RB.Form.errorHolder.childNodes[0]);
                }
                RB.Form.errorHolder.appendChild(RB.Utils.createErrorMessage('Oops!!', 'Seems like the comment title already exists. Please enter a different title.'));
                RB.Form.commentTitleInput.value = '';
            } else {
                if (RB.Form.errorHolder.childNodes.length) {
                    RB.Form.errorHolder.removeChild(RB.Form.errorHolder.childNodes[0]);
                }
                RB.Utils.addComment(commentTitle, commentBody);
                RB.Form.commentTitleInput.value = '';
                RB.Form.commentBodyInput.value = '';
            }
        } else {
            if (RB.Form.errorHolder.childNodes.length) {
                RB.Form.errorHolder.removeChild(RB.Form.errorHolder.childNodes[0]);
            }
            RB.Form.errorHolder.appendChild(RB.Utils.createErrorMessage('Oops!!', 'Seems like you haven\'t entered the tile or the description.'));
        }
    });

})();