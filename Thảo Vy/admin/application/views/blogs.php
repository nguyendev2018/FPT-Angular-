<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      <i class="fa fa-file-powerpoint-o" aria-hidden="true"></i> Tất cả các bài viết
      <small>Tất cả các bài viết trong bảng</small>
    </h1>
  </section>
  <section class="content">
    <div class="col-xs-12">
      <div class="text-right">
        <a class="btn btn-primary" href="<?php echo base_url(); ?>addNewBlog">
          <i class="fa fa-plus"></i> Thêm Bài viết</a>
      </div>
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
                    <th>Tiêu đề bài viết</th>
                    <th>Hình ảnh bài viết</th>
                    <th>Thể loại</th>
                    <th>Tác giả</th>
                    <th>Chức vụ tác giả</th>
                    <th>Ngày viết</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                      if(!empty($blogRecords))
                      {
                          foreach($blogRecords as $record)
                          {
                      ?>
                    <tr>
                      <td>
                        <?php echo $record->id ?>
                      </td>
                      <td>
                        <?php echo $record->blog_tittle ?>
                      </td>
                      <td>
                        <img src="blog_img/<?php echo $record->blog_img ?>" width="50" />
                      </td>
                      <td>
                        <img src="pro_img/cate/<?php echo $record->imgcate ?>" width="50" />
                      </td>
                      <td>
                        <?php echo $record->name ?>
                      </td>
                      <td>
                        <?php echo $record->role ?>
                      </td>
                      <td>
                        <?php echo $record->bcreatedDtm ?>
                      </td>
                      <td class="text-center">
                        <a class="btn btn-sm btn-info" href="<?php echo base_url().'editOldBlog/'.$record->blog_id; ?>" title="Sửa">
                          <i class="fa fa-pencil"></i>
                        </a>
                        <a class="btn btn-sm btn-danger deleteUser" href="<?php echo base_url().'deleteBlog/'.$record->blog_id; ?>" data-userid="<?php echo $record->blog_id; ?>"
                          title="Xóa">
                          <i class="fa fa-trash"></i>
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
</section>
</div>