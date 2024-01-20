
(function ($) {


    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    /*==================================================================
    [ Show pass ]*/
    var showPass = 0;
    $('.btn-show-pass').on('click', function(){
        if(showPass == 0) {
            $(this).next('input').attr('type','text');
            $(this).find('i').removeClass('zmdi-eye');
            $(this).find('i').addClass('zmdi-eye-off');
            showPass = 1;
        }
        else {
            $(this).next('input').attr('type','password');
            $(this).find('i').addClass('zmdi-eye');
            $(this).find('i').removeClass('zmdi-eye-off');
            showPass = 0;
        }
        
    });


})(jQuery);



const API_USER = 'http://localhost:3000/user';
let btnLogin = document.getElementById('btnLogin');

btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    let emailUser = document.getElementById('email').value;
    let passUser = document.getElementById('pass').value;

    if (emailUser && passUser) {
        fetch(API_USER)
            .then(function(response) {
                if (response.status == 200) {
                    return response.json();
                } else {
                    throw new Error('Yêu cầu đăng nhập không thành công');
                }
            })
            .then(function(data) {
                let userFound = data.find((element) => {
                    return emailUser === element.customer_email && passUser == element.password;
                });
                if (userFound) {
                    let id = userFound.id;
                    let name = userFound.customer_name;
                    let phone = userFound.customer_phone_number;
                    let address = userFound.customer_address;
                    let role_id = userFound.role_id;
                    sessionStorage.setItem('role_id', role_id);
                    sessionStorage.setItem('name', name);
                    sessionStorage.setItem('email', emailUser);
                    sessionStorage.setItem('pass', passUser);
                    sessionStorage.setItem('phone', phone);
                    sessionStorage.setItem('address', address);
                    sessionStorage.setItem('id', id);
                    window.location.href = '../index.html';
                } else {
                    throw new Error('Email hoặc mật khẩu không chính xác');
                }
            })
            .catch(function(error) {
                console.error('Đăng nhập thất bại:', error.message);
                alert('Đăng nhập thất bại. Vui lòng thử lại sau.');
            });
    } else {
        alert('Vui lòng điền đầy đủ thông tin để đăng nhập.');
    }
});


