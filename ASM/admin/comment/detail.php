<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
  <script src="https://kit.fontawesome.com/55a9fa42b8.js" crossorigin="anonymous"></script>
  <title>Document</title>
</head>
<style>
  .btn {
    margin: 0.5rem 0.5rem;
  }
</style>

<body>
  <div class="container">
  <div class="alert alert-light shadow text-center " role="alert">
      <h4>Danh sách bình luận</h4>
    </div>
    <div class="row justify-content-center">
      
      <div class="col-10">
        <table class="table table-bordered text-center table-hover ">
          <thead>
            <tr>
              <th scope="col">Người bình luận</th>
              <th scope="col">Nội dung</th>
              <th>Ngày</th>
              <th>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            <?php
            foreach ($list_comment as $cm) {
              extract($cm);
              $comment_delete = "index.php?act=comment_delete&comment_id=".$comment_id."&article_id=".$article_id;
              echo ' 
              <tr>  
                <td>' . $user_name. '</td>
                <td>' . $comment_content.'</td>
                <td>' . $created_at. '</td>
              <td> 
              <a onclick="return confirm(\'Bạn có muốn xóa?\');" href="'.$comment_delete.'" ><i class="fa-solid fa-trash-can text-danger"></i></a>
              </td>
              </tr>
              ';
            }
            ?>

          </tbody>
          <a href="index.php?act=comment_list"><input class="btn btn-secondary btn-sm " type="button" value="Danh sách"></a>
          
          
        </table>

      </div>
    </div>
  </div>
</body>

</html>


<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>