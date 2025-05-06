const authorPageHandlers = async function() {
    let currentUser;
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/me'
        });

        $("#authorprofilepic").attr("src", `/api/v1/file/${res.data.photoKey}`);
        $("#authorprofilename").text(res.data.name);
        currentUser = res.data;

    } catch (err)
    {
        console.log(err);
    }

    $("#upload_track").click(() => {
        $("#upload_hide").show(200);
    });

    $(".upload_overlay").click(function(el) {
        if ($(el.target)["0"] == this) {
            $("#upload_hide").hide(200);
        }
    });

    $("#up_cov").click(function() {
        $("#upload_cover").trigger("click");
    });

    $("#upload_cover").on("change", function() {
        const file = this.files[0];

        const reader = new FileReader();

        reader.onload = function(e) {
            $("#up_cov").css({
                'background-image': 'url(' + e.target.result + ')',
                'background-size': 'cover',
                'background-position': 'center',
                'background-repeat': 'no-repeat'
            });
        };

        reader.readAsDataURL(file);
    });

    $("#up_aud").click(function () {
        $("#upload_audio").trigger("click");
    });

    $("#upload_audio").on("change", function() {
        const file = this.files[0];

        $("#up_aud").append(`<p>${file.name}</p>`)
    });

    $("#createrequest").click(async function() {
        const cover = $("#upload_cover")[0].files[0];
        const audio = $("#upload_audio")[0].files[0];
        const trackName = $("#trackname").val();
        const trackText = $("#tracktext").val();
        const formData1 = new FormData();
        const formData2 = new FormData();

        if (cover) {
            formData1.append('file', cover);
        }
        if (audio) {
            formData2.append('file', audio);
        }
        
        try {
            console.log(cover, audio, trackName, trackText);
            if (cover && audio && trackName && trackText) {
                const res1 = await axios({
                    method: 'POST',
                    url: '/api/v1/file/upload',
                    data: formData1
                });

                const res2 = await axios({
                    method: 'POST',
                    url: '/api/v1/file/upload',
                    data: formData2
                });

                const res3 = await axios({
                    method: 'POST',
                    url: '/api/v1/mediafiles',
                    data: {
                        name: cover.name,
                        artist: currentUser._id,
                        coverKey: res1.data.data.key,
                        audioKey: res2.data.data.key,
                        status: 'checking',
                        text: trackText
                    }
                });

                if (res3)
                {
                    console.log(res3);

                    const res4 = await axios({
                        method: 'POST',
                        url: '/api/v1/requests',
                        data: {
                            mediaFile: res3.data.data._id,
                            artist: currentUser._id,
                            status: "На рассмотрении"
                        }
                    });

                    if (res4) {
                        alert("нет ну это просто пиздец!");
                    }
                }
            }
            else {
                alert("чет не хватает братуха!")
            }
            
        } catch (err) {
            console.log(err);
        }
    });
};

$(document).ready(function() {
    $("#profile").click(async () => {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/authorPage'
            });
        
            let rs = $(".right_section");
            rs.empty();
            await rs.append(res.data.data.html);

            authorPageHandlers();
        } catch (err) 
        {
            if (err.response.status == 401)
            {
                alert("Необходимо авторизоваться!");

                $("#tologin").show(200);
            }
        }
    });

    $("#createaccbtn").click(function () {
        $("#toregister").show(200);
    });

    $("#loginbtn").click(function () {
        $("#tologin").show(200);
    })

    $("#createacc").click(function() {
        $("#tologin").hide(200);
        $("#toregister").show(200);
    });

    $("#regpicinput").click(function() {
        $("#regpic").trigger("click");
    });

    $("#regpic").on("change", function() {
        const file = this.files[0];

        const reader = new FileReader();

        reader.onload = function(e) {
            $("#regpicinput").css({
                'background-image': 'url(' + e.target.result + ')'
            });
        };

        reader.readAsDataURL(file);
    });

    $(".login_overlay").click(function(el) {
        if ($(el.target)["0"] == this) {
            $("#tologin").hide(200);
            $("#toregister").hide(200);
        }
    });

    $("#signup").click(async function() {
        const name = $("#regname")?.val();
        const email = $("#regemail")?.val();
        const password = $("#regpassword")?.val();
        const passwordConfirm = $("#regpasswordconfirm")?.val();
        const file = $("#regpic")[0].files[0];
        const formData = new FormData();

        if (file)
        {
            formData.append('file', file);
        }
        try {
            if (name && email && password && passwordConfirm)
            {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/file/upload',
                    data: formData
                });
    
                if (res.data.data.key) 
                {
                    const res1 = await axios({
                        method: 'POST',
                        url: '/api/v1/users/signup',
                        data: {
                            name, 
                            email,
                            password,
                            passwordConfirm,
                            photoKey: res.data.data.key
                        }
                    });
    
                    if (res1.status == 201)
                    {
                        alert("Вы были жестоко зарегистрированы!");
                        $("#toregister").hide(200);
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    $("#login").click(async function () {
        const email = $("#logininput")?.val();
        const password = $("#loginpassword")?.val();

        if (login && password)
        {
            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/users/login',
                    data: {
                        email,
                        password
                    }
                });

                if (res.status === 200) {
                    alert("energetic drink");
                    console.log(res);
                    if (res.data.data.user.role === "moderator") {
                        window.location = "/moderator"
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    });
});
