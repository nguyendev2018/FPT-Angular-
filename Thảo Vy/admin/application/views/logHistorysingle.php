<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
        <h1>
            <i class="fa fa-archive"></i> Lịch sử Nhật ký
            <small>Lịch sử nhật ký của người dùng</small>
        </h1>
    </section>
    <section class="content">
        <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header">
                        <h3 class="box-title">
                            <?= $userInfo->name." : ".$userInfo->email ?>
                        </h3>
                        <div class="box-tools">
                        </div>
                    </div>
                    <!-- /.box-header -->
                    <div class="box-body table-responsive no-padding">
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
                            <div class="panel-body">
                                <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên tài khoản</th>
                                            <th>Hoạt động</th>
                                            <th>Chức năng hoạt động</th>
                                            <th>ID người dùng</th>
                                            <th>Vai trò người dùng</th>
                                            <th>IP người dùng</th>
                                            <th>Trình duyệt</th>
                                            <th>Tất cả thông tin Trình duyệt </th>
                                            <th>Nền tảng</th>
                                            <th>Ngày và giờ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php
                      if(!empty($userRecords))
                      {
                          foreach($userRecords as $record)
                          {
                      ?>
                                            <tr>
                                                <td>
                                                    <?php echo $record->id ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->userName ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->process ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->processFunction ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->userRoleId ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->userRoleText ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->userIp ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->userAgent ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->agentString ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->platform ?>
                                                </td>
                                                <td>
                                                    <?php echo $record->createdDtm ?>
                                                </td>
                                            </tr>
                                            <?php
                          }
                      }
                      ?>
                                    </tbody>
                                </table>
                            </div>
                    </div>
                    <!-- /.box-body -->
                </div>
                <!-- /.box -->
            </div>
        </div>
    </section>
</div>