<?php
ob_start();
session_start();
include "../DAO/login.php";
include "../DAO/pdo.php";
include "../DAO/article.php";
include "../DAO/loai.php";
include "../DAO/binh-luan.php";
include "../DAO/thong-ke.php";
include "../DAO/khach-hang.php";

$article_exist = article_exist();
$avg_views = article_count_avg_view_all();
$comments = count_comment_all();

if (!isset($_SESSION['admin'])) {
    $act = 'login';
} else {
    if (isset($_GET['act'])) {
        include "header.php";
        $act = $_GET['act'];
    } else {
       
        $act = 'home';
    }
}




    switch ($act) {
        case 'login':
            include 'login.php';
            break;

        case 'logout':
            unset($_SESSION['admin']);
            header('Location: index.php?act=login');
            break;
            /** 
             * TODO:Pages 
             * */

        case 'home':
            $article_exist = article_exist();
            $avg_views = article_count_avg_view_all();
            $comments = count_comment_all();
         
            include "home.php";

            break;
            /** 
             * TODO:Category 
             * */
        case 'category_add':
            if ((isset($_POST['add'])) && ($_POST['add'])) {
                $ten_loai = $_POST['name'];
                loai_insert($ten_loai);
                $alert = '<div class="alert alert-success" role="alert">
                Thêm thành công!
              </div>';
            }
            include "./category/add.php";
            break;
        case 'category_list':
            $list_loai = loai_select_all();
            include "./category/list.php";
            break;
        case 'category_delete':
            try {
                if (isset($_GET['category_id']) && ($_GET['category_id'] > 0)) {
                    loai_delete($_GET['category_id']);
                    $alert = 'Xóa thành công!';
                }
            } catch (Exception $e) {
                $alert = 'không thể xóa!';
            }

            $list_loai = loai_select_all();
            include "./category/list.php";
            break;
        case 'category_edit':
            if (isset($_GET['category_id']) && ($_GET['category_id'] > 0)) {
                $edit = loai_select_by_id($_GET['category_id']);
            }
            include "./category/edit.php";
            break;

        case 'category_update':
            if (isset($_POST['update']) && ($_POST['update'])) {
                $name = $_POST['category_name'];
                $id = $_POST['category_id'];
                loai_update($id, $name);
            }
            $list_loai = loai_select_all();
            include "./category/list.php";
            break;
            /** 
             * TODO: Articles 
             * */
        case 'article-add':
            if (isset($_POST['add']) && ($_POST['add'])) {
                $category_id = $_POST['category_id'];
                $content = $_POST['editor1'];
                $name = $_POST['article_name'];
                $image_paths = array();
                $allowed_image_count = 2;
                if (empty($content)) {
                    $alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                Nội dung không được để trống.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>';
                } else {
                    if (!empty($_FILES['files']['name'][0])) {
                        $file_count = count($_FILES['files']['name']);

                        for ($i = 0; $i < min($file_count, $allowed_image_count); $i++) {
                            $file_name = $_FILES['files']['name'][$i];
                            $file_tmp = $_FILES['files']['tmp_name'][$i];
                            $file_error = $_FILES['files']['error'][$i];

                            // Kiểm tra loại tệp tin
                            $allowed_types = array('jpg', 'jpeg', 'png', 'gif');
                            $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);
                            if (!in_array(strtolower($file_extension), $allowed_types)) {
                                echo "File " . $file_name . " is not an image.";
                                continue;
                            }


                            $target_dir = "../img/";
                            $target_file = $target_dir . uniqid() . "_" . basename($file_name);

                            if (move_uploaded_file($file_tmp, $target_file)) {

                                $image_paths[] = $target_file;
                            } else {

                                echo "Sorry, there was an error uploading your file.";
                            }
                        }
                    }

                    if (!empty($image_paths)) {
                        $image_paths_string = implode(',', $image_paths);
                        article_insert_from_editor($name, $content, $image_paths_string, $category_id);
                    } else {
                        article_insert_from_editor($name, $content, "", $category_id);
                    }
                }
            }
            include "article/add.php";
            break;
        case 'article-list':
            if (isset($_POST['go']) && ($_POST['go'])) {

                $category_id = $_POST['category_id'];
            } else {

                $category_id = 0;
            };
            $list_loai = loai_select_all();
            $listArticle = article_select_all($category_id);
            include "article/list.php";
            break;
        case 'article-delete':
            if (isset($_GET['id']) && ($_GET['id'] > 0)) {
                article_delete($_GET['id']);
            }
            $listArticle = article_select_all("", 0);
            include "article/list.php";
            break;
        case 'article-edit':
            if (isset($_GET['id']) && ($_GET['id'] > 0)) {
                $article = article_select_by_id($_GET['id']);
            }
            $list_loai = loai_select_all();
            include "article/edit.php";
            break;
        case 'article-update':
            if (isset($_POST['update']) && ($_POST['update'])) {
                $category_id = $_POST['category_id'];
                $content = $_POST['editor1'];
                $id = $_POST['article_id'];
                $name = $_POST['article_name'];
                $image_paths = array();
                $file_count = count($_FILES['files']['name']);
                if (empty($content)) {
                    $alert = '<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                Nội dung không được để trống.
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>';
                } else {
                if ($file_count > 0) {
                    $allowed_types = array('jpg', 'jpeg', 'png', 'gif');

                    for ($i = 0; $i < $file_count; $i++) {
                        $file_name = $_FILES['files']['name'][$i];
                        $file_tmp = $_FILES['files']['tmp_name'][$i];
                        $file_error = $_FILES['files']['error'][$i];
                        $file_extension = pathinfo($file_name, PATHINFO_EXTENSION);

                        if (!empty($file_name)) {
                            if (!in_array(strtolower($file_extension), $allowed_types)) {
                                echo "File " . $file_name . " is not an image.";
                                continue;
                            }
                        }
                        $target_dir = "../img/";
                        $target_file = $target_dir . uniqid() . "_" . basename($file_name);

                        if (move_uploaded_file($file_tmp, $target_file)) {

                            $image_paths[] = $target_file;
                        }
                    }
                }

                $old_image_paths = article_get_image_paths_by_id($id);
                if (($file_count > 0 && !empty($image_paths)) || empty($image_paths)) {

                    $image_paths_string = implode(',', $image_paths);
                } else {

                    $image_paths_string = implode(',', $old_image_paths);
                }
                article_update($id, $name, $content, $image_paths_string, $category_id);
            }
            }

            $listArticle = article_select_all("", 0);
            include "article/list.php";

            break;
        case 'article-review':
            if (isset($_GET['id']) && ($_GET['id'])) {
                $id = $_GET['id'];
            } else {
                $id = 0;
            }
            $reviewArt = article_select_by_id($id);
            include "article/review.php";
            break;
            /** 
             * TODO: Customer
             * */
        case 'user_add':
            $target_dir = "../img/";
            if (isset($_POST['addCus']) && ($_POST['addCus'])) {
                $user = $_POST['user_name'];
                $password = $_POST['user_password'];
                $email = $_POST['email'];
                $phone = $_POST['user_phone'];
                $role_id = $_POST['role_id'];
                $avatar = save_file('avatar', $target_dir);
                if (!is_username_exists($user,$email)) {
                    user_insert_admin($user, $email, $avatar, $phone, $password, $role_id);
                    $alert = '<div class="alert alert-success" role="alert">
                    Thêm thành công!
                  </div>';
                } else {
                    $alert = '<div class="alert alert-danger" role="alert">
                        Tên hoặc email người dùng đã tồn tại. Vui lòng chọn tên khác.
                      </div>';
                }
            }
            include "./user/add.php";
            break;
        case 'user_list':
            $listUser = user_select_all();
            include "./user/list.php";
            break;
        case 'user_delete':
            if (isset($_GET['user_id']) && ($_GET['user_id'] > 0)) {
                customer_delete($_GET['user_id']);
            }
            $listUser = user_select_all();
            include "./user/list.php";
            break;
        case 'user_edit':
            if (isset($_GET['user_id']) && ($_GET['user_id'] > 0)) {
                $customer = customer_select_by_id_admin($_GET['user_id']);
            }
            include "./user/edit.php";
            break;
        case 'user_update':
            $target_dir = "../img/";
            if (isset($_POST['ac-update']) && ($_POST['ac-update'])) {
                $id = $_POST['id'];
                $user = $_POST['user'];
                $email = $_POST['email'];
                $img = save_file('avatar', $target_dir);
                $phone = $_POST['phone'];
                $role_id = $_POST['role_id'];
              
             
                if (!check_kh($user) ) {
                   
                     
                  user_update_admin($id, $user, $email, $img, $phone, $role_id);
                } else {
                   
                     $alert = '<div class="alert alert-danger" role="alert">
                                Tên người dùng đã tồn tại. Vui lòng chọn tên khác.
                              </div>';
                }
                
            }

             $listUser = user_select_all();
            include "./user/list.php";
            break;
            /** 
             * TODO: Comment
             * */
        case 'comment_list':
            $list_comment = comment_select_all();
            include "comment/list.php";
            break;
        case 'comment_detail':
            if (isset($_GET['article_id']) && ($_GET['article_id'] > 0)) {
                $list_comment = comment_select_by_article($_GET['article_id']);
            }

            include './comment/detail.php';
            break;
        case 'comment_delete':
            if (isset($_GET['comment_id']) && ($_GET['comment_id'] > 0) && ($_GET['article_id'])) {
                $article_id = $_GET['article_id'];
                comment_delete($_GET['comment_id']);
            }
            $list_comment = comment_select_by_article($article_id);
            include './comment/detail.php';
            break;
            /** 
             * TODO: Static
             * */
        case 'static':
            $listStatic = stactic_all();
            include "static/list.php";
            break;
        case 'chart':
            $listStatic = stactic_all();
            include "static/chart.php";
            break;
            /** 
             * TODO: Favourite
             * */
        case 'favourite':
            $favo = stactic_favourite_articles();
            include "static/favourite.php";
            break;
        case 'chartFavourite':
            $favo = stactic_favourite_articles();
            include "static/chartFavourite.php";
            break;
    }
 

include "footer.php";
?>
<script src="https://kit.fontawesome.com/55a9fa42b8.js" crossorigin="anonymous"></script>