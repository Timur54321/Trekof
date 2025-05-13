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
});