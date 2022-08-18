<?php defined('BASEPATH') OR exit('Không cho phép quyền truy cập Script '); ?>

Đã xảy ra lỗi tiếp nhận ngoại lệ

Kiểu:        <?php echo get_class($exception), "\n"; ?>
Thông điệp:     <?php echo $message, "\n"; ?>
Tên tệp:    <?php echo $exception->getFile(), "\n"; ?>
Số dòng: <?php echo $exception->getLine(); ?>

<?php if (defined('SHOW_DEBUG_BACKTRACE') && SHOW_DEBUG_BACKTRACE === TRUE): ?>

Backtrace:
<?php	foreach ($exception->getTrace() as $error): ?>
<?php		if (isset($error['file']) && strpos($error['file'], realpath(BASEPATH)) !== 0): ?>
	Tập tin: <?php echo $error['file'], "\n"; ?>
	Dòng: <?php echo $error['line'], "\n"; ?>
	Chức năng: <?php echo $error['function'], "\n\n"; ?>
<?php		endif ?>
<?php	endforeach ?>

<?php endif ?>
