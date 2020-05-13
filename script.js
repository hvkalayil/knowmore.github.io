key = 'apiKey=at_XUkiBYRrev00KunU2CAJNyww8TQXB';
outForm = '&outputFormat=JSON'
var color = ["#F8F9FA", "#343A40", "#1b262c", "#e4e4e4"];
var textColor = ["greenyellow","red",];
var i = 0;

$(document).ready(function () {

    $(".mode").click(function () {
        $("#mode-icon").toggleClass("fa-sun-o fa-moon-o");
        $("nav").toggleClass("navbar-dark bg-dark navbar-light bg-light");
        $(".mode").css("background-color", color[i]);
        $(".getURL").css("color", color[i]);
        $("#submitBtn").css("color", color[i]);
        $("#resetBtn").css("color", color[i]);
        $(".text").css("color", color[i]);
        $(".info").css("color", textColor[i]);
        $("body").css("background-color", color[i + 2]);
        if (i == 0)
            i++;
        else
            i = 0;
        $(".getURL").css("background-color", color[i]);
        $("#submitBtn").css("background-color", color[i]);
        $("#resetBtn").css("background-color", color[i]);
        $(".info").css("background-color", color[i]);
        $("#mode-icon").css("color", color[i]);

    });

    $("#submitBtn").click(function () {
        var input = $("#url").val();
        var index = input.search("http");
        if (index != -1) {
            var domainName = input.split("/")[2];
            var domain = "&domainName=" + domainName;
            url = 'https://www.whoisxmlapi.com/whoisserver/WhoisService?' + key + domain + outForm;
            console.log( input.split("/"));
            fetch(url)
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    else {
                        return 'ERROR'
                    }
                })
                .then(jsonData => {
                    
                    var createdDate = jsonData["WhoisRecord"].createdDate;
                    var domainPurchaseDate = jsonData["WhoisRecord"].updatedDate;
                    var domainExpiryDate = jsonData["WhoisRecord"].expiresDate;
                    var domainName = jsonData["WhoisRecord"].domainName;
                    var temp = jsonData["WhoisRecord"]["registrant"].name;
                    if(temp == null || temp == "" || temp == "undefined"){
                        var registrar = "not recorded";
                    }
                    else{
                        var registrar = temp;
                    }
                    $(".name").html(domainName);
                    $(".createdDate").html(createdDate.substring(0, 10));
                    $(".purchaseDate").html( domainPurchaseDate.substring(0, 10));
                    $(".expiryDate").html( domainExpiryDate.substring(0, 10));
                    $(".registrar").html(registrar);
                });
            $(".getURL").animate({ opacity: '0' });
            $("#submitBtn").animate({ opacity: '0' });
            $(".info").animate({ opacity: '100%' });
            $(".exitBtn").animate({ opacity: '100%' });
        }
        else {
            console.log("Nalla url kond va");
        }
    });

    $("#resetBtn").click(function () {
        $(".getURL").animate({ opacity: '100%' });
        $("#submitBtn").animate({ opacity: '100%' });
        $(".info").animate({ opacity: '0' });
        $(".exitBtn").animate({ opacity: '0' });
    });
});