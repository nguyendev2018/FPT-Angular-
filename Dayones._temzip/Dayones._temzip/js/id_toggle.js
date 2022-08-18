var nut = document.querySelectorAll('.item-click');
var content = document.querySelectorAll('.box-show');
for (var i = 0; i < nut.length; i++) {
        nut[i].addEventListener("click", function() {
            if (this.classList[1] == "blue") {
                // click vao cai da hien thi roi
                this.classList.remove("blue"); // bo mau trang o chinh no
                // 3 dong sâduoi la cho div cua doi tuong dc click an di
                var content_show = this.getAttribute("data-show");
                var current_show = document.getElementById(content_show);
            } // click vao cac cai con lai
            
            else {
                // cho tat ca bo mau trang di
                for (var k = 0; k < nut.length; k++) {
                    nut[k].classList.remove("blue");
                }
                // doi tuong dc click (this) thanh mau trang
                this.classList.add("blue");
                //lay ve cai data-hienlien
                var content_show = this.getAttribute("data-show");
                console.log(content_show);
                var current_show = document.getElementById(content_show);
                // console.log(current_show);
                // cho tat ca cac div  .dehienthi khac an di
                for (var i = 0; i < content.length; i++) {
                    content[i].classList.remove("show_hidden");
                }
                // cho div cua doi tuong dc click hien thi ra
                current_show.classList.toggle("show_hidden");

            }
        });
    }