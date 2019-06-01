// $(document).ready(function () {
//     $('.icerik_delete_button').click(function () {
//         var id = $(this).attr('id');
//         var deger_id = id.split("_");
//         var alinan_id = deger_id[2];
//         swal({
//             title: 'Emin misiniz?',
//             text: "Veri silinecektir!",
//             type: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Sil'
//         }).then(function (result) {
//             if (result.value) {
//                 $.ajax({
//                     url: '/delete_icerik',
//                     data: {'id': alinan_id},
//                     type: 'POST',
//                     success: function (message) {
//                         if (message) {
//                             swal(
//                                 'Tebrikler!',
//                                 'Kayıt başarıyla silindi.',
//                                 'success'
//                             );
//                             setTimeout(function () {
//                                 location.reload();
//                             }, 500)
//                         } else
//                             alert('Beklenmedik bir hata oluştu!')
//                     },
//                     error: function () {
//                         alert('Beklenmedik bir hata oluştu!')
//                     }
//                 })
//
//             }
//         })
//
//
//     });
//
//
//
//
// });

var content_handler = function () {
    var install_page = function () {

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
        var dt = $('#dt_content').DataTable({
            "ajax": {
                "url": "/get_content_data",
                "dataSrc": ""
            },
            "bLengthChange": false,
            "bFilter": false,
            "bAutoWidth": false,
            "oLanguage": table_language,
            "columns": [
                {"data": "ust_menu"},
                {"data": "alt_menu"},
                {
                    "render": function (data, type, row) {
                        var div = '<p style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;max-width: 650px;">' + $("<div />").html(row.content).text() + '</p>'
                        return div;
                    }
                },
                {
                    "render": function (data, type, row) {
                        console.log(row.id);
                        return '<button id="menu_delete_' + row.id + '" type="button"' +
                            'class="btn btn-danger btn-sm icerik_delete_button" style="margin-right: 5px" onclick="content_handler.delete(' + row.id + ')">' +
                            '<i class="fa fa-trash"></i>' +
                            '</button>' +
                            '<a id="duzenle_' + row.id + '"' +
                            'class="btn btn-warning btn-sm icerik_edit_button"  href="/show_content/' + row.id + '"' +
                            ' onclick="content_handler.edit(' + row.id + ')">' +
                            '<i class="fa fa-edit"></i>' +
                            '</a>'
                    }
                },
            ]
        });

    };

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
                    url: '/delete_icerik',
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
        delete: function (id) {
            delete_menu(id);
        }
    }
}();