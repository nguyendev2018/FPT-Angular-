<?php
defined('BASEPATH') OR exit('Không cho phép quyền truy cập Script');
?>

<div style="border:1px solid #990000;padding-left:20px;margin:0 0 10px 0;">

<h4>Đã xảy ra lỗi tiếp nhận ngoại lệ</h4>

<p>Kiểu: <?php echo get_class($exception); ?></p>
<p>Thông điệp: <?php echo $message; ?></p>
<p>Tên tệp: <?php echo $exception->getFile(); ?></p>
<p>Số dòng: <?php echo $exception->getLine(); ?></p>

<?php if (defined('SHOW_DEBUG_BACKTRACE') && SHOW_DEBUG_BACKTRACE === TRUE): ?>

	<p>Backtrace:</p>
	<?php foreach ($exception->getTrace() as $error): ?>

		<?php if (isset($error['file']) && strpos($error['file'], realpath(BASEPATH)) !== 0): ?>

			<p style="margin-left:10px">
			Tệp tin: <?php echo $error['file']; ?><br />
			Dòng: <?php echo $error['line']; ?><br />
			Chức năng: <?php echo $error['function']; ?>
			</p>
		<?php endif ?>

	<?php endforeach ?>

<?php endif ?>

</div>