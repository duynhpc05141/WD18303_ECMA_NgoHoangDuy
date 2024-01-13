<!DOCTYPE html>
<html lang="en">

<head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
    <div class="container ">
        <div class="alert alert-light shadow text-center " role="alert">
            <h4>Danh sách bài viết</h4>
        </div>
<?php  if (!empty($alert)) {
        echo $alert; 
    } ?>
        <table class="table table-bordered text-center table-hover">
            <thead>
                <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Danh mục</th>
                    <th scope="col">Tên bài viết</th>
                    <th scope="col">Nội dung</th>
                    <th scope="col">Hình ảnh </th>
                    <th scope="col">Lượt xem </th>
                    <th scope="col">Ngày đăng </th>
                    <th scope="col">Cập nhật gần nhất </th>
                    <th>Action </th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($listArticle as $row) : ?>
                    <?php
                    extract($row);
                    $editArt = 'index.php?act=article-edit&id=' . $row['article_id'];
                    $deleteArt = 'index.php?act=article-delete&id=' . $row['article_id'];
                    $reviewArt = 'index.php?act=article-review&id=' . $row['article_id'];
                    $anh = '../img/' . $img;
                    $image_paths_array = explode(',', $img);

                    $categoryInfo = loai_select_by_id($category_id);
                    $maxSentences = 1; // Số câu tối đa muốn hiển thị
                    $content = $article_content; // Nội dung của bài viết
                    
                    // Tách nội dung thành các câu
                    $sentences = preg_split('/(?<=[.?!])\s+(?=[a-zA-Z])/u', $content);
                    
                    // Kiểm tra số câu
                    if (count($sentences) > $maxSentences) {
                        // Nếu số câu vượt quá giới hạn, chỉ hiển thị số câu đã chọn và thêm dấu '...'
                        $limitedContent = implode(' ', array_slice($sentences, 0, $maxSentences)) . '...';
                    } else {
                        // Nếu số câu không vượt quá giới hạn, không thêm dấu '...'
                        $limitedContent = $content;
                    }
                    
                  
                    
                    
                    
                    ?>
                    <tr>
                        <td><?= $article_id ?></td>
                        <td><?= $categoryInfo['category_name'] ?></td>
                        <td><?= $article_name ?></td>
                        <td><?= $limitedContent ?></td>
                        <td>
                            <?php foreach ($image_paths_array as $image_path) : ?>
                                <?php if (file_exists('../img/' . $image_path)) : ?>
                                    <img src="../img/<?= $image_path ?>" alt="Hình ảnh bài viết" height="70px" class="p-1">
                                <?php else : ?>
                                    Chưa có ảnh được chọn
                                <?php endif; ?>
                            <?php endforeach; ?>
                        </td>
                        <td><?= $view ?></td>
                        <td style="font-size: 0.8rem; font-style: italic;"><?= $created_at ?></td>
                        <td style="font-size: 0.8rem; font-style: italic;" ><?= $updated_at ?></td>
                        <td>
                            <a title="Sửa" href="<?= $editArt ?>"><i class="fa-regular fa-pen-to-square"></i></a>
                            <a onclick="return confirm('Bạn có muốn xóa?');" href="<?= $deleteArt ?>"><i class="fa-solid fa-trash-can text-danger"></i></a>
                            <a title="Xem trước" href="<?= $reviewArt ?>"><i class="fa-solid fa-eye text-success"></i></a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>

            <div class="d-flex  align-items-center">
                <a href="index.php?act=article-add" class="btn btn-primary btn-sm mb-1">Nhập thêm</a>
                <form action="index.php?act=article-list" role="search" method="post" class="d-flex" style="margin-right: 2rem; ">
                    <select name="category_id" class="form-select mr-2 mb-1 " style="height: 40px; width: 100px; margin-right: 0.3rem;">
                        <option value="" selected>All</option>
                        <?php
                        $list_loai = loai_select_all();
                        foreach ($list_loai as $category) {
                            extract($category);
                            echo '<option value="' . $category_id . '">' . $category_name . '</option>';
                        }
                        ?>
                    </select>
                    <input type="submit" name="go" class="btn btn-outline-secondary btn-sm" value="Filter">
                </form>
            </div>


        </table>

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
</body>

</html>