var ust_menu_handler = function () {

    var install_page = function () {
    $('#select_alt').hide();
    $('#menu_save').click(function () {

        if ($.isEmptyObject($('#example_ust_Input').val())) {
            swal(
                'Hata !',
                'Bu Alan Boş Bırakılamaz !',
                'error'
            )
        } else {
            var ad = $('#example_ust_Input').val();
            $.ajax({
                url: 'ust_menu_ekle',
                data: {'ad': ad},
                type: 'POST',
                success: function (response) {
                    if (response.status) {
                        dt.ajax.reload(null, false);
                        swal({
                            position: 'top-right',
                            type: 'success',
                            title: 'Kayıt başarılı bir şekilde oluşturuldu.',
                            showConfirmButton: false,
                            timer: 3500
                        });
                        setTimeout(function () {
                            location.reload();
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

    var table_language = {
        "oPaginate": {
            "sFirst": "İlk",
            "sLast": "Son",
            "sNext": "Sonraki",
            "sPrevious": "Önceki"
        },
        "sSearch": '<span class="input-group-addon"><i class="glyphicon glyphicon-search"></i></span>',
        "sZeroRecords": "Kayıt bulunamadı",
        "sInfoEmpty": "Gösterilen 0 kayıt!",
        "sProcessing": "Kayıtlar Yükleniyor..",
        "sInfo": "Toplam _TOTAL_ kayıttan _START_ - _END_ arası gösteriliyor",
        "sInfoFiltered": " ( Toplam _MAX_ kayıttan filtrelendi )",
        "sLengthMenu": "Gösterilen  _MENU_  kayıt",
    };
    var dt = $('#dtBasicExample').DataTable({
        "ajax": {
            "url": "/get_ust_menu_data",
            "dataSrc": ""
        },
        "bLengthChange": false,
        "bFilter": false,
        "bAutoWidth": false,
        "oLanguage": table_language,
        "columns": [
            {"data": "name"},
            {
                "render": function (data, type, row) {
                    console.log(row.id);
                    return '<button id="menu_delete_' + row.id + '" type="button"' +
                        'class="btn btn-danger btn-sm delete_button" style="margin-right: 5px" onclick="ust_menu_handler.delete('+ row.id +')">' +
                        '<i class="fa fa-trash"></i>' +
                        '</button>' +
                        '<button id="duzenle_' + row.id + '" data-toggle="modal" data-target="#myModal"' +
                        'type="button"' +
                        'class="btn btn-warning btn-sm edit_button" onclick="ust_menu_handler.edit('+ row.id +')">' +
                        '<i class="fa fa-edit"></i>' +
                        '</button>'
                }
            },
        ]
    });

    };

    function edit_menu(alinan_id) {
        $.ajax({
            url: 'edit_ustmenu',
            data: {'id': alinan_id},
            type: 'GET',
            success: function (response) {
                $('#exampleInput').val(response.ustmenu);
            }

        });


        $('#edit_save').click(function () {
            if ($.isEmptyObject($('#exampleInput').val())) {
                swal(
                    'Hata !',
                    'Bu Alan Boş Bırakılamaz !',
                    'error'
                )
            } else {
                var ad = $('#exampleInput').val();
                $.ajax({
                    url: 'edit_ustmenu',
                    data: {'ad': ad, 'id': alinan_id},
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
                                location.reload();
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

    }

    function delete_menu(alinan_id) {
        swal({
            title: 'Emin misiniz?',
            text: "Veri silinecektir!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sil',
            cancelButtonText: 'İptal'
        }).then(function (result) {
            if (result.value) {
                $.ajax({
                    url: 'delete_menu',
                    data: {'id': alinan_id},
                    type: 'POST',
                    success: function (message) {
                        if (message) {
                            swal(
                                'Tebrikler!',
                                'Kayıt başarıyla silindi.',
                                'success'
                            );
                            setTimeout(function () {
                                location.reload();
                            }, 500)
                        } else
                            alert('Beklenmedik bir hata oluştu!')
                    },
                    error: function () {
                        alert('Beklenmedik bir hata oluştu!')
                    }
                })
            }
        })
    }

    return {
        init: function () {
            install_page()
        },
        edit: function (id) {
            edit_menu(id);
        },
        delete: function (id) {
            delete_menu(id);
        }
    }
}();