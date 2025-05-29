$(document).ready(function() {
    $("#loadReports").click(async function() {
        $(".mod_right_bar").empty();
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/blockRequests'
            });

            if (res.status === 200) {
                const reports = res.data;
                $(".mod_right_bar").append(`<p class="mod_title">Заявки</p>`);
                for (let i = 0; i < reports.length; i++) {
                    if (reports[i].status !== "admin") return;
                    await $(".mod_right_bar").append(`
                        <div class="reportItem" id="${reports[i]._id}" data-user="${reports[i].commentId.author._id}">
                            <div class="income_box" style="margin-bottom: 5rem;">
                                <div class="ms_message_avatar" style="width: 5rem; height: 5rem; flex-shrink: 0;">
                                    <img src="/api/v1/file/${reports[i].commentId.author.photoKey}" alt="">
                                </div>
                                <div style="padding-top: 1rem;">
                                    <p style="font-size: 1.4rem; font-weight: 500; margin-bottom: 0.6rem; color: black;">${reports[i].commentId.author.name}</p>
                                    <div class="ms_message_box" style="border-top-left-radius: 0;">
                                        <p class="ms_message_content">${reports[i].commentId.content}</p>
                                    </div>
                                </div>
                            </div>
                            <button class="link_button blockUser" style="margin-left: 5rem; color: black; border-color: black; background-color: unset;" >Блокировать</button>
                            <button class="link_button deleteReport" style="margin-left: 5rem; color: black; border-color: black; background-color: unset;" >Пощадить</button>
                        </div>
                    `);
                }

                $(".deleteReport").click(async function() {
                    try {
                        const res = await axios({
                            method: "DELETE",
                            url: `/api/v1/blockRequests/${this.parentNode.id}`
                        });

                        if (res.status === 203) {
                            $(this.parentNode).slideUp(200, function() {$(this).remove()});
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });

                $(".blockUser").click(async function() {
                    try {
                        const res = await axios({
                            method: 'DELETE',
                            url: `/api/v1/blockRequests/blockUser/${this.parentNode.id}`,
                            data: {
                                userForDeletion: this.parentNode.dataset.user
                            }
                        });

                        if (res.status === 203) {
                            alert("Пользователь был заблокирован");
                            $(this.parentNode).slideUp(200, function() {$(this).remove()});
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    });

    $("#systemStats").click(function() {
        window.location.reload();
    });

    $("#loadModeration").click(async function() {
        $(".mod_right_bar").empty();

        try {
            const res = await axios({
                method: 'GET',
                url: `/api/v1/users/getModerators`
            });

            const moderators = res.data;

            $(".mod_right_bar").append(`<p class="mod_title">Управление модерацией</p>`);
            await $(".mod_right_bar").append(`<div class="mod_inputs_holder">
                    <input class="mods_input" id="modName" type="text" placeholder="Имя...">
                    <input class="mods_input" id="modEmail" type="text" placeholder="Email...">
                    <input class="mods_input" id="modPassword" type="text" placeholder="Password...">
                </div>
                <button class="create_mod" id="createModerator">Создать</button>`);
            await $(".mod_right_bar").append(`<div id="moderatorsHolder"></div>`);
            for (let i = 0; i < moderators.length; i++) {
                $("#moderatorsHolder").append(`
                    <div style="display: flex; align-items: center; gap: 4rem; padding: 2rem;" id="${moderators[i]._id}">
                        <div class="putInCenter" style="width: 5rem; height: 5rem; overflow: hidden;">
                            <img src="./data/icons/user.png" alt="" width="100%">
                        </div>
                        <p style="font-size: 1.8rem; color: black;">${moderators[i].name}</p>
                        <p style="font-size: 1.8rem; color: black;">${moderators[i].email}</p>
                        <div class="putInCenter deleteModerator" style="width: 3rem; height: 3rem; cursor: pointer;" >
                            <img src="./data/icons/delete.png" alt="" width="100%" data-image="yes">
                        </div>
                    </div>
                `)
            }

            $("#createModerator").click(async function() {
                const name = $("#modName").val();
                const email = $("#modEmail").val();
                const password = $("#modPassword").val();
                if (name && email && password)
                {
                    try {
                        const res = await axios({
                            method: 'POST',
                            url: '/api/v1/users/createModerator',
                            data: {
                                name,
                                email,
                                password,
                                passwordConfirm: password,
                                role: 'moderator'
                            }
                        });

                        if (res.status === 201) {
                            alert("Модератор был добавлен в систему");
                            $("#moderatorsHolder").append(`
                                <div style="display: flex; align-items: center; gap: 4rem; padding: 2rem;">
                                    <div class="putInCenter" style="width: 5rem; height: 5rem; overflow: hidden;">
                                        <img src="./data/icons/user.png" alt="" width="100%">
                                    </div>
                                    <p style="font-size: 1.8rem; color: black;">${res.data.name}</p>
                                    <p style="font-size: 1.8rem; color: black;">${res.data.email}</p>
                                </div>
                            `)
                        }
                    }catch (err) {
                        console.log(err);
                    }
                }
            });

            $(".deleteModerator").click(async function() {
                try {
                    const res = await axios({
                        method: 'DELETE',
                        url: `/api/v1/users/${this.parentNode.id}`
                    });

                    if (res.status === 203) {
                        alert('Пользователь был удален');
                        $(this.parentNode).hide(200, function() {$(this).remove()});
                    }
                } catch (err) {
                    console.log(err);
                }
            })
        } catch (err) {
            console.log(err);
        }
    });
});