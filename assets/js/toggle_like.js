class ToggleLike{
    constructor(toggleElement){
        // console.log(toggleElement)
        this.toggler = toggleElement;
        // console.log(this.toggler);
        this.toggleLike();
    }

    toggleLike(){
        $(this.toggler).click((e)=>{
            e.preventDefault();
            let self = this;
            // console.log(self);
            let URL = $(this.toggler).attr('href');
            console.log(URL);
            $.ajax({
                type: 'POST',
                url: URL,
            })
            .done((data) => {
                let likesCount = parseInt($(this.toggler).attr('data-likes'));
                console.log(likesCount);
                console.log(data.data);
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }

                $(self).attr('data-likes', likesCount);
                $(self).htm(`${likesCount} &nbsp;<i class="fa-solid fa-heart fa-xl"></i>`);
            })
            .fail((errorData) => {
                console.log(`Request is not completed => Error ==> ${errorData}`)
            });
        });
    }
}