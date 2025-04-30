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
                                    <img src="./data/authors/2cd312b369f6377166237a03b7215b56.jpg" alt="" style="width: 100%;">
                                </div>
                            </div>

                            <div>
                                <p style="font-size: 3.6rem; margin-bottom: 1.4rem;">Psychosis</p>
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
                            
                            <div style="overflow: scroll; min-width: 0;display: flex; flex-direction: column;">
                                
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

                        <div style="margin-bottom: 0;">
                            <p style="font-size: 2.4rem; margin-bottom: 1.2rem;">Релизы</p>
                            <div style="position: relative;">
                                <div class="releases_list">

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
                                <div class="left_btn">
                                    <img src="./data/icons/left-arrow.png" alt="">
                                </div>
        
                                <div class="right_btn">
                                    <img src="./data/icons/right-arrow.png" alt="">
                                </div>                                
                            </div>
                        </div>

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
                                            <img src="./data/icons/share.png" alt="" class="share_button">
                                            <img src="./data/icons/more.png" alt="">
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
                    <input type="text" style="margin-bottom: 2rem;">
                    <p>Текст песни</p>
                    <textarea name="" id="" style="margin-bottom: 4rem;"></textarea>

                    <button class="link_button">Отправить</button>
                </div>
            </div>
        </div>
        
        <input type="file" id="upload_cover" style="display: none;"></input>
        <input type="file" id="upload_audio" style="display: none;"></input>

    `;
}