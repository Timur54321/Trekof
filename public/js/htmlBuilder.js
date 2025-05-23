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
                                    <img src="./data/icons/share.png" alt="" width="20rem" class="shareTrack">
                                    <img src="./data/icons/more.png" alt="" width="20rem" class="likeTrack">
                                    <img class="threeDotsPlaylist" src="./data/icons/threedots.png" alt="" width="20rem">
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
            await $("#wadehell").append(
                `
                    <div class="not_item playlist_item" id="${myPlaylists[i]._id}"><p class="not_status">${myPlaylists[i].name}</p></div>
                `
            );
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

                const fav = await axios({
                    method: 'POST',
                    url: '/api/v1/playlists',
                    data: {
                        name: 'Favourites',
                        type: 'Favourites'
                    }
                });

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
                            photoKey: res.data.data.key,
                            favourites: fav.data._id
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

    $("#friendsPage").click(async function () {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/friendsPage'
            });

            let mp = $(".middle_part");
            mp.empty();
            await mp.append(res.data.data.html);

            friendsPageHanlders();

        } catch (err) {
            alert("somethign wrongelo");
            console.log(err);
        }
    });

    $(".acceptFriendRequest").click(async function() {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/friendLinks/${this.parentNode.id}`,
                data: {
                    status: 'friends'
                }
            });

            if (res.status === 200) {
                alert("У вас теперь есть друг!");
            }
        } catch (err) {
            alert("whathever");
            console.log(err);
        }
    });

    $(".declineFriendRequest").click(async function() {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `/api/v1/friendLinks/${this.parentNode.id}`
            });

            if (res.status === 203) {
                alert("zamechatelno");
                $(this.parentNode).hide(200);
            }
        } catch (err) {
            alert("something wronhelo");
            console.log(err);
        }
    });
});


const audioFileHandlers = () => {
    let currentTrack;
    $(".likeTrack").click(async function () {
        if (currentUser)
        {
            try {
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/playlists/addTrack/${currentUser.favourites}`,
                    data: {
                        audioFileId: this.parentNode.parentNode.parentNode.id
                    }
                });

                if (res.status === 200) {
                    alert("Трек был экстримально добавлен в список понравившихся!");
                }
            } catch (err) {
                alert("Произошла ошибка при попытке лайкнуть трек");
                console.log(err);
            }
        } else {
            alert("You are not logged in!");
        }
    });

    $(".threeDotsPlaylist").click(function () {
        currentTrack = this.parentNode.parentNode.parentNode.id;
        $("#playlistbox").show(200);
    });

    $(".playlist_overlay").click(function() {
        $("#playlistbox").hide(200);
    });

    $(".playlist_item").click(async function () {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/playlists/addTrack/${this.id}`,
                data: {
                    audioFileId: currentTrack
                }
            });

            if (res.status === 200) {
                alert("Трек был добавлен в плейлист!");
                $("#playlistbox").hide(200);
            }
            
        } catch (err) {
            alert("Something went extremely wrong");
        }
    });

    $(".shareTrack").click(async function() {
        currentTrack = this.parentNode.parentNode.parentNode.id;
        $("#shareChats").show(200);
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/chats/myChats'
            });

            if (res.status === 200) {
                await $("#sendChatList").empty();
                const chats = res.data;

                for (let i = 0; i < chats.length; i++) {
                    let otherUser;
                    if (chats[i].user1._id === currentUser._id) otherUser = chats[i].user2;
                    else otherUser = chats[i].user1;
                    await $("#sendChatList").append(
                        `
                            <div class="chat_item" id="${chats[i]._id}">
                                <div style="display: flex; align-items: center; justify-content: center; width: 7rem; height: 7rem; border-radius: 1rem; overflow: hidden;">
                                    <img src="/api/v1/file/${otherUser.photoKey}" alt="" width="100%">
                                </div>
                                <p class="not_status">${otherUser.name}</p>
                            </div>
                        `
                    );
                }
            }
        } catch (err) {
            alert("COuld not load chats");
            console.log(err);
        }

        $(".chat_item").click(async function() {
            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/messages',
                    data: {
                        type: 'Mediafile',
                        mediafile: currentTrack,
                        author: currentUser._id,
                        chat: this.id
                    }
                });

                console.log(currentTrack);
                console.log(res);
                
                if (res.status === 204) {
                    alert("Аудиофайл отправлен этому челику");
                }
            } catch (err) {
                alert("Tried to send audiofile to homie didnt work");
                console.log(err);
            }
        });
    });

    $(".chatsOverlay").click(function(el) {
        if ($(el.target)["0"] == this) {
            $("#shareChats").hide(200);
        }
    });
};

const userPageHandlers = async function () {

    $("#userProfilePic").attr('src', `/api/v1/file/${currentUser.photoKey}`);
    $("#userName").text(currentUser.name);
    $("#userEmail").text(currentUser.email);

    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/friendLinks/myFriends'
        });

        if (res.status === 200) {
            const myFriends = res.data;


            for (let i = 0; i < myFriends.length; i++) {
                $("#myFriendsList").append(
                    `
                        <div class="author_holder">
                            <div class="author_image_holder">
                                <img src="/api/v1/file/${myFriends[i].photoKey}" alt="">
                            </div>
                        </div>
                    `
                )
            }
        }
    } catch (err) {
        alert("soemthing went wronghelo");
        console.log(err);
    }

    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/playlists/tracks/${currentUser.favourites}`
        });

        if (res.status === 200) {
            const favTracks = res.data;
            for (let i = 0; i < favTracks.length; i++) {
                await $("#usersFavourites").append(
                    `
                    <div class="music_box" data-index="4">
                        <div class="music_box_inner">
                            <div class="music_image_holder">
                                <img src="/api/v1/file/${favTracks[i].coverKey}" alt="">
                            </div>
                            <div class="music_info">
                                <p class="music_name">${favTracks[i].name}</p>
                                <p class="music_author"></p>
                            </div>
                        </div>
    
                        <div class="music_box_inner">
                            <p class="music_duration">1:35</p>
                            <img src="./data/icons/more.png" alt="" class="add_music_icon">
                        </div>
                    </div>
                    `
                );
            }
        }
    } catch (err) {
        alert("Whatever");
        console.log(err);
    }

    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/playlists/myPlaylists'
        });

        console.log(res.data);

        if (res.status === 200) {
            const playlists = res.data;
            for (let i = 0; i < playlists.length; i++) {
                $("#playlistsList").append(
                    `
                        <div class="widget_card">
                            <div class="black_fade">
                                <p class="widget_card_name">${playlists[i].name}</p>
                            </div>
                        </div>
                    `
                );
            }
        }
    } catch (err) {
        alert("Хотел вывести плейлисты но чет не пошло крч");
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
};

const friendsPageHanlders = async function() {

    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/friendLinks/myFriends'
        });

        for (let i = 0; i < res.data.length; i++) {
            await $(".friendsSearchHolder").append(
                `
                    <div class="friend_item" id="${res.data[i]._id}">
                        <div style="display: flex; align-items: center; justify-content: center; width: 12rem; height: 12rem; border-radius: 50%; overflow: hidden;">
                            <img src="/api/v1/file/${res.data[i].photoKey}" alt="" width="100%">
                        </div>
                        <div>
                            <p style="font-size: 1.8rem; margin-bottom: 1rem;">${res.data[i].name}</p>
                            <div>
                                <button class="link_button idOpenChat" style="margin-right: 2rem;">Написать</button>
                                <button class="link_button " style="margin-right: 2rem;">Удалить</button>
                            </div>
                        </div>
                    </div>
                `
            )
        }

        updateFriendsHandlers();
    } catch (err) {
        console.log(err);
    }

    $("#findFriends").click(async function (el) {
        el.preventDefault();

        const currentValue = $("#friendInput").val();
        if (currentValue != "") {
            try {
                const res = await axios({
                    method: 'GET',
                    url: `/api/v1/users/search/${currentValue}`
                });

                if (res.status === 200) {
                    const users = res.data.data;

                    for (let i = 0; i < users.length; i++) {
                        await $(".friendsSearchHolder").append(
                            `
                                <div class="friend_item" id="${users[i]._id}">
                                    <div style="display: flex; align-items: center; justify-content: center; width: 12rem; height: 12rem; border-radius: 50%; overflow: hidden;">
                                        <img src="/api/v1/file/${users[i].photoKey}" alt="" width="100%">
                                    </div>
                                    <div>
                                        <p style="font-size: 1.8rem; margin-bottom: 1rem;">${users[i].name}</p>
                                        <div>
                                            <button class="link_button idAddUser" style="margin-right: 2rem;">Добавить</button>
                                        </div>
                                    </div>
                                </div>
                            `
                        )
                    }

                    $(".idAddUser").click(async function () {
                        try {
                            const res1 = await axios({
                                method: 'POST',
                                url: '/api/v1/friendLinks',
                                data: {
                                    user: this.parentNode.parentNode.parentNode.id
                                }
                            });

                            if (res1.status === 204) {
                                alert("Заявка в друзья отправлена!");
                            }
                        } catch (err) {
                            alert("something went wrongehlo");
                            console.log(err);
                        }
                    });
                }
            } catch (err) {
                alert("wronghel");
                console.log(err);
            }
        }
    });

    
    // document.querySelector("#findFriends").addEventListener("click", function (el) {
    //     el.preventDefault();
    // });
}

const updateFriendsHandlers = async function() {
    $(".idOpenChat").click(async function () {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/messenger'
            });

            if (res.status === 200) {
                await $('.visibleParts').empty().append(res.data);

                messengerPageHandlers(this.parentNode.parentNode.parentNode.id);
            }
        } catch (err) {
            alert("something went wrong");
            console.log(err);
        }
    });
};

const messengerPageHandlers = async function(userid) {
    let currentChat;
    let updateChat;

    if (currentUser.role === 'artist') {
        await $("#chatsList").append(`
             <button class="create_post" id="createPost">
                <img src="./data/icons/plus.png" alt="" width="27rem">
                <p style="font-size: 1.6rem; font-weight: 600;">Создать пост</p>
            </button>
            <div class="ms_message_field" id="loadChannel">
                <div style="display: flex; align-items: center; gap: 2rem;">
                    <div class="ms_message_avatar">
                        <img src="./data/users/bf84a85797cba4df53b7c3341ca377a5.jpg" alt="">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <p class="ms_message_name">Ваш канал</p>
                    </div>
                </div>
            </div>
            `)
    }

    $("#createPost").click(async function() {
        clearInterval(updateChat);
        await $("#messagesHolder").empty().append(`<div class="income_box">
                    <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                        <img src="/api/v1/file/${currentUser.photoKey}" alt="">
                    </div>
                    <div style="width: 100%; padding-top: 1rem;">
                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">${currentUser.name} - <span>8:40</span></p>
                        <div class="ms_message_box ms_post" style="border-top-left-radius: 0; padding: 2rem 0 0 0 ;">
                            <div class="ms_post_pic" id="postPicture">
                                <img src="./data/default_pic.jpg" alt="" id="img_cover">
                            </div>

                            <p style="font-size: 1.8rem; padding: 1rem 2rem; font-weight: 900;" id="postHeader">
                                Заголовок
                            </p>

                            <p style="font-size: 1.4rem; padding: 1rem 2rem; font-weight: 400; line-height: 1.5;" id="postContent">
                                Основной текст
                            </p>
                        </div>
                    </div><input type="file" style="width: 0; " id="input_img" accept="image/png, image/jpeg">`);
        await $("#messageInput").hide(100);
        await $("#sendMessage").hide(100);
        await $("#formCreationPost").prepend(`<textarea name="" id="post_creation_input"></textarea>`);
        await $("#formCreationPost").prepend(`<textarea name="" id="post_creation_header"></textarea>`);
        await $("#formCreationPost").append(`<button class="send_message" id="loadPost">Отправить</button>`);
        let file;
        $('#input_img').on('change', function(e) {
            alert('whatever');
            file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();

            reader.onload = function(e) {
                $('#img_cover').attr('src', e.target.result);
            };

            reader.readAsDataURL(file);
        });

        $("#postPicture").click(function() {
            $("#input_img").trigger("click");
        });

        $('#post_creation_input').on('input', function() {
            $('#postContent').text($(this).val());
        });
        $('#post_creation_header').on('input', function() {
            $('#postHeader').text($(this).val());
        });
        $("#loadPost").click(async function (e) {
            e.preventDefault();
            const formData = new FormData();
            if (file)
            {
                formData.append('file', file);
            }
            else {
                alert('Не выбран файл');
                return;
            }
            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/file/upload',
                    data: formData
                });

                const res1 = await axios({
                    method: 'POST',
                    url: '/api/v1/posts',
                    data: {
                        photoKey: res.data.data.key,
                        header: $("#post_creation_header").val(),
                        content: $("#post_creation_input").val(),
                        channel: currentUser.channel
                    }
                });

                if (res1.status === 204) {
                    alert("Создали пост");
                }
            } catch (err) {
                alert("Создание поста пошло не по плану");
            }
        })
    });

    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/chats/loadChat/${userid}`
        });
    
        if (res.status === 200) {
            currentChat = res.data;
            printMessages(currentChat._id);
        }
    } catch (err) {
        alert("something went wrongelo");
        console.log(err);
    }

    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/chats/myChats'
        });

        if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
                let otherUser;
                if (res.data[i].user1._id === currentUser._id) otherUser = res.data[i].user2;
                else otherUser = res.data[i].user1;
                $("#chatsList").append(`
                    <div class="ms_message_field">
                        <div style="display: flex; align-items: center; gap: 2rem;">
                            <div class="ms_message_avatar">
                                <img src="/api/v1/file/${otherUser.photoKey}" alt="">
                            </div>
                            <div style="display: flex; flex-direction: column;">
                                <p class="ms_message_name">${otherUser.name}</p>
                            </div>
                        </div>
                    </div>
                `);
            }
            updateChat = setInterval(() => {
                if (currentChat)
                {
                    printMessages(currentChat._id);
                }
            }, 1000);
        }
    } catch (err) {
        alert("Something went wrong");
        console.log(err);
    }

    $("#sendMessage").click(async function (el) {
        el.preventDefault();
        const messageContent = $("#messageInput").val();
        $("#messageInput").val("");

        if (messageContent) {
            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/messages',
                    data: {
                        content: messageContent,
                        type: 'Text',
                        chat: currentChat._id
                    }
                });

                if (res.status === 204) {
                    printMessages(currentChat._id);
                }
            } catch (err) {
                alert("something went wronghelo");
                console.log(err);
            }
        }
    });

    $("#loadChannel").click(async function() {
        clearInterval(updateChat);
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/v1/posts/${currentUser.channel}`
            });

            if (res.status === 200) {
                const posts = res.data;

                await $("#messagesHolder").empty();
                for (let i = 0; i < posts.length; i++) {
                    await $("#messagesHolder").append(`
                            <div class="income_box">
                                <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                    <img src="./data/12dcd2799b4e5ead1b94fe052ab30568.jpg" alt="">
                                </div>
                                <div style="width: 100%; padding-top: 1rem;">
                                    <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">godtearz - <span>8:40</span></p>
                                    <div class="ms_message_box ms_post" style="border-top-left-radius: 0; padding: 2rem 0 0 0 ;">
                                        <div class="ms_post_pic">
                                            <img src="/api/v1/file/${posts[i].photoKey}" alt="">
                                        </div>

                                        <p style="font-size: 1.8rem; padding: 1rem 2rem; font-weight: 900;">
                                            ${posts[i].header}
                                        </p>

                                        <p style="font-size: 1.4rem; padding: 1rem 2rem; font-weight: 400; line-height: 1.5;">
                                            ${posts[i].content}
                                        </p>

                                        <div class="comment_btn">
                                            <p><span>231</span> комментариев ---></p>
                                        </div>

                                        <div class="comment_section comment_gone">
                                            <p style="font-size: 1.8rem; margin-bottom: 1rem;">Комментарии</p>

                                            <div class="comment_box">
                                                <div style="width: 3.4rem; height: 3.4rem; cursor: pointer; border-radius: 50%; overflow: hidden; display: flex; align-items: center; flex-shrink: 0;">
                                                    <img src="./data/users/bf84a85797cba4df53b7c3341ca377a5.jpg" alt="" width="100%">
                                                </div>
                                                <div>
                                                    <p style="font-size: 1.4rem;">Узник сартира - 12:45</p>
                                                    <div class="comment_place">
                                                        <p>Смотрите я не быдло, я в театр прише fasd fafd asл</p>
                                                    </div>
                                                    <div class="comment_place">
                                                        <p>Где Америка находится лмао</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="comment_box">
                                                <div style="width: 3.4rem; height: 3.4rem; cursor: pointer; border-radius: 50%; overflow: hidden; display: flex; align-items: center; flex-shrink: 0;">
                                                    <img src="./data/users/ce8d6fed5b090a15cc5ec89f8d3862c4.jpg" alt="" width="100%">
                                                </div>
                                                <div>
                                                    <p style="font-size: 1.4rem;">Альберт Эндшпиль - 12:45</p>
                                                    <div class="comment_place">
                                                        <p>За языком следи уважаемый</p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </div>

                                    </div>
                                </div>
                            </div>
                        `)
                }

                $('.comment_btn').click(function() {
                    $(this).next('.comment_section').toggleClass('comment_gone');
                });
            }
        } catch (err) {
            alert("was unable to load posts");
            console.log(err);
        }
    });
};

const printMessages = async function(chatid) {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/chats/${chatid}`
        });

        if (res.status === 200) {
            const messages = res.data.messages.reverse();
            let otherUser;

            if (res.data.user1._id === currentUser._id) otherUser = res.data.user2;
            else otherUser = res.data.user1;

            await $("#messagesHolder").empty();

            for (let i = 0; i < messages.length; i++) {
                if (messages[i].author === currentUser._id) {
                    if (messages[i].type === "Mediafile") {
                        await $("#messagesHolder").append(
                            `
                            <div class="outcome_box" style="justify-content: right;">
                                <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; text-align: right; color: #eee;">${currentUser.name} - <span>8:40</span></p>
                                <div class="ath_song_card" style="float: right; width: 40rem; height: 20rem; margin-top: 1rem;">
                                    <div class="ath_song_info">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div class="ath_snippet_play_btn" style="background-color: rgb(222, 222, 222); flex-shrink: 0; width: 3rem; height: 3rem;">
                                                <img src="./data/icons/pause.png" alt="">
                                            </div>
                                            <p style="font-size: 1.4rem; line-height: 1.3; width: 120%; flex-shrink: 0; z-index: 100;">${messages[i].mediafile.name}</p>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div class="ath_card_artist_photo">
                                                <img src="/api/v1/file/${messages[i].mediafile.artist.photoKey}" alt="">
                                            </div>
                                            <p style="color: rgb(194, 194, 194); font-size: 1.2rem;">${messages[i].mediafile.artist.name}</p>
                                        </div>
                                    </div>
                                    <div class="ath_song_cover_box" style="background-image: url('/api/v1/file/${messages[i].mediafile.coverKey}');">
                                        <div class="ath_black_gradient"></div>
                                    </div>
                                </div>
                                <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                    <img src="/api/v1/file/${currentUser.photoKey}" alt="">
                                </div>
                            </div>    
                            `
                        );
                    }
                    else {
                        await $("#messagesHolder").append(
                            `
                                <div class="outcome_box" style="justify-content: right;">
                                    <div style="width: 40%; padding-top: 1rem;">
                                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; text-align: right; color: #eee;">${currentUser.name} - <span>8:40</span></p>
                                        <div class="ms_message_box outcome" style="float: right; border-top-right-radius: 0;">
                                            <p class="ms_message_content">${messages[i].content}</p>
                                        </div>
                                        
                                    </div>
                                    <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                        <img src="/api/v1/file/${currentUser.photoKey}" alt="">
                                    </div>
                                </div>
                            `
                        );
                    }
                }
                else {
                    if (messages[i].type === "Mediafile") {
                        await $("#messagesHolder").append(
                            `
                            <div class="income_box">
                                <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                    <img src="/api/v1/file/${otherUser.photoKey}" alt="">
                                </div>
                                <div class="ath_song_card" style="float: right; width: 40rem; height: 20rem; margin-top: 1rem;">
                                    <div class="ath_song_info">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div class="ath_snippet_play_btn" style="background-color: rgb(222, 222, 222); flex-shrink: 0; width: 3rem; height: 3rem;">
                                                <img src="./data/icons/pause.png" alt="">
                                            </div>
                                            <p style="font-size: 1.4rem; line-height: 1.3; width: 120%; flex-shrink: 0; z-index: 100;">${messages[i].mediafile.name}</p>
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            <div class="ath_card_artist_photo">
                                                <img src="/api/v1/file/${messages[i].mediafile.artist.photoKey}" alt="">
                                            </div>
                                            <p style="color: rgb(194, 194, 194); font-size: 1.2rem;">${messages[i].mediafile.artist.name}</p>
                                        </div>
                                    </div>
                                    <div class="ath_song_cover_box" style="background-image: url('/api/v1/file/${messages[i].mediafile.coverKey}');">
                                        <div class="ath_black_gradient"></div>
                                    </div>
                                </div>
                            </div>
                            `
                        );
                    }
                    else {
                        await $("#messagesHolder").append(
                            `
                                <div class="income_box">
                                    <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                        <img src="/api/v1/file/${otherUser.photoKey}" alt="">
                                    </div>
                                    <div style="width: 40%; padding-top: 1rem;">
                                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">${otherUser.name} - <span>8:40</span></p>
                                        <div class="ms_message_box" style="border-top-left-radius: 0;">
                                            <p class="ms_message_content">${messages[i].content}</p>
                                        </div>
                                    </div>
                                </div>
                            `
                        );
                    }
                }
            }
            const mh = document.querySelector("#messagesHolder");
            mh.scrollTo(0, mh.scrollHeight);
        }
    } catch (err) {
        alert("No messages lol");
        console.log(err);
    }
}
