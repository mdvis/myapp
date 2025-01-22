/**
 * name: index.js
 * author: Deve
 * date: 2024-11-01
 */
    $(()=>{
        const message = (val) => "<div class='message'>"+val+"</div>"
        const notice = (val) => "<div class='notice'>"+val+"</div>"

        const mp = {message, notice};

        const handler = (e) => {
            const {type} = e;
            const scroll = $('.scroll');
            const data = $('.data');
            scroll.append(mp[type](e.data));
            data.scrollTop(scroll.outerHeight());
        }

        const envSource = new EventSource("//localhost:8090/event_source", {
            withCredentials: true,
        })

        // envSource.onmessage = handler
        envSource.addEventListener("notice",handler)
        envSource.addEventListener("message",handler)

        envSource.onopen = function(e){
            $('body').prepend('<div class="open">open</div>')
            $('.open').append("<button>close</button>").click(()=>{envSource.close()})
        }

        envSource.onerror = function(e){
            $('body').append('error')
            envSource.close()
        }
    })
