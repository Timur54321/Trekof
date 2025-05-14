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
    let currentTrack;
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

        console.log(res.data);

        if (res.status === 200) {
            const favTracks = res.data;
            for (let i = 0; i < favTracks.length; i++) {
                $("#usersFavourites").append(
                    `
                    <div class="music_box" data-index="4">
                        <div class="music_box_inner">
                            <div class="music_image_holder">
                                <img src="/api/v1/flie/${favTracks[i].coverKey}" alt="">
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
                await $('body').empty().append(res.data);

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

        console.log(res.data);

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
            const mh = document.querySelector("#messagesHolder");
            mh.scrollTo(0, mh.scrollHeight);
        }
    } catch (err) {
        alert("No messages lol");
        console.log(err);
    }
}
