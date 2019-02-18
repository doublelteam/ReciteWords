function login() {
    $.ajax({
        url:"/login",
        data:{
            p1:"1",
            p2:"2"
        },
        type:"POST"
    })
}