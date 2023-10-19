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

            let URL = $(this.toggler).attr('href');
            console.log(URL);
            $.ajax({
                type: 'POST',
                url: URL,
            })
            .done((data) => {
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted == true){
                    likesCount -= 1;
                }else{
                    likesCount += 1;
                }
                console.log(self);
                $(self).attr('data-likes', likesCount);
                $("#like-count").html(`${likesCount}`);
            })
            .fail((errorData) => {
                console.log(`Request is not completed => Error ==> ${errorData}`)
            });
        });
    }
}