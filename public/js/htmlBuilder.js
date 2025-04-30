const leftSectionHTML = `
    <section class="left_section">
        <div class="top_section top_left_section">
            <h1 class="company_name">ZZZvuk</h1>
        </div>

        <div class="left_section_menus">

            <div class="audio_hosting_menu">
                <div class="hosting_menu_item hover_effect">
                    <div class="active_hosting_page"></div>
                    <img src="./data/icons/home.png" alt="" class="hosting_image">
                    <p class="hosting_menu_text">Главная</p>
                </div>
                <div class="hosting_menu_item hover_effect">
                    <div class="active_hosting_page hidden"></div>
                    <img src="./data/icons/user.png" alt="" class="hosting_image">
                    <p class="hosting_menu_text">Профиль</p>
                </div>
                <div class="hosting_menu_item hover_effect">
                    <div class="active_hosting_page hidden"></div>
                    <img src="./data/icons/star.png" alt="" class="hosting_image">
                    <p class="hosting_menu_text">Фавориты</p>
                </div>
                <div class="hosting_menu_item hover_effect">
                    <div class="active_hosting_page hidden"></div>
                    <img src="./data/icons/rock-guitar.png" alt="" class="hosting_image">
                    <p class="hosting_menu_text">Жанры</p>
                </div>
            </div>

            <div class="messenger_menu">
                <div class="hosting_menu_item" style="padding-top: 0;">
                    <div class="active_hosting_page hidden"></div>
                    <img src="./data/icons/message.png" alt="" class="messenger_image">
                    <p class="hosting_menu_text">Мессенджер</p>
                </div>

                <div class="hosting_menu_item message_box hover_effect">
                    <div class="message_info">
                        <div class="active_hosting_page hidden"></div>
                        <div class="menu_profile_image_container"><img src="./data/authors/2cd312b369f6377166237a03b7215b56.jpg" alt="" class="profile_image"></div>
                        <p class="hosting_menu_text">Неадекват</p>
                    </div>
                    <div class="income_messages_circle">
                        <p class="income_message_amount">2</p>
                    </div>
                </div>

                <div class="hosting_menu_item message_box hover_effect">
                    <div class="message_info">
                        <div class="active_hosting_page hidden"></div>
                        <div class="menu_profile_image_container"><img src="./data/authors/6e268e284174e29e6daf7d516cf7b485.jpg" alt="" class="profile_image"></div>
                        <p class="hosting_menu_text">Димас</p>
                    </div>
                    <div class="income_messages_circle">
                        <p class="income_message_amount">4</p>
                    </div>
                </div>

            </div>

            <div class="management_menu">

                <div class="management_title_box">
                    <div class="title_box">
                        <img src="./data/icons/profile.png" alt="" style="width: 2.5rem;">
                        <p class="management_menu_title">Управление</p>
                    </div>
                    <img src="./data/icons/yellow_next.png" alt="" class="togo_management_icon">
                </div>

                <div class="stats_container">
                    <div class="stats_holder">
                        <img src="./data/icons/loading.png" alt="">
                        <div class="stats_box">
                            <p class="stat_title">Статистика</p>
                            <p class="stat_info">Ваши треки и альбомы</p>
                        </div>
                    </div>
                    <div class="stats_holder">
                        <img src="./data/icons/checkmark.png" alt="">
                        <div class="stats_box">
                            <p class="stat_title">Релизы</p>
                            <p class="stat_info">Ваши треки и альбомы</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
        
    </section>
`;

const authorPageHandlers = function() {
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
            const res = await axios({
                method: 'POST',
                url: '/api/v1/file/upload',
                data: formData
            });

            if (res.data.data.key && name && email && password && passwordConfirm) 
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
            }
        } catch (err) {
            console.log(err);
        }
    });
});
