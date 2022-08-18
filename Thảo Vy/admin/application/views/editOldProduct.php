<?php

$pro_id = '';
$pro_name = '';
$pro_details = '';
$id = '';
$pro_img = '';
$pro_price ='';


if(!empty($productInfo))
{
    foreach ($productInfo as $uf)
    {
        $pro_id = $uf->pro_id;
        $pro_name = $uf->pro_name;
        $pro_details = $uf->pro_details;
        $id = $uf->id;
        $pro_img = $uf->pro_img;
        $pro_price = $uf->pro_price;
    }
}
?>

    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                <i class="fa fa-gift"></i> Quản lý Coupon
                <small>Thêm / Chỉnh sửa</small>
            </h1>
        </section>
        <section class="content">
            <div class="row">
                <!-- left column -->
                <div class="col-md-8">
                    <!-- general form elements -->
                    <div class="box box-primary">
                        <div class="box-header">
                            <h3 class="box-title">Nhập thông tin Coupon</h3>
                        </div>
                        <!-- /.box-header -->
                        <!-- form start -->
                        <?php $this->load->helper("form"); ?>
                        <form role="form" id="addNewProduct" action="<?php echo base_url() ?>editProduct" enctype="multipart/form-data" method="post" role="form">
                            <div class="box-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="pro_name">Tên Coupon</label>
                                            <input type="hidden" name="productId" id="productId" value="<?php echo $pro_id; ?>">
                                            <input type="text" class="form-control required" value="<?php echo $pro_name; ?>" id="pro_name" name="pro_name">
                                        </div>

                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="pro_price">Giá trị Coupon</label>
                                            <input type="text" class="form-control required" value="<?php echo $pro_price; ?>" id="pro_price" name="pro_price">
                                        </div>

                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label for="namecate">Hãng cung cấp</label>
                                            <select class="form-control required" id="namecate" name="namecate">
                                                <option value="0">Chọn nhà cung cấp</option>
                                                <?php
                                            if(!empty($products_categories))
                                            {
                                                foreach ($products_categories as $rl)
                                                {
                                                    ?>
                                                    <option value="<?php echo $rl->id ?>" <?php echo ($rl->id === $id) ? "selected" : "" ?>>
                                                        <?php echo $rl->namecate ?>
                                                    </option>
                                                    <?php
                                                }
                                            }
                                            ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label for="pro_details">Mô tả Coupon</label>
                                            <textarea class="form-control" id="pro_details" name="pro_details" rows="4">
                                                <?php echo $pro_details; ?>
                                            </textarea>
                                        </div>


                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="form-group">
                                                    <label for="pro_img">Hình ảnh Coupon</label>
                                                    <input type="file" id="pro_img" name="pro_img" />
                                                        <?php echo $pro_img; ?>
                                                    </input>
                                                </div>


                                            </div>
                                            <!-- /.box-body -->

                                            <div class="box-footer">
                                                <input type="submit" name="submit" class="btn btn-primary" value="Xác nhận" />
                                                <input type="reset" class="btn btn-default" value="Hủy" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </form>
                        </div>
                        </div>
                        <div class="col-md-4">
                            <?php
                    $this->load->helper('form');
                    $error = $this->session->flashdata('error');
                    if($error)
                    {
                ?>
                                <div class="alert alert-danger alert-dismissable">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <?php echo $this->session->flashdata('error'); ?>
                                </div>
                                <?php } ?>
                                <?php  
                    $success = $this->session->flashdata('success');
                    if($success)
                    {
                ?>
                                <div class="alert alert-success alert-dismissable">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <?php echo $this->session->flashdata('success'); ?>
                                </div>
                                <?php } ?>

                                <div class="row">
                                    <div class="col-md-12">
                                        <?php echo validation_errors('<div class="alert alert-danger alert-dismissable">', ' <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button></div>'); ?>
                                    </div>
                                </div>
                        </div>
                    </div>
        </section>

        </div>