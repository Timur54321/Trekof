import { loadMusic, playMusic, togglePlay, setProgressBar, setSoundBar, checkPlaying } from './audio.js';

let currentUser;
let currentCover, currentPlayingTrack, currentAuthor, currentTrackId;

function formatDate(mongoDate) {
  // Проверяем, является ли значение числом (timestamp) или объектом Date
  const date = typeof mongoDate === 'number' 
    ? new Date(mongoDate) 
    : mongoDate instanceof Date 
      ? mongoDate 
      : new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
}

const updateAlbumsList = async function(artistId) {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/albums/artist/${artistId}`
        });

        if (res.status === 200) {
            await $('#albums_list').children().not(':first').remove();
            const albums = res.data;

            for (let i = 0; i < albums.length; i++) {
                await $("#albums_list").append(`
                    <div style="width: 24rem; display: flex; flex-direction: column; gap: 1.6rem;"id="${albums[i]._id}">
                        <div class="album_cover loadAlbumTracks" style="cursor: pointer;" >
                            <img width="100%" src="/api/v1/file/${albums[i].cover}" alt="">
                        </div>
                        <div>
                            <p class="album_name">${albums[i].name}</p>
                            <p class="item_type">Альбом</p>
                            ${currentUser._id === artistId ? `<div class="putInCenter deleteAlbum" style="width: 3rem; height: 3rem; cursor: pointer;" >
                                <img src="./data/icons/delete.png" alt="" width="100%">
                            </div>` : ""}
                            
                        </div>
                    </div>
                `);
            }
        }

    } catch (err) {
        console.log(err);
    }
}

const loadMainPage = async function() {
    try {
        const res = await axios({
            method: "GET",
            url: '/api/v1/html/mainPage'
        });

        let rs = $(".right_section");
        rs.empty();
        await rs.append(res.data);

        if (!currentUser) {
            $("#friendsPage").after(`<button class="link_button" id="createaccbtn" style="width: 30rem; flex-shrink: 0;">Создать аккаунт</button>
    <button class="link_button" id="loginbtn" style="width: 30rem; flex-shrink: 0;">Войти</button>`);
        } else {
            $("#friendsPage").after(`<div class="default" id="notifications" style="cursor: pointer; width: 4rem; height: 4rem; flex-shrink: 0; border-radius: 50%; border: 0.1rem solid rgb(116, 116, 116)">
        <img src="/data/icons/notification.png" alt="" width="50%">
    </div>
    <button class="link_button" id="logout">Выйти</button>`);
        }
        
        const res1 = await axios({
            method: 'GET',
            url: '/api/v1/users/getAuthors'
        });

        const artists = res1.data;
        const element = $("#topArtistsList");
        for (let i = 0; i < artists.length; i++) {
            await element.append(`
                <div class="author_holder artisto" id="${artists[i]._id}">
                    <div class="author_image_holder">
                        <img src="/api/v1/file/${artists[i].photoKey}" alt="">
                    </div>
                </div>
            `);
        }

        const randomTracks = await axios({
            method: 'GET',
            url: '/api/v1/mediafiles/getRandomTracks'
        });

        for (let i = 0; i < randomTracks.data.length; i++) {
            await $(".recommend_audio_box").append(`
                <div class="music_box track" data-index="1" id="${randomTracks.data[i]._id}" data-authorname="${randomTracks.data[i].authorInfo.name}" data-trackname="${randomTracks.data[i].name}" data-cover="${randomTracks.data[i].coverKey}" data-key="${randomTracks.data[i].audioKey}">
                    <div class="music_box_inner">
                        <div class="music_image_holder">
                        <img src="/api/v1/file/${randomTracks.data[i].coverKey}" alt="">
                        </div>
                        <div class="music_info">
                        <p class="music_name">${randomTracks.data[i].name}</p>
                        <p class="music_author">${randomTracks.data[i].authorInfo.name}</p>
                        </div>
                    </div>
                    <div class="music_box_inner">
                        <img class="add_music_icon" src="./data/icons/more.png" alt="">
                    </div>
                </div>
            `);
        }


        mainPageHandlers();
        topMenuHandlers();
        audioFileHandlers();
    } catch (err) {
        console.log(err);
    }
};

const audioHostingHandlers = function () {
    $("#profile").click(async () => {
        if (currentUser)
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
            
        }
    });

    $("#mainPage").click(async function() {
        loadMainPage();
    });

    $("#openStatistic").click(async function() {
        $(".middle_part").empty();
        try {
            const res = await axios({
                method: "GET",
                url: `/api/v1/mediafiles/${currentUser._id}`
            });

            const mediafiles = res.data.data;
            $(".middle_part").append(`<p class="title_style" style="margin-bottom: 4rem;">Ваши треки</p>
                `)
            for (let i = 0; i < mediafiles.length; i++) {
                $(".middle_part").append(`
                    <div class="trackStatItem">
                            <div class="statTrackBasicInfo">
                                <div class="putInCenter" style="width: 8rem; height: 8rem; border-radius: 1.8rem; overflow: hidden; ">
                                    <img src="/api/v1/file/${mediafiles[i].coverKey}" alt="" width="100%">
                                </div>
                                <div>
                                    <p class="statTrackName">${mediafiles[i].name}</p>
                                    <p class="statTrackUploadDate">${formatDate(mediafiles[i].date)}</p>
                                </div>
                            </div>
                            <div class="statInformation">
                                <div class="statItemHolder">
                                    <div class="putInCenter" style="width: 4rem; height: 4rem; border-radius: 1.8rem; overflow: hidden; ">
                                        <img src="./data/icons/like.png" alt="" width="70%">
                                    </div>
                                    <p style="font-size: 1.4rem;">
                                        ${mediafiles[i].likes || "0"}
                                    </p>
                                </div>
                                <div class="statItemHolder">
                                    <div class="putInCenter" style="width: 4rem; height: 4rem; border-radius: 1.8rem; overflow: hidden; ">
                                        <img src="./data/icons/headphones.png" alt="" width="70%">
                                    </div>
                                    <p style="font-size: 1.4rem;">
                                        ${mediafiles[i].listens || '0'}
                                    </p>
                                </div>
                                <div class="statItemHolder">
                                    <div class="putInCenter" style="width: 4rem; height: 4rem; border-radius: 1.8rem; overflow: hidden; ">
                                        <img src="./data/icons/share.png" alt="" width="70%">
                                    </div>
                                    <p style="font-size: 1.4rem;">
                                        ${mediafiles[i].shares || '0'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `)
            }
        } catch (err) {
            console.log(err);
        }
    });
};

const authorPageHandlers = async function() {
    let currentUser, chosenAlbumTracks;
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
            printPlaylistTracks(res1.data.data);
        }
        currentUser = res.data;

    } catch (err)
    {
        console.log(err);
    }

    await updateAlbumsList(currentUser._id);
    albumsHandlers();

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
                        coverKey: res1.data.data.Key,
                        audioKey: res2.data.data.Key,
                        status: 'checking',
                        text: trackText
                    }
                });

                if (res3)
                {
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

    $("#createAlbum").click(async function() {
        $("#albumCreationBox").show(200);

        try {
            const res = await axios({
                method: "GET",
                url: `/api/v1/mediafiles/${currentUser._id}`
            });

            if (res.status === 200) {
                const tracks = res.data.data;
                chosenAlbumTracks = new Set();
                await $("#albumAddTracks").empty();
                for (let i = 0; i < tracks.length; i++) {
                    $("#albumAddTracks").append(`
                            <div class="alb_track_item" id="${tracks[i]._id}">
                                <div style="display: flex; align-items: center; gap: 4rem;">
                                    <div style="width: 5rem; height: 5rem; display: flex; align-items: center; justify-self: center; overflow: hidden; border-radius: 0.7rem;">
                                        <img src="/api/v1/file/${tracks[i].coverKey}" alt="" width="100%">
                                    </div>
                                    <p style="font-size: 1.6rem;">${tracks[i].name}</p>
                                </div>
                                <div style="display: flex; align-items: center; justify-content: center; width: 5rem; height: 5rem;">
                                    <img src="./data/icons/more.png" alt="" width="50%" class="addTrackToAlbumIndex" data-added="0">
                                </div>
                            </div>
                        `);
                }

                $(".addTrackToAlbumIndex").click(function() {
                    if (this.dataset.added === "1")
                    {
                        $(this).attr('src', './data/icons/more.png');
                        this.dataset.added = "0";
                        chosenAlbumTracks.delete(this.parentNode.parentNode.id);
                    }
                    else {
                        $(this).attr('src', './data/icons/checked.png');
                        this.dataset.added = "1";
                        chosenAlbumTracks.add(this.parentNode.parentNode.id);
                    }
                    
                });
            }
        } catch (err) {
            console.log(err);
        }
    });

    $(".albumTracksOverlay").click(function(el) {
        if ($(el.target)["0"] == this) {
            $("#albumCreationBox").hide(200);
            if (chosenAlbumTracks)
            {
                chosenAlbumTracks.clear();
            }        
        }
    });

    $("#uploadAlbum").click(async function() {
        const name = $("#albumNameInput").val();
        const file = $("#albumCoverInput")[0].files[0];
        const formData = new FormData();

        if (file)
        {
            formData.append('file', file);
        }
        try {
            if (name)
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
                        url: '/api/v1/albums',
                        data: {
                            name, 
                            cover: res.data.data.key,
                            mediafiles: Array.from(chosenAlbumTracks)
                        }
                    });
    
                    if (res1.status == 201)
                    {
                        alert("Альбом был жестоко создан");
                        chosenAlbumTracks.clear();
                        $("#albumCreationBox").hide(200);
                        await updateAlbumsList(currentUser._id);
                        albumsHandlers();
                    }
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    $("#albumCoverImg").click(function() {
        $("#albumCoverInput").trigger('click');
    });

    $("#albumCoverInput").on('change', function() {
        const file = this.files[0];

        const reader = new FileReader();

        reader.onload = function(e) {
            $("#albumCoverImg").css({
                'background-image': 'url(' + e.target.result + ')',
                'background-size:': '100% auto'
            });
        };

        reader.readAsDataURL(file);
    });

    $(".openMyChannel").click(async function() {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/messenger'
            });

            if (res.status === 200) {
                await $('.visibleParts').empty().append(res.data);

                messengerPageHandlers(null, currentUser.channel);
                audioFileHandlers();
            }
        } catch (err) {
            alert("something went wrong");
            console.log(err);
        }
    });

    audioFileHandlers();
};

const albumsHandlers = function() {
    $(".loadAlbumTracks").off('click').click(async function() {
        try {
            const res = await axios({
                method: "GET",
                url: `/api/v1/mediafiles/album/${this.parentNode.id}`
            });

            if (res.status == 200) {
                await $("#tracksHolder").empty();
                await $("#tracksHolder").append('<button class="link_button" id="albumsListBack">Назад</button>');
                console.log(res.data);
                await printPlaylistTracks(res.data);
                audioFileHandlers();

                $("#albumsListBack").click(async function() {
                    try {
                        const res1 = await axios({
                            method: 'GET',
                            url: `/api/v1/mediafiles/${currentUser._id}`
                        });
                        
                        if (res1.status === 200) {
                            await $("#tracksHolder").empty();
                            await printPlaylistTracks(res1.data.data);
                            audioFileHandlers();
                        }
                    } catch (err) {
                        console.log(err);
                    }
                })
            }
        } catch (err) {
            console.log(err);
        }
    });

    $(".deleteAlbum").click(async function() {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `/api/v1/albums/${this.parentNode.parentNode.id}`,
            });

            if (res.status === 203) {
                await updateAlbumsList(currentUser._id);
                albumsHandlers();
            }
        } catch (err) {
            console.log(err);
        }
    });
}

const printPlaylistTracks = async (tracks) => {
    for (let i = 0; i < tracks.length; i++) {
        await $("#tracksHolder").append(
            `
                <div class="track" id="${tracks[i]._id}" data-key="${tracks[i].audioKey}" data-cover="${tracks[i].coverKey}" data-authorname="${tracks[i].artist.name}" data-trackname="${tracks[i].name}">
                    <div class="track_item">

                        <div style="display: flex; align-items: center; gap: 2.4rem;">
                            <div style="width: 5rem; height: 5rem; border-radius: 0.5rem; overflow: hidden; display: flex; align-items: center;">
                                <img src="/api/v1/file/${tracks[i].coverKey}" alt="" width="100%">
                            </div>
                            <p style="font-size: 2rem;">${tracks[i].name}</p>
                        </div>

                        <div style="display: flex; align-items: center; gap: 2.4rem;">
                            <p style="font-size: 1.4rem; color: #ccc;">${tracks[i].artist.name}</p>
                        </div>

                    </div>
                </div>
            `
        )
    }
}

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
            $(".channelLink").attr("id", res.data.data.channel);
        }

        const res1 = await axios({
            method: 'GET',
            url: `/api/v1/mediafiles/${res.data.data._id}`
        });

        if (res1.status === 200) {
            await printPlaylistTracks(res1.data.data);
        }

        await updateAlbumsList(artist);
        albumsHandlers();

    } catch (err) {
        alert("Something went wrongelo tartalelo");
        console.log(err);
    }

    $(".channelLink").click(async function() {
        if (!currentUser.followedChannels.some(el => el === this.id)) {
            let isSubscribed = confirm("Для просмотра канала вы должны на него подписаться! Подписаться на канал?");

            if (isSubscribed) {
                try {
                    const res = await axios({
                        method: 'PATCH',
                        url: `/api/v1/users/addChannel/${currentUser._id}`,
                        data: {
                            channel: this.id
                        }
                    });

                    if (res.status === 200) {
                        alert("Неплохо так подписался на канал!");
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            else {
                return;
            }
        }

        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/messenger'
            });

            if (res.status === 200) {
                await $('.visibleParts').empty().append(res.data);

                messengerPageHandlers(null, this.id);
                audioFileHandlers();
            }
        } catch (err) {
            alert("something went wrong");
            console.log(err);
        }

    });

    audioFileHandlers();
};

const mainPageHandlers = function() {
    $("#logout").click(async function() {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/users/logout'
            });

            if (res.status === 200) {
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
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
        const role = $("#regUserRole").val();
        const file = $("#regpic")[0].files[0];
        const formData = new FormData();

        if (file)
        {
            formData.append('file', file);
        }
        try {
            if (name && email && password && passwordConfirm && role)
            {
                let channel;

                const fav = await axios({
                    method: 'POST',
                    url: '/api/v1/playlists',
                    data: {
                        name: 'Favourites',
                        type: 'Favourites'
                    }
                });
                
                if (role === "artist") {
                    try {
                        const channelReq = await axios({
                            method: 'POST',
                            url: '/api/v1/channels',
                            data: {
                                name
                            }
                        });

                        if (channelReq.status === 201) {
                            channel = channelReq.data._id;
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }

                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/file/upload',
                    data: formData
                });
    
                if (res.data.data.key) 
                {
                    console.log(channel);
                    const res1 = await axios({
                        method: 'POST',
                        url: '/api/v1/users/signup',
                        data: {
                            name, 
                            email,
                            password,
                            passwordConfirm,
                            photoKey: res.data.data.key,
                            favourites: fav.data._id,
                            role,
                            channel
                        }
                    });
    
                    if (res1.status == 201)
                    {
                        alert("Вы были зарегистрированы!");
                        window.location.reload();
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
                    if (res.data.data.user.role === "moderator") {
                        window.location = "/moderator"
                    }
                    else if (res.data.data.user.role === 'user' || res.data.data.user.role === 'artist') {
                        window.location.reload();
                    }
                }
            } catch (err) {
                if (err.status === 403) {
                    alert("Ваш аккаунт заблокирован! 😥");
                }
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

    $(".delapprovereq").off('click').click(async function() {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `/api/v1/requests/approved/${this.parentNode.id}`
            });

            if (res.status == 200) {
                alert("Успех!");
                window.location.reload();
            }
        } catch (err) {
            alert("Something went catastrofically wrong");
            console.log(err);
        }
    });

    $(".delcancelreq").off('click').click(async function() {
        try {
            const res = await axios({
                method: 'DELETE',
                url: `/api/v1/requests/canceled/${this.parentNode.id}`
            });

            if (res.status == 200) {
                alert("Успех!");
                window.location.reload();
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
            topMenuHandlers();
        } catch (err) {
            alert("SOmethign went extremely outragegous");
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

    $(".searchBtn").click(async function(el) {
        el.preventDefault();
        const userInput = $(".searchInput").val();
        if (userInput) {
            await $(".middle_part").children().hide();
            await $("#searchResultsBox").remove();

            await $(".middle_part").append(`
                <div id="searchResultsBox">
                    <p style="font-size: 2.8rem; margin-bottom: 3rem;" id="searchTitle">Поиск</p>
                    <button class="link_button " style="margin-right: 2rem;" id="backSearch">Назад</button>
                    <button class="link_button " style="margin-right: 2rem;" id="searchTracks">Треки</button>
                    <button class="link_button " style="margin-right: 2rem; margin-bottom: 3rem;" id="searchAuthors">Исполнители</button>
                    <div id="tracksHolder"></div>
                </div>
            `);

            try {
                const res = await axios({
                    method: 'GET',
                    url: `/api/v1/mediafiles/search/${userInput}`
                });

                if (res.status === 200) {
                    await $('#tracksHolder').empty();
                    await printPlaylistTracks(res.data);
                    audioFileHandlers();
                }
            } catch (err) {
                console.log(err);
            }

            $("#searchAuthors").click(async function() {
                try {
                    const res = await axios({
                        method: 'GET',
                        url: `/api/v1/users/authors/search/${userInput}`
                    });

                    if (res.status === 200) {
                        await $('#tracksHolder').empty();
                        const authors = res.data;
                        for (let i = 0; i < authors.length; i++) {
                            await $("#tracksHolder").append(`
                                <div class="searchAuthorItemBox searchAuthorItem" data-artistid="${authors[i]._id}">
                                    <div style="width: 10rem; height: 10rem; border-radius: 2rem; overflow: hidden;display: flex; align-items: center; justify-content: center;"><img src="/api/v1/file/${authors[i].photoKey}" width="100%"></div>
                                    <p style="font-size: 2.4rem;">${authors[i].name}</p>
                                </div>
                                `);
                        }

                        $(".searchAuthorItem").click(async function() {
                            try {
                                const res = await axios({
                                    method: 'GET',
                                    url: '/api/v1/html/artistPage'
                                });

                                let rs = $(".right_section");
                                rs.empty();
                                await rs.append(res.data.data.html);

                                artistPageHandlers(this.dataset.artistid);
                                topMenuHandlers();
                            } catch (err) {
                                alert("SOmethign went extremely outragegous");
                                console.log(err);
                            }
                        });
                    }
                } catch (err) {
                    console.log(err);
                }
            });

            $("#searchTracks").click(async function() {
                try {
                    const res = await axios({
                        method: 'GET',
                        url: `/api/v1/mediafiles/search/${userInput}`
                    });

                    if (res.status === 200) {
                        await $('#tracksHolder').empty();
                        await printPlaylistTracks(res.data);
                        audioFileHandlers();
                    }
                } catch (err) {
                    console.log(err);
                }
            });

            $("#backSearch").click(async function() {
                $("#searchResultsBox").remove();
                $(".middle_part").children().show();
            });
        }
    });

    $(".messenger_button").click(async function() {
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/html/messenger'
            });

            if (res.status === 200) {
                await $('.visibleParts').empty().append(res.data);

                messengerPageHandlers();
                audioFileHandlers();
            }
        } catch (err) {
            alert("something went wrong");
            console.log(err);
        }
    });
};

const topMenuHandlers = (req, res) => {
    $("#friendsPage").off('click').click(async function () {
        $(".underline").fadeOut(100, function() {$(this).remove()});
        $(this).append('<div class="underline"></div>');
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

    $("#mainPageLink").off('click').click(async function() {
        $(".underline").fadeOut(100, function() {$(this).remove()});
        $(this).append('<div class="underline"></div>');

        await loadMainPage();
    });
};

$(document).ready(async function() {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/me'
        });

        currentUser = res.data;

        if (currentUser.role === 'artist') {
            await $(".audio_hosting_menu").append(`
                <div class="hosting_menu_item hover_effect" id="artistPageLink">
                    <div class="active_hosting_page hidden"></div>
                    <img class="hosting_image" src="/data/icons/user.png" alt="">
                    <p class="hosting_menu_text">Артист Ну Артист</p>
                </div>    
            `);

            await $(".management_menu").append(`
                <div class="management_menu">
                    <div class="management_title_box">
                        <div class="title_box">
                        <img src="/data/icons/profile.png" alt="" style="width: 2.5rem;">
                        <p class="management_menu_title">Управление</p>
                        </div>
                        <img class="togo_management_icon" src="/data/icons/yellow_next.png" alt="">
                    </div>
                    
                    <div class="stats_container">
                        <div class="stats_holder" id="openStatistic">
                        <img src="/data/icons/loading.png" alt="">
                        <div class="stats_box">
                            <p class="stat_title">Статистика</p>
                            <p class="stat_info">Ваши треки и альбомы</p>
                        </div>
                        </div>
                    </div>
                    </div>
                `);
            
            $("#artistPageLink").click(async function() {
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
        }

        const randomTracks = await axios({
            method: 'GET',
            url: '/api/v1/mediafiles/getRandomTracks'
        });

        for (let i = 0; i < randomTracks.data.length; i++) {
            await $(".recommend_audio_box").append(`
                <div class="music_box track" data-index="1" id="${randomTracks.data[i]._id}" data-authorname="${randomTracks.data[i].authorInfo.name}" data-trackname="${randomTracks.data[i].name}" data-cover="${randomTracks.data[i].coverKey}" data-key="${randomTracks.data[i].audioKey}">
                    <div class="music_box_inner">
                        <div class="music_image_holder">
                        <img src="/api/v1/file/${randomTracks.data[i].coverKey}" alt="">
                        </div>
                        <div class="music_info">
                        <p class="music_name">${randomTracks.data[i].name}</p>
                        <p class="music_author">${randomTracks.data[i].authorInfo.name}</p>
                        </div>
                    </div>
                    <div class="music_box_inner">
                        <img class="add_music_icon" src="./data/icons/more.png" alt="">
                    </div>
                </div>
            `);
        }

        loadMusic(randomTracks.data[0].audioKey, randomTracks.data[0].coverKey, randomTracks.data[0].authorInfo.name, randomTracks.data[0].name);

        currentTrackId = randomTracks.data[0]._id;
        currentAuthor = randomTracks.data[0].authorInfo.name;
        currentPlayingTrack = randomTracks.data[0].name;
        currentCover = randomTracks.data[0].coverKey;

    } catch (err)
    {
        if (err.status === 403) {
            alert("Ваш аккаунт был заблокирован");
            try {
                const res = await axios({
                    method: 'GET',
                    url: '/api/v1/users/logout'
                });

                if (res.status === 200) {
                    window.location.reload();
                }
            } catch (err) {
                console.log(err);
            }
        }
        console.log(err);
    }

    audioHostingHandlers();
    topMenuHandlers();
    mainPageHandlers();
    audioFileHandlers();
});


const audioFileHandlers = () => {
    let currentTrack;
    updatePlayer();
    $(".likeTrack").off('click').click(async function () {
        if (!currentTrackId) return;
        if (currentUser)
        {
            try {
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/playlists/addTrack/${currentUser.favourites}`,
                    data: {
                        audioFileId: currentTrackId
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

    $(".threeDotsPlaylist").off('click').click(async function () {
        $("#playlistbox").show(200);
        let myPlaylists = await axios({
            method: 'GET',
            url: `/api/v1/playlists/${currentUser._id}`
        });

        myPlaylists = myPlaylists.data.data;

        await $("#wadehell").empty();
        for (let i = 0; i < myPlaylists.length; i++)
        {
            await $("#wadehell").append(
                `
                    <div class="not_item playlist_item" id="${myPlaylists[i]._id}"><p class="not_status">${myPlaylists[i].name}</p></div>
                `
            );
        }

        $(".playlist_item").off('click').click(async function () {
            try {
                const res = await axios({
                    method: 'PATCH',
                    url: `/api/v1/playlists/addTrack/${this.id}`,
                    data: {
                        audioFileId: currentTrackId
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
    });

    $(".playlist_overlay").off('click').click(function(el) {
        if (this !== el.target)  return;
        $("#playlistbox").hide(200);
    });

    

    $(".shareTrack").off('click').click(async function() {
        if (!currentTrackId) return;
            
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
                        mediafile: currentTrackId,
                        author: currentUser._id,
                        chat: this.id
                    }
                });
                
                if (res.status === 204) {
                    alert("Аудиофайл отправлен этому челику");
                }
            } catch (err) {
                alert("Tried to send audiofile to homie didnt work");
                console.log(err);
            }
        });
    });

    $(".chatsOverlay").off('click').click(function(el) {
        if ($(el.target)["0"] == this) {
            $("#shareChats").hide(200);
        }
    });

    $(".track").off('click').click(async function(el) {
        currentTrackId = this.id;
        currentAuthor = this.dataset.authorname;
        currentPlayingTrack = this.dataset.trackname;
        currentCover = this.dataset.cover;
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/mediafiles/listen/${this.id}`
            });
        } catch (err) {
            console.log(err);
        }
        await loadMusic(this.dataset.key, currentCover, currentAuthor, currentPlayingTrack);
        playMusic();
    });
};

const userPageHandlers = async function () {

    $("#userProfilePic").attr('src', `/api/v1/file/${currentUser.photoKey}`);
    $("#userName").text(currentUser.name);
    $("#userEmail").text(currentUser.email);

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
                    <div class="music_box track" id="${favTracks[i]._id}" data-authorname="${favTracks[i].artist.name}" data-trackname="${favTracks[i].name}" data-cover="${favTracks[i].coverKey}" data-key="${favTracks[i].audioKey}">
                        <div class="music_box_inner">
                            <div class="music_image_holder">
                                <img src="/api/v1/file/${favTracks[i].coverKey}" alt="">
                            </div>
                            <div class="music_info">
                                <p class="music_name">${favTracks[i].name}</p>
                                <p class="music_author"></p>
                            </div>
                        </div>
    
                        <div class="putInCenter deleteTrackFromFavorites" style="width: 3rem; height: 3rem; cursor: pointer;" >
                            <img src="./data/icons/delete.png" alt="" width="100%" data-image="yes">
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

    loadPlaylists();

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
                    loadPlaylists();
                }
            } catch (err) {
                alert("Something went wrongelo!!!");
                console.log(err);
            }
        }
    });

    $(".deleteTrackFromFavorites").click(async function() {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/playlists/${currentUser.favourites}`,
                body: {
                    trackId: this.parentNode.id
                }
            });

            if (res.status === 200) {
                $(this.parentNode).hide(200, function() {$(this).remove()});
            }
        } catch (err) {
            console.log(err);
        }
    });

    audioFileHandlers();
};

const loadPlaylists = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/playlists/myPlaylists'
        });

        if (res.status === 200) {
            const playlists = res.data;
            await $("#playlistsList").empty();
            for (let i = 0; i < playlists.length; i++) {
                await $("#playlistsList").append(
                    `
                        <div class="widget_card playlistItem" id="${playlists[i]._id}">
                            <div class="black_fade">
                                <p class="widget_card_name">${playlists[i].name}</p>
                                <div class="putInCenter deletePlaylist" style="width: 3rem; height: 3rem; cursor: pointer;" >
                                    <img src="./data/icons/delete.png" alt="" width="100%" data-image="yes">
                                </div>
                            </div>
                        </div>
                    `
                );
            }

            $('.playlistItem').click(async function(el) {
                if (el.target.dataset.image) return;
                $(".authors_box").hide(200);
                $(".recommendations_box").hide(200);
                $(".widgets_box").hide(200);

                await $(".middle_part").append(`
                        <button class="link_button playlistBack">Назад</button>
                        <div id="tracksHolder"></div>
                    `);
                
                $(".playlistBack").click(function() {
                    $('.authors_box').show(200);
                    $('.recommendations_box').show(200);
                    $('.widgets_box').show(200);

                    $("#tracksHolder").remove();
                    $(this).remove();
                });
                
                try {
                    const res = await axios({
                        method: 'GET',
                        url: `/api/v1/mediafiles/playlist/${this.id}`
                    });

                    if (res.status === 200) {
                        await printPlaylistTracks(res.data);
                    }

                } catch (err) {
                    console.log(err);
                }
            });

            $(".deletePlaylist").click(async function() {
                try {
                    const res = await axios({
                        method: 'DELETE',
                        url: `/api/v1/playlists/${this.parentNode.parentNode.id}`
                    });

                    if (res.status === 203) {
                        $(this.parentNode.parentNode).hide(200, function() {$(this).remove()});
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }
    } catch (err) {
        alert("Хотел вывести плейлисты но чет не пошло крч");
        console.log(err);
    }
}

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
            await $(".friendsSearchHolder").empty();
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
                audioFileHandlers();
            }
        } catch (err) {
            alert("something went wrong");
            console.log(err);
        }
    });
};

const messengerPageHandlers = async function(userid, channelId) {
    let currentChat;
    let updateChat;
    let currentPost;

    if (currentUser.role === 'artist') {
        await $("#chatsList").append(`
             <button class="create_post" id="createPost">
                <img src="./data/icons/plus.png" alt="" width="27rem">
                <p style="font-size: 1.6rem; font-weight: 600;">Создать пост</p>
            </button>
            <div class="ms_message_field channelItem" id="${currentUser.channel}">
                <div style="display: flex; align-items: center; gap: 2rem;">
                    <div class="ms_message_avatar">
                        <img src="/api/v1/file/${currentUser.photoKey}" alt="">
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <p class="ms_message_name">Ваш канал</p>
                    </div>
                </div>
            </div>
            `)
    }

    if (channelId) {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/v1/posts/${channelId}`
            });

            if (res.status === 200) {
                const posts = res.data;

                await printPosts(posts);

                $('.comment_btn').click(function() {
                    $("#commentsBox").show(200);
                    currentPost = this.id;
                    updateCommentSection(currentPost);
                });
            }
        } catch (err) {
            alert("was unable to load posts");
            console.log(err);
        }
    }

    $("#createPost").click(async function() {
        clearInterval(updateChat);
        await $("#messagesHolder").empty().append(`<div class="income_box">
                    <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                        <img src="/api/v1/file/${currentUser.photoKey}" alt="">
                    </div>
                    <div style="width: 100%; padding-top: 1rem;">
                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">${currentUser.name}</p>
                        <div class="ms_message_box ms_post" style="border-top-left-radius: 0; padding: 2rem 0 0 0 ;">
                            <div class="ms_post_pic" id="postPicture">
                                <img src="./data/default_pic.jpg" alt="" id="img_cover">
                            </div>

                            <p style="font-size: 1.8rem; padding: 1rem 2rem; font-weight: 900;" id="postHeader">
                                Заголовок
                            </p>

                            <p style="font-size: 1.4rem; padding: 1rem 2rem; font-weight: 400; line-height: 1.5; white-space: pre-line;" id="postContent">
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

    if (userid)
    {
        try {
            const res = await axios({
                method: 'GET',
                url: `/api/v1/chats/loadChat/${userid}`
            });
        
            if (res.status === 200) {
                currentChat = res.data.id;
                printMessages(currentChat);

                clearInterval(updateChat);
                updateChat = setInterval(() => {
                if (currentChat)
                {
                    printMessages(currentChat);
                }
            }, 1000);
            }
        } catch (err) {
            alert("something went wrongelo");
            console.log(err);
        }
    }

    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/channels/myFollowedChannels'
        });

        if (res.status === 200) {
            const channels = res.data;
            $("#chatsList").append('<p class="chatsListTitle">Каналы</p>');
                for (let i = 0; i < channels.length; i++) {
                    $("#chatsList").append(`
                        <div class="ms_message_field channelItem" id="${channels[i]._id}">
                            <div style="display: flex; align-items: center; gap: 2rem;">
                                <div class="ms_message_avatar">
                                    <img src="./data/icons/connection.png" alt="">
                                </div>
                                <div style="display: flex; flex-direction: column;">
                                    <p class="ms_message_name">Когда нибудь будет</p>
                                </div>
                            </div>
                        </div>
                `)
            }

            $(".channelItem").click(async function() {
                clearInterval(updateChat);
                await loadChannel(this.id);

                $('.comment_btn').click(function() {
                    $("#commentsBox").show(200);
                    currentPost = this.id;
                    updateCommentSection(currentPost);
                });
            });

        }
    } catch (err) {
        console.log(err);
    }

    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/chats/myChats'
        });

        if (res.status == 200) {
            $("#chatsList").append('<p class="chatsListTitle">Сообщения</p>');
                for (let i = 0; i < res.data.length; i++) {
                    let otherUser;
                    if (res.data[i].user1._id === currentUser._id) otherUser = res.data[i].user2;
                    else otherUser = res.data[i].user1;
                    await $("#chatsList").append(`
                        <div class="ms_message_field chatItem" id="${res.data[i]._id}">
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

            $(".chatItem").click(function() {
                currentChat = this.id;
                printMessages(currentChat);

                clearInterval(updateChat);
                updateChat = setInterval(() => {
                    if (currentChat)
                    {
                        printMessages(currentChat);
                    }
                }, 1000);
            });
            
            // updateChat = setInterval(() => {
            //     if (currentChat)
            //     {
            //         printMessages(currentChat._id);
            //     }
            // }, 1000);
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
                        chat: currentChat
                    }
                });

                if (res.status === 204) {
                    printMessages(currentChat);
                }
            } catch (err) {
                alert("something went wronghelo");
                console.log(err);
            }
        }
    });

    // $("#loadChannel").click(async function() {
    //     clearInterval(updateChat);
    //     loadChannel(currentUser.channel);
    // });

    $(".comment_overlay").click(function(el) {
        if ($(el.target)["0"] == this) {
            $("#commentsBox").hide(200);
        }
    });

    $("#sendComment").click(async function(el) {
        el.preventDefault();
        const content = $("#commentContent").val();
        console.log(content, currentPost);

        if (content && currentPost)
        {
            try {
                const res = await axios({
                    method: 'POST',
                    url: '/api/v1/comments',
                    data: {
                        author: currentUser._id,
                        content,
                        post: currentPost
                    }
                });

                if (res.status == 204) {
                    updateCommentSection(currentPost);
                    $("#commentContent").val("");
                }
            } catch (err) {
                alert("Пытался отправить комментарий а вот чета не пошло както");
                console.log(err);
            }
        }
    });

    $(".ms_main_icon").click(async function() {
        clearInterval(updateChat);
        const visibleParts = $(".visibleParts");
        await visibleParts.empty();
        await visibleParts.append('<section class="main_landing"></section>');

        try {
            const res = await axios({
                method: "GET",
                url: '/api/v1/html/leftSection'
            });

            let ml = $('.main_landing');
            await ml.append(res.data);
            await ml.append("<section class='right_section'></section>");

            if (currentUser.role === 'artist') {
                await $(".audio_hosting_menu").append(`
                    <div class="hosting_menu_item hover_effect" id="artistPageLink">
                        <div class="active_hosting_page hidden"></div>
                        <img class="hosting_image" src="/data/icons/user.png" alt="">
                        <p class="hosting_menu_text">Артист Ну Артист</p>
                    </div>    
                `);

                await $(".management_menu").append(`
                <div class="management_menu">
                    <div class="management_title_box">
                        <div class="title_box">
                        <img src="/data/icons/profile.png" alt="" style="width: 2.5rem;">
                        <p class="management_menu_title">Управление</p>
                        </div>
                        <img class="togo_management_icon" src="/data/icons/yellow_next.png" alt="">
                    </div>
                    
                    <div class="stats_container">
                        <div class="stats_holder" id="openStatistic">
                        <img src="/data/icons/loading.png" alt="">
                        <div class="stats_box">
                            <p class="stat_title">Статистика</p>
                            <p class="stat_info">Ваши треки и альбомы</p>
                        </div>
                        </div>
                    </div>
                    </div>
                `);
                
                $("#artistPageLink").click(async function() {
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
            }

            audioHostingHandlers();

            loadMainPage();
        } catch (err) {
            console.log(err);
        }

    });
};

const updateCommentSection = async function(postId) {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/comments/${postId}`
        });

        if (res.status === 200) {
            const comments = res.data;
            const actualComments = $("#actualComments");
            await actualComments.empty();

            for (let i = 0; i < comments.length; i++) {
                if (comments[i].author.status === "blocked") continue;
                await actualComments.append(`
                        <div class="income_box" id="${comments[i]._id}">
                            <div class="putInCenter createBlockRequest" style="width: 3rem; height: 3rem; cursor: pointer;" >
                                <img src="./data/icons/exclamation.png" alt="" width="100%">
                            </div>
                            <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                <img src="/api/v1/file/${comments[i].author.photoKey}" alt="">
                            </div>
                            <div style="width: 40%; padding-top: 1rem;">
                                <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">${comments[i].author.name}</p>
                                <div class="ms_message_box" style="border-top-left-radius: 0;">
                                    <p class="ms_message_content">${comments[i].content}</p>
                                </div>
                            </div>
                        </div>
                    `);
            }

            $(".createBlockRequest").click(async function() {
                try {
                    const res = await axios({
                        method: 'POST',
                        url: `/api/v1/blockRequests`,
                        data: {
                            commentId: this.parentNode.id
                        }
                    });

                    if (res.status === 201) {
                        alert('Заявка была создана');
                    }
                } catch (err) {
                    console.log(err);
                }
            });
        }
    } catch (err) {
        alert("Чет не получилось коммента загрузить крч");
        console.log(err);
    }
};

const loadChannel = async function(channelId) {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/posts/${channelId}`
        });

        if (res.status === 200) {
            const posts = res.data;

            await printPosts(posts);
        }
    } catch (err) {
        alert("was unable to load posts");
        console.log(err);
    }
}

const printPosts = async function(posts) {
    await $("#messagesHolder").empty();
    for (let i = 0; i < posts.length; i++) {
        await $("#messagesHolder").append(`
                <div class="income_box">
                    <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                        <img src="./data/icons/connection.png" alt="">
                    </div>
                    <div style="width: 100%; padding-top: 1rem;">
                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;"></p>
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

                            <div class="comment_btn" id="${posts[i]._id}">
                                <p>Смотреть комментарии ---></p>
                            </div>

                        </div>
                    </div>
                </div>
            `)
    }
}

const printMessages = async function(chatid) {
    try {
        const res = await axios({
            method: 'GET',
            url: `/api/v1/chats/${chatid}`
        });

        if (res.data.status === "still") return;

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
                            <div class="outcome_box messenger_file" style="justify-content: right;" data-authorname="${messages[i].mediafile.artist.name}" data-cover="${messages[i].mediafile.coverKey}" data-key="${messages[i].mediafile.audioKey}" data-trackname="${messages[i].mediafile.name}" id="${messages[i].mediafile._id}">
                                <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; text-align: right; color: #eee;">${currentUser.name}</p>
                                <div class="ath_song_card" style="float: right; width: 40rem; height: 20rem; margin-top: 1rem;">
                                    <div class="ath_song_info">
                                        <div style="display: flex; align-items: center; gap: 1rem;">
                                            
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
                                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; text-align: right; color: #eee;">${currentUser.name}</p>
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
                                        <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">${otherUser.name}</p>
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
            
            $(".messenger_file").click(async function() {
                currentTrackId = this.id;
                currentAuthor = this.dataset.authorname;
                currentPlayingTrack = this.dataset.trackname;
                currentCover = this.dataset.cover;

                try {
                    const res = await axios({
                        method: 'PATCH',
                        url: `/api/v1/mediafiles/listen/${this.id}`
                    });
                } catch (err) {
                    console.log(err);
                }
                await loadMusic(this.dataset.key, currentCover, currentAuthor, currentPlayingTrack);
                playMusic();
            });

            const mh = document.querySelector("#messagesHolder");
            mh.scrollTo(0, mh.scrollHeight);
        }
    } catch (err) {
        console.log(err);
        if (updateChat)
        {
            clearInterval(updateChat);
        }
        console.log(err);
    }
};

const updatePlayer = function() {
    $(".playBtn").off('click').click(() => togglePlay());
    $(".progress_bar").click(setProgressBar);
    $('.music_player_sound_bar').click(setSoundBar);

    if (currentCover && currentAuthor && currentPlayingTrack)
    {
        $(".songImage").attr('src', `/api/v1/file/${currentCover}`);
        $(".music_player_name").text(currentPlayingTrack);
        $(".music_player_author").text(currentAuthor);

        checkPlaying();
    }

}
