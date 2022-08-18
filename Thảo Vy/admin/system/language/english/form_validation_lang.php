<?php
/**
 * CodeIgniter
 *
 * An open source application development framework for PHP
 *
 * This content is released under the MIT License (MIT)
 *
 * Copyright (c) 2014 - 2018, British Columbia Institute of Technology
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package	CodeIgniter
 * @author	EllisLab Dev Team
 * @copyright	Copyright (c) 2008 - 2014, EllisLab, Inc. (https://ellislab.com/)
 * @copyright	Copyright (c) 2014 - 2018, British Columbia Institute of Technology (http://bcit.ca/)
 * @license	http://opensource.org/licenses/MIT	MIT License
 * @link	https://codeigniter.com
 * @since	Version 1.0.0
 * @filesource
 */
defined('BASEPATH') OR exit('No direct script access allowed');

$lang['form_validation_required']		= '{field} không được để trống.';
$lang['form_validation_isset']			= '{field} phải có một giá trị.';
$lang['form_validation_valid_email']		= '{field} phải chứa một địa chỉ email hợp lệ.';
$lang['form_validation_valid_emails']		= ' {field} phải chứa tất cả các địa chỉ email hợp lệ.';
$lang['form_validation_valid_url']		= ' {field} phải chứa một URL hợp lệ.';
$lang['form_validation_valid_ip']		= ' {field} phải chứa một IP hợp lệ.';
$lang['form_validation_min_length']		= ' {field} ít nhất phải là {param} ký tự.';
$lang['form_validation_max_length']		= ' {field} không thể vượt quá {param} ký tự.';
$lang['form_validation_exact_length']		= ' {field} phải chính xác {param} ký tự.';
$lang['form_validation_alpha']			= ' {field} chỉ có thể chứa các ký tự chữ cái.';
$lang['form_validation_alpha_numeric']		= ' {field} chỉ có thể chứa các ký tự chữ và số.';
$lang['form_validation_alpha_numeric_spaces']	= ' {field} chỉ có thể chứa các ký tự chữ, số và dấu cách.';
$lang['form_validation_alpha_dash']		= ' {field} chỉ có thể chứa các ký tự chữ và số, dấu gạch dưới và dấu gạch ngang.';
$lang['form_validation_numeric']		= ' {field} chỉ được chứa số.';
$lang['form_validation_is_numeric']		= ' {field} chỉ được chứa các ký tự số.';
$lang['form_validation_integer']		= ' {field} phải chứa một số nguyên.';
$lang['form_validation_regex_match']		= ' {field} không đúng định dạng.';
$lang['form_validation_matches']		= ' {field} không phù hợp với {param}.';
$lang['form_validation_differs']		= ' {field} phải khác với {param}.';
$lang['form_validation_is_unique'] 		= ' {field} phải chứa một giá trị duy nhất.';
$lang['form_validation_is_natural']		= ' {field} chỉ được chứa các chữ số.';
$lang['form_validation_is_natural_no_zero']	= ' {field} chỉ được chứa các chữ số và phải lớn hơn 0.';
$lang['form_validation_decimal']		= ' {field} phải chứa một số thập phân.';
$lang['form_validation_less_than']		= ' {field} phải chứa một số nhỏ hơn {param}.';
$lang['form_validation_less_than_equal_to']	= ' {field} phải chứa một số nhỏ hơn hoặc bằng {param}.';
$lang['form_validation_greater_than']		= ' {field} phải chứa một số lớn hơn {param}.';
$lang['form_validation_greater_than_equal_to']	= ' {field} phải chứa một số lớn hơn hoặc bằng {param}.';
$lang['form_validation_error_message_not_set']	= 'Không thể truy cập thông báo lỗi tương ứng với tên {field}.';
$lang['form_validation_in_list']		= ' {field} phải là một trong số: {param}.';
