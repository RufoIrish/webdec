
// console.log("ratings");
$(document).ready(function () {
    $("button").click(function () {
        // console.log("irsh");       
        $.ajax({
            url: "http://localhost:3006/rate",
            type: "get",
            crossDomain: true,
            data: { rate: $(this).text(), name: $("title").text()},
            success: function (data) {
                // alert(data);
                $("h3").text(data);
            },
            error: function(e){
                console.log(e);
            }
        });
    })
})
