$(document).on("ready", function(){
    $(".send").on('click', function(){
        if ($('.title').val() || $('.desc').val()) {
            $.ajax({
            url: "/add",
            type: "POST",
            data: {
                "title": $('.title').val(),
                "desc": $('.desc').val(),
                "timestamp": parseTime(new Date()),
                "time": new Date()
            },
            success: function (data){

                $('.title').val("")
                $('.desc').val("")
                $('.desc').text("")
                

                card = $(`<div class='card' title='${data.timestamp}'></div>`)
                card_header = $("<div class='card-header'></div>")

                h5 = $('<h5></h5>').text(data["title"])
                card_header.append(h5)

                card_body = $(`<div class='card-body'></div>`)
                p = $("<p></p>").text(data["description"])

                card_body.append(p)
                card_footer = $("<div class='card-footer'></div>")
                

                act_btn = $(`<data sm-data="/delete/${data["_id"].$oid}" class="" id="delete"></data>`)

                trash = $("<i class='fas fa-trash'></i>")
                act_btn.append(trash)
                card_footer.append(act_btn)

                card.append(card_header, card_body, card_footer)
                $(".card-columns").append(card)
                
                set_delete()
            }

        })
        }else{
            $('.title').focus()
        }
    })
})    