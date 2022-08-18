<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      <i class="fa fa-tasks"></i> Tất cả các nhiệm vụ
      <small>Tất cả các nhiệm vụ trong bảng của chúng tôi</small>
    </h1>
  </section>
  <section class="content">
    <div class="col-xs-12">
      <div class="box">
        <div class="box-header">
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
                    <th>Tiêu đề nhiệm vụ</th>
                    <th>Giải trình</th>
                    <th>Tình trạng</th>
                    <th>Quyền ưu tiên</th>
                    <th>Người tạo</th>
                    <th>Chức vụ của người tạo</th>
                    <th>Ngày tạo</th>
                    <th>Ngày hoàn thành</th>
                    <th>Hoàn thành công việc</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                      if(!empty($taskRecords))
                      {
                          foreach($taskRecords as $record)
                          {
                      ?>
                    <tr>
                      <td>
                        <?php echo $record->id ?>
                      </td>
                      <td>
                        <?php echo $record->title ?>
                      </td>
                      <td>
                        <?php echo $record->comment ?>
                      </td>
                      <td>
                        <div class="label label-<?php
                        if ($record->statusId == '1')
                        echo 'danger';
                        else if ($record->statusId == '2')
                        echo 'success';
                        ?>">
                          <?php echo $record->status ?>
                        </div>
                      </td>

                      <td>
                        <div class="label label-<?php
                        if ($record->priorityId == '1')
                        echo 'danger';
                        else if ($record->priorityId == '2')
                        echo 'warning';
                        else if ($record->priorityId == '3')
                        echo 'info'
                        ?>">
                          <?php echo $record->priority ?>
                        </div>
                      </td>
                      <td>
                        <?php echo $record->name ?>
                      </td>
                      <td>
                        <?php echo $record->role ?>
                      </td>
                      <td>
                        <?php echo $record->createdDtm ?>
                      </td>
                      <td>
                        <?php echo $record->endDtm ?>
                      </td>
                      <td class="text-center">
                        <a class="btn btn-sm btn-primary" href="<?= base_url().'endTask/'.$record->id; ?>" title="Hoàn thành nhiệm vụ">
                          <i class="fa fa-check-circle"></i>
                        </a>
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