$(document).ready(function () {
    var editor = CKEDITOR.replace('editor2', {
        extraPlugins: 'uploadimage,image2',
        height: 300,

        // Upload images to a CKFinder connector (note that the response type is set to JSON).
        uploadUrl: '/upload_image',

        // Configure your file manager integration. This example uses CKFinder 3 for PHP.
        filebrowserBrowseUrl: '/image_gallery',
        filebrowserImageBrowseUrl: '/image_gallery',
        filebrowserUploadUrl: '/upload_image',
        filebrowserImageUploadUrl: '/upload_image',

        // The following options are not necessary and are used here for presentation purposes only.
        // They configure the Styles drop-down list and widgets to use classes.

        stylesSet: [{
            name: 'Narrow image',
            type: 'widget',
            widget: 'image',
            attributes: {
                'class': 'image-narrow'
            }
        },
            {
                name: 'Wide image',
                type: 'widget',
                widget: 'image',
                attributes: {
                    'class': 'image-wide'
                }
            }
        ],

        // Load the default contents.css file plus customizations for this sample.
        contentsCss: [
            'http://cdn.ckeditor.com/4.11.4/full-all/contents.css',
            'assets/css/widgetstyles.css'
        ],

        // Configure the Enhanced Image plugin to use classes instead of styles and to disable the
        // resizer (because image size is controlled by widget styles or the image takes maximum
        // 100% of the editor width).
        image2_alignClasses: ['image-align-left', 'image-align-center', 'image-align-right'],
        image2_disableResizer: true
    });
    $('#select_alt').hide();
    $(".target").change(function () {
        var id = $(".target option:selected").val();
        $.post({
            url: '/menu_filter',
            data: {'id': id},
            success: function (response) {
                $('#select_alt').show();
                $("#select_alt").html("");
                if (response == '') {
                    $('#select_alt').hide();
                } else {
                    $.each(response, function (index, opt) {
                        $("#select_alt").append('<option value="' + opt.id + '">' + opt.name + '</option>')

                    })
                }

            },
            error: function () {
                alert('Beklenmedik bir hata oluştu.')
            }
        })
    });

    $('#icerik_save').click(function () {
        if ($.isEmptyObject(editor.getData())) {
            swal(
                'Hata !',
                'Bu Alan Boş Bırakılamaz !',
                'error'
            )
        } else {
            var id = $(".target option:selected").val();
            var content = editor.getData();
            var alt_id = $("#select_alt").val();
            $.ajax({
                url: 'icerik_save',
                data: {'id': id, 'content': content, 'alt_id': alt_id},
                type: 'POST',
                success: function (response) {
                    if (response.status) {
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Kayıt başarılı bir şekilde oluşturuldu.',
                            showConfirmButton: false
                        });
                        setTimeout(function () {
                            location.href = "/content_list";
                        }, 500)
                    } else
                        alert('Beklenmedik bir hata oluştu.');
                },
                error: function () {
                    alert('Beklenmedik bir hata oluştu.')
                }
            })
        }
    });

    $('#cke_87_uiElement').click(function () {
        alert("aa")
    })



});