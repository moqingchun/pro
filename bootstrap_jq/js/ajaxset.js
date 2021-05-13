$(function () {
    $.ajaxSetup({
        headers: {
            'token': sessionStorage.getItem('token')
        }
    });
})