exports.getAuthorPage = () => {
    return `
        <section class="right_section">

            <header class="top_menu_bar">

                <div class="top_menu_item">
                    <p class="top_menu_title">Главная</p>
                    <div class="underline"></div>
                </div>

                <div class="top_menu_item">
                    <p class="top_menu_title">Друзья</p>
                    <div class="underline dp_none"></div>
                </div>

            </header>

                <section class="main_section">

                    <section class="middle_part" style="display: flex; flex-direction: column;">

                        <div style="display: flex; align-items: center; gap: 5rem; margin-bottom: 5rem;">

                            <div style="width: 15rem; height: 15rem; border-radius: 50%; box-shadow: 0 0 2rem 0 rgba(255, 255, 255, 0.356); overflow: hidden;">
                                <div style="width: 100%; height: 100%; display: flex; align-items: center;">
                                    <img src="./data/authors/2cd312b369f6377166237a03b7215b56.jpg" alt="" style="width: 100%;" id="authorprofilepic">
                                </div>
                            </div>

                            <div>
                                <p style="font-size: 3.6rem; margin-bottom: 1.4rem;" id="authorprofilename">Psychosis</p>
                                <div style="display: flex; align-items: center; gap: 3rem;">
                                    <button class="link_button">Сообщество</button>
                                    <button class="link_button" id="upload_track"><img src="" alt="">Выпустить трек</button>
                                </div>
                            </div>

                        </div>
                        
                        <div style="height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 5rem 52rem; min-width: 0; min-height: 0;">
                            <div>
                                <p style="font-size: 2.4rem; margin-bottom: 1rem;">Треки</p>
                            </div>
                            
                            <div style="overflow: scroll; min-width: 0;display: flex; flex-direction: column;" id="tracksHolder">

                            </div>

                            <div class="lmao_why"></div>
                            
                        </div>


                    </section>

                    <section class="right_part">

                        <div>
                            <p style="font-size: 2.4rem; margin-bottom: 1.2rem;">Альбомы</p>
                            <div style="position: relative;">
                                <div class="releases_list" id="albums_list">

                                    <div style="width: 24rem; display: flex; flex-direction: column; gap: 1.6rem;" id="createAlbum">
                                        <div class="album_cover" style="display: flex; align-items: center; justify-content: center; border: solid 0.1rem white;">
                                            <img width="100%" src="./data/icons/plus.png" alt="" style="width: 50%!important;">
                                        </div>
                                    </div>

                                    <div style="width: 24rem; display: flex; flex-direction: column; gap: 1.6rem;">
                                        <div class="album_cover">
                                            <img width="100%" src="./data/798f95310210edaf016bd94126d2ec96.jpg" alt="">
                                        </div>
                                        <div>
                                            <p class="album_name">День когда я умер</p>
                                            <p class="item_type">Альбом</p>
                                        </div>
                                    </div>

                                </div>
                                <div class="left_btn left_btn_1">
                                    <img src="./data/icons/left-arrow.png" alt="">
                                </div>
        
                                <div class="right_btn right_btn_1">
                                    <img src="./data/icons/right-arrow.png" alt="">
                                </div>                                
                            </div>
                        </div>

                        <div class="music_player_box">
                            <div class="music_player_link">
                                <p class="music_player_title title_style">Сейчас играет: Фавориты</p>
                                <img src="./data/icons/pink_next.png" alt="">
                            </div>
                            <p class="music_player_type subtitle_style">Single</p>
                            <div class="music_player">
                                <div class="white_shine">
                                    <div class="music_photo">
                                        <img src="./data/798f95310210edaf016bd94126d2ec96.jpg" alt="" class="songImage">
                                    </div>
                                </div>
                                <div class="music_player_components_box">
                                    <div class="music_player_title_box">
                                        <div>
                                            <p class="music_player_name">грааль</p>
                                            <p class="music_player_author">Psychosis</p>
                                        </div>
                                        <div>
                                            <img src="./data/icons/share.png" alt="" class="share_button shareTrack">
                                            <img src="./data/icons/more.png" alt="" class="likeTrack">
                                            <img src="./data/icons/threedots.png" alt="" class="threeDotsPlaylist" style="margin-left: 1.4rem;">
                                            
                                        </div>
                                    </div>
                                    <div class="progress_bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div class="music_player_duration_box">
                                        <p class="currentTime">0:44</p>
                                        <p class="duration">2:17</p>
                                    </div>
                                    <div class="music_player_interact_box">
                                        <div class="music_player_control_buttons">
                                            <img src="./data/icons/moveLeft.png" alt="" class="prevBtn">
                                            <img src="./data/icons/right.png" alt="" class="playBtn">
                                            <img src="./data/icons/moveRight.png" alt="" class="nextBtn">
                                        </div>
                                        <div class="music_player_sound_control">
                                            <img src="./data/icons/volume.png" alt="" style="width: 2rem;">
                                            <div class="music_player_sound_bar">
                                                <div class="music_player_volume"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </section>
            
        </section>
        <div class="to_hide dp_none" id="upload_hide">
            <div class="upload_overlay default">
                <div class="upload_box">
                    <div class="default" style="gap: 5rem; margin-bottom: 4rem;">
                        <div class="upload_mediabox default" id="up_cov">
                            <img src="./data/icons/cover_img.png" alt="">
                        </div>
                        <div class="upload_mediabox default" id="up_aud">
                            <img src="./data/icons/music-player.png" alt="">
                        </div>
                    </div>
                    <p>Название трека</p>
                    <input type="text" style="margin-bottom: 2rem;" id="trackname">
                    <p>Текст песни</p>
                    <textarea name="" style="margin-bottom: 4rem;" id="tracktext"></textarea>

                    <button class="link_button" id="createrequest">Отправить</button>
                </div>
            </div>
        </div>
        
        <input type="file" id="upload_cover" style="display: none;"></input>
        <input type="file" id="upload_audio" style="display: none;"></input>

    `;
}

exports.getUserPage = user => {
    return `
        <div class="userStatBox">
            <div style="display: flex; flex-direction: column; align-items: center; gap: 2rem;">
                <div class="userInfoPic">
                    <img id="userProfilePic" src="./data/users/77685a2078a2e86d2bdfd685a6d6f7ff.jpg" alt="" width="100%">
                </div>
                <button class="link_button" style="height: 2rem; display: flex; align-items: center; justify-content: center;">
                    <img src="./data/icons/edit.png" alt="" height="20rem">
                </button>
            </div>
            <div>
                <p style="font-size: 2.4rem;" id="userName">Таинственный мухамор</p>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;" id="userEmail">gti230504@gmail.com</p>
                <button class="link_button" style="height: 2rem; display: flex; align-items: center; justify-content: center;">
                    <img src="./data/icons/edit.png" alt="" height="20rem">
                </button>
            </div>
        </div>

        <div class="authors_box">
            <div class="authors_link_box">
                <p class="authors_title title_style">Друзья</p>
                <img src="./data/icons/pink_next.png" alt="" class="authors_link">
            </div>
            <p class="genres_title subtitle_style">Начните общение</p>

            <div class="authors_list_box" id="myFriendsList">

                <div class="author_holder">

                    <div class="author_image_holder">
                        <img src="./data/authors/79bc6917c56dbf8f278052913a5e32fa.jpg" alt="">
                    </div>

                </div>
            </div>
        </div>

        <div class="recommendations_box" style="margin-bottom: 5rem;">
            <p class="recommendation_title title_style">Фавориты</p>
            <p class="recommendation_info subtitle_style">Добавляйте треки в свои фавориты</p>
            <div class="recommend_audio_box" id="usersFavourites">
             
            </div>
        </div>

        <div class="widgets_box">

            <p class="widget_title title_style">Плейлисты</p>
            <button class="link_button" style="margin-bottom: 2rem;" id="createPlaylist">Добавить</button>
            <div class="widget_cards_box" id="playlistsList">
            
            </div>
            
        </div>
    `;
}

exports.getArtistPage = () => {
    return `
        <section class="right_section">

            <header class="top_menu_bar">

                <div class="top_menu_item">
                    <p class="top_menu_title" id="mainPageLink">Главная</p>
                    <div class="underline"></div>
                </div>

                <div class="top_menu_item">
                    <p class="top_menu_title" id="friendsPage">Друзья</p>
                    <div class="underline dp_none"></div>
                </div>

            </header>

                <section class="main_section">

                    <section class="middle_part" style="display: flex; flex-direction: column;">

                        <div style="display: flex; align-items: center; gap: 5rem; margin-bottom: 5rem;">

                            <div style="width: 15rem; height: 15rem; border-radius: 50%; box-shadow: 0 0 2rem 0 rgba(255, 255, 255, 0.356); overflow: hidden;">
                                <div style="width: 100%; height: 100%; display: flex; align-items: center;">
                                    <img src="./data/authors/2cd312b369f6377166237a03b7215b56.jpg" alt="" style="width: 100%;" id="authorprofilepic">
                                </div>
                            </div>

                            <div>
                                <p style="font-size: 3.6rem; margin-bottom: 1.4rem;" id="authorprofilename">Psychosis</p>
                                <div style="display: flex; align-items: center; gap: 3rem;">
                                    <button class="link_button channelLink">Сообщество</button>
                                </div>
                            </div>

                        </div>

                        <div style="height: 100%; display: grid; grid-template-columns: 1fr; grid-template-rows: 5rem 52rem; min-width: 0; min-height: 0;">
                            <div>
                                <p style="font-size: 2.4rem; margin-bottom: 1rem;">Треки</p>
                            </div>
                            
                            <div style="overflow: scroll; min-width: 0;display: flex; flex-direction: column;" id="tracksHolder">
                                
                                <div class="track">
                                    <div class="track_item">

                                        <div style="display: flex; align-items: center; gap: 2.4rem;">
                                            <div style="width: 5rem; height: 5rem; border-radius: 0.5rem; overflow: hidden; display: flex; align-items: center;">
                                                <img src="./data/3baa4d90ebd753568b6b3452dc250796.jpg" alt="" width="100%">
                                            </div>
                                            <p style="font-size: 2rem;">исчезаю</p>
                                        </div>

                                        <div style="display: flex; align-items: center; gap: 2.4rem;">
                                            <p style="font-size: 1.4rem; color: #ccc;">Psychosis, Апология</p>
                                            <img src="./data/icons/share.png" alt="" width="20rem">
                                            <img src="./data/icons/more.png" alt="" width="20rem">
                                            <p style="font-size: 1.4rem; color: #ccc;">2:53</p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                            <div class="lmao_why"></div>
                            
                        </div>


                    </section>

                    <section class="right_part">

                        <div>
                            <p style="font-size: 2.4rem; margin-bottom: 1.2rem;">Альбомы</p>
                            <div style="position: relative;">
                                <div class="releases_list" id="albums_list">

                                    <div style="width: 24rem; display: flex; flex-direction: column; gap: 1.6rem;">
                                        <div class="album_cover">
                                            <img width="100%" src="./data/798f95310210edaf016bd94126d2ec96.jpg" alt="">
                                        </div>
                                        <div>
                                            <p class="album_name">День когда я умер</p>
                                            <p class="item_type">Альбом</p>
                                        </div>
                                    </div>

                                </div>
                                <div class="left_btn left_btn_1">
                                    <img src="./data/icons/left-arrow.png" alt="">
                                </div>
        
                                <div class="right_btn right_btn_1">
                                    <img src="./data/icons/right-arrow.png" alt="">
                                </div>                                
                            </div>
                        </div>

                        <div class="music_player_box">
                            <div class="music_player_link">
                                <p class="music_player_title title_style">Сейчас играет: Фавориты</p>
                                <img src="./data/icons/pink_next.png" alt="">
                            </div>
                            <p class="music_player_type subtitle_style">Single</p>
                            <div class="music_player">
                                <div class="white_shine">
                                    <div class="music_photo">
                                        <img src="./data/798f95310210edaf016bd94126d2ec96.jpg" alt="" class="songImage">
                                    </div>
                                </div>
                                <div class="music_player_components_box">
                                    <div class="music_player_title_box">
                                        <div>
                                            <p class="music_player_name">грааль</p>
                                            <p class="music_player_author">Psychosis</p>
                                        </div>
                                        <div>
                                            <img src="./data/icons/share.png" alt="" class="share_button shareTrack">
                                            <img src="./data/icons/more.png" alt="" class="likeTrack">
                                            <img src="./data/icons/threedots.png" alt="" class="threeDotsPlaylist" style="margin-left: 1.4rem;">
                                        </div>
                                    </div>
                                    <div class="progress_bar">
                                        <div class="progress"></div>
                                    </div>
                                    <div class="music_player_duration_box">
                                        <p class="currentTime">0:44</p>
                                        <p class="duration">2:17</p>
                                    </div>
                                    <div class="music_player_interact_box">
                                        <div class="music_player_control_buttons">
                                            <img src="./data/icons/moveLeft.png" alt="" class="prevBtn">
                                            <img src="./data/icons/right.png" alt="" class="playBtn">
                                            <img src="./data/icons/moveRight.png" alt="" class="nextBtn">
                                        </div>
                                        <div class="music_player_sound_control">
                                            <img src="./data/icons/volume.png" alt="" style="width: 2rem;">
                                            <div class="music_player_sound_bar">
                                                <div class="music_player_volume"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </section>

                </section>
            
        </section>
        <div class="to_hide dp_none" id="upload_hide">
            <div class="upload_overlay default">
                <div class="upload_box">
                    <div class="default" style="gap: 5rem; margin-bottom: 4rem;">
                        <div class="upload_mediabox default" id="up_cov">
                            <img src="./data/icons/cover_img.png" alt="">
                        </div>
                        <div class="upload_mediabox default" id="up_aud">
                            <img src="./data/icons/music-player.png" alt="">
                        </div>
                    </div>
                    <p>Название трека</p>
                    <input type="text" style="margin-bottom: 2rem;" id="trackname">
                    <p>Текст песни</p>
                    <textarea name="" style="margin-bottom: 4rem;" id="tracktext"></textarea>

                    <button class="link_button" id="createrequest">Отправить</button>
                </div>
            </div>
        </div>

        <div class="to_hide dp_none" id="playlistbox">
            <div class="playlist_overlay">
                <div class="not_box" id="wadehell">

                </div>
            </div>
        </div>
        
        <input type="file" id="upload_cover" style="display: none;"></input>
        <input type="file" id="upload_audio" style="display: none;"></input>

    `;
}

exports.getFriendsPage = () => {
    return `
        <div class="search_box">
            <p class="search_title title_style">Поиск друзей</p>
            <p class="search_info subtitle_style">Добавляйте людей в список своих друзей</p>
            <form action="" class="search_bar_holder">
                <input id="friendInput" type="text" placeholder="Найти друга..." class="search_bar">
                <button class="search_button" id="findFriends">Найти</button>
            </form>
        </div>
        <div class="friendsSearchHolder"></div>
    `
};

exports.getMessengerPage = () => {
    return `
        <header class="ms_top_section">
        <section class="ms_main_icon">
            <img src="./data/icons/white_home.png" alt="mainlink_img">
        </section>
        <section style="padding: 2rem 4rem; display: flex; align-items: center; background-color: #242424; border-bottom: 0.1rem solid #888;">
            <form action="" style="width: 100%;">
                <input type="text" class="ms_find_user_input" placeholder="Поиск по имени...">
            </form>
        </section>
        <section style="display: flex; align-items: center; padding-left: 4rem; background-color: #242424;">
            <div class="ms_player">
                <img src="./data/icons/moveLeft.png" alt="" style="width: 1.5rem;">
                <img src="./data/icons/right.png" alt="" style="width: 2rem;" class="playBtn">
                <img src="./data/icons/moveRight.png" alt="" style="width: 1.5rem;">
                <div class="ms_player_cover">
                    <img src="./data/798f95310210edaf016bd94126d2ec96.jpg" alt="" class="songImage">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <p style="font-size: 1.2rem;" class="music_player_name">аффект</p>
                    <p style="color: #b9b9b9; margin-bottom: 0.8rem; font-size: 1.2rem;" class="music_player_author">Psychosis, godtearz, Апология</p>
                    <div class="progress_bar ms_progress_bar">
                        <div class="progress ms_progress"></div>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <img src="./data/icons/volume.png" alt="" style="width: 2rem;">
                    <div class="music_player_sound_bar ms_volume_bar">
                        <div class="music_player_volume ms_volume"></div>
                    </div>
                </div>
            </div>
        </section>
    </header>

    <main class="ms_main_section">
        <section style="display: flex; flex-direction: column; justify-content: center; background-color: #1b1b1b;">

            <div class="ms_link_box">
                <img src="./data/icons/white_email.png" alt="">
            </div>

            <div class="ms_link_box">
                <img src="./data/icons/white_group.png" alt="">
            </div>

        </section>
        <section style="overflow: scroll; background-color: #242424;" id="chatsList">          
            
        </section>

        <section style="display: grid; grid-template-columns: 1fr;grid-template-rows: 1fr 10rem; min-height: 0; min-width: 0;">
            
            <section class="ms_messages_box" id="messagesHolder">
                
            </section>
            
            <section class="ms_message_input_box">
                <form action="" style="width: 100%; display: flex; gap: 2rem; align-items: center;" id="formCreationPost">
                    <input type="text" placeholder="Напишите сообщение..." class="ms_message_input" id="messageInput">
                    <button class="send_message" id="sendMessage">Отправить</button>
                </form>
            </section>

        </section>

        <section class="ms_mediafiles_section">

            <p class="title_style" style="color: #eee; margin-bottom: 1.5rem;">Медиафайлы</p>

        </section>
        </main>
        <div class="to_hide dp_none" id="commentsBox">
            <div class="comment_overlay">
                <div class="comment_box">
                    <p style="font-size: 1.8rem; margin-bottom: 2rem;">Комментарии</p>
                    <div class="comment_section">
                        <div style="overflow: scroll;" id="actualComments">
                            <div class="income_box">
                                <div class="ms_message_avatar" style="width: 5rem; height: 5rem;">
                                    <img src="./data/12dcd2799b4e5ead1b94fe052ab30568.jpg" alt="">
                                </div>
                                <div style="width: 40%; padding-top: 1rem;">
                                    <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: #eee;">Уважаемый - <span>8:40</span></p>
                                    <div class="ms_message_box" style="border-top-left-radius: 0;">
                                        <p class="ms_message_content"></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="ms_message_input_box comment_input_box">
                            <form action="" style="width: 100%; display: flex; gap: 2rem; align-items: center;">
                                <input type="text" placeholder="Напишите сообщение..." class="ms_message_input comment_message_input" id="commentContent">
                                <button class="send_message" id="sendComment">Отправить</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

exports.getMainPage = () => {
    return `
      <header class="top_menu_bar">
        <div class="top_menu_item" id="mainPageLink">
          <p class="top_menu_title">Главная</p>
          <div class="underline"></div>
        </div>
        
        <div class="top_menu_item" id="friendsPage">
          <p class="top_menu_title">Друзья</p>
          <div class="underline dp_none"></div>
        </div>
      </header>
      
      <section class="main_section">
        <section class="middle_part">
          <div class="authors_box">
            <div class="authors_link_box">
              <p class="authors_title title_style">Топ исполнители</p>
              <img class="authors_link" src="./data/icons/pink_next.png" alt="">
            </div>
            <p class="genres_title subtitle_style">Ислледуйте новые жанры</p>
            
            <div class="authors_list_box" id="topArtistsList">
              
            </div>
          </div>
          
          <div class="widgets_box">
            <p class="widget_title title_style">Вам понравится</p>
            <div class="widget_cards_box">
              <div class="widget_card">
                <div class="black_fade">
                  <p class="widget_card_name">Недавние</p>
                  <p class="widget_card_info">saybyetome!, aokigahara, nowayback, Nutakoe, auratoshi</p>
                </div>
              </div>
              <div class="widget_card">
                <div class="black_fade">
                  <p class="widget_card_name">Недавние</p>
                  <p class="widget_card_info">saybyetome!, aokigahara, nowayback, Nutakoe, auratoshi</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="recommendations_box">
            <p class="recommendation_title title_style">Рекоммендации</p>
            <p class="recommendation_info subtitle_style">Добавляйте треки в свои фавориты</p>
            <div class="recommend_audio_box">
              <div class="music_box" data-index="1">
                <div class="music_box_inner">
                  <div class="music_image_holder">
                    <img src="./data/CRAZY.jpg" alt="">
                  </div>
                  <div class="music_info">
                    <p class="music_name">CRAZY</p>
                    <p class="music_author">LE SSERAFIM</p>
                  </div>
                </div>
                <div class="music_box_inner">
                  <p class="music_duration">2:44</p>
                  <img class="add_music_icon" src="./data/icons/more.png" alt="">
                </div>
              </div>
              
              <div class="music_box" data-index="2">
                <div class="music_box_inner">
                  <div class="music_image_holder">
                    <img src="./data/ЗАСТРЕЛИЛИ.jpg" alt="">
                  </div>
                  <div class="music_info">
                    <p class="music_name">Застрелили!</p>
                    <p class="music_author">h1deki</p>
                  </div>
                </div>
                <div class="music_box_inner">
                  <p class="music_duration">2:58</p>
                  <img class="add_music_icon" src="./data/icons/more.png" alt="">
                </div>
              </div>
              
              
            </div>
          </div>
        </section>
        
        <section class="right_part">
          <div class="search_box">
            <p class="search_title title_style">Поиск</p>
            <p class="search_info subtitle_style">Более 1000+ композиций</p>
            <form class="search_bar_holder" action="">
              <input class="search_bar searchInput" type="text" placeholder="Любимые исполнители...">
              <button class="search_button searchBtn">Найти</button>
            </form>
          </div>
          
          <div class="messenger_box">
            <p class="messenger_box_title title_style">4 000+ пользователей уже на платформе</p>
            <div class="messenger_card">
              <div>
                <p class="messenger_card_title">Мессенджер</p>
                <p class="messenger_card_info">Делитесь вашими эмоциями и треками с друзьями. Прослушайте рекоммендации ваших друзей и их любимые треки</p>
              </div>
              <div>
                <button class="messenger_button">Начать общение</button>
              </div>
            </div>
          </div>
          
          <div class="music_player_box">
            <div class="music_player_link">
              <p class="music_player_title title_style">Сейчас играет: Фавориты</p>
              <img src="./data/icons/pink_next.png" alt="">
            </div>
            <p class="music_player_type subtitle_style">Single</p>
            <div class="music_player">
              <div class="white_shine">
                <div class="music_photo">
                  <img class="songImage" src="./data/798f95310210edaf016bd94126d2ec96.jpg" alt="">
                </div>
              </div>
              <div class="music_player_components_box">
                <div class="music_player_title_box">
                  <div>
                    <p class="music_player_name">грааль</p>
                    <p class="music_player_author">Psychosis</p>
                  </div>
                  <div>
                    <img class="share_button shareTrack" src="./data/icons/share.png" alt="">
                    <img src="./data/icons/more.png" alt="" class="likeTrack">
                    <img src="./data/icons/threedots.png" alt="" class="threeDotsPlaylist" style="margin-left: 1.4rem;">
                  </div>
                </div>
                <div class="progress_bar">
                  <div class="progress"></div>
                </div>
                <div class="music_player_duration_box">
                  <p class="currentTime">0:44</p>
                  <p class="duration">2:17</p>
                </div>
                <div class="music_player_interact_box">
                  <div class="music_player_control_buttons">
                    <img class="prevBtn" src="./data/icons/moveLeft.png" alt="">
                    <img class="playBtn" src="./data/icons/right.png" alt="">
                    <img class="nextBtn" src="./data/icons/moveRight.png" alt="">
                  </div>
                  <div class="music_player_sound_control">
                    <img src="./data/icons/volume.png" alt="" style="width: 2rem;">
                    <div class="music_player_sound_bar">
                      <div class="music_player_volume"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    `
}

exports.getLeftSection = () => {
    return `
        <section class="left_section">
  <div class="top_section top_left_section">
    <h1 class="company_name">ZZZvuk</h1>
  </div>

  <div class="left_section_menus">
    <div class="audio_hosting_menu">
      <div class="hosting_menu_item hover_effect" id="mainPage">
        <div class="active_hosting_page"></div>
        <img class="hosting_image" src="/data/icons/home.png" alt="">
        <p class="hosting_menu_text">Главная</p>
      </div>
      <div class="hosting_menu_item hover_effect" id="profile">
        <div class="active_hosting_page hidden"></div>
        <img class="hosting_image" src="/data/icons/user.png" alt="">
        <p class="hosting_menu_text">Профиль</p>
      </div>
    </div>

    <div class="messenger_menu">
      <div class="hosting_menu_item" style="padding-top: 0;">
        <div class="active_hosting_page hidden"></div>
        <img class="messenger_image" src="/data/icons/message.png" alt="">
        <p class="hosting_menu_text">Мессенджер</p>
      </div>

      <div class="hosting_menu_item message_box hover_effect">
        <div class="message_info">
          <div class="active_hosting_page hidden"></div>
          <div class="menu_profile_image_container">
            <img class="profile_image" src="/data/authors/2cd312b369f6377166237a03b7215b56.jpg" alt="">
          </div>
          <p class="hosting_menu_text">Неадекват</p>
        </div>
        <div class="income_messages_circle">
          <p class="income_message_amount">2</p>
        </div>
      </div>

      <div class="hosting_menu_item message_box hover_effect">
        <div class="message_info">
          <div class="active_hosting_page hidden"></div>
          <div class="menu_profile_image_container">
            <img class="profile_image" src="/data/authors/6e268e284174e29e6daf7d516cf7b485.jpg" alt="">
          </div>
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
  </div>
</section>
    `
}