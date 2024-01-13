<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://kit.fontawesome.com/55a9fa42b8.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
  <script src="https://cdn.jsdelivr.net/npm/toastify-js"></script>
  <title>Document</title>
</head>
<style>
  .btn {
    margin: 0.5rem 0.5rem;
  }
</style>

<body>
  <div class="container">
  <div class="alert alert-light shadow text-center " >
      <h4>Danh sách danh mục</h4>
    </div>
    <div class="row justify-content-center">
      
      <div class="col-10">
        <table class="table table-bordered   text-center table-hover ">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên danh mục</th>
              <th scope="col">Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <?php
            foreach ($list_loai as $list) {
              extract($list);
              $delect_category = "index.php?act=category_delete&category_id=".$category_id;
              $edit = 'index.php?act=category_edit&&category_id='.$category_id;
            ?>
              <tr>  
                <td><?= $category_id ?></td>
                <td><?= $category_name ?></td>
              <td> 
                <a  href="<?= $edit ?>"><i class="fa-regular fa-pen-to-square"></i></a>
                <a onclick="return confirm('Bạn có muốn xóa?');" href="<?=$delect_category ?>"><i class="fa-solid fa-trash-can text-danger"></i></a>

              </td>
              </tr>
            <?php  
            }
            ?>
              
          </tbody>
          <a href="index.php?act=category_add"><input class="btn btn-primary btn-sm" type="button" value="Nhập thêm"></a>
        </table>
      </div>
    </div>
  </div>
</body>

</html>

<script>
var mes = '<?php echo addslashes($alert); ?>';

// Hiển thị toast message
Toastify({
    text: mes,
    duration: 3000, // Thời gian tự động đóng: 5000 milliseconds = 5 seconds
    close: true,
    gravity: "top", // Vị trí hiển thị, có thể là "top" hoặc "bottom"
    position: "center", // Thay đổi vị trí hiển thị, có thể là "left", "center", hoặc "right"
    backgroundColor: "black",
}).showToast();
</script>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
      