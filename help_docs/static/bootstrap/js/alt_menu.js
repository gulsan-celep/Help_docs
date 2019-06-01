var alt_menu_handler = function () {

    var install_page = function () {
    $('#select_alt').hide();

    $('#alt_save').click(function () {
        if ($.isEmptyObject($('#alt_example').val())) {
            swal(
                'Hata !',
                'Bu Alan Boş Bırakılamaz !',
                'error'
            )
        } else {
            var adi = $('#alt_example').val();
            var sec = $('#sec_ust').val();
            $.ajax({
                url: 'alt_menu_ekle',
                data: {'adi': adi, 'sec': sec},
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
    var dt = $('#dt_alt_menuExample').DataTable({
        "ajax": {
            "url": "/get_alt_menu_data",
            "dataSrc": ""
        },
        "bLengthChange": false,
        "bFilter": false,
        "bAutoWidth": false,
        "oLanguage": table_language,
        "columns": [
            {"data": "ust_menu"},
            {"data": "name"},
            {
                "render": function (data, type, row) {
                    console.log(row.id);
                    return '<button id="alt_menu_delete_' + row.id + '" type="button"' +
                        'class="btn btn-danger btn-sm alt_delete_button" style="margin-right: 5px" onclick="alt_menu_handler.delete('+ row.id +')">' +
                        '<i class="fa fa-trash"></i>' +
                        '</button>' +
                        '<button id="alt_duzenle_' + row.id + '" data-toggle="modal" data-target="#alt_Modal"' +
                        'type="button"' +
                        'class="btn btn-warning btn-sm alt_edit_button" onclick="alt_menu_handler.edit('+ row.id +')">' +
                        '<i class="fa fa-edit"></i>' +
                        '</button>'
                }
            },
        ]
    });

    };

    function edit_menu(alinan_id) {
         $.ajax({
            url: '/edit_alt_menu',
            data: {'id': alinan_id},
            type: 'GET',
            success: function (response) {
                $('#alt_menu_example').val(response.altmenu);
                $('#sec_ust_edit').val(response.ust_menu);
            }

        });
          $('#alt_edit_save').click(function () {
            if ($.isEmptyObject($('#alt_menu_example').val())) {
                swal(
                    'Hata !',
                    'Bu Alan Boş Bırakılamaz !',
                    'error'
                )
            } else {
                var ad = $('#alt_menu_example').val();
                $.ajax({
                    url: '/edit_alt_menu',
                    data: {'ad': ad, 'id': alinan_id},
                    type: 'POST',
                    success: function (response) {
                        if (response.status) {
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
                    url: '/delete_alt_menu',
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
        });
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