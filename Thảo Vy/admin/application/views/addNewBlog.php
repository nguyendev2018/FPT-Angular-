<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            <i class="fa fa-file-powerpoint-o"></i> Quản lý bài viết
            <small>Thêm / Chỉnh sửa bài viết</small>
        </h1>
    </section>
    <section class="content">
        <div class="row">
            <!-- left column -->
            <div class="col-md-8">
                <!-- general form elements -->
                <div class="box box-primary">
                    <div class="box-header">
                        <h3 class="box-title">Nhập thông tin bài viết</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <?php $this->load->helper("form"); ?>
                    <form role="form" id="addNewBlog" action="<?php echo base_url() ?>addNewBlogs" enctype="multipart/form-data" method="post" role="form">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="blog_tittle">Tiêu đề bài viết</label>
                                        <input type="text" class="form-control required" value="<?php echo set_value('blog_tittle'); ?>" id="blog_tittle" name="blog_tittle">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="namecate">Thể loại</label>
                                        <select class="form-control required" id="namecate" name="namecate">
                                            <option value="0">Chọn thể loại</option>
                                            <?php
                                            if(!empty($blogs_categories))
                                            {
                                                foreach ($blogs_categories as $rl)
                                                {
                                                    ?>
                                                <option value="<?php echo $rl->id ?>" <?php if($rl->id == set_value('namecate')) {echo "selected=selected";} ?>>
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
                                        <label for="blog_content">Nội dung</label>
                                        <textarea class="form-control" id="blog_content" name="blog_content">
                                            <?php echo set_value('blog_content'); ?>
                                        </textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="blog_img">Hình ảnh</label>
                                        <input type="file" id="blog_img" name="blog_img" />
                                    </div>
                                </div>
                                </div>
                            </div>
                            <!-- /.box-body -->

                            <div class="box-footer">
                                <input type="submit" name="submit" class="btn btn-primary" value="Xác nhận" />
                                <input type="reset" class="btn btn-default" value="Hủy" />
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