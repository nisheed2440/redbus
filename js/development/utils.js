(function() {
    var RBUTILS = function() {
        var _this = this;
        var _commentsObj = {};
        this.localStorageFlag = false;

        /**
         * Check if localstorage exists and set the appropriate flag
         * @return {boolean} true if localstorage functionality exists.
         */
        var _checkLocalStorage = function() {
            var mod = 'redbus';
            try {
                localStorage.setItem(mod, mod);
                localStorage.removeItem(mod);
                return true;
            } catch (e) {
                return false;
            }
        };

        /**
         * Trim the whitespaces from the title text
         * @param  {String} inputString
         * @return {String}
         */
        this.trimWhiteSpaces = function(inputString) {
            return inputString.replace(/^\s+|\s+$/gm, '');
        };

        /**
         * Get comments from the localstorage
         * @return {Object} comments object
         * Sets _commentsObj private variable
         */
        this.getComments = function() {
            _commentsObj = JSON.parse(localStorage.getItem('theBigAppleComments')) || {};
            return _commentsObj;
        };
        /**
         * Return comment by id
         * @param  {Number} commentId The commentId
         * @return {Object}           The comment object
         */
        this.getCommentById = function(commentId) {
            return _commentsObj[commentId];
        };
        /**
         * Return Comments by comment title
         * @param  {String} commentTitle
         * @return {Object} Array of comments matching the title
         * NOTE: Used to check uniquness of comment title
         */
        this.getCommentByTitle = function(commentTitle) {
            var commentsList = [];
            for (var i in _commentsObj) {
                if (_commentsObj[i].title.toLowerCase() === commentTitle.toLowerCase()) {
                    commentsList.push(_commentsObj[i]);
                }
            }
            return commentsList;
        };

        this.searchCommentsByTitle = function(commentTitle) {

        };
        /**
         * Add new comment to localstorage
         * @return {Object} comments object
         */
        this.addComment = function(commentTitle, commentBody) {
            var commentId = new Date().getTime();
            var commentObj = {
                id: commentId,
                title: commentTitle,
                body: commentBody
            };

            _commentsObj[commentId] = commentObj;
            localStorage.setItem('theBigAppleComments', JSON.stringify(_commentsObj));
            _this.generateComment(commentObj);
            return this.getComments();
        };
        /**
         * Update a comment in localstorage
         * @param  {Number} commentId    comment id
         * @param  {String} commentTitle comment title
         * @param  {String} commentBody  comment description
         * @return {Object} comments object
         */
        this.updateComment = function(commentId, commentTitle, commentBody) {
            var commentObj = {
                id: commentId,
                title: commentTitle,
                body: commentBody
            };
            var commentBlock = document.getElementById(commentId);
            _commentsObj[commentId] = commentObj;
            localStorage.setItem('theBigAppleComments', JSON.stringify(_commentsObj));
            commentBlock.querySelector('.comment-title').innerText = commentTitle;
            commentBlock.querySelector('.comment-desc').innerText = commentBody;

            return this.getComments();
        };
        /**
         * Delete comment from localstorage
         * @param  {Number} id of the comment to delete
         * @return {Object} comments object
         */
        this.deleteComment = function(commentId) {
            var commentBlock = document.getElementById(commentId);
            delete _commentsObj[commentId];
            localStorage.setItem('theBigAppleComments', JSON.stringify(_commentsObj));
            commentBlock.parentNode.removeChild(commentBlock);
            return this.getComments();
        };
        /**
         * Generate a comment block based on a template
         * @param  {Object} commentObj The comment object
         * @return {null}
         */
        this.generateComment = function(commentObj) {
            var commentsList = document.getElementById('rb-comments');
            var commentsTemplate = document.getElementById('comment-template').children[0].cloneNode(true);
            commentsTemplate.id = commentObj.id;
            commentsTemplate.querySelector('.comment-title').innerText = commentObj.title;
            commentsTemplate.querySelector('.comment-desc').innerText = commentObj.body;

            commentsTemplate.querySelector('.comment-delete').addEventListener('click', function(e) {
                e.preventDefault();
                _this.createDeleteCommentModal(commentObj.id);
            });

            commentsList.appendChild(commentsTemplate);
            return;
        };
        /**
         * Generate comment blocks based on the comments stored
         * @return {null}
         */
        this.prepopulateComments = function() {
            for (var i in _commentsObj) {
                if (typeof _commentsObj[i] === 'object') {
                    _this.generateComment(_commentsObj[i]);
                }
            }
            return;
        };

        this.createDeleteCommentModal = function(commentId) {
            var bodyNode = document.getElementsByTagName('body')[0];
            var modalTemplate = document.getElementById('comment-delete-template').children[0].cloneNode(true);
            var modalBackdrop = document.getElementById('comment-delete-template').children[1].cloneNode(true);
            var removeModal = function() {
                bodyNode.removeChild(modalTemplate);
                bodyNode.removeChild(modalBackdrop);
            };

            modalBackdrop.addEventListener('click', function(e) {
                removeModal();
            });

            modalTemplate.querySelector('.comment-delete-no').addEventListener('click', function(e) {
                e.preventDefault();
                removeModal();
            });

            modalTemplate.querySelector('.comment-delete-yes').addEventListener('click', function(e) {
                e.preventDefault();
                _this.deleteComment(commentId);
                removeModal();
            });

            bodyNode.appendChild(modalBackdrop);
            bodyNode.appendChild(modalTemplate);


            return;
        };

        this.createErrorMessage = function(title, message) {
            var formError = document.createElement('div');
            formError.className = 'rb-form-error';
            formError.innerHTML = '<strong>' + title + '</strong>' + message;
            return formError;
        };

        var _init = function() {
            _this.localStorage = _checkLocalStorage();
            _this.getComments();
            _this.prepopulateComments();

            return _this;
        };

        return _init();
    };

    RB.Utils = new RBUTILS();
})();