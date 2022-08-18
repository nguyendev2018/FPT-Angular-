<?php defined('BASEPATH') OR exit('Không cho phép quyền truy cập Script'); ?>

Lỗi xung đột PHP 

Mức độ nghiêm trọng:    <?php echo $severity, "\n"; ?>
Thông điệp:     <?php echo $message, "\n"; ?>
Tên tệp:    <?php echo $filepath, "\n"; ?>
Số dòng: <?php echo $line; ?>

<?php if (defined('SHOW_DEBUG_BACKTRACE') && SHOW_DEBUG_BACKTRACE === TRUE): ?>

Backtrace:
<?php	foreach (debug_backtrace() as $error): ?>
<?php		if (isset($error['file']) && strpos($error['file'], realpath(BASEPATH)) !== 0): ?>
	File: <?php echo $error['file'], "\n"; ?>
	Line: <?php echo $error['line'], "\n"; ?>
	Function: <?php echo $error['function'], "\n\n"; ?>
<?php		endif ?>
<?php	endforeach ?>

<?php endif ?>
