(function() {
    var RBUTILS = function() {
        var _this = this;
        var _commentsObj = {};
        this.localStorageFlag = false;

        this.hasClass = function(ele, cls) {
            return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
        };

        this.addClass = function(ele, cls) {
            if (!_this.hasClass(ele, cls)) {
                ele.className += ' ' + cls;
            }
        };

        this.removeClass = function(ele, cls) {
            if (_this.hasClass(ele, cls)) {
                var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                ele.className = ele.className.replace(reg, ' ');
            }
        };

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
            var commentsList = [];
            for (var i in _commentsObj) {
                if (_commentsObj[i].title.toLowerCase().match(commentTitle.toLowerCase(), 'gi')) {
                    commentsList.push(_commentsObj[i]);
                }
            }
            return commentsList;
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
            commentBlock.querySelector('.comment-title').innerHTML = commentTitle;
            commentBlock.querySelector('.comment-desc').innerHTML = commentBody;

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

            var commentsTemplate = document.createElement('div');
            commentsTemplate.className = 'rb-comment-wrap';
            commentsTemplate.id = commentObj.id;

            commentsTemplate.innerHTML = RB.Templates.comment;
            commentsTemplate.querySelector('.comment-title').innerHTML = commentObj.title;
            commentsTemplate.querySelector('.comment-desc').innerHTML = commentObj.body;
            commentsTemplate.querySelector('.comment-edit').innerHTML = RB.GlobalStrings.commentEdit;
            commentsTemplate.querySelector('.comment-delete').innerHTML = RB.GlobalStrings.commentDelete;

            commentsTemplate.querySelector('.comment-edit').addEventListener('click', function(e) {
                e.preventDefault();
                _this.createEditCommentModal(commentObj.id);
            });
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
        /**
         * Create modal window to show delete confirmation
         * @param  {Number} commentId
         * @return {null}
         */
        this.createDeleteCommentModal = function(commentId) {
            var bodyNode = document.getElementsByTagName('body')[0];
            var modalTemplate = document.createElement('div');
            modalTemplate.className = 'rb-modal-wrapper';
            modalTemplate.innerHTML = RB.Templates.deleteComment;
            modalTemplate.querySelector('.rb-modal-title').innerHTML = RB.GlobalStrings.deleteModalTitle;
            modalTemplate.querySelector('.rb-modal-content').innerHTML = RB.GlobalStrings.deleteModalContent;
            modalTemplate.querySelector('.comment-delete-no').innerHTML = RB.GlobalStrings.deleteModalCancel;
            modalTemplate.querySelector('.comment-delete-yes').innerHTML = RB.GlobalStrings.deleteModalConfirm;

            var modalBackdrop = document.createElement('div');
            modalBackdrop.className = 'rb-modal-backdrop';

            var removeModal = function() {
                bodyNode.removeChild(modalTemplate);
                bodyNode.removeChild(modalBackdrop);
                _this.removeClass(bodyNode, 'rb-modal-active');
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
            _this.addClass(bodyNode, 'rb-modal-active');
            return;
        };

        this.createEditCommentModal = function(commentId) {
            var commentObj = _this.getCommentById(commentId);
            var bodyNode = document.getElementsByTagName('body')[0];
            var modalTemplate = document.createElement('div');
            modalTemplate.className = 'rb-modal-wrapper';
            modalTemplate.innerHTML = RB.Templates.editComment;

            modalTemplate.querySelector('.rb-modal-title').innerHTML = RB.GlobalStrings.editModalTitle;
            modalTemplate.querySelector('.comment-edit-cancel').innerHTML = RB.GlobalStrings.editModalCancel;
            modalTemplate.querySelector('.comment-edit-update').innerHTML = RB.GlobalStrings.editModalConfirm;
            modalTemplate.querySelector('label[for="edit-comment-title"]').innerHTML = RB.GlobalStrings.editModalTitleLabel;
            modalTemplate.querySelector('label[for="edit-comment-body"]').innerHTML = RB.GlobalStrings.editModalDescLabel;

            modalTemplate.querySelector('#edit-comment-title').value = commentObj.title;
            modalTemplate.querySelector('#edit-comment-body').value = commentObj.body;

            var modalBackdrop = document.createElement('div');
            modalBackdrop.className = 'rb-modal-backdrop';

            var errorHolder = modalTemplate.querySelector('#rb-edit-error-holder');
            var commentTitleInput = modalTemplate.querySelector('#edit-comment-title');
            var commentBodyInput = modalTemplate.querySelector('#edit-comment-body');

            var removeModal = function() {
                bodyNode.removeChild(modalTemplate);
                bodyNode.removeChild(modalBackdrop);
                _this.removeClass(bodyNode, 'rb-modal-active');
            };

            var updateCommentBindings = function() {
                var commentTitle = commentTitleInput.value;
                commentTitle = _this.trimWhiteSpaces(commentTitle);

                var commentBody = commentBodyInput.value;
                commentBody = _this.trimWhiteSpaces(commentBody);

                if (commentTitle !== '' && commentBody !== '') {
                    if (commentTitle === commentObj.title) {
                        _this.showErrorMessage(errorHolder);
                        _this.updateComment(commentObj.id, commentTitle, commentBody);
                        removeModal();
                        return false;
                    }
                    if (_this.getCommentByTitle(commentTitle).length) {
                        _this.showErrorMessage(errorHolder, RB.GlobalStrings.errorHeading, RB.GlobalStrings.errorTitleExists);
                        return false;
                    } else {
                        _this.showErrorMessage(errorHolder);
                        _this.updateComment(commentObj.id, commentTitle, commentBody);
                        removeModal();
                        return false;
                    }
                } else {
                    _this.showErrorMessage(errorHolder, RB.GlobalStrings.errorHeading, RB.GlobalStrings.errorEmptyFields);
                }
            };

            modalBackdrop.addEventListener('click', function(e) {
                removeModal();
            });


            modalTemplate.querySelector('.comment-edit-cancel').addEventListener('click', function(e) {
                e.preventDefault();
                removeModal();
            });

            modalTemplate.querySelector('#rb-form-edit').addEventListener('submit', function(e) {
                e.preventDefault();
                updateCommentBindings();
            });

            modalTemplate.querySelector('.comment-edit-update').addEventListener('click', function(e) {
                e.preventDefault();
                updateCommentBindings();
            });

            bodyNode.appendChild(modalBackdrop);
            bodyNode.appendChild(modalTemplate);
            _this.addClass(bodyNode, 'rb-modal-active');
        };

        this.createSearchModal = function() {
            var bodyNode = document.getElementsByTagName('body')[0];
            var modalTemplate = document.createElement('div');
            modalTemplate.className = 'rb-modal-wrapper';
            var modalBackdrop = document.createElement('div');
            modalBackdrop.className = 'rb-modal-backdrop';

            var searchFormFields = RB.Templates.searchFormFields;
            var searchFormResults = RB.Templates.searchFormResult;

            modalTemplate.innerHTML = RB.Templates.searchModal;
            modalTemplate.querySelector('fieldset').innerHTML = searchFormFields + searchFormResults;

            modalTemplate.querySelector('.rb-modal-title').innerHTML = RB.GlobalStrings.searchModalTitle;
            modalTemplate.querySelector('.rb-search-comment-submit').value = RB.GlobalStrings.searchModalSearch;
            modalTemplate.querySelector('.comment-search-search-again').innerHTML = RB.GlobalStrings.searchModalSearchAgain;
            modalTemplate.querySelector('.comment-search-close').innerHTML = RB.GlobalStrings.searchModalClose;


            var removeModal = function() {
                bodyNode.removeChild(modalTemplate);
                bodyNode.removeChild(modalBackdrop);
                _this.removeClass(bodyNode, 'rb-modal-active');
            };

            modalTemplate.querySelector('.comment-search-close').addEventListener('click', function(e) {
                e.preventDefault();
                removeModal();
            });

            modalTemplate.querySelector('.comment-search-search-again').addEventListener('click', function(e) {
                e.preventDefault();
                removeModal();
                _this.createSearchModal();
            });

            modalTemplate.querySelector('.rb-search-comment-submit').addEventListener('click', function(e) {
                e.preventDefault();
                _this.addClass(document.getElementById('rb-search-form'), 'hidden');
                _this.removeClass(document.querySelector('.rb-search-results'), 'hidden');
                _this.removeClass(document.querySelector('.comment-search-search-again'), 'hidden');
                var searchResults = _this.searchCommentsByTitle(modalTemplate.querySelector('.rb-search-comment-title').value);
                if (searchResults.length) {
                    _this.createResultList(searchResults, modalTemplate, modalBackdrop);
                } else {
                    _this.addClass(document.querySelector('.rb-search-results-list'), 'hidden');
                    _this.showErrorMessage(document.getElementById('rb-search-info-holder'), RB.GlobalStrings.errorNoResults, '');
                }
            });

            bodyNode.appendChild(modalBackdrop);
            bodyNode.appendChild(modalTemplate);
            _this.addClass(bodyNode, 'rb-modal-active');
        };

        this.createResultList = function(resultList, modalTemplate, modalBackdrop) {

            var searchResultsCount = _this.createInfoMessage(resultList.length + ' ' + RB.GlobalStrings.infoFoundComments, RB.GlobalStrings.infoFoundCommentsSubText);

            var searchResultsList = modalTemplate.querySelector('.rb-search-results-list');
            for (var i = 0; i < resultList.length; i++) {

                var listItem = document.createElement('li');

                var commentWrap = document.createElement('div');
                commentWrap.className = 'result-comment';
                commentWrap.setAttribute('data-id', resultList[i].id);

                commentWrap.addEventListener('click', function() {
                    //Remove search modal and open edit modal
                    var bodyNode = document.getElementsByTagName('body')[0];
                    bodyNode.removeChild(modalTemplate);
                    bodyNode.removeChild(modalBackdrop);
                    _this.removeClass(bodyNode, 'rb-modal-active');
                    _this.createEditCommentModal(this.getAttribute('data-id'));
                });

                var commentTitle = document.createElement('span');
                commentTitle.className = 'result-comment-title';
                commentTitle.innerHTML = resultList[i].title;

                var commentExcerpt = document.createElement('span');
                commentExcerpt.className = 'result-comment-excerpt';
                commentExcerpt.innerHTML = resultList[i].body;

                commentWrap.appendChild(commentTitle);
                commentWrap.appendChild(commentExcerpt);
                listItem.appendChild(commentWrap);
                searchResultsList.appendChild(listItem);
            }

            var searchInfoHolder = document.getElementById('rb-search-info-holder');
            if (searchInfoHolder.childNodes.length) {
                searchInfoHolder.removeChild(searchInfoHolder.childNodes[0]);
            }
            searchInfoHolder.appendChild(searchResultsCount);
        };



        /**
         * Create error message HTML body
         * @param  {String} title
         * @param  {String} message
         * @return {Object}
         */
        this.createErrorMessage = function(title, message) {
            var formError = document.createElement('div');
            formError.className = 'rb-form-error';
            formError.innerHTML = '<strong>' + title + '</strong>' + message;
            return formError;
        };
        /**
         * Create info message HTML body
         * @param  {String} title
         * @param  {String} message
         * @return {Object}
         */
        this.createInfoMessage = function(title, message) {
            var formError = document.createElement('div');
            formError.className = 'rb-form-info';
            formError.innerHTML = '<strong>' + title + '</strong>' + message;
            return formError;
        };
        /**
         * Show error message  on HTML body removing the older one
         * @param  {Object} el
         * @param  {String} title
         * @param  {String} message
         * @return {Object}
         */
        this.showErrorMessage = function(el, title, message) {
            if (el.childNodes.length) {
                el.removeChild(el.childNodes[0]);
            }
            if (typeof title !== 'undefined' && typeof message !== 'undefined') {
                el.appendChild(_this.createErrorMessage(title, message));
            }
            return el;
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