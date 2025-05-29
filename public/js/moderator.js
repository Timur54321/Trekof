const music = new Audio();
music.src = '/api/v1/file/9ae7345e-08e4-4fe0-ab0b-90ccd04b98ff';
let currentRequest;

$(document).ready(function() {
    $("#playsong").click(function() {
        music.play();
    });

    $("#toapprove").click(async function() {
        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/requests/${this.parentNode.parentNode.id}`,
                data: {
                    status: "Одобрено"
                }
            });
    
            if (res.status === 201) {
                const res1 = await axios({
                    method: 'PATCH',
                    url: `/api/v1/mediafiles/${res.data.data.mediaFile}`,
                    data: {
                        status: "approved"
                    }
                });
    
                if (res1.status == 201) {
                    alert("everything went successfully!");
                    window.location.reload();
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    $("#tocancel").click(function () {
        $("#toreason").show(200);
        currentRequest = this.parentNode.parentNode.id;
    });

    $(".reason_overlay").click(function (el) {
        if ($(el.target)["0"] == this) {
            $("#toreason").hide(200);
        }
    });

    $("#sendreason").click(async function () {
        const reason = $("#reasoninfo").val();

        try {
            const res = await axios({
                method: 'PATCH',
                url: `/api/v1/requests/${currentRequest}`,
                data: {
                    status: "Отклонено",
                    reason
                }
            });

            if (res.status === 201) {
                const res1 = await axios({
                    method: 'PATCH',
                    url: `/api/v1/mediafiles/${res.data.data.mediaFile}`,
                    data: {
                        status: 'Canceled'
                    }
                });

                if (res1.status == 201) {
                    alert("Заявка была отклонена успешнейшим образом");
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

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
                    if (reports[i].status !== "moderation") return;
                    await $(".mod_right_bar").append(`
                        <div class="reportItem" id="${reports[i]._id}">
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
                            <button class="link_button sendToAdmin" style="margin-left: 5rem; color: black; border-color: black; background-color: unset;" >Отправить на блокировку аккаунта</button>
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

                $(".sendToAdmin").click(async function() {
                    try {
                        const res = await axios({
                            method: 'PATCH',
                            url: `/api/v1/blockRequests/${this.parentNode.id}`,
                            data: {
                                status: 'admin'
                            }
                        });

                        if (res.status === 202) {
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

    $("#loadRequests").click(async function() {
        $(".mod_right_bar").empty();
        try {
            const res = await axios({
                method: 'GET',
                url: '/api/v1/requests'
            });

            if (res.status === 200) {
                const requests = res.data.data;
                $(".mod_right_bar").append(`<p class="mod_title">Заявки</p>`);
                for (let i = 0; i < requests.length; i++) {
                    $(".mod_right_bar").append(`
                        <div class="request">
                            <div class="request_basic_info">
                                <div class="request_date">
                                    <p>12.05.12</p>
                                </div>
                                <div class="request_author">
                                    <div style="width: 6rem; height: 6rem; overflow: hidden; border-radius: 50%;">
                                        <img src="/api/v1/file/${requests[i].mediaFile.coverKey}" alt="" width="100%">
                                    </div>
                                    <p>${requests[i].mediaFile.name}</p>
                                </div>
                                <div class="request_player">
                                    <audio controls src="/api/v1/file/${requests[i].mediaFile.audioKey}"></audio>
                                </div>
                            </div>
                            <div class="request_btns">
                                <button id="tocancel">Отклонить</button>
                                <button id="toapprove">Принять</button>
                            </div>
                        </div> 
                    `);
                }
            }
        } catch (err) {
            console.log(err);
        }
    });

    
});