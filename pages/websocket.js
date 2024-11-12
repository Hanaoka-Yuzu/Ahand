var url = '';


function connect(user, func) {
  var that =this

    wx.connectSocket({
        url: url,
        header: { 'content-type': 'application/json' },
        success: function() {
            console.log("KLEE: Success!")
        },
        fail: function() {
            console.log("KLEE: 😭😭😭")
        }
    });

    wx.onSocketOpen(
        function() {
            wx.showToast({
                title: "Connect success!",
                icon: "Success!",
                duration: 2000
            });
            wx.onSocketMessage(func);
        }
    );

    wx.onSocketError(
        function() {
            wx.showToast({
                title: "Fail!",
                icon: "🥵🥵🥵",
                duration: 2000
            });
        }
    )
}

function send(msg) {
    wx.sendSocketMessage({
        data: msg,
        success: function() {
            wx.showToast({
                title: "Success!",
                icon: ">_<",
                duration: 2000
            })
        },
        fail: function() {
            wx.showToast({
                title: "Fail!",
                icon: "😭😭😭",
                duration: 2000
            })
        }
    })
}
module.exports = {
    connect: connect
}