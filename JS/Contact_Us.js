function validate() {
    name = document.getElementById('name').value;
    phone = document.getElementById('phone').value;
    email = document.getElementById('email').value;
    state = document.getElementById('state').value;
    city = document.getElementById('city').value;

    if ((name == '') || (phone == '') || (email == '') || (state == '') || (city == '')) {
        emptyform = document.getElementById('empty-form');
        emptyform.style.visibility = 'visible';
    }
    else {
        var p1 = /\w/;
        var p2 = /^\d{10}$/;
        var p3 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (!(p1.test(name) == true)) {
            var check1 = document.getElementById('check1');
            check1.style.visibility = 'visible';
        }
        if (!(p2.test(phone) == true)) {
            var check2 = document.getElementById('check2');
            check2.style.visibility = 'visible';
        }
        if (!(p3.test(email) == true)) {
            var check3 = document.getElementById('check3');
            check3.style.visibility = 'visible';
        }
    }
}