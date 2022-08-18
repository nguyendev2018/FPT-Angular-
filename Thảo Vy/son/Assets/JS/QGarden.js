window.onload = function ()
{
    $('i#CartIcon').css('cursor', 'pointer');

    $('i#CartIcon').click(function ()
    {
        window.location.href = "?QPage=Cart";
    });

    jQuery('div#ProductContainer').not('#IndexButtonAddCart').each(function ()
    {
        let ProductBox = jQuery(this);

        ProductBox.click(function (Events)
        {
            Events.preventDefault();

            window.location.href = "?QPage=Product&ID=" + ProductBox.attr('qg-id');
        })
    });

    $(".full-row img#ProductImageList").click(function(Event)
    {
        Event.preventDefault();

        let Source = $(this).attr("src");

        $("img#ProductImageCurrentInView")
            .fadeOut(400, function()
            {
                $("img#ProductImageCurrentInView").attr('src', Source);
            })
            .fadeIn(400);
    });

    $('div#ProductContainer > img').css('height', '293px');

    $('button#AddToCartFullInfo').click(async function (Events)
    {
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang thêm...',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let Qty = $('input#ProductQty').val();

        let Param = 'ID';
        let ProductID = '';
        let AJAXData = new FormData();

        let PageURL = window.location.search.substring(1);
        let URLVariables = PageURL.split('&');

        for (let Loop = 0; Loop < URLVariables.length; Loop++)
        {
            let ParameterName = URLVariables[Loop].split('=');

            if (ParameterName[0] === Param)
            {
                ProductID = ParameterName[1];
            } else ProductID = null;
        }

        AJAXData.append('Qty', Qty);
        AJAXData.append('ProductID', ProductID);
        AJAXData.append('Action', 'AddToCartFullInfo');

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Thêm vào giỏ thành công.'
                                }
                            );
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('button#IndexButtonAddCart').click(async function (Events)
    {
        Events.stopPropagation();
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang thêm...',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let Qty = 1;

        let AJAXData = new FormData();
        let ProductID = $(this).attr('qg-id');

        AJAXData.append('Qty', Qty);
        AJAXData.append('ProductID', ProductID);
        AJAXData.append('Action', 'AddToCartFullInfo');

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 1000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Thêm vào giỏ thành công.'
                                }
                            );
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    jQuery('.CartTable').each(function ()
    {
        let Cart = jQuery(this),
            RemoveIcon = Cart.find('a#RemoveFromCartIcon');

        console.log(RemoveIcon);

        RemoveIcon.click(async function (Events)
        {
            Events.preventDefault();

            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang Xóa...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Assets/Images/Loading.gif',
                }
            );

            let AJAXData = new FormData();
            let ProductID = RemoveIcon.attr('qg-data');

            console.log(ProductID);

            AJAXData.append('ProductID', ProductID);
            AJAXData.append('Action', 'RemoveFromCart');

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: AJAXData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.Status === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 1000,
                                        type: 'success',
                                        title: 'Thành Công.',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        showConfirmButton: false,
                                        text: 'Xóa khỏi giỏ thành công.'
                                    }
                                ); window.location.reload();
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        text: Respond.Message,
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        });

    });

    $('button#LoginButton').click(async function (Events)
    {
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang đăng nhập...',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let AJAXData = new FormData();

        let UserLogin = $('input#UserLogin').val();
        let UserPassword = $('input#Password').val();

        AJAXData.append('UserLogin', UserLogin);
        AJAXData.append('Password', UserPassword);
        AJAXData.append('Action', 'Login');
        AJAXData.append('DoLogin', '1');

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 1000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Đăng nhập thành công.'
                                }
                            ); window.location.href = "?QPage=Home";
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('#EditInfoButton').click(function (Events)
    {

        Events.preventDefault();

        //Change tab only if THIS CLICK not active
        if(!($(this).hasClass('active-tab')))
        {
            $('#EditInfoForm').css('display', 'block').fadeIn(1000);
        }
    });

    $('button#SaveUserInfo').click(async function (Events)
    {
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra...',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let AJAXData = new FormData();

        AJAXData.append('Action', 'UpdateInfo');
        AJAXData.append('Name', $('input[name="Name"]').val());
        AJAXData.append('Mail', $('input[name="Mail"]').val());
        AJAXData.append('Phone', $('input[name="Phone"]').val());
        AJAXData.append('Address', $('input[name="Address"]').val());

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Thay đổi thông tin thành công.'
                                }
                            ); window.location.reload();
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('input#UserForm[type="file"]').change(async function ()
    {
        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang kiểm tra...',
                allowOutsideClick: false,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let AJAXData = new FormData();

        AJAXData.append('Action', 'UpdateAvatar');
        AJAXData.append('Avatar', $('input[type="file"]')['0'].files['0']);

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Thay đổi thông tin thành công.'
                                }
                            ); window.location.reload();
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    text: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    $('button#UploadAvatarButton').click(async function (Events)
    {
        Events.preventDefault();

        await $('input[type="file"]').trigger('click');
    });

    jQuery('a#DeleteProduct').each(function ()
    {
        let DeleteProduct = jQuery(this);

        DeleteProduct.click(async  function(Events)
        {
            Events.preventDefault();

            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang xóa...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Assets/Images/Loading.gif',
                }
            );

            let AJAXData = new FormData();

            AJAXData.append('Action', 'DeleteProduct');
            AJAXData.append('Product', DeleteProduct.attr('qg-data'));

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: AJAXData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.Status === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'success',
                                        title: 'Thành Công.',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        showConfirmButton: false,
                                        text: 'Xóa sản phẩm thành công.'
                                    }
                                ); window.location.reload();
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        text: Respond.Message,
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        });
    });

    $('button#ButtonDefaultImage').click(function (Events) { Events.preventDefault(); $('input[name="DefaultImage"]').trigger('click') });

    $('button#ButtonImageList').click(function (Events) { Events.preventDefault(); $('input[name="ImageList[]"]').trigger('click') });

    $('button#DoAdd').click(async function (Events)
    {
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang thêm...',
                allowOutsideClick: true,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let AJAXData = new FormData(document.forms['AddNew']);



        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Thêm thành công.'
                                }
                            ); window.location.reload();
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    html: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    jQuery('a#DeleteBill').each( function ()
    {
        let DeleteBill = jQuery(this);

        DeleteBill.click(async function (Events)
        {
            Events.preventDefault();

            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang xóa...',
                    allowOutsideClick: true,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Assets/Images/Loading.gif',
                }
            );

            let AJAXData = new FormData();

            AJAXData.append('Action', 'DeleteBill');
            AJAXData.append('BillID', DeleteBill.attr('qg-data'));

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: AJAXData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.Status === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'success',
                                        title: 'Thành Công.',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        showConfirmButton: false,
                                        text: 'Xóa đơn hàng thành công.'
                                    }
                                ); window.location.reload();
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        html: Respond.Message,
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        });
    });

    $('button#CartCheckout').click(async function (Events)
    {
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang xử lí hóa đơn..',
                allowOutsideClick: true,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let AJAXData = new FormData(document.forms['CartInfo']);

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                    text: 'Đã xử lí đơn hàng thành công.'
                                }
                            ); window.location.reload();
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    html: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    jQuery('a#DeleteCategory').each(function ()
    {
        let DeleteProduct = jQuery(this);

        DeleteProduct.click(async  function(Events)
        {
            Events.preventDefault();

            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang xóa...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Assets/Images/Loading.gif',
                }
            );

            let AJAXData = new FormData();

            AJAXData.append('Action', 'DeleteCategory');
            AJAXData.append('Category', DeleteProduct.attr('qg-data'));

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: AJAXData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.Status === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'success',
                                        title: 'Thành Công.',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        showConfirmButton: false,
                                        text: 'Xóa danh mục thành công.'
                                    }
                                ); window.location.reload();
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        text: Respond.Message,
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        });
    });

    jQuery('a#DeleteUser').each(function ()
    {
        let DeleteProduct = jQuery(this);

        DeleteProduct.click(async  function(Events)
        {
            Events.preventDefault();

            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang xóa...',
                    allowOutsideClick: false,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Assets/Images/Loading.gif',
                }
            );

            let AJAXData = new FormData();

            AJAXData.append('Action', 'DeleteUser');
            AJAXData.append('User', DeleteProduct.attr('qg-data'));

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: AJAXData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.Status === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'success',
                                        title: 'Thành Công.',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        showConfirmButton: false,
                                        text: 'Xóa người dùng thành công.'
                                    }
                                ); window.location.reload();
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        text: Respond.Message,
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        });
    });

    $('button#LoginAJAX').click(async function (Events)
    {
        Events.preventDefault();

        let Loading = Swal.fire
        (
            {
                allowEscapeKey: false,
                title: 'Đang xử lí..',
                allowOutsideClick: true,
                showConfirmButton: false,
                text: 'Vui lòng chờ trong giây lát...',
                imageUrl: 'Assets/Images/Loading.gif',
            }
        );

        let AJAXData = new FormData(document.forms['Login']);

        await $.ajax
        (
            {
                type: 'POST',
                url: 'Model/AJAX.php',
                dataType: 'JSON',
                cache: false,
                contentType: false,
                processData: false,
                data: AJAXData,
                success:
                    function (Respond)
                    {
                        Loading.close();
                        if (Respond.Status === 1)
                        {
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'success',
                                    title: 'Thành Công.',
                                    allowEscapeKey: false,
                                    allowOutsideClick: false,
                                    showConfirmButton: false,
                                }
                            ); window.location.reload();
                        }
                        else
                        {
                            Swal.fire
                            (
                                {
                                    type: 'error',
                                    title: 'Oops.',
                                    html: Respond.Message,
                                    showConfirmButton: true,
                                    showCancelButton: false,
                                }
                            );
                        }
                    },
                error:
                    function ()
                    {
                        Loading.close();
                        Swal.fire
                        (
                            {
                                timer: 3000,
                                type: 'error',
                                title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                showConfirmButton: false,
                                showCancelButton: false,
                            }
                        );
                    }
            }
        );
    });

    jQuery('a#SendMail').each( function ()
    {
        let SendMail = jQuery(this);

        SendMail.click(async function (Events)
        {
            Events.preventDefault();

            let Loading = Swal.fire
            (
                {
                    allowEscapeKey: false,
                    title: 'Đang gửi..',
                    allowOutsideClick: true,
                    showConfirmButton: false,
                    text: 'Vui lòng chờ trong giây lát...',
                    imageUrl: 'Assets/Images/Loading.gif',
                }
            );

            let AJAXData = new FormData(document.forms['ResendMail_' + SendMail.attr('qg-data')]);

            await $.ajax
            (
                {
                    type: 'POST',
                    url: 'Model/AJAX.php',
                    dataType: 'JSON',
                    cache: false,
                    contentType: false,
                    processData: false,
                    data: AJAXData,
                    success:
                        function (Respond)
                        {
                            Loading.close();
                            if (Respond.Status === 1)
                            {
                                Swal.fire
                                (
                                    {
                                        timer: 3000,
                                        type: 'success',
                                        title: 'Thành Công.',
                                        allowEscapeKey: false,
                                        allowOutsideClick: false,
                                        showConfirmButton: false,
                                    }
                                );
                            }
                            else
                            {
                                Swal.fire
                                (
                                    {
                                        type: 'error',
                                        title: 'Oops.',
                                        html: Respond.Message,
                                        showConfirmButton: true,
                                        showCancelButton: false,
                                    }
                                );
                            }
                        },
                    error:
                        function ()
                        {
                            Loading.close();
                            Swal.fire
                            (
                                {
                                    timer: 3000,
                                    type: 'error',
                                    title: 'Có lỗi xảy ra trong quá trình xử lý dữ liệu. Vui lòng thử lại sau.',
                                    showConfirmButton: false,
                                    showCancelButton: false,
                                }
                            );
                        }
                }
            );
        });

    });
};
