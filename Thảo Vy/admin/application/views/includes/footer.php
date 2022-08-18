<footer class="main-footer">
    <div class="pull-right hidden-xs">
        <b>BSEU</b> Trang Admin | Coupon
    </div>
    <strong>Copyright &copy; 2020-2021
        <a href="<?php echo base_url(); ?>">FPT Polytechnic</a>
    </strong> Đã đăng ký Bản quyền.
</footer>

<!-- jQuery UI 1.11.2 -->
<!-- <script src="http://code.jquery.com/ui/1.11.2/jquery-ui.min.js" type="text/javascript"></script> -->
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<!-- Bootstrap 3.3.2 JS -->
<script src="<?php echo base_url(); ?>assets/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/dist/js/app.min.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/jquery.validate.js" type="text/javascript"></script>
<script src="<?php echo base_url(); ?>assets/js/validation.js" type="text/javascript"></script>
<script type="text/javascript">
    var windowURL = window.location.href;
    pageURL = windowURL.substring(0, windowURL.lastIndexOf('/'));
    var x = $('a[href="' + pageURL + '"]');
    x.addClass('active');
    x.parent().addClass('active');
    var y = $('a[href="' + windowURL + '"]');
    y.addClass('active');
    y.parent().addClass('active');
</script>
<!-- DataTables JavaScript -->
<script type="text/javascript" src="https://cdn.datatables.net/v/dt/dt-1.10.16/af-2.2.2/b-1.5.1/b-colvis-1.5.1/fc-3.2.4/fh-3.1.3/r-2.2.1/sc-1.4.4/sl-1.2.5/datatables.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/pdfmake.min.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.32/vfs_fonts.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/jszip-2.5.0/dt-1.10.16/af-2.2.2/b-1.5.1/b-colvis-1.5.1/b-flash-1.5.1/b-html5-1.5.1/b-print-1.5.1/cr-1.4.1/fc-3.2.4/fh-3.1.3/kt-2.3.2/r-2.2.1/rg-1.0.2/rr-1.2.3/sc-1.4.4/sl-1.2.5/datatables.min.js"></script>
<script src="<?php echo base_url(); ?>assets/plugins/ckeditor/ckeditor.js"></script>
<script>CKEDITOR.replace('blog_content');</script>
<!-- Tables - Use for reference -->
<script>
    $(document).ready(function () {
        $('#dataTables-example').DataTable({
            //Bộ loc
            dom: "<'row'<'col-sm-6'l><'col-sm-6'f>>" +
                "<'row'<'col-sm-12'tr>>" +
                "<'row'<'col-sm-9'i><'col-sm-3'B>>" +
                "<'row'<'col-sm-7 col-centered'p>>",
            lengthMenu: [
                [10, 15, 25, 50, -1],
                [10, 15, 25, 50, "Tất cả"]
            ],

            language: {
                select: {
                    rows: "%d hàng đang chọn."
                },

                "sDecimal":        ",",
                "sEmptyTable":     "Không có dữ liệu trong bảng",
                "sInfo":           "Hiển thị từ _START_ - _END_ trong tổng _TOTAL_",
                "sInfoEmpty":      "Không có dữ liệu",
                "sInfoFiltered":   "(_MAX_ tìm thấy trong hồ sơ)",
                "sInfoPostFix":    "",
                "sInfoThousands":  ".",
                "sLengthMenu":     "Hiển thị _MENU_ thành phần trong bảng",
                "sLoadingRecords": "Đang tải...",
                "sProcessing":     "Đang dịch...",
                "sSearch":         "Tìm kiếm:",
                "sZeroRecords":    "Không tìm thấy kết quả",
                "oPaginate": {
                    "sFirst":    "Trang đầu",
                    "sLast":     "Trang cuối",
                    "sNext":     "Trang kế",
                    "sPrevious": "Trang trước"
                },
                "oAria": {
                    "sSortAscending":  ": Sắp xếp theo thứ tự tăng dần",
                    "sSortDescending": ": Sắp xếp theo thứ tự tăng dần"
                }
            },
            buttons: [{
                    extend: "print",
                    text: "In",
                    exportOptions: {
                        orthogonal: 'export',
                        columns: ':visible'
                    },
                },
                {
                    extend: 'excelHtml5',
                    exportOptions: {
                        orthogonal: 'export'
                    },
                    text: "Excel",
                },
                {
                    extend: 'pdfHtml5',
                    exportOptions: {
                        orthogonal: 'export'
                    },
                    text: "PDF",
                }
            ],
            "order": [],
            responsive: true
        });
    });
</script>
</body>

</html>