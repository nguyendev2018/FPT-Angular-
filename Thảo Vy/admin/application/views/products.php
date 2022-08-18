<div class="content-wrapper">
  <!-- Content Header (Page header) -->
  <section class="content-header">
    <h1>
      <i class="fa fa-gift" aria-hidden="true"></i> Tất cả các Coupon
      <small>Tất cả các Coupon trong bảng</small>
    </h1>
  </section>
  <section class="content">
    <div class="col-xs-12">
      <div class="text-right">
        <a class="btn btn-primary" href="<?php echo base_url(); ?>addNewProduct">
          <i class="fa fa-plus"></i> Thêm Coupon</a>
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
                    <th>Tên Coupon</th>
                    <th>Chi tiết</th>
                    <th>Hình ảnh</th>
                    <th>Hãng cung cấp</th>
                    <th>Giá trị Coupon</th>
                    <th>Người tạo </th>
                    <th>Chức vụ người tạo</th>
                    <th>Thời gian tạo</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <?php
                      if(!empty($productRecords))
                      {
                          foreach($productRecords as $record)
                          {
                      ?>
                    <tr>
                      <td>
                        <?php echo $record->id ?>
                      </td>
                      <td>
                        <?php echo $record->pro_name ?>
                      </td>
                      <td>
                        <?php echo $record->pro_details ?>
                      </td>
                      <td>
                        <img src="pro_img/<?php echo $record->pro_img ?>" width="50" />
                      </td>
                      <td>
                        <img src="pro_img/cate/<?php echo $record->imgcate ?>" width="50" />
                      </td>
                      <td>
                        <?php echo number_format("$record->pro_price") ." đ" ?>
                      </td>
                      <td>
                        <?php echo $record->name ?>
                      </td>
                      <td>
                        <?php echo $record->role ?>
                      </td>
                      <td>
                        <?php echo $record->pcreatedDtm ?>
                      </td>
                      <td class="text-center">
                        <a class="btn btn-sm btn-info" href="<?php echo base_url().'editOldProduct/'.$record->pro_id; ?>" title="Sửa">
                          <i class="fa fa-pencil"></i>
                        </a>
                        <a class="btn btn-sm btn-danger deleteUser" href="<?php echo base_url().'deleteProduct/'.$record->pro_id; ?>" data-userid="<?php echo $record->pro_id; ?>"
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