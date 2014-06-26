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

    //Remove the no-js class if javascript is enabled
    document.getElementsByTagName('html')[0].className = document.getElementsByTagName('html')[0].className.replace('no-js', '');

    document.querySelector('body').addEventListener('click', function(e) {
        if (e.target.className === 'comment-edit') {
            e.preventDefault();
            console.log('EDIT CLICKED');
        }

        if (e.target.className === 'comment-delete') {
            e.preventDefault();
            console.log('DELETE CLICKED');
        }
    });

})();