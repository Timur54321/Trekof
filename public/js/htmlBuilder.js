const authorPageHandlers = async function() {
    let currentUser;
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/me'
        });

        $("#authorprofilepic").attr("src", `/api/v1/file/${res.data.photoKey}`);
        $("#authorprofilename").text(res.data.name);

        const res1 = await axios({
            method: 'GET',
            url: `/api/v1/mediafiles/${res.data._id}`
        });

        if (res1.status === 200) {
            for (let i = 0; i < res1.data.data.length; i++) {
                $("#tracksHolder").append(
                    `
                        <div class="track">
                            <div class="track_item">

                                <div style="display: flex; align-items: center; gap: 2.4rem;">
                                    <div style="width: 5rem; height: 5rem; border-radius: 0.5rem; overflow: hidden; display: flex; align-items: center;">
                                        <img src="/api/v1/file/${res1.data.data[i].coverKey}" alt="" width="100%">
                                    </div>
                                    <p style="font-size: 2rem;">${res1.data.data[i].name}</p>
                                </div>

                                <div style="display: flex; align-items: center; gap: 2.4rem;">
                                    <p style="font-size: 1.4rem; color: #ccc;">${res1.data.data[i].artist.name}</p>
                                    <img src="./data/icons/share.png" alt="" width="20rem">
                                    <img src="./data/icons/more.png" alt="" width="20rem">
                                    <p style="font-size: 1.4rem; color: #ccc;">2:53</p>
                                </div>

                            </div>
                        </div>
                    `
                )
            }
        }
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
                        name: trackName,
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
                        alert("Заявка оформлена!");
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

////////////////////////////////////////////////////////////////////////
const artistPageHandlers = async artist => {
    let currentUser;
    try {
        const resUser = await axios({
            method: 'GET',
            url: '/api/v1/users/me'
        });
        currentUser = resUser.data;

        const res = await axios({
            method: 'GET',
            url: `/api/v1/users/${artist}`
        });        

        if (res.status === 200) {
            $("#authorprofilepic").attr("src", `/api/v1/file/${res.data.data.photoKey}`);
            $("#authorprofilename").text(res.data.data.name);
        }

        const res1 = await axios({
            method: 'GET',
            url: `/api/v1/mediafiles/${res.data.data._id}`
        });

        if (res1.status === 200) {
            for (let i = 0; i < res1.data.data.length; i++) {
                await $("#tracksHolder").append(
                    `
                        <div class="track" id="${res1.data.data[i]._id}">
                            <div class="track_item">

                                <div style="display: flex; align-items: center; gap: 2.4rem;">
                                    <div style="width: 5rem; height: 5rem; border-radius: 0.5rem; overflow: hidden; display: flex; align-items: center;">
                                        <img src="/api/v1/file/${res1.data.data[i].coverKey}" alt="" width="100%">
                                    </div>
                                    <p style="font-size: 2rem;">${res1.data.data[i].name}</p>
                                </div>

                                <div style="display: flex; align-items: center; gap: 2.4rem;">
                                    <p style="font-size: 1.4rem; color: #ccc;">${res1.data.data[i].artist.name}</p>
                                    <img src="./data/icons/share.png" alt="" width="20rem">
                                    <img src="./data/icons/more.png" alt="" width="20rem" class="likeTrack">
                                    <img src="./data/icons/threedots.png" alt="" width="20rem">
                                    <p style="font-size: 1.4rem; color: #ccc;">2:53</p>
                                </div>

                            </div>
                        </div>
                    `
                )
            }
        }

        let myPlaylists = await axios({
            method: 'GET',
            url: `/api/v1/playlists/${currentUser._id}`
        });

        myPlaylists = myPlaylists.data.data;

        for (let i = 0; i < myPlaylists.length; i++)
        {
            $("#wadehell").append(
                `
                    <div class="not_item" id="${myPlaylists[i]._id}"><p class="not_status">${myPlaylists[i].name}</p></div>
                `
            )
        }

    } catch (err) {
        alert("Something went wrongelo tartalelo");
        console.log(err);
    }

    audioFileHandlers();
};

let currentUser;
$(document).ready(async function() {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/me'
        });

        currentUser = res.data;

    } catch (err)
    {
        console.log(err);
    }

    $("#profile").click(async () => {
        if (currentUser?.role === "user")
        {
            try {
                const res = await axios({
                    method: 'GET',
                    url: '/api/v1/html/userPage'
                });

                if (res.status === 200) {
                    let mp = $(".middle_part");
                    mp.empty();
                    await mp.append(res.data.data.html);

                    userPageHandlers();
                }
            } catch (err) {
                alert("Something went catastrofically wrongelo");
                console.log(err);
            }
        }
        else {
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

    $("#signup")?.click(async function() {
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

    $("#login")?.click(async function () {
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
                    if (res.data.data.user.role === "moderator") {
                        window.location = "/moderator"
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    $("#notifications").click(function() {
        $("#notbox").show(200);
    });

    $(".notification_overlay").click(function (el) {
        if ($(el.target)["0"] == this) {
            $("#notbox").hide(200);
        }
    });

    $("#delapprovereq").click(async function() {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `/api/v1/requests/approved/${this.parentNode.id}`
            });

            if (res.status == 200) {
                alert("Успех!");
            }
        } catch (err) {
            alert("Something went catastrofically wrong");
            console.log(err);
        }
    });

    $("#delcancelreq").click(async function() {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `/api/v1/requests/canceled/${this.parentNode.id}`
            });

            if (res.status == 200) {
                alert("Успех!");
            }
        } catch (err) {
            alert("something went wrongelo");
            console.log(err);
        }
    });

    $(".artisto").click(async function() {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/artistPage'
            });

            let rs = $(".right_section");
            rs.empty();
            await rs.append(res.data.data.html);

            artistPageHandlers(this.id);   
        } catch (err) {
            alert("SOmethign went extremely outragegous");
            console.log(err);
        }
    });
});


const audioFileHandlers = () => {
    $(".likeTrack").click(async function () {
        console.log('imsorryniga')
        if (currentUser)
        {
            try {
                console.log(this.parentNode.parentNode);
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/mediafiles/${this.parentNode.parentNode.parentNode.id}`,
                    data: {
                        playlist: currentUser.favourites
                    }
                });
    
                if (res.status === 201) {
                    alert("this track was liked extraordinary way");
                }
            } catch (err) {
                alert("something went wrongelo");
                console.log(err);
            }
        } else {
            alert("You are not logged in nigga!");
        }
    });
};

const userPageHandlers = async function () {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/mediafiles/playlist/${currentUser.favourites}`
        });

        if (res.status === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
                $("#usersFavourites").append(
                    `
                        <div class="music_box" data-index="1">
                            <div class="music_box_inner">
                                <div class="music_image_holder">
                                    <img src="/api/v1/file/${res.data.data[i].coverKey}" alt="">
                                </div>
                                <div class="music_info">
                                    <p class="music_name">${res.data.data[i].name}</p>
                                    <p class="music_author">${res.data.data[i].artist.name}</p>
                                </div>
                            </div>

                            <div class="music_box_inner">
                                <p class="music_duration">2:44</p>
                                <img src="./data/icons/more.png" alt="" class="add_music_icon">
                            </div>
                        </div>
                    `
                );
            }
        }
    } catch (err) {
        alert("Самая любимая музыка здесь играет");
        console.log(err);
    }

    $("#createPlaylist").click(async function() {
        const whateverTheAnswerIs = prompt("Введите имя для плейлиста: ");
        if (whateverTheAnswerIs) {
            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/playlists',
                    data: {
                        name: whateverTheAnswerIs,
                        owner: currentUser._id,
                        type: "regular"
                    }
                });

                if (res.status === 200) {
                    alert("Плейлист был официально создан!");
                }
            } catch (err) {
                alert("Something went wrongelo!!!");
                console.log(err);
            }
        }
    });
}

