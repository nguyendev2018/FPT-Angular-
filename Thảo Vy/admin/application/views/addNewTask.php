<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
        <i class="fa fa-tasks"></i> Quản lý Nhiệm vụ
            <small>Thêm / Chỉnh sửa Nhiệm vụ</small>
        </h1>
    </section>
    <section class="content">
        <div class="row">
            <!-- left column -->
            <div class="col-md-8">
                <!-- general form elements -->
                <div class="box box-primary">
                    <div class="box-header">
                        <h3 class="box-title">Nhập thông tin Nhiệm vụ</h3>
                    </div>
                    <!-- /.box-header -->
                    <!-- form start -->
                    <?php $this->load->helper("form"); ?>
                    <form role="form" id="addNewTask" action="<?php echo base_url() ?>addNewTasks" method="post" role="form">
                        <div class="box-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="fname">Tiêu đề Nhiệm vụ</label>
                                        <input type="text" class="form-control required" value="<?php echo set_value('fname'); ?>" id="fname" name="fname">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="role">Quyền ưu tiên</label>
                                        <select class="form-control required" id="priority" name="priority">
                                            <option value="0">Chọn mức độ ưu tiên</option>
                                            <?php
                                            if(!empty($tasks_prioritys))
                                            {
                                                foreach ($tasks_prioritys as $rl)
                                                {
                                                    ?>
                                                <option value="<?php echo $rl->priorityId ?>" <?php if($rl->priorityId == set_value('priority')) {echo "selected=selected";} ?>>
                                                    <?php echo $rl->priority ?>
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
                                        <label for="comment">Nội dung Nhiệm vụ</label>
                                        <textarea class="form-control" id="comment" name="comment" rows="4">
                                            <?php echo set_value('comment'); ?>
                                        </textarea>
                                    </div>
                                </div>

                                <div class="row">
                                </div>
                            </div>
                            <!-- /.box-body -->

                            <div class="box-footer">
                                <input type="submit" class="btn btn-primary" value="Xác nhận" />
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